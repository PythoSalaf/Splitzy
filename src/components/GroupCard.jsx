const GroupCard = () => {
  return (
    <div className="w-[90%] md:w-full mx-auto py-3 bg-green-900 rounded-xl">
      <div className="w-[92%] mx-auto">
        <div className="flex items-center gap-x-3">
          <div className="bg-white w-7 h-7 md:w-11 md:h-11 rounded-full"></div>
          <div className="">
            <h3 className="font-semibold text-white">Roommates</h3>
            <p className="text-gray-300">4 members</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-white mt-5">
          <h4 className="">Total Expenses</h4>
          <h4>$1,247.00</h4>
        </div>
        <div className="flex items-center justify-between text-white mt-3">
          <h4 className="">Your Balance</h4>
          <h4>$164.00</h4>
        </div>
        <div className="mt-6 flex items-center ">
          <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-white">
            <h3 className="text-base font-semibold uppercase">Jb</h3>
          </div>
          <div className="w-9 h-9 rounded-full bg-amber-700 flex items-center justify-center text-white">
            <h3 className="text-base font-semibold uppercase">TA</h3>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <h3 className="text-base font-semibold uppercase">mt</h3>
          </div>
        </div>
        <div className="pb-2 pt-6 flex items-center justify-between">
          <button className="cursor-pointer">View Details</button>
          <button className="cursor-pointer">Add Expenses</button>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
