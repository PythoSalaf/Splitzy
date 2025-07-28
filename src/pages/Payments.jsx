import { LuBadgeDollarSign } from "react-icons/lu";
import { groupDatas } from "./../components/Dummy";

const Payments = () => {
  return (
    <div className="w-[96%] md:w-[95%] mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-4 mb-6">
        <div className="bg-green-900 shadow rounded-xl py-4 w-[96%] mx-auto md-w-full">
          <div className="w-[92%] mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-sm md:text-base">
                Total Payments
              </p>
              <div className="bg-white rounded-full h-7 w-7 md:h-8 md:w-8 text-blue-700 flex items-center justify-center">
                <LuBadgeDollarSign />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white my-1">$3000</h3>
            <div className="bg-white py-1 mt-3 rounded-3xl flex items-center px-3 w-fit gap-x-2">
              <span className="text-green-600 text-sm font-semibold">
                +12.5%
              </span>
              <p className="text-gray-500 text-sm font-semibold">last month</p>
            </div>
          </div>
        </div>
        <div className="bg-green-900 shadow rounded-xl py-4 w-[96%] mx-auto md-w-full">
          <div className="w-[92%] mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-sm md:text-base">
                Pending Payment
              </p>
              <div className="bg-white rounded-full h-7 w-7 md:h-8 md:w-8 text-green-700 flex items-center justify-center">
                <LuBadgeDollarSign />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white my-1">$3000.34</h3>
            <div className="bg-white py-1 mt-3 rounded-3xl flex items-center px-3 w-fit gap-x-2">
              <span className="text-red-600 text-sm font-semibold">+12.5%</span>
              <p className="text-gray-500 text-sm font-semibold">last month</p>
            </div>
          </div>
        </div>
        <div className="bg-green-900 shadow rounded-xl py-4 w-[96%] mx-auto md-w-full">
          <div className="w-[92%] mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-sm md:text-base">
                Available Balance
              </p>
              <div className="bg-white rounded-full h-7 w-7 md:h-8 md:w-8 text-yellow-400 flex items-center justify-center">
                <LuBadgeDollarSign />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white my-1">$ 24,900.00</h3>
            <div className="bg-white py-1 mt-3 rounded-3xl flex items-center px-3 w-fit gap-x-2">
              <span className="text-green-600 text-sm font-semibold">
                +8.5%
              </span>
              <p className="text-gray-500 text-sm font-semibold">last month</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3 flex items-center justify-end">
        <button
          // onClick={() => setShowModal(true)}
          className="bg-green-900 hover:bg-green-600 text-white text-base px-3 rounded-md py-1.5"
        >
          Make Payment
        </button>
      </div>
      <div className="bg-green-900 w-full py-4 rounded-xl">
        <div className="bg-white w-[96%] rounded-xl mx-auto py-3">
          <div className="w-[95%] mx-auto">
            <hr className="border-[#dadada]" />
            <div className="my-3 w-full mx-auto">
              <div className="">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-700">
                    <thead>
                      <tr className="border-b border-[#dadada]">
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Description</th>
                        <th className="py-2 px-4">Amount</th>
                        <th className="py-2 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupDatas?.expenses?.map((expense, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-[#dadada] hover:bg-gray-100"
                        >
                          <td className="py-3 px-4 text-sm md:text-base">
                            {expense.date}
                          </td>
                          <td className="py-3 px-4 text-sm md:text-base">
                            {expense.description}
                          </td>
                          <td className="py-3 px-4 text-sm md:text-base">
                            {expense.category}
                          </td>
                          <td className="py-3 px-4 text-sm md:text-base">
                            {expense.paidBy}
                          </td>
                          <td className="py-3 px-4 text-sm md:text-base">
                            ${expense.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
