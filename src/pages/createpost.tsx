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
      //   console.log("pj from .then", pj);
      //   console.log("data from .then", data);
      setContentHash(pj.content);
      //   console.log("contentHash", contentHash);
      setPreviewHash(pj.preview);
      //   console.log("previewHash", previewHash);
    });
  };

  const { config } = usePrepareContractWrite({
    address: "0x9159574681A238230C233a93BA6249593dd9788e",
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
    address: "0x9159574681A238230C233a93BA6249593dd9788e",
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
          value: "1000000000000", // 0.000001 ETH
        },
      },
    ];

    /* const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
      accessControlConditions: accessControlConditions.accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    }); */

    //console.log("encryptedString:", encryptedString);

    //     const chain = "ethereum";

    //     const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });

    //     // Visit here to understand how to encrypt static content
    //     // https://developer.litprotocol.com/docs/LitTools/JSSDK/staticContent
    //     const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
    //       fileString
    //     );

    //     const accessControlConditions: any = {};

    //     const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
    //       accessControlConditions: accessControlConditions.accessControlConditions,
    //       symmetricKey,
    //       authSig,
    //       chain,
    //     });

    //     console.log("encryptedString:", encryptedString);

    //     const encryptedStringInDataURI: any = await blobToDataURI(encryptedString);

    //     console.log("encryptedStringInDataURI:", encryptedStringInDataURI);

    //     setEncryptedData(encryptedStringInDataURI);

    //     setEncryptedSymmetricKey(encryptedSymmetricKey);
  };

  //   const onFetchEncryptedData = async () => {
  //     const downloadUrl = "https://arweave.net/" + txId;

  //     const data = await fetch(downloadUrl);

  //     const encryptedData = JSON.parse(await data.text());

  //     console.log("encryptedData:", encryptedData);

  //     setDownloadedEncryptedData(encryptedData);
  //   };

  //
  // (LIT) Decrypt downloaded encrypted data
  // @return { void }
  //
  //   const onDecryptDownloadedData = async (downloadedEncryptedData: any) => {

  //     const authSig = await LitJsSdk.checkAndSignAuthMessage({chain: 'ethereum'})

  //     const symmetricKey = await litNodeClient.getEncryptionKey({
  //       accessControlConditions: downloadedEncryptedData.accessControlConditions,
  //       // Note, below we convert the encryptedSymmetricKey from a UInt8Array to a hex string.  This is because we obtained the encryptedSymmetricKey from "saveEncryptionKey" which returns a UInt8Array.  But the getEncryptionKey method expects a hex string.
  //       toDecrypt: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"),
  //       chain: 'ethereum',
  //       authSig,
  //     });

  //     const decryptedString = await LitJsSdk.decryptString(
  //       dataURItoBlob(downloadedEncryptedData.encryptedData),
  //       symmetricKey
  //     );

  //     const originalFormat = atob(decryptedString);

  //     console.log("Original Format:", originalFormat);

  //     setDecryptedData(originalFormat);

  //   }

  //   const onSubmit: SubmitHandler<Inputs> = async (data) => {

  //     // encrypt data hete

  //     let _JWK = data
  //     console.log("JWK:", _JWK);

  //     setJWK(_JWK);

  //     // arweave will be dealth from backend
  //     const res = await fetch('./api/arweave', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         currency,
  //         node,
  //         jwk: _JWK,
  //       })
  //     });

  //     const _arweaveAddress = (await res.json()).address;

  //     setArweaveAddress(_arweaveAddress);

  //   };

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
              onClick={() => write?.()}
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
