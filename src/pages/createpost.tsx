import { useEffect, useState, useRef } from "react";
import { connected } from "process";
import Hero from "../components/Hero";
import { useForm, SubmitHandler } from "react-hook-form";
// import { DefaultEditor } from "react-simple-wysiwyg";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  useAccount,
  useSignMessage
} from "wagmi";
import { abi } from "../../contracts/Simple.json";
import Simple from "../contractInfo/contract-addressBdl.json";

// import prettyBytes from "pretty-bytes";
import Script from "next/script";
//@ts-ignore
import LitJsSdk from "lit-js-sdk";
import { FileReadResult } from "fs/promises";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type Inputs = {
  title: string;
  articleText: string;
  excerpt: string;
  price: number;
};

const chain = 'mumbai';

function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

const contract = require('../contractInfo/contract-addressBdl.json').Simple;

const accessControlConditions = [
  {
    contractAddress: '',
    standardContractType: '',
    chain: chain,
    method: 'eth_getBalance',
    parameters: [':userAddress', 'latest'],
    returnValueTest: {
      comparator: '>=',
      value: '0',
    },
  },
]

const CreatePost = () => {

  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [txId, setTxId] = useState(null);
  const [postData, setPostData] = useState<any>();
  const [transactionData, setTransactionData] = useState<any>();
  const [authSig, setAuthSig] = useState<any>();
  const litRef = useRef();
  const writeRef = useRef();

  if(!litRef.current) {
    const litSDK = new LitJsSdk.LitNodeClient();
    litRef.current = litSDK;
    litSDK.connect();
  }

  const { isConnected, address } = useAccount();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (!postData) return;
    const signIt = async () => {
      var authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: "mumbai",
      });
      setAuthSig(authSig);
    }
    signIt();
    return;
    //signMessage()
  }, [postData]);

  useEffect(() => {
    if (!authSig) return;

    const saveIt = async ()=> {

      console.log(1, postData)


      // Visit here to understand how to encrypt static content
      // https://developer.litprotocol.com/docs/LitTools/JSSDK/staticContent
      const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(postData.articleText);

      console.log(55)

      console.log({authSig})

      //@ts-ignore
      const encryptedSymmetricKey = await litRef.current.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain,
      });

      console.log(8)

      const encryptedKey = LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16");

      console.log(5)
      //@ts-ignore
      const symmetricKey2 = await litRef.current.getEncryptionKey({
        accessControlConditions,
        toDecrypt: encryptedKey,
        chain,
        authSig,
      });

      const decryptedString = await LitJsSdk.decryptString(
        encryptedString,
        symmetricKey2
      );

      //console.log({encryptedString})

      let myobject = await blobToBase64(await encryptedString);
      

      console.log({encryptedKey, decryptedString,  t: typeof encryptedKey, en: myobject})

      const transactionIds = await fetch("/api/savePost", {
        method: "POST",
        body: JSON.stringify({
          preview: JSON.stringify({ title: postData.title, preview: postData.excerpt, encryptedKey }),
          encryptedContent: await encryptedString.text(),
        }),
      });
      const pj = await transactionIds.json();
      console.log("pj from .then", pj);
      //console.log("data from .then", data);

      setTransactionData({ contentId: pj.content, previewId: pj.preview });

    }
    saveIt();
  }, [authSig]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setPostData(data);
  };

  const { config } = usePrepareContractWrite({
    address: "0x758b58fB346B3Ce8ec9Fc57b53C48091855b8C55",
    abi: abi,
    functionName: "createPost",
    //args: [transactionData?.contentId, transactionData?.previewId, getValues("price")],
    args: [transactionData?.contentId, transactionData?.previewId, getValues("price")],
  });

  const {
    data: dataRead,
    isError,
    isLoading: isLoadingRead,
    isSuccess: isSuccessRead,
  } = useContractRead({
    address: "0x758b58fB346B3Ce8ec9Fc57b53C48091855b8C55",
    abi: abi,
    functionName: "createPost",
  });

  const {
    write,
  } = useContractWrite(config);
  //@ts-ignore
  writeRef.current = write;

  useEffect(() => {
    //@ts-ignore
    transactionData && writeRef.current?.();
    
  }, [transactionData]);

  return (
    <>
      {isConnected ? (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-6 max-w-prose mx-auto "
          >
            {isLoadingRead && <div>Check Wallet</div>}
            {isSuccessRead && (
              <div>Transaction: {JSON.stringify(dataRead)}</div>
            )}

            <p className="text-4xl mr-20">Submit your article</p>
            <div className="w-full flex flex-col">
              <label>
                <span className="label-text text-2xl">Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input input-primary  min-w-min input-lg"
                {...register("title")}
              />
            </div>
            {/* <DefaultEditor className="w-full" /> */}

            <div className="w-full flex flex-col">
              <label>
                <span className="label-text text-2xl">Text</span>
              </label>
              <textarea
                className="textarea w-full textarea-primary textarea-lg h-[400px]"
                placeholder="Main Text"
                {...register("articleText")}
              ></textarea>
            </div>
            <div className="w-full flex flex-col">
              <label>
                <span className="label-text text-2xl">Excerpt</span>
              </label>
              <textarea
                className="textarea w-full textarea-primary textarea-lg h-[200px]"
                placeholder="Preview Text"
                {...register("excerpt")}
              ></textarea>
            </div>
            <div className="w-full flex flex-col">
              <label>
                <span className="label-text text-2xl">Price</span>
              </label>
              <input
                type="text"
                placeholder="METIS"
                className="input input-primary w-1/3 input-lg"
                {...register("price")}
              />
            </div>

            <button
              type="submit"
              // onClick={() => write?.()}
              className="btn btn-primary w-full"
            >
              Post Article
            </button>
          </form>
        </>
      ) : (
        <Hero />
      )}
    </>
  );
};

export default CreatePost;
