import { Web3Modal } from "@web3modal/react";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import Navbar from "../components/navbar";
import "../styles/globals.css";

import { ethereumClient, wagmiClient } from "../wagmi";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <NextHead>
          <title>My wagmi + ConnectKit App</title>
        </NextHead>
        <Navbar />
        {mounted && <Component {...pageProps} />}
      </WagmiConfig>
      <Web3Modal
        ethereumClient={ethereumClient}
        projectId={"e8c4e39ccd42a55fb4be58940ce0b600"}
        defaultChain={polygonMumbai}
        enableNetworkView={true}
        themeMode={"dark"}
        themeColor={"blue"}
        themeBackground={"themeColor"}
      />
    </>
  );
}

export default App;
