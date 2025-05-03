import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { MdAccountBalanceWallet } from "react-icons/md";
import {
  FaShoppingBag,
  FaTaxi,
  FaUtensils,
  FaHome,
  FaPlane,
  FaLaptop,
  FaCar,
} from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";

import { Link } from "react-router-dom";

const Dashboard = () => {
  const cardData = [
    {
      title: "You're owned",
      amount: "$124.50",
      people: "From 3 people",
      bg: "bg-green-900",
      iconBg: "bg-green-100 text-green-800",
      icon: <GoArrowUpRight className="size-5 md:size-5" />,
    },
    {
      title: "You owe",
      amount: "$88.00",
      people: "To 2 people",
      bg: "bg-red-900",
      iconBg: "bg-red-100 text-red-800",
      icon: <GoArrowDownRight className="size-5 md:size-5" />,
    },
    {
      title: "Net balance",
      amount: "$36.50",
      people: "Total",
      bg: "bg-blue-900",
      iconBg: "bg-blue-100 text-blue-800",
      icon: <MdAccountBalanceWallet className="size-5 md:size-5" />,
    },
  ];
  const activities = [
    {
      icon: <FaShoppingBag className="text-blue-500" />,
      title: "Grocery Shopping",
      description: "Added by Michael Chen • Roommates",
      amount: "$78.50",
      statusText: "You're owed $26.17",
      statusColor: "text-green-600",
    },
    {
      icon: <FaTaxi className="text-purple-500" />,
      title: "Airport Taxi",
      description: "Added by Emma Lewis • Trip to NYC",
      amount: "$65.00",
      statusText: "You owe $32.50",
      statusColor: "text-red-600",
    },
    {
      icon: <FaUtensils className="text-green-500" />,
      title: "Dinner at Olive Garden",
      description: "Added by you • Friends Night Out",
      amount: "$156.80",
      statusText: "You're owed $52.27",
      statusColor: "text-green-600",
    },
    {
      icon: <FaUtensils className="text-yellow-500" />,
      title: "Dinner at Olive Garden",
      description: "Added by you • Friends Night Out",
      amount: "$156.80",
      statusText: "You're owed $102.27",
      statusColor: "text-green-600",
    },
    {
      icon: <FaUtensils className="text-red-500" />,
      title: "Dinner at Olive Garden",
      description: "Added by you • Friends Night Out",
      amount: "$156.80",
      statusText: "You're owed $52.27",
      statusColor: "text-red-600",
    },
  ];

  const groups = [
    {
      icon: <FaHome className="text-blue-500" />,
      name: "Roommates",
      members: 3,
      expenses: 12,
      bgColor: "bg-blue-100",
    },
    {
      icon: <FaPlane className="text-purple-500" />,
      name: "Trip to NYC",
      members: 4,
      expenses: 8,
      bgColor: "bg-purple-100",
    },
    {
      icon: <FaUtensils className="text-green-500" />,
      name: "Foodies",
      members: 5,
      expenses: 16,
      bgColor: "bg-green-100",
    },
    {
      icon: <FaLaptop className="text-yellow-500" />,
      name: "Freelance Team",
      members: 6,
      expenses: 10,
      bgColor: "bg-yellow-100",
    },
    {
      icon: <FaCar className="text-red-500" />,
      name: "Road Trip",
      members: 7,
      expenses: 14,
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div className="w-[96%] md:w-[95%] mx-auto py-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            className="bg-green-900 w-[96%] mx-auto md:w-full py-2 md:py-3 rounded-2xl "
          >
            <div className="w-[90%] mx-auto">
              <div className="flex items-center justify-between text-white">
                <h3 className="text-base md:text-lg font-semibold">
                  {card.title}
                </h3>
                <div
                  className={`rounded-full h-6.5 w-6.5 md:h-7 md:w-7 font-bold flex items-center justify-center ${card.iconBg}`}
                >
                  {card.icon}
                </div>
              </div>
              <div className="py-2 md:py-4 text-white flex items-center md:items-start justify-between flex-row md:flex-col">
                <h3 className="font-semibold text-xl md:text-2xl">
                  {card.amount}
                </h3>
                <p className="text-sm md:text-base md:pt-2">{card.people}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full mt-11 flex items-start gap-5 flex-col md:flex-row">
        <div className="bg-green-900 py-4 w-full md:w-[65%] rounded-2xl">
          <div className="w-[96%] mx-auto">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {activities.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between bg-white rounded-xl py-2 px-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                      {activity.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm md:text-base lg:text-lg">
                        {activity.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h3 className="font-semibold text-sm md:text-base lg:text-lg text-gray-900">
                      {activity.amount}
                    </h3>
                    <p className={`text-xs md:text-sm ${activity.statusColor}`}>
                      {activity.statusText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                to="/activity"
                className="text-white text-sm font-medium hover:underline"
              >
                View All Activity
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[35%] bg-green-900 py-4 rounded-2xl">
          <div className="w-[94%] mx-auto">
            <h3 className="text-white font-semibold text-lg md:text-xl mb-4">
              Active Groups
            </h3>
            <div className="space-y-4">
              {" "}
              {groups.map((group, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full ${group.bgColor} flex items-center justify-center`}
                    >
                      {group.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {group.members} members • {group.expenses} expenses
                      </p>
                    </div>
                  </div>
                  <HiChevronRight className="text-gray-400 text-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
