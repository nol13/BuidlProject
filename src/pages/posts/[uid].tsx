<<<<<<< HEAD

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
=======
import React from "react";
import { useRouter } from "next/router";
import UserAvatar from "../../components/userAvatar";
import PostModal from "../../components/postModal";
import { HandThumbUpIcon, ShareIcon } from "@heroicons/react/24/outline";

type Posts = {
  uid: number;
};
const UserPosts: React.FC<Posts> = () => {
  const router = useRouter();
  const { uid } = router.query;
  return (
    <div className="container flex flex-col gap-4 m-auto max-w-prose card">
      <div className="card-body">
        <div className="card-actions mt-10 items-center justify-between mb-4">
          <UserAvatar />
          <div className="buttons flex gap-4 items-end ">
            <HandThumbUpIcon className="h-6 w-6 text-gray-500" />
            <ShareIcon className="h-6 w-6 text-gray-500" />
          </div>
        </div>
        <h2 className="card-title m-auto">Article Title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean et
          tortor at risus. Iaculis eu non diam phasellus vestibulum lorem sed.
          Eget est lorem ipsum dolor sit amet consectetur adipiscing. Diam in
          arcu cursus euismod quis viverra nibh cras pulvinar. Nulla facilisi
          etiam dignissim diam quis enim lobortis. Libero enim sed faucibus
          turpis in eu mi bibendum. Volutpat diam ut venenatis tellus. Elementum
          facilisis leo vel fringilla. Neque viverra justo nec ultrices dui
          sapien eget. Lorem sed risus ultricies tristique. Cursus sit amet
          dictum sit amet justo donec. In metus vulputate eu scelerisque. Et
          magnis dis parturient montes nascetur ridiculus mus mauris. Cras
          semper auctor neque vitae tempus quam pellentesque nec nam. Vel
          pretium lectus quam id leo in vitae turpis. Lorem dolor sed viverra
          ipsum nunc aliquet bibendum enim facilisis. Malesuada fames ac turpis
          egestas maecenas pharetra. Fames ac turpis egestas maecenas pharetra
          convallis. Neque aliquam vestibulum morbi blandit cursus risus at
          ultrices. Sed enim ut sem viverra. Magna etiam tempor orci eu
          lobortis. Ut etiam sit amet nisl purus in mollis. Dis parturient
          montes nascetur ridiculus mus. Cursus mattis molestie a iaculis at
          erat pellentesque adipiscing. Ut venenatis tellus in metus vulputate
          eu. Id leo in vitae turpis massa sed elementum tempus egestas. Proin
          libero nunc consequat interdum varius sit. Orci a scelerisque purus
          semper eget duis at. In mollis nunc sed id semper risus in hendrerit.
          Congue mauris rhoncus aenean vel elit. Ut placerat orci nulla
          pellentesque dignissim enim sit amet. Suscipit tellus mauris a diam
          maecenas sed. Metus vulputate eu scelerisque felis imperdiet proin
          fermentum. Elit at imperdiet dui accumsan sit. Elementum nibh tellus
          molestie nunc non blandit massa. Eu non diam phasellus vestibulum
          lorem. Quam quisque id diam vel quam elementum pulvinar etiam. A
          iaculis at erat pellentesque adipiscing commodo elit at imperdiet.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus
          vitae. Sit amet mattis vulputate enim. Ultrices eros in cursus turpis
          massa tincidunt. Vitae proin sagittis nisl rhoncus mattis rhoncus
          urna. Aliquam ultrices sagittis orci a scelerisque purus semper eget
          duis. Feugiat scelerisque varius morbi enim nunc faucibus a
          pellentesque. Turpis nunc eget lorem dolor. Cras fermentum odio eu
          feugiat pretium nibh ipsum. At auctor urna nunc id cursus metus
          aliquam eleifend mi. Non consectetur a erat nam at lectus urna duis. A
          arcu cursus vitae congue mauris rhoncus aenean. Dis parturient montes
          nascetur ridiculus mus. Cursus in hac habitasse platea dictumst.
          Adipiscing elit ut aliquam purus. Justo donec enim diam vulputate ut
          pharetra sit amet. Morbi tristique senectus et netus et. Vulputate
          odio ut enim blandit volutpat maecenas volutpat. Et netus et malesuada
          fames ac turpis. Ac auctor augue mauris augue. Leo vel fringilla est
          ullamcorper. Nisl nisi scelerisque eu ultrices. In egestas erat
          imperdiet sed. Fermentum odio eu feugiat pretium nibh ipsum consequat
          nisl. Porttitor massa id neque aliquam vestibulum. Nibh tortor id
          aliquet lectus proin nibh nisl condimentum id.
        </p>
      </div>
    </div>
  );
>>>>>>> postpage
};

export default UserPosts;
