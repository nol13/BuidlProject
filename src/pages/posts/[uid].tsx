
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//import Simple from '../../contractInfo/contract-addressBdl.json'
//import Web3 from "web3";
//import { AbiItem } from 'web3-utils';
//import { InferGetServerSidePropsType } from 'next'
//import { GetServerSideProps } from 'next'

const contractAbi = require("../../contractInfo/Simple.json");

// create a Web3 instance
//const web3 = new Web3(`https://polygon-mumbai.g.alchemy.com/v2/KgZ9A1HFGOW4ylY9V2R1Pras_Xx6jseJ`);

/* web3.eth.defaultAccount = web3.eth.accounts[0];
personal.unlockAccount(web3.eth.defaultAccount)
contractObj = web3.eth.contract(contractABI).at(contractAddr) */


//console.log(1111111111, web3.eth.accounts, 222)

// create a contract instance
//const contract = new web3.eth.Contract(contractAbi.abi, Simple.Simple);

// get the value of the mapping variable


type Posts = {
    uid: string
}

const UserPosts: React.FC<Posts> = () => {
    const router = useRouter();
    const { uid } = router.query;
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            
            const posts = await fetch('/api/accountPosts', { method: "POST"});
            console.log(posts); 
            setPosts(await posts.json());
        };
        getPosts();
    }, [uid])

    return (
        <div>
            <div>uid: {uid} </div>
            <div>P: {posts?.length}</div>
        </div>
    )
};

export default UserPosts;