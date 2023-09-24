import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Admin from "./Admin";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import {
  mainnet,
  goerli,
  polygonZkEvm,
  polygonZkEvmTestnet,
  scrollSepolia,
  scrollTestnet,
  base,
  baseGoerli,
} from "wagmi/chains";

import { useAccount, useContract, useBalance } from "wagmi";

// 1. Get projectId
const projectId = "a26caad8394a8fae6c1736b62643efd9";

// 2. Create wagmiConfig
const chains = [
  mainnet,
  goerli,
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
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  defaultChain: polygonZkEvmTestnet,
});

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </WagmiConfig>
  );
}
