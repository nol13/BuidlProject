import { getDefaultClient } from "connectkit";
import { createClient } from "wagmi";
import {
  mainnet,
  polygon,
  metis,
  metisGoerli,
  arbitrum,
  optimism,
} from "wagmi/chains";

const chains = [mainnet, polygon, metisGoerli, metis, arbitrum, optimism];

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: "My wagmi + ConnectKit App",
    chains,
  })
);
