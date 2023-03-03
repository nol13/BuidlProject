import { useState } from 'react';
import Navbar from "../components/navbar";
import { useAccount } from "wagmi";
import { connected } from "process";
import Hero from "../components/Hero";
import { useForm, SubmitHandler } from "react-hook-form";
import { DefaultEditor } from "react-simple-wysiwyg";

import prettyBytes from 'pretty-bytes';
import Script from 'next/script';
//@ts-ignore
import LitJsSdk from 'lit-js-sdk';

type Inputs = {
  title: string;
  articleText: string;
  excerpt: string;
  price: number;
};

const CreatePost = () => {

  const [JWK, setJWK] = useState<object>();
  const [arweaveAddress, setArweaveAddress] = useState(null);

  const [currency, setCurrency] = useState('arweave');
  const [node, setNode] = useState("http://node1.bundlr.network");

  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [txId, setTxId] = useState(null);

  // -- lit states
  const [accessControlConditions, setAccessControlConditiosn] = useState(null);
  const [humanised, setHumanised] = useState(null);
  const [encryptedData, setEncryptedData] = useState(null);
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState(null);
  const [downloadedEncryptedData, setDownloadedEncryptedData] = useState(null);
  const [decryptedData, setDecryptedData] = useState(null);

  // -- init litNodeClient
  const litNodeClient = new LitJsSdk.LitNodeClient();
  litNodeClient.connect();


  const { isConnected } = useAccount();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onClickEncryptImage = async (data: object) => {

    const fileString = JSON.stringify(data);

    console.log("fileInBase64:", fileString);
    
    const chain = 'ethereum';

    const authSig = await LitJsSdk.checkAndSignAuthMessage({chain})

    // Visit here to understand how to encrypt static content
    // https://developer.litprotocol.com/docs/LitTools/JSSDK/staticContent
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(fileString);
    
    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
      accessControlConditions: accessControlConditions.accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    });
    
    console.log("encryptedString:", encryptedString);

    const encryptedStringInDataURI = await blobToDataURI(encryptedString);

    console.log("encryptedStringInDataURI:", encryptedStringInDataURI);

    setEncryptedData(encryptedStringInDataURI);

    setEncryptedSymmetricKey(encryptedSymmetricKey);
    
  }

  const onFetchEncryptedData = async () => {
    
    const downloadUrl = 'https://arweave.net/' + txId;

    const data = await fetch(downloadUrl);

    const encryptedData = JSON.parse(await data.text());

    console.log("encryptedData:", encryptedData);

    setDownloadedEncryptedData(encryptedData);

  }

  // 
  // (LIT) Decrypt downloaded encrypted data
  // @return { void }
  // 
  const onDecryptDownloadedData = async () => {

    const authSig = await LitJsSdk.checkAndSignAuthMessage({chain: 'ethereum'})

    const symmetricKey = await litNodeClient.getEncryptionKey({
      accessControlConditions: downloadedEncryptedData.accessControlConditions,
      // Note, below we convert the encryptedSymmetricKey from a UInt8Array to a hex string.  This is because we obtained the encryptedSymmetricKey from "saveEncryptionKey" which returns a UInt8Array.  But the getEncryptionKey method expects a hex string.
      toDecrypt: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"),
      chain: 'ethereum',
      authSig,
    });

    const decryptedString = await LitJsSdk.decryptString(
      dataURItoBlob(downloadedEncryptedData.encryptedData),
      symmetricKey
    );

    const originalFormat = atob(decryptedString);

    console.log("Original Format:", originalFormat);

    setDecryptedData(originalFormat);

  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    // encrypt data hete

    let _JWK = data
    console.log("JWK:", _JWK);

    setJWK(_JWK);

    // arweave will be dealth from backend
    const res = await fetch('./api/arweave', {
      method: 'POST',
      body: JSON.stringify({
        currency,
        node,
        jwk: _JWK,
      })
    });

    const _arweaveAddress = (await res.json()).address;

    setArweaveAddress(_arweaveAddress);
  
  };

  return (
    <>
      <Navbar />
      {isConnected ? (
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
