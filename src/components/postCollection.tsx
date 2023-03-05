import axios from "axios";
import { GetServerSideProps } from "next";
import Post from "./post";
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

export default function PostCollection({ posts }: PostProps) {

  return (
    <div className="container flex flex-col m-auto gap-4 max-w-prose">
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
}
