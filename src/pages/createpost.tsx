import { useState } from "react";
import { useAccount } from "wagmi";
import { connected } from "process";
import Hero from "../components/Hero";
import { useForm, SubmitHandler } from "react-hook-form";
// import { DefaultEditor } from "react-simple-wysiwyg";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
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

//
// (Helper) Turn blob data to data URI
// @param { Blob } blob
// @return { Promise<String> } blob data in data URI
//
// const blobToDataURI = (blob: Blob) => {
//   return new Promise((resolve, reject) => {
//     var reader = new FileReader();

//     reader.onload = (e: any) => {
//       var data = e.target.result;
//       resolve(data);
//     };
//     reader.readAsDataURL(blob);
//   });
// };

//
// (Helper) Convert data URI to blob
// @param { String } dataURI
// @return { Blob } blob object
//
// const dataURItoBlob = (dataURI: string) => {
//   console.log(dataURI);

//   var byteString = window.atob(dataURI.split(",")[1]);
//   var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
//   var ab = new ArrayBuffer(byteString.length);
//   var ia = new Uint8Array(ab);
//   for (var i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }

//   var blob = new Blob([ab], { type: mimeString });

//   return blob;
// };

const CreatePost = () => {
  const [JWK, setJWK] = useState<object>();
  const [arweaveAddress, setArweaveAddress] = useState(null);

  const [currency, setCurrency] = useState("arweave");
  const [node, setNode] = useState("http://node1.bundlr.network");

  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [txId, setTxId] = useState(null);

  // -- lit states
  const [accessControlConditions, setAccessControlConditiosn] = useState();
  const [humanised, setHumanised] = useState(null);
  const [encryptedData, setEncryptedData] = useState(null);
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState(null);
  const [downloadedEncryptedData, setDownloadedEncryptedData] = useState(null);
  const [decryptedData, setDecryptedData] = useState<string>();
  const [contentHash, setContentHash] = useState("");
  const [previewHash, setPreviewHash] = useState("");

  // -- init litNodeClient
  const litNodeClient = new LitJsSdk.LitNodeClient();
  litNodeClient.connect();

  const { isConnected } = useAccount();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data.articleText", data.articleText);

    const hashes = await fetch("/api/savePost", {
      method: "POST",
      body: JSON.stringify({
        preview: JSON.stringify({ title: data.title, preview: data.excerpt }),
        encryptedContent: data.articleText,
      }),
    });
    hashes.json().then((pj) => {
      console.log("pj from .then", pj);
      console.log("data from .then", data);
      setContentHash(pj.content);
      console.log("contentHash", contentHash);
      setPreviewHash(pj.preview);
      //   console.log("previewHash", previewHash);
    });
  };

  const { config } = usePrepareContractWrite({
    address: "0x9881EcCf30816f6723486e0C032cba53c3708071",
    abi: abi,
    functionName: "createPost",
    args: [contentHash, previewHash, getValues("price")],
  });

  const {
    data: dataRead,
    isError,
    isLoading: isLoadingRead,
    isSuccess: isSuccessRead,
  } = useContractRead({
    address: "0x9881EcCf30816f6723486e0C032cba53c3708071",
    abi: abi,
    functionName: "createPost",
  });

  const {
    data: datawrite,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite(config);

  const onClickEncryptImage = async (data: object) => {
    const fileString = JSON.stringify(data);

    const accessControlConditions: any = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "ethereum",
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "0", // 0.000001 ETH
        },
      },
    ];
  };

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
<<<<<<< HEAD
                placeholder="MATIC"
=======
                placeholder="Matic"
>>>>>>> da87f2ec456ddd1bd1b15a3acb81ffefe314e1a9
                className="input input-primary w-1/3 input-lg"
                {...register("price")}
              />
            </div>
            {isLoading ? (
              <button
                type="submit"
                onClick={() => write?.()}
                className="btn btn-primary w-full"
              >
                <div className="flex items-center space-x-1">
                  <p>Posting Article</p>
                  <div>
                    <svg
                      className="animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      width="21px"
                      height="21px"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        opacity="0.2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        fill="#000000"
                      />
                      <path
                        d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                        fill="#000000"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ) : (
              <button
                type="submit"
                onClick={() => write?.()}
                className="btn btn-primary w-full"
              >
                <div></div>
                Post Article
              </button>
            )}
          </form>
        </>
      ) : (
        <Hero />
      )}
    </>
  );
};

export default CreatePost;
