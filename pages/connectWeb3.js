import { createClient } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains"; 
import { getDefaultClient } from "connectkit";

export const infuraId = "fd5b403aff06415b9c6286b87ccf0da1";
const chains = [mainnet, polygon, optimism, arbitrum];

export const client = createClient(
  getDefaultClient({
    appName: "hello-wallet",
    infuraId,
    chains,
  })
);