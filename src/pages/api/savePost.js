import Bundlr from '@bundlr-network/client';
import { statSync } from "fs";

export default async function handler(req, res) {

    const data = JSON.parse(req.body);
    console.log(data);

    const bundlr = new Bundlr("https://devnet.bundlr.network", "matic", process.env.PRIVATE_KEY, { providerUrl: "https://rpc-mumbai.maticvigil.com" });
    await bundlr.ready();
    //console.log(`wallet address = ${bundlr.address}`, process.env.MUMBAI_KEY);

    //const dataSizeToCheck = 104860600;
    //const price1MBAtomic = await bundlr.getPrice(dataSizeToCheck);
    //let atomicBalance = await bundlr.getLoadedBalance();
    //console.log(1313311, atomicBalance)
    //let response = await bundlr.fund(price1MBAtomic);

    //const bundlr = new Bundlr(data.node, data.currency, data.jwk);

    const tx = bundlr.createTransaction("egegegegege")

    // sign the transaction
    await tx.sign()

    const id = tx.id
    
    // upload the transaction
    //const result = await tx.upload();
    
    console.log("result:", tx.id);

    res.status(200).json({ txId: id });
  
    //res.status(200).json({ address: bundlr.address });
    
  }