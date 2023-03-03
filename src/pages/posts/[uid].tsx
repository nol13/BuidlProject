
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Simple as simpleAddy } from '../../contractInfo/contract-addressBdl.json'
import Web3 from "web3";
import { AbiItem } from 'web3-utils';

const contractAbi = require("../../contractInfo/Simple.json");

// create a Web3 instance
const web3 = new Web3(`https://polygon-mumbai.g.alchemy.com/v2/KgZ9A1HFGOW4ylY9V2R1Pras_Xx6jseJ`);


console.log(1111111111, process.env.MUMBAI_KEY, 222)

// create a contract instance
const contract = new web3.eth.Contract(contractAbi.abi, simpleAddy);

// get the value of the mapping variable


type Posts = {
    uid: string
}

const UserPosts: React.FC<Posts> = () => {
    const router = useRouter();
    const { uid } = router.query;
    const [posts, setPosts] = useState()

    useEffect(() => {
        const getPosts = async () => {
            console.log(456);
            console.log(Object.keys(contract.methods))
            const posts = await contract.methods.postsCreatedArray(uid, 0).call();
            console.log(posts); 
            setPosts(posts);
        };
        getPosts();
    }, [uid])

    return (
        <div>
            <div>uid: {uid} </div>
            <p>{posts}</p>
        </div>
    )
};

export default UserPosts;