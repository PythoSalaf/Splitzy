import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { BrowserProvider, ethers } from "ethers";
import { toast } from "react-toastify";
const CELO_CHAIN_ID = "0xaef3";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ---------------- WALLET CONNECT ----------------
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // ------------------ WALLET LOGIC --------------------
  const connectWallet = async () => {
    if (!window.ethereum) return toast.error("Please install MetaMask.");

    try {
      const browserProvider = new BrowserProvider(window.ethereum);
      await browserProvider.send("eth_requestAccounts", []);
      const signer = await browserProvider.getSigner();
      const address = await signer.getAddress();
      const chain = await browserProvider.send("eth_chainId", []);

      setProvider(browserProvider);
      setSigner(signer);
      setAccount(address);
      setChainId(chain);
      setIsConnected(true);

      toast.success("Wallet Connected");

      if (chain !== CELO_CHAIN_ID) {
        await switchToCeloNetwork();
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
    setIsConnected(false);
    toast.info("Wallet disconnected");
  };

  const switchToCeloNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CELO_CHAIN_ID }],
      });
      toast.success("Switched to Celo Testnet");
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: CELO_CHAIN_ID,
                chainName: "Celo Alfajores Testnet",
                nativeCurrency: {
                  name: "CELO",
                  symbol: "CELO",
                  decimals: 18,
                },
                rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
                blockExplorerUrls: ["https://alfajores.celoscan.io"],
              },
            ],
          });
          toast.success("Celo Alfajores Testnet added and selected");
        } catch (addError) {
          console.error("Failed to add Celo Testnet:", addError);
        }
      } else {
        console.error("Failed to switch to Celo Testnet:", switchError);
        toast.error("Failed to switch to Celo testnet");
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        // -------------- WALLET RELATED ------------------
        account,
        isConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
