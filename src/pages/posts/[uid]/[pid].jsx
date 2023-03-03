import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {useAccount} from "wagmi";
import {Account} from "/src/components/Account";

const Post = () => {
    const { isConnected } = useAccount();

    const router = useRouter();
    const { uid, pid } = router.query;
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            
            const posts = await fetch('/api/post', { method: "POST"});
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
    </div>

    )
};

export default Post;

