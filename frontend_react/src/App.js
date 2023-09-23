import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import {
  mainnet,
  polygonZkEvm,
  polygonZkEvmTestnet,
  scrollSepolia,
  scrollTestnet,
  base,
  baseGoerli,
} from "wagmi/chains";

import Navbar from "./components/Navbar";

// 1. Get projectId
const projectId = "a26caad8394a8fae6c1736b62643efd9";

// 2. Create wagmiConfig
const chains = [
  mainnet,
  polygonZkEvm,
  polygonZkEvmTestnet,
  scrollSepolia,
  scrollTestnet,
  base,
  baseGoerli,
];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "Web3Modal",
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Navbar />
      <div>Hello World</div>
    </WagmiConfig>
  );
}
