import { useNavigate } from "react-router-dom";

// Predefined background colors
const bgColors = [
  "#f59e0b", // amber-400
  "#b45309", // amber-700
  "#2563eb", // blue-600
  "#059669", // green-600
  "#10b981", // emerald-500
  "#6b21a8", // purple-800
  "#db2777", // pink-600
  "#dc2626", // red-600
];

// Function to get a color from initials
const getColorFromInitials = (initials) => {
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash += initials.charCodeAt(i);
  }
  return bgColors[hash % bgColors.length];
};

const GroupCard = ({ name, members = [], totalExpenses, userBalance, id }) => {
  const navigate = useNavigate();

  // Ensure totalExpenses and userBalance are numbers or fallback to 0
  const formattedTotalExpenses = totalExpenses
    ? Number(totalExpenses).toFixed(2)
    : "0.00";
  const formattedUserBalance = userBalance
    ? Number(userBalance).toFixed(2)
    : "0.00";

  return (
    <div className="w-[90%] md:w-full mx-auto py-3 bg-green-900 rounded-xl">
      <div className="w-[92%] mx-auto">
        <div className="flex items-center gap-x-3">
          <div className="bg-white w-7 h-7 md:w-11 md:h-11 rounded-full" />
          <div>
            <h3 className="font-semibold text-white">
              {name || "Unnamed Group"}
            </h3>
            <p className="text-gray-300">{members.length} members</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-white mt-5">
          <h4>Total Expenses</h4>
          <h4>${formattedTotalExpenses}</h4>
        </div>

        <div className="flex items-center justify-between text-white mt-3">
          <h4>Your Balance</h4>
          <h4>${formattedUserBalance}</h4>
        </div>

        <div className="mt-6 flex items-center">
          {members.map((member, idx) => {
            // Fallback for missing initials
            const initials =
              member.initials || member.slice(2, 4).toUpperCase();
            const bgColor = getColorFromInitials(initials);
            return (
              <div
                key={idx}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white border-2 border-green-900 ${
                  idx !== 0 ? "-ml-3" : ""
                }`}
                style={{ backgroundColor: bgColor }}
              >
                <h3 className="text-base font-semibold uppercase">
                  {initials}
                </h3>
              </div>
            );
          })}
        </div>

        <div className="pb-2 pt-6 flex items-center justify-between">
          <button
            className="text-white underline underline-offset-2 cursor-pointer"
            onClick={() => navigate(`/groups/${id}`)}
          >
            View Details
          </button>
          <button
            className="text-white underline underline-offset-2 cursor-pointer"
            // onClick={handleAddExpenses}
          >
            Add Expenses
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
