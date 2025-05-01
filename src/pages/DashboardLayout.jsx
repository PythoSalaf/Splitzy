import { Outlet } from "react-router-dom";
import { Sidebar, Topbar } from "../components";

const DashboardLayout = () => {
  return (
    <div className="flex items-start w-full">
      <div className="bg-white h-screen fixed shadow hidden md:block md:w-[15%]">
        <Sidebar />
      </div>
      <div className="w-full md:w-[85%]  ml-auto">
        <div className="sticky top-0 bg-white py-3 w-full shadow">
          <Topbar />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
