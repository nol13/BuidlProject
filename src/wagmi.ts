import { getDefaultClient } from "connectkit";
import { createClient } from "wagmi";
import {
  mainnet,
  polygon,
  // metis,
  // metisGoerli,
  // arbitrum,
  // optimism,
  polygonMumbai,
} from "wagmi/chains";

const chains = [mainnet, polygon, polygonMumbai];

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: "My wagmi + ConnectKit App",
    chains,
  })
);
