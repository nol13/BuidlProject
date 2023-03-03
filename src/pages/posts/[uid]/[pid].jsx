<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {useAccount} from "wagmi";
import {Account} from "/src/components/Account";
=======
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Account } from "../../../components/Account";
>>>>>>> postpage

const Post = () => {
  const { isConnected } = useAccount();

<<<<<<< HEAD
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
=======
  const router = useRouter();
  const { uid, pid } = router.query;
  return (
    <div>
      <div>{isConnected && <Account />}</div>
      <div>
        uid: {uid} pid: {pid}
      </div>
>>>>>>> postpage
    </div>
  );
};

export default Post;
<<<<<<< HEAD

=======
>>>>>>> postpage
