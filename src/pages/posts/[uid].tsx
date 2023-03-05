import React, { useRef } from "react";
import { useRouter } from "next/router";
import UserAvatar from "../../components/userAvatar";
import PostModal from "../../components/postModal";
import { HandThumbUpIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import axios from "axios";

import { useScroll, motion } from "framer-motion";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type PostProps = {
  post: {
    price: number;
    creator: `0x${string}`;
    contentHash: string;
    previewHash: string;
  };
};

const UserPosts = ({ post }: PostProps) => {
  const router = useRouter();
  const { scrollYProgress } = useScroll();

  const { uid } = router.query;
  return (
    <div className="flex justify-start">
      <motion.div
        className=" z-50 fixed -inset-0
        h-1
        bg-red-400 dark:bg-red-900 rounded-full"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="container flex flex-col gap-4 m-auto max-w-prose card">
        <div className="card-body">
          <div className="card-actions mt-10 items-center justify-between mb-4">
            <UserAvatar address={post.creator} />
            <div className="buttons flex gap-4 items-end ">
              <label className="swap">
                <input type="checkbox" />
                <HandThumbUpIcon className="h-6 w-6 text-gray-500 swap-off" />
                <HandThumbUpIconSolid className="h-6 w-6 text-gray-500 swap-on" />
              </label>
            </div>
          </div>
          <h2 className="card-title m-auto pb-4">Article Title</h2>
          <p>{post.contentHash}</p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const id = params?.uid;
  console.log(id);
  const post = await axios.get("http://localhost:3000/api/post", {
    params: { postId: id },
  });
  console.log(post.data);

  return {
    props: {
      post: post.data,
    },
  };
};
export default UserPosts;
