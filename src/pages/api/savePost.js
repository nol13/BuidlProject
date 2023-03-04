import Bundlr from "@bundlr-network/client";
import { statSync } from "fs";

export default async function handler(req, res) {
  const data = JSON.parse(req.body);
  //console.log(typeof data.preview, typeof data.string);
  //res.status(200).json({ preview: "id1", content: "id2" });
  //return;
  const preview = data.preview;
  const encryptedContent = data.encryptedContent;

  const bundlr = new Bundlr(
    "https://devnet.bundlr.network",
    "matic",
    process.env.PRIVATE_KEY,
    { providerUrl: "https://rpc-mumbai.maticvigil.com" }
  );
  await bundlr.ready();
  console.log(`wallet address = ${bundlr.address}`, process.env.MUMBAI_KEY);

  const dataSizeToCheck = 104860600;
  const price1MBAtomic = await bundlr.getPrice(dataSizeToCheck);
  let atomicBalance = await bundlr.getLoadedBalance();
  console.log(1313311, atomicBalance);
  let response = await bundlr.fund(price1MBAtomic);

  // const bundlr = new Bundlr(data.node, data.currency, data.jwk);

  const savePreview = async () => {
    const tx1 = bundlr.createTransaction(preview);
    await tx1.sign();
    await tx1.upload();
    return tx1.id;
  };

  const saveContent = async () => {
    const tx2 = bundlr.createTransaction(encryptedContent);

    await tx2.sign();
    await tx2.upload();
    return tx2.id;
  };

  const [id1, id2] = await Promise.all([savePreview(), saveContent()]);

  console.log("result:", id1, id2);

  res.status(200).json({ preview: id1, content: id2 });
}
