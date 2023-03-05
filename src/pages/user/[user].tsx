import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import avatarimg from "../../assets/avatarimg.jpeg";
import Post from "../../components/post";
import axios from "axios";

type post = {
  id: string;
  price: number;
  creator: `${string}`;
  title: string;
  preview: string;
};

type PostProps = {
  posts: post[];
};

export default function User({ posts }: PostProps) {
  console.log(posts);
  return (
    <div className="container flex flex-col gap-4 m-auto card">
      <div className="stats shadow mx-auto">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <Image src={avatarimg} alt=" avatar image" />
              </div>
            </div>
          </div>
          <div className="stat-title">made</div>
          <div className="stat-value">4.337 ETH</div>
          <div className="stat-desc ">revenue</div>
        </div>
      </div>
      <div className="container flex flex-col gap-4 m-auto max-w-prose">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const user = params?.user;

  const res = await axios.get("http://localhost:3000/api/accountPosts", {
    params: { user },
  });

  const posts = [];
  for (const id of res.data) {
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
    posts.push(post);
  }
  console.log(posts);
  return {
    props: {
      posts: posts,
    },
  };
};
