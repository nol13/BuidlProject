import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Account } from "../../../components/Account";
import { useState, useEffect } from 'react'

const Post = () => {
    const { isConnected } = useAccount();

    const router = useRouter();
    const { uid, pid } = router.query;
    const [posts, setPosts] = useState([])
    const [bundleID, setBundleId] = useState([])



    useEffect(() => {
        const getPosts = async () => {

            const contractAbi = require("../../contractInfo/Simple.json");
            const web3 = new Web3(
                `https://polygon-mumbai.g.alchemy.com/v2/KgZ9A1HFGOW4ylY9V2R1Pras_Xx6jseJ`
            );
            const contract = new web3.eth.Contract(contractAbi.abi, Simple.Simple);

            const posts = await contract.methods.posts(postId).call();

            //const posts = await fetch('/api/post', { method: "POST" });
            const pj = await posts.json();
            console.log(pj)
            setPosts(pj);
        };
        getPosts();
    }, [uid])


    return (
        <div>
            <div>{isConnected && <Account />}</div>
            <div>uid: {uid} pid: {pid}</div>

            <div>uid: {uid} pid: {pid}</div>
        </div>
    );
};

export default Post;