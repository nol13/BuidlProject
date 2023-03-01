import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

import Image from "next/image";
import logo from "../assets/generic-logo.png";

const Navbar = () => {
  const { isConnected } = useAccount();

  return (
    <div className="navbar flex justify-between p-4 mt-1 ">
      <h1 className="text-xl dark:text-slate-100">Logo</h1>
      <ConnectKitButton />
    </div>
  );
};

export default Navbar;
