import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdDashboard, MdHistory } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { ImCoinDollar } from "react-icons/im";
import { GrSettingsOption } from "react-icons/gr";
import { PiWalletFill } from "react-icons/pi";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const { account, disconnectWallet } = useContext(AppContext);

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}.......${address.slice(-4)}`;
  };

  const active =
    "bg-green-800 mb-3 text-white rounded-md flex text-lg py-1 font-semibold items-center gap-x-3 px-2";
  const inactive =
    " mb-3 hover:bg-green-500 text-green-800 text-lg rounded-md flex py-1 font-semibold items-center gap-x-3 px-2";
  return (
    <div className="w-[90%] mx-auto py-3 h-screen ">
      <Link
        to="/"
        className="text-green-800 italic md:text-2xl font-semibold lg:text-3xl"
      >
        Splitzy
      </Link>
      <div className="mt-8 flex flex-col ">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${isActive ? active : inactive}`}
        >
          <MdDashboard className="size-5" />
          Dashboard
        </NavLink>
        <NavLink
          to="/groups"
          className={({ isActive }) => `${isActive ? active : inactive}`}
        >
          <FaUserGroup className="size-6" />
          Groups
        </NavLink>
        <NavLink
          to="/payments"
          className={({ isActive }) => `${isActive ? active : inactive}`}
        >
          <ImCoinDollar className="size-6" />
          Payment
        </NavLink>
        <NavLink
          to="/activity"
          className={({ isActive }) => `${isActive ? active : inactive}`}
        >
          <MdHistory className="size-6" />
          Activity
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => `${isActive ? active : inactive}`}
        >
          <GrSettingsOption className="size-6" />
          Setting
        </NavLink>
      </div>
      <div className="mt-40 flex items-center gap-x-2">
        <div className="flex items-center bg-green-900 text-white justify-center rounded-full w-8 h-8">
          <PiWalletFill className="size-[69%]" />
        </div>
        <div className="">
          <h4 className="text-base text-gray-600 font-semibold">
            Connected Wallet
          </h4>
          <p className="text-sm text-gray-600 font-semibold">
            {truncateAddress(account)}
          </p>
        </div>
      </div>
      <div className="w-full mx-auto mt-7">
        <button
          className="bg-green-900 hover:bg-green-600 text-white font-semibold w-full py-1 rounded-md cursor-pointer"
          onClick={disconnectWallet}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
