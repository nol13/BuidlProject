import { useState } from 'react';
import Navbar from "../components/navbar";
import { useAccount, useSignMessage } from "wagmi";
import { connected } from "process";
import Hero from "../components/Hero";
import { useForm, SubmitHandler } from "react-hook-form";
import { DefaultEditor } from "react-simple-wysiwyg";

import prettyBytes from 'pretty-bytes';
import Script from 'next/script';
//@ts-ignore
import LitJsSdk from 'lit-js-sdk';
import { FileReadResult } from 'fs/promises';

type Inputs = {
  title: string;
  articleText: string;
  excerpt: string;
  price: number;
};

const chain ="ethereum";

const contract = require('../contractInfo/contract-addressBdl.json').Simple;

const accessControlConditions: any = [
  {
    contractAddress: contract,
    standardContractType: "",
    chain,
    method: "eth_getBalance",
    parameters: ["postId", ":userAddress", "latest"],
    returnValueTest: {
      comparator: "==",
      value: "true", // 0.000001 ETH
    },
  },
];


  //
  // (Helper) Turn blob data to data URI
  // @param { Blob } blob
  // @return { Promise<String> } blob data in data URI
  //
  const blobToDataURI = (blob: Blob) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = (e: any) => {
        var data = e.target.result;
        resolve(data);
        };
        reader.readAsDataURL(blob);
    });
  }


  //
  // (Helper) Convert data URI to blob
  // @param { String } dataURI
  // @return { Blob } blob object
  //
  const dataURItoBlob = (dataURI: string) => {

    console.log(dataURI);

    
    var byteString = window.atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    
    var blob = new Blob([ab], {type: mimeString});

    return blob;
  }

const CreatePost = () => {

  const [txId, setTxId] = useState(null);

  const [encryptedData, setEncryptedData] = useState(null);
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState(null);
  const [downloadedEncryptedData, setDownloadedEncryptedData] = useState(null);
  const [decryptedData, setDecryptedData] = useState<string>();

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: 'gm wagmi frens',
    onSuccess: (data) => {
      console.log(data)
    }
  })

  const litNodeClient = new LitJsSdk.LitNodeClient({
    litNetwork: "ethereum",
  });
  litNodeClient.connect();


  const { isConnected } = useAccount();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const decryptContent = async (downloadedEncryptedData: any) => {

    const authSig = await LitJsSdk.checkAndSignAuthMessage({chain})
    return;

    const symmetricKey = await litNodeClient.getEncryptionKey({
      accessControlConditions: downloadedEncryptedData.accessControlConditions,
      // Note, below we convert the encryptedSymmetricKey from a UInt8Array to a hex string.  This is because we obtained the encryptedSymmetricKey from "saveEncryptionKey" which returns a UInt8Array.  But the getEncryptionKey method expects a hex string.
      toDecrypt: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"),
      chain,
      authSig,
    });

    const decryptedString = await LitJsSdk.decryptString(
      dataURItoBlob(downloadedEncryptedData.encryptedData),
      symmetricKey
    );

    console.log(decryptedString);

  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    // encrypt data here

    console.log(0, data);
    //return;

    //const authSig = await LitJsSdk.checkAndSignAuthMessage({chain: "ethereum"})
    signMessage()
    console.log(1)
    return;ß

    // Visit here to understand how to encrypt static content
    // https://developer.litprotocol.com/docs/LitTools/JSSDK/staticContent
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString("fsdfdsfdsfdsf");
    console.log(2)

    

    console.log("encrypted: ", encryptedString);
    
    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    });
  
  };

  return (
    <>
      <Navbar />
      {isConnected || true ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-6 max-w-prose mx-auto"
        >
          <p className="text-4xl">Submit your article</p>
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
          <DefaultEditor className="w-full" />

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

          <button type="submit" className="btn btn-primary w-full">
            Post Article
          </button>
        </form>
      ) : (
        <Hero />
      )}
    </>
  );
};

export default CreatePost;
