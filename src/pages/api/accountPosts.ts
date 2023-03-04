import Simple from "../../contractInfo/contract-addressBdl.json";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.query.user as string;
  console.log(user);
  const contractAbi = require("../../contractInfo/Simple.json");
  const web3 = new Web3(
    `https://polygon-mumbai.g.alchemy.com/v2/KgZ9A1HFGOW4ylY9V2R1Pras_Xx6jseJ`
  );
  const contract = new web3.eth.Contract(contractAbi.abi, Simple.Simple);

  // create a Web3 instance

  const posts = await contract.methods
    .postsByAddress("0xdF6c6eE5EBd58c7755e11e99B6c5eFA241d6737a")
    .call();
  console.log(posts);
  res.status(200).json(posts);
}
