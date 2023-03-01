import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Hero from "../components/Hero";

import Navbar from "../components/navbar";
import Post from "../components/post";
import PostCollection from "../components/postCollection";

function Page() {
  const { isConnected } = useAccount();
  return (
    <>
      <Navbar />
      {isConnected ? <PostCollection /> : <Hero />}
    </>
  );
}

export default Page;
