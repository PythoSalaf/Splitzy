// import { createContext, useState, useCallback } from "react";
// import { BrowserProvider, ethers } from "ethers";
// import { toast } from "react-toastify";
// const CELO_CHAIN_ID = "0xaef3";

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   // ---------------- WALLET CONNECT ----------------
//   const [account, setAccount] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [chainId, setChainId] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   // ---------------- BACKEND STATE ----------------
//   const [groups, setGroups] = useState([]);
//   const [group, setGroup] = useState(null);

//   // ------------------ WALLET LOGIC --------------------
//   const connectWallet = async () => {
//     if (!window.ethereum) return toast.error("Please install MetaMask.");

//     try {
//       const browserProvider = new BrowserProvider(window.ethereum);
//       await browserProvider.send("eth_requestAccounts", []);
//       const signer = await browserProvider.getSigner();
//       const address = await signer.getAddress();
//       const chain = await browserProvider.send("eth_chainId", []);

//       setProvider(browserProvider);
//       setSigner(signer);
//       setAccount(address);
//       setChainId(chain);
//       setIsConnected(true);

//       toast.success("Wallet Connected");

//       if (chain !== CELO_CHAIN_ID) {
//         await switchToCeloNetwork();
//       }
//     } catch (error) {
//       console.error("Wallet connection error:", error);
//     }
//   };

//   const disconnectWallet = () => {
//     setAccount(null);
//     setProvider(null);
//     setSigner(null);
//     setChainId(null);
//     setIsConnected(false);
//     toast.info("Wallet disconnected");
//   };

//   const switchToCeloNetwork = async () => {
//     try {
//       await window.ethereum.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: CELO_CHAIN_ID }],
//       });
//       toast.success("Switched to Celo Testnet");
//     } catch (switchError) {
//       if (switchError.code === 4902) {
//         try {
//           await window.ethereum.request({
//             method: "wallet_addEthereumChain",
//             params: [
//               {
//                 chainId: CELO_CHAIN_ID,
//                 chainName: "Celo Alfajores Testnet",
//                 nativeCurrency: {
//                   name: "CELO",
//                   symbol: "CELO",
//                   decimals: 18,
//                 },
//                 rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
//                 blockExplorerUrls: ["https://alfajores.celoscan.io"],
//               },
//             ],
//           });
//           toast.success("Celo Alfajores Testnet added and selected");
//         } catch (addError) {
//           console.error("Failed to add Celo Testnet:", addError);
//         }
//       } else {
//         console.error("Failed to switch to Celo Testnet:", switchError);
//         toast.error("Failed to switch to Celo testnet");
//       }
//     }
//   };

//   // ---------------------- BACKEND LOGIC --------------------------

//   const fetchUserGroups = useCallback(async () => {
//     if (!account) {
//       console.warn("No account connected, skipping fetchUserGroups");
//       return [];
//     }
//     try {
//       const res = await fetch(
//         `https://splitzy-backend.onrender.com/groups?address=${account}`
//       );
//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.error || "Failed to fetch groups");
//       }
//       if (!Array.isArray(data)) {
//         console.error("Fetch group error: Response is not an array", data);
//         toast.error("Invalid group data received");
//         return [];
//       }
//       console.log("Fetched groups:", data);
//       const createdGroups = data.filter(
//         (group) => group.creator?.toLowerCase() === account?.toLowerCase()
//       );
//       if (createdGroups.length > 0) {
//         console.log("Groups created by user", account, ":", createdGroups);
//       }
//       setGroups(data);
//       return data;
//     } catch (error) {
//       console.error("Fetch group error:", error);
//       toast.error(`Failed to fetch groups: ${error.message}`);
//       return [];
//     }
//   }, [account, setGroups]);

//   const fetchGroupDetail = useCallback(
//     async (groupId) => {
//       if (!account) {
//         console.warn("No account connected, skipping fetchGroupDetail");
//         return null;
//       }
//       try {
//         const res = await fetch(
//           `https://splitzy-backend.onrender.com/groups/${groupId}`
//         );
//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error(data.error || "Failed to fetch group details");
//         }
//         console.log("Fetched group details for groupId", groupId, ":", data);
//         if (data.creator?.toLowerCase() === account?.toLowerCase()) {
//           console.log("Group created by user", account, ":", data);
//         }
//         setGroup(data);
//         return data;
//       } catch (error) {
//         console.error("Fetch group detail error:", error);
//         toast.error(`Failed to fetch group details: ${error.message}`);
//         return null;
//       }
//     },
//     [account, setGroup]
//   );

//   const createGroup = useCallback(
//     async (name, members) => {
//       try {
//         if (typeof name !== "string" || !name.trim()) {
//           throw new Error("Group name must be a non-empty string");
//         }
//         if (
//           !Array.isArray(members) ||
//           members.length === 0 ||
//           members.some((addr) => !ethers.isAddress(addr))
//         ) {
//           throw new Error(
//             "Members must be an array of valid Ethereum addresses"
//           );
//         }
//         console.log("Creating group with payload:", {
//           name: name.trim(),
//           members: members.map((addr) => addr.toLowerCase()),
//         });
//         const res = await fetch("https://splitzy-backend.onrender.com/groups", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             name: name.trim(),
//             members: members.map((addr) => addr.toLowerCase()),
//           }),
//         });
//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error(data.error || "Failed to create group");
//         }
//         toast.success("Group created successfully");
//         const updatedGroups = await fetchUserGroups();
//         setGroups(updatedGroups);
//         return data;
//       } catch (err) {
//         console.error("Create group error:", err);
//         toast.error(`Failed to create group: ${err.message}`);
//         throw err;
//       }
//     },
//     [fetchUserGroups, setGroups]
//   );

//   const createBill = useCallback(
//     async (billData) => {
//       try {
//         if (!account) {
//           throw new Error("No wallet connected");
//         }
//         // Validate billData
//         if (
//           !billData.groupId ||
//           typeof billData.groupId !== "string" ||
//           !/^\d+$/.test(billData.groupId)
//         ) {
//           throw new Error("Group ID must be a non-empty numeric string");
//         }
//         if (
//           !billData.title ||
//           typeof billData.title !== "string" ||
//           !billData.title.trim()
//         ) {
//           throw new Error("Title must be a non-empty string");
//         }
//         if (
//           !billData.totalAmount ||
//           isNaN(parseFloat(billData.totalAmount)) ||
//           parseFloat(billData.totalAmount) <= 0
//         ) {
//           throw new Error("Total amount must be a positive number");
//         }
//         if (
//           !Array.isArray(billData.payees) ||
//           billData.payees.length === 0 ||
//           billData.payees.some((addr) => !ethers.isAddress(addr))
//         ) {
//           throw new Error(
//             "Payees must be an array of valid Ethereum addresses"
//           );
//         }
//         if (
//           !Array.isArray(billData.amounts) ||
//           billData.amounts.length !== billData.payees.length ||
//           billData.amounts.some(
//             (amount) => isNaN(parseFloat(amount)) || parseFloat(amount) < 0
//           )
//         ) {
//           throw new Error(
//             "Amounts must be an array of non-negative numbers matching payees length"
//           );
//         }
//         const totalAmount = parseFloat(billData.totalAmount);
//         const sumAmounts = billData.amounts.reduce(
//           (sum, amount) => sum + parseFloat(amount),
//           0
//         );
//         if (Math.abs(totalAmount - sumAmounts) > 0.0001) {
//           throw new Error("Sum of amounts must equal total amount");
//         }
//         // Convert amounts to Wei for contract compatibility
//         const weiTotalAmount = ethers.parseUnits(totalAmount.toString(), 18);
//         const weiAmounts = billData.amounts.map((amount) =>
//           ethers.parseUnits(parseFloat(amount).toString(), 18)
//         );
//         const normalizedBillData = {
//           groupId: billData.groupId,
//           title: billData.title.trim(),
//           totalAmount: weiTotalAmount.toString(),
//           payees: billData.payees.map((addr) => addr.toLowerCase()),
//           amounts: weiAmounts.map((amount) => amount.toString()),
//         };
//         console.log("Creating bill with payload:", normalizedBillData);
//         const res = await fetch(
//           "https://splitzy-backend.onrender.com/groups/bill",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(normalizedBillData),
//           }
//         );
//         const data = await res.json();
//         if (!res.ok) {
//           console.error("Create bill response:", {
//             status: res.status,
//             statusText: res.statusText,
//             data,
//           });
//           throw new Error(
//             data.error || `Failed to add expense (Status: ${res.status})`
//           );
//         }
//         const updatedGroup = await fetchGroupDetail(billData.groupId);
//         setGroup(updatedGroup);
//         return data;
//       } catch (error) {
//         console.error("Add expense error:", error);
//         toast.error(`Failed to add expense: ${error.message}`);
//         throw error;
//       }
//     },
//     [account, fetchGroupDetail, setGroup]
//   );

//   const payBill = useCallback(
//     async (paymentData) => {
//       try {
//         if (!account) {
//           throw new Error("No wallet connected");
//         }
//         console.log("Paying bill with payload:", paymentData);
//         const res = await fetch(
//           "https://splitzy-backend.onrender.com/groups/pay",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(paymentData),
//           }
//         );
//         const data = await res.json();
//         if (!res.ok) {
//           console.error("Pay bill response:", data);
//           throw new Error(data.error || "Failed to pay bill");
//         }
//         toast.success("Bill paid successfully");
//         if (paymentData.groupId) {
//           const updatedGroup = await fetchGroupDetail(paymentData.groupId);
//           setGroup(updatedGroup);
//         }
//         return data;
//       } catch (err) {
//         console.error("Pay bill error:", err);
//         toast.error(`Failed to pay bill: ${err.message}`);
//         throw err;
//       }
//     },
//     [account, fetchGroupDetail, setGroup]
//   );

//   const fetchUserBills = useCallback(async () => {
//     if (!account) {
//       console.warn("No account connected, skipping fetchUserBills");
//       return [];
//     }
//     try {
//       const res = await fetch(
//         `https://splitzy-backend.onrender.com/bills/${account}`
//       );
//       const data = await res.json();
//       if (!res.ok) {
//         console.error("Fetch user bills response:", data);
//         throw new Error(data.error || "Failed to fetch user bills");
//       }
//       console.log("Fetched user bills:", data);
//       return data;
//     } catch (error) {
//       console.error("Fetch user bills error:", error);
//       toast.error(`Failed to fetch your bills: ${error.message}`);
//       return [];
//     }
//   }, [account]);

//   const fetchBillDetails = useCallback(async (billId) => {
//     try {
//       const res = await fetch(
//         `https://splitzy-backend.onrender.com/bills/${billId}`
//       );
//       const data = await res.json();
//       if (!res.ok) {
//         console.error("Fetch bill details response:", data);
//         throw new Error(data.error || "Failed to fetch bill details");
//       }
//       console.log("Fetched bill details for billId", billId, ":", data);
//       return data;
//     } catch (error) {
//       console.error("Fetch bill detail error:", error);
//       toast.error(`Failed to fetch bill details: ${error.message}`);
//       return null;
//     }
//   }, []);

//   const fetchUserOwnedAmount = useCallback(
//     async (billId) => {
//       if (!account) {
//         console.warn("No account connected, skipping fetchUserOwnedAmount");
//         return null;
//       }
//       try {
//         const res = await fetch(
//           `https://splitzy-backend.onrender.com/bills/${billId}/amount/${account}`
//         );
//         const data = await res.json();
//         if (!res.ok) {
//           console.error("Fetch user owed amount response:", data);
//           throw new Error(data.error || "Failed to fetch user amount");
//         }
//         console.log("Fetched user owed amount for billId", billId, ":", data);
//         return data;
//       } catch (error) {
//         console.error("Fetch user owed amount error:", error);
//         toast.error(`Failed to fetch what you owe: ${error.message}`);
//         return null;
//       }
//     },
//     [account]
//   );

//   return (
//     <AppContext.Provider
//       value={{
//         // -------------- WALLET RELATED ------------------
//         account,
//         isConnected,
//         connectWallet,
//         disconnectWallet,
//         // ---------------- BACKEND RELATED ------------------
//         createGroup,
//         fetchUserGroups,
//         fetchGroupDetail,
//         payBill,
//         createBill,
//         fetchUserBills,
//         fetchBillDetails,
//         fetchUserOwnedAmount,
//         groups,
//         setGroups,
//         group,
//         setGroup,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// src/context/AppContext.jsx
import { createContext, useState, useCallback, useEffect } from "react";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { toast } from "react-toastify";
import { isAddress } from "viem";
import { celoAlfajores } from "../wagmiConfig";
import { useAppKit } from "@reown/appkit/react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { open } = useAppKit();
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    if (isConnected && chainId && chainId !== celoAlfajores.id) {
      switchChain({ chainId: celoAlfajores.id })
        .then(() => toast.success("Switched to Celo Testnet"))
        .catch((error) => {
          console.error("Chain switch error:", error);
          toast.error("Failed to switch to Celo Testnet");
        });
    }
  }, [isConnected, chainId, switchChain]);

  const connectWallet = async () => {
    try {
      await open();
    } catch (error) {
      console.error("Wallet connection error:", error);
      toast.error("Failed to connect wallet");
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setGroups([]);
    setGroup(null);
    toast.info("Wallet disconnected");
  };

  // Backend logic
  const fetchUserGroups = useCallback(async () => {
    if (!address) {
      console.warn("No account connected, skipping fetchUserGroups");
      return [];
    }
    try {
      const res = await fetch(
        `https://splitzy-backend.onrender.com/groups?address=${address}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to fetch groups (Status: ${res.status})`
        );
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error("Fetch group error: Response is not an array", data);
        toast.error("Invalid group data received");
        return [];
      }
      console.log("Fetched groups:", data);
      setGroups(data);
      return data;
    } catch (error) {
      console.error("Fetch group error:", error);
      toast.error(`Failed to fetch groups: ${error.message}`);
      return [];
    }
  }, [address]);

  const fetchGroupDetail = useCallback(
    async (groupId) => {
      if (!address) {
        console.warn("No account connected, skipping fetchGroupDetail");
        return null;
      }
      try {
        const res = await fetch(
          `https://splitzy-backend.onrender.com/groups/${groupId}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `Failed to fetch group details (Status: ${res.status})`
          );
        }
        const data = await res.json();
        console.log("Fetched group details for groupId", groupId, ":", data);
        setGroup(data);
        return data;
      } catch (error) {
        console.error("Fetch group detail error:", error);
        toast.error(`Failed to fetch group details: ${error.message}`);
        return null;
      }
    },
    [address, setGroup]
  );

  const createGroup = useCallback(
    async (name, members) => {
      try {
        if (typeof name !== "string" || !name.trim()) {
          throw new Error("Group name must be a non-empty string");
        }
        if (
          !Array.isArray(members) ||
          members.length === 0 ||
          members.some((addr) => !isAddress(addr))
        ) {
          throw new Error(
            "Members must be an array of valid Ethereum addresses"
          );
        }
        const payload = {
          name: name.trim(),
          members: members.map((addr) => addr.toLowerCase()),
        };
        console.log("Creating group with payload:", payload);
        const res = await fetch("https://splitzy-backend.onrender.com/groups", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.error || `Failed to create group (Status: ${res.status})`
          );
        }
        const data = await res.json();
        toast.success("Group created successfully");
        await fetchUserGroups();
        return data;
      } catch (err) {
        console.error("Create group error:", err);
        toast.error(`Failed to create group: ${err.message}`);
        throw err;
      }
    },
    [fetchUserGroups, setGroups]
  );

  const createBill = useCallback(
    async (billData) => {
      try {
        if (!address) {
          throw new Error("No wallet connected");
        }
        if (
          !billData.groupId ||
          typeof billData.groupId !== "string" ||
          !/^\d+$/.test(billData.groupId)
        ) {
          throw new Error("Group ID must be a non-empty numeric string");
        }
        if (
          !billData.title ||
          typeof billData.title !== "string" ||
          !billData.title.trim()
        ) {
          throw new Error("Title must be a non-empty string");
        }
        if (
          !billData.totalAmount ||
          isNaN(parseFloat(billData.totalAmount)) ||
          parseFloat(billData.totalAmount) <= 0
        ) {
          throw new Error("Total amount must be a positive number");
        }
        if (
          !Array.isArray(billData.payees) ||
          billData.payees.length === 0 ||
          billData.payees.some((addr) => !isAddress(addr))
        ) {
          throw new Error(
            "Payees must be an array of valid Ethereum addresses"
          );
        }
        if (
          !Array.isArray(billData.amounts) ||
          billData.amounts.length !== billData.payees.length ||
          billData.amounts.some(
            (amount) => isNaN(parseFloat(amount)) || parseFloat(amount) < 0
          )
        ) {
          throw new Error(
            "Amounts must be an array of non-negative numbers matching payees length"
          );
        }
        const totalAmount = parseFloat(billData.totalAmount);
        const sumAmounts = billData.amounts.reduce(
          (sum, amount) => sum + parseFloat(amount),
          0
        );
        if (Math.abs(totalAmount - sumAmounts) > 0.0001) {
          throw new Error("Sum of amounts must equal total amount");
        }
        const payload = {
          groupId: billData.groupId,
          title: billData.title.trim(),
          totalAmount: totalAmount.toString(),
          payees: billData.payees.map((addr) => addr.toLowerCase()),
          amounts: billData.amounts.map((amount) =>
            parseFloat(amount).toString()
          ),
        };
        console.log("Creating bill with payload:", payload);
        const res = await fetch(
          "https://splitzy-backend.onrender.com/groups/bill",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.error || `Failed to add expense (Status: ${res.status})`
          );
        }
        const data = await res.json();
        await fetchGroupDetail(billData.groupId);
        toast.success("Expenses Added Successfully");
        return data;
      } catch (error) {
        console.error("Add expense error:", error);
        toast.error(`Failed to add expense: ${error.message}`);
        throw error;
      }
    },
    [address, fetchGroupDetail, setGroup]
  );

  const payBill = useCallback(
    async (paymentData) => {
      try {
        if (!address) {
          throw new Error("No wallet connected");
        }
        console.log("Paying bill with payload:", paymentData);
        const res = await fetch(
          "https://splitzy-backend.onrender.com/groups/pay",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentData),
          }
        );
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.error || `Failed to pay bill (Status: ${res.status})`
          );
        }
        const data = await res.json();
        if (paymentData.groupId) {
          await fetchGroupDetail(paymentData.groupId);
        }
        toast.success("Bill paid successfully");
        return data;
      } catch (err) {
        console.error("Pay bill error:", err);
        toast.error(`Failed to pay bill: ${err.message}`);
        throw err;
      }
    },
    [address, fetchGroupDetail, setGroup]
  );

  const fetchUserBills = useCallback(async () => {
    if (!address) {
      console.warn("No account connected, skipping fetchUserBills");
      return [];
    }
    try {
      const res = await fetch(
        `https://splitzy-backend.onrender.com/bills/${address}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Failed to fetch user bills (Status: ${res.status})`
        );
      }
      const data = await res.json();
      console.log("Fetched user bills:", data);
      return data;
    } catch (error) {
      console.error("Fetch user bills error:", error);
      toast.error(`Failed to fetch your bills: ${error.message}`);
      return [];
    }
  }, [address]);

  const fetchBillDetails = useCallback(async (billId) => {
    try {
      const res = await fetch(
        `https://splitzy-backend.onrender.com/bills/${billId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Failed to fetch bill details (Status: ${res.status})`
        );
      }
      const data = await res.json();
      console.log("Fetched bill details for billId", billId, ":", data);
      return data;
    } catch (error) {
      console.error("Fetch bill detail error:", error);
      toast.error(`Failed to fetch bill details: ${error.message}`);
      return null;
    }
  }, []);

  const fetchUserOwnedAmount = useCallback(
    async (billId) => {
      if (!address) {
        console.warn("No account connected, skipping fetchUserOwnedAmount");
        return null;
      }
      try {
        const res = await fetch(
          `https://splitzy-backend.onrender.com/bills/${billId}/amount/${address}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `Failed to fetch user amount (Status: ${res.status})`
          );
        }
        const data = await res.json();
        console.log("Fetched user owed amount for billId", billId, ":", data);
        return data;
      } catch (error) {
        console.error("Fetch user owed amount error:", error);
        toast.error(`Failed to fetch what you owe: ${error.message}`);
        return null;
      }
    },
    [address]
  );

  return (
    <AppContext.Provider
      value={{
        account: address,
        isConnected,
        connectWallet,
        disconnectWallet,
        createGroup,
        fetchUserGroups,
        fetchGroupDetail,
        payBill,
        createBill,
        fetchUserBills,
        fetchBillDetails,
        fetchUserOwnedAmount,
        groups,
        setGroups,
        group,
        setGroup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
