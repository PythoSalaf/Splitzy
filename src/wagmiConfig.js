// src/wagmiConfig.js
import { http, createConfig } from "wagmi";
import { walletConnect, injected, coinbaseWallet } from "wagmi/connectors";
import { defineChain } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// Define Celo Alfajores Testnet
export const celoAlfajores = defineChain({
  id: 44787,
  name: "Celo Alfajores Testnet",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
  rpcUrls: { default: { http: ["https://alfajores-forno.celo-testnet.org"] } },
  blockExplorers: {
    default: { name: "CeloScan", url: "https://alfajores.celoscan.io" },
  },
  chainNamespace: "eip155",
  caipNetworkId: "eip155:44787",
});

export const projectId = import.meta.env.VITE_PROJECT_ID;

export const wagmiAdapter = new WagmiAdapter({
  networks: [celoAlfajores],
  projectId,
});

export const config = createConfig({
  chains: [celoAlfajores],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: "Splitzy" }),
  ],
  transports: {
    [celoAlfajores.id]: http("https://alfajores-forno.celo-testnet.org"),
  },
});
