// import { useContext, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { MdMenu } from "react-icons/md";
// import { AppContext } from "../context/AppContext";
// import { IoPersonSharp } from "react-icons/io5";

// const Navbar = () => {
//   const { connectWallet, isConnected, account, disconnectWallet } =
//     useContext(AppContext);
//   const [toggle, setToggle] = useState(false);
//   const [sideToggle, setSideToggle] = useState(false);
//   const handleMobileConnect = () => {
//     connectWallet();
//     setSideToggle(!sideToggle);
//   };
//   const handleMobileDisconnect = () => {
//     disconnectWallet();
//     setSideToggle(!sideToggle);
//   };
//   return (
//     <div className="bg-white  shadow fixed py-3 flex items-center w-full">
//       <div className="w-[96%] md:w-[92%] mx-auto flex items-center justify-between">
//         <Link className="text-xl font-semibold md:text-2xl lg:text-3xl text-green-700">
//           Splitzy
//         </Link>
//         <div className="hidden md:flex items-center gap-x-8">
//           <NavLink>Home</NavLink>
//           <NavLink to="/dashboard">Dashboard</NavLink>
//           <NavLink>Home</NavLink>
//           <NavLink>Home</NavLink>
//         </div>
//         <div className="flex relative items-center gap-x-5">
//           {isConnected ? (
//             <div className="relative">
//               <div
//                 className="bg-green-900 text-white flex items-center justify-center rounded-full w-7 cursor-pointer h-7 md:w-9 md:h-9"
//                 onClick={() => setToggle(!toggle)}
//               >
//                 <IoPersonSharp />
//               </div>
//               {toggle && (
//                 <div className="bg-green-900 rounded-2xl shadow z-10 py-4 w-[230px] absolute right-0 top-12">
//                   <div className="w-[94%] mx-auto text-white">
//                     <h3 className="text-center text-lg font-semibold">
//                       {account.slice(0, 6)}......{account.slice(-4)}
//                     </h3>
//                     <div className="w-[70%] mx-auto">
//                       <button
//                         className="w-full mt-2 text-green-900 rounded-lg py-1 cursor-pointer text-lg bg-white"
//                         onClick={disconnectWallet}
//                       >
//                         Disconnect
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <button
//               className="hidden md:block shadow rounded-md transition-all ease-in-out duration-300 hover:scale-95 cursor-pointer  py-1.5 bg-green-800 text-white px-4 text-lg"
//               onClick={connectWallet}
//             >
//               Connect Wallet
//             </button>
//           )}
//           <div
//             className=" md:hidden relative w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center"
//             onClick={() => setSideToggle(!sideToggle)}
//           >
//             <MdMenu className="size-[70%]" />
//           </div>
//         </div>
//         {sideToggle && (
//           <div className="absolute block md:hidden left-0 top-14 py-5 bg-white shadow h-[60vh] w-[50%]">
//             <div className="w-[90%] mx-auto">
//               <div className="flex flex-col">
//                 <Link
//                   to="/"
//                   className="text-green-900 mb-4 text-lg font-semibold"
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   to="/dashboard"
//                   className="text-green-900 mb-4 text-lg font-semibold"
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/groups"
//                   className="text-green-900 mb-4 text-lg font-semibold"
//                 >
//                   Groups
//                 </Link>
//                 <Link
//                   to="/payment"
//                   className="text-green-900 mb-4 text-lg font-semibold"
//                 >
//                   Payment
//                 </Link>
//                 <Link
//                   to="/activity"
//                   className="text-green-900 mb-4 text-lg font-semibold"
//                 >
//                   Activity
//                 </Link>
//               </div>
//               {!isConnected ? (
//                 <div className="w-full mt-5">
//                   <button
//                     className="w-full bg-green-900 text-white rounded-lg py-1 "
//                     onClick={handleMobileConnect}
//                   >
//                     Connect Wallet
//                   </button>
//                 </div>
//               ) : (
//                 <div className="w-full mt-5">
//                   <button
//                     className="w-full bg-green-900 text-white rounded-lg py-1 "
//                     onClick={handleMobileDisconnect}
//                   >
//                     Disconnect Wallet
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { IoPersonSharp } from "react-icons/io5";

const Navbar = () => {
  const { account, isConnected, disconnectWallet } = useContext(AppContext);
  const [toggle, setToggle] = useState(false);
  const [sideToggle, setSideToggle] = useState(false);

  const handleMobileDisconnect = () => {
    disconnectWallet();
    setSideToggle(!sideToggle);
  };

  return (
    <div className="bg-white shadow fixed py-3 flex items-center w-full">
      <div className="w-[96%] md:w-[92%] mx-auto flex items-center justify-between">
        <Link className="text-xl font-semibold md:text-2xl lg:text-3xl text-green-700">
          Splitzy
        </Link>
        <div className="hidden md:flex items-center gap-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/groups">Groups</NavLink>
          <NavLink to="/payments">Payments</NavLink>
        </div>
        <div className="flex relative items-center gap-x-5">
          {isConnected ? (
            <div className="relative">
              <div
                className="bg-green-900 text-white flex items-center justify-center rounded-full w-7 cursor-pointer h-7 md:w-9 md:h-9"
                onClick={() => setToggle(!toggle)}
              >
                <IoPersonSharp />
              </div>
              {toggle && (
                <div className="bg-green-900 rounded-2xl shadow z-10 py-4 w-[230px] absolute right-0 top-12">
                  <div className="w-[94%] mx-auto text-white">
                    <h3 className="text-center text-lg font-semibold">
                      {account?.slice(0, 6)}......{account?.slice(-4)}
                    </h3>
                    <div className="w-[70%] mx-auto">
                      <button
                        className="w-full mt-2 text-green-900 rounded-lg py-1 cursor-pointer text-lg bg-white"
                        onClick={disconnectWallet}
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <appkit-button
              label="Connect Wallet"
              class="hidden md:block transition-all ease-in-out duration-300 hover:scale-95 cursor-pointer  text-white px-4 text-lg"
            />
          )}
          <div
            className="md:hidden relative w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center"
            onClick={() => setSideToggle(!sideToggle)}
          >
            <MdMenu className="size-[70%]" />
          </div>
        </div>
        {sideToggle && (
          <div className="absolute block md:hidden left-0 top-14 py-5 bg-white shadow h-[60vh] w-[50%]">
            <div className="w-[90%] mx-auto">
              <div className="flex flex-col">
                <Link
                  to="/"
                  className="text-green-900 mb-4 text-lg font-semibold"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className="text-green-900 mb-4 text-lg font-semibold"
                >
                  Dashboard
                </Link>
                <Link
                  to="/groups"
                  className="text-green-900 mb-4 text-lg font-semibold"
                >
                  Groups
                </Link>
                <Link
                  to="/payments"
                  className="text-green-900 mb-4 text-lg font-semibold"
                >
                  Payments
                </Link>
                <Link
                  to="/activity"
                  className="text-green-900 mb-4 text-lg font-semibold"
                >
                  Activity
                </Link>
              </div>
              {isConnected ? (
                <div className="w-full mt-5">
                  <button
                    className="w-full bg-green-900 text-white rounded-lg py-1"
                    onClick={handleMobileDisconnect}
                  >
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                <div className="w-full mt-5">
                  <appkit-button
                    label="Connect Wallet"
                    class="w-full bg-green-900 text-white rounded-lg py-1"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
