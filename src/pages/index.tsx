import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Hero from "../components/Hero";

import Navbar from "../components/navbar";
import Post from "../components/post";

function Page() {
  const { isConnected } = useAccount();
  return (
    <>
      <Navbar />
      {isConnected ? <Post /> : <Hero />}
    </>
  );
}

export default Page;
