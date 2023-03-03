import { ConnectKitProvider } from "connectkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import AuthKit from "../components/authkit";
import Navbar from "../components/navbar";
import "../styles/globals.css";

import { client } from "../wagmi";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider mode="auto">
        <NextHead>
          <title>My wagmi + ConnectKit App</title>
        </NextHead>
        <Navbar />
        {mounted && <Component {...pageProps} />}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
