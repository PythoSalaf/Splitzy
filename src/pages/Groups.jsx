import { GroupCard } from "../components";

const Groups = () => {
  return (
    <div className="w-[96%] md:w-[95%] mx-auto py-4">
      <div className="flex items-start  flex-col md:flex-row gap-3 justify-between">
        <div className=" flex items-center gap-x-6">
          <button className="bg-green-900 text-white rounded-lg text-sm md:text-base py-1.5 px-3">
            All Groups
          </button>
          <button className="bg-white border border-green-900 text-green-900 py-1.5 px-3 rounded-lg text-sm md:text-base">
            Active
          </button>
          <button className="bg-white border border-green-900 text-green-900 py-1.5 px-3 rounded-lg text-sm md:text-base">
            Archived
          </button>
        </div>
        <div className="">
          <button className="bg-green-900 text-white rounded-lg text-sm md:text-base py-1.5 px-3">
            New Group
          </button>
        </div>
      </div>
      <div className="mt-5 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <GroupCard />
        <GroupCard />
        <GroupCard />
        <GroupCard />
      </div>
    </div>
  );
};

export default Groups;
