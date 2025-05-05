import { useState } from "react";
import { useParams } from "react-router-dom";

import { LuBadgeDollarSign } from "react-icons/lu";
import { groupDatas } from "./../components/Dummy";
import AddExpenses from "./AddExpenses";
const GroupDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("expenses");
  const [showModal, setShowModal] = useState(false);
  const group = groupDatas.find((g) => g.id === Number(id));
  console.log("Groups", group);

  return (
    <div className="w-[96%] md:w-[95%] mx-auto py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-4 mb-6">
        <div className="bg-green-900 shadow rounded-xl py-4 w-[96%] mx-auto md-w-full">
          <div className="w-[92%] mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-sm md:text-base">
                Total Expenses
              </p>
              <div className="bg-white rounded-full h-7 w-7 md:h-8 md:w-8 text-blue-700 flex items-center justify-center">
                <LuBadgeDollarSign />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white my-1">
              ${group?.totalExpenses}
            </h3>
          </div>
        </div>
        <div className="bg-green-900 shadow rounded-xl py-4 w-[96%] mx-auto md-w-full">
          <div className="w-[92%] mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-sm md:text-base">
                Your Balance
              </p>
              <div className="bg-white rounded-full h-7 w-7 md:h-8 md:w-8 text-green-700 flex items-center justify-center">
                <LuBadgeDollarSign />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white my-1">$3000.34</h3>
          </div>
        </div>
        <div className="bg-green-900 shadow rounded-xl py-4 w-[96%] mx-auto md-w-full">
          <div className="w-[92%] mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-sm md:text-base">
                Group Members
              </p>
              <div className="bg-white rounded-full h-7 w-7 md:h-8 md:w-8 text-yellow-400 flex items-center justify-center">
                <LuBadgeDollarSign />
              </div>
            </div>
            <h3 className="text-xl font-bold text-yellow-400 my-1">
              9 members
            </h3>
          </div>
        </div>
      </div>
      <div className="my-3 flex items-center justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-900 hover:bg-green-600 text-white text-base px-3 rounded-md py-1.5"
        >
          Add Expenses
        </button>
      </div>
      <div className="bg-green-900 w-full py-4 rounded-xl">
        <div className="bg-white w-[96%] rounded-xl mx-auto py-3">
          <div className="w-[95%] mx-auto">
            <div className="w-full flex gap-4 mb-4">
              {["expenses", "settlements", "members"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-full font-medium capitalize ${
                    activeTab === tab
                      ? "bg-green-700 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <hr className="border-[#dadada]" />
            <div className="my-3 w-full mx-auto">
              <div className="">
                {activeTab === "expenses" && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-700">
                      <thead>
                        <tr className="border-b border-[#dadada]">
                          <th className="py-2 px-4">Date</th>
                          <th className="py-2 px-4">Description</th>
                          <th className="py-2 px-4">Category</th>
                          <th className="py-2 px-4">Paid By</th>
                          <th className="py-2 px-4">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group?.expenses?.map((expense, idx) => (
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
                )}

                {activeTab === "settlements" && (
                  <div className="text-gray-500">
                    No settlements available yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <AddExpenses
          groupId={group?.id}
          members={group?.members}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default GroupDetails;
