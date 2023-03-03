import { useAccount } from "wagmi";
import Hero from "../components/Hero";

import PostCollection from "../components/postCollection";

function Page() {
  const { isConnected } = useAccount();
  return (
    <div className="h-screen ">
      {isConnected ? <PostCollection /> : <Hero />}
    </div>
  );
}

export default Page;
