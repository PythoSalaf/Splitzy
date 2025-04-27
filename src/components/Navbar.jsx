import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="bg-white shadow fixed py-3 flex items-center w-full">
      <div className="w-[96%] md:w-[92%] mx-auto flex items-center justify-between">
        <Link className="">Splitzy</Link>
        <div className="hidden md:flex items-center gap-x-8">
          <NavLink>Home</NavLink>
          <NavLink>Home</NavLink>
          <NavLink>Home</NavLink>
          <NavLink>Home</NavLink>
        </div>
        <div className="flex items-center gap-x-5">
          <button className="hidden md:block shadow rounded-md transition-all ease-in-out duration-300 hover:scale-95 cursor-pointer  py-1.5 bg-green-800 text-white px-4 text-lg">
            Connect Wallet
          </button>
          <div className=" md:hidden  w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center">
            <MdMenu className="size-[70%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
