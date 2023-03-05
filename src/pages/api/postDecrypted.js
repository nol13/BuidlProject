import Simple from "../../contractInfo/contract-addressBdl.json";
import Web3 from "web3";
import axios from "axios";
import LitJsSdk from "lit-js-sdk";
import {Blob} from 'node:buffer';

const chain = "mumbai"

function b64toBlob(dataURI) {

    //return Buffer.from("H2gmAteQletDqRQqUMZ+N92H+ucVOXXRzqGtNzfIjBM=", "base64");
    
    var byteString = atob(dataURI);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'application/octet-stream' });

}

const litSDK = new LitJsSdk.LitNodeClient();
  litSDK.connect();

export default async function handler(req, res) {
  //const postId = req.query.postId;
  console.log('ppp')
  const contractAbi = require("../../contractInfo/Simple.json");
  const web3 = new Web3(
    `https://polygon-mumbai.g.alchemy.com/v2/KgZ9A1HFGOW4ylY9V2R1Pras_Xx6jseJ`
  );
  const contract = new web3.eth.Contract(contractAbi.abi, Simple.Simple);

  

  // create a Web3 instance

  //const posts = await contract.methods.posts(8).call();

 

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
  ];

  const authSig = {
    "sig": "0x5322d8c8cbfc654e9461ecd3ca101a4f55cede22324c90cb0076538a2fe782cd20706f5abf58d678daee701f7e5ce183e73f37985006815907031513b7c768521b",
    "derivedVia": "web3.eth.personal.sign",
    "signedMessage": "localhost:3000 wants you to sign in with your Ethereum account:\n0x6f3c67DA2827aaE123d1379939E2E7294d62C06B\n\n\nURI: http://localhost:3000\nVersion: 1\nChain ID: 80001\nNonce: M4bD84RbTz8TD9VyA\nIssued At: 2023-03-05T08:02:30.254Z",
    "address": "0x6f3c67da2827aae123d1379939e2e7294d62c06b"
}



  const decrypted64 = "MQ1jImwxXBx7L…O/NaIvP7LID1wuuhVWIdPrQpZPZg65GDKDegDTSX+xH+6Aw=="

  const blobContent = await b64toBlob(decrypted64);

  const symmetricKey = await litSDK.current.getEncryptionKey({
    accessControlConditions,
    toDecrypt: "58700c72e794465b6882676b4726108728d717e8c645d6d4350230336c63d2aceaf577b7626f6a85069d66785d2e7b0ae22f4a871d0226ac7e93467a5b2aa1f97ede1297ed79f5d67bbfdf7624522d39230a6ebe0bebdfe98c3d29629b7006a0178b7884bc3df7c2a883b1f5ddbfa9a224ec5303b2b7023c29ed54fb8b10e26b00000000000000209b45a957a15db446f862707a6baabfce86f7d09679dea86b07df1a8fda637b9bddc861726c33362297c67414073b1db9",
    chain: 'mumbai',
    authSig,
  });

  const decryptedString = await LitJsSdk.decryptString(
    b64toBlob(decrypted64),
    symmetricKey
  );




  res.status(200).json(decryptedString);
}