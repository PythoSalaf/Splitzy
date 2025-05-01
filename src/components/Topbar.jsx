import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";

const Topbar = () => {
  return (
    <div className="w-[96%] md:w-[95%] mx-auto flex items-center justify-between">
      <Link
        to="/"
        className="block md:hidden text-2xl text-green-900 font-semibold"
      >
        Splitzy
      </Link>
      <div className="hidden md:block">
        <input
          type="text"
          placeholder="Search transactions........."
          className="bg-green-800 text-white h-9 rounded-md px-4"
        />
      </div>
      <div className="flex items-center gap-x-6">
        <div className="bg-green-900 text-white flex items-center justify-center rounded-full w-7 cursor-pointer h-7 md:w-9 md:h-9 ">
          <IoIosNotifications />
        </div>
        <div className="bg-green-900 text-white flex items-center justify-center rounded-full w-7 cursor-pointer h-7 md:w-9 md:h-9">
          <IoPersonSharp />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
