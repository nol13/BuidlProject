import axios from "axios";
import { GetServerSideProps } from "next";
import { useAccount } from "wagmi";
import Hero from "../components/Hero";

import PostCollection from "../components/postCollection";
type post = {
  id: string;
  price: number;
  creator: `0x${string}`;
  title: string;
  preview: string;
};

type PostProps = {
  posts: post[];
};

function Page({ posts }: PostProps) {
  console.log(posts);
  const { isConnected } = useAccount();
  return (
    <div className="h-screen ">
      {isConnected ? <PostCollection posts={posts} /> : <Hero />}
    </div>
  );
}

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
  const ids = ["1", "2", "3", "4", "5"];
  console.log(ids);

  const posts = [];
  for (const id of ids) {
    console.log(id);
    const data = await axios.get("http://localhost:3000/api/post", {
      params: { postId: id },
    });
    console.log(data.data);
    let hashPreview = data.data.previewHash;
    console.log(hashPreview);
    let preview;
    try {
      preview = await axios.get("https://arweave.net/" + hashPreview);
      console.log(preview.data);
    } catch (error) {
      preview = {
        data: {
          title: "AAA",
          preview: "BBB",
        },
      };
      console.log(preview.data.title);
    }
    const post = {
      id: id,
      price: data.data.price,
      creator: data.data.creator,
      title: preview.data.title || "No Title",
      preview: preview.data.title || "No Preview",
    };
    console.log(post);
    posts.push(post);
  }
  console.log(posts);
  return {
    props: {
      posts: posts,
    },
  };
};
