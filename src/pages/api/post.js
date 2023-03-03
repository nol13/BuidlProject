import Simple from '../../contractInfo/contract-addressBdl.json'
import Web3 from "web3";
import { AbiItem } from 'web3-utils';


export default async function handler(req, res) {

    const contractAbi = require("../../contractInfo/Simple.json");
    const web3 = new Web3(`https://polygon-mumbai.g.alchemy.com/v2/KgZ9A1HFGOW4ylY9V2R1Pras_Xx6jseJ`);
    const contract = new web3.eth.Contract(contractAbi.abi, Simple.Simple);

// create a Web3 instance
    
    const posts = await contract.methods.posts(1).call();

    res.status(200).json(posts);
    
  }