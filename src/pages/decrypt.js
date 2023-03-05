
import LitJsSdk from "lit-js-sdk";
import { useEffect, useRef, useState } from "react";


const litSDK = new LitJsSdk.LitNodeClient();
litSDK.connect();



const DPage = () => {
    const litRef = useRef()
    const [s, setS] = useState();

    useEffect(() => {
        if (litRef.current) return;
        const litSDK = new LitJsSdk.LitNodeClient();
        litSDK.connect();
        litRef.current = litSDK

        const dec = async () => {
            setTimeout(async () => {

            
                const decrypted64 = 'data:application/octet-stream;base64,hPwX+Go0DRsz6HaYmlv2io3nAhfoL/JnwPYHc4WqCJc=';

                const base64Response = await fetch(decrypted64);

                const myBlob = await base64Response.blob();


                const symmetricKey = await litRef.current.getEncryptionKey({
                    accessControlConditions,
                    toDecrypt: "58700c72e794465b6882676b4726108728d717e8c645d6d4350230336c63d2aceaf577b7626f6a85069d66785d2e7b0ae22f4a871d0226ac7e93467a5b2aa1f97ede1297ed79f5d67bbfdf7624522d39230a6ebe0bebdfe98c3d29629b7006a0178b7884bc3df7c2a883b1f5ddbfa9a224ec5303b2b7023c29ed54fb8b10e26b00000000000000209b45a957a15db446f862707a6baabfce86f7d09679dea86b07df1a8fda637b9bddc861726c33362297c67414073b1db9",
                    chain: 'mumbai',
                    authSig,
                });

                const decryptedString = await LitJsSdk.decryptString(
                    myBlob,
                    symmetricKey
                );

                console.log(12, s)

                setS(decryptedString);


            }, 1000)
        }
        dec()
    }, [])

    const accessControlConditions = [
        {
            contractAddress: '',
            standardContractType: '',
            chain: 'mumbai',
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

    return <div>{s}</div>



}

export default DPage;