import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { ethers } from "ethers";

const AddExpenses = ({ groupId, members, onClose }) => {
  const { createBill } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const handleAddExpense = async () => {
    const trimmedTitle = title.trim();
    const parsedTotalAmount = parseFloat(totalAmount);

    if (!trimmedTitle) {
      toast.error("Please enter a valid title");
      return;
    }
    if (isNaN(parsedTotalAmount) || parsedTotalAmount <= 0) {
      toast.error("Please enter a valid positive amount");
      return;
    }
    if (!members?.length || members.some((addr) => !ethers.isAddress(addr))) {
      toast.error("Invalid group members");
      return;
    }
    if (!groupId || typeof groupId !== "string" || !/^\d+$/.test(groupId)) {
      toast.error("Invalid group ID");
      return;
    }

    // Calculate equal shares in CELO
    const share = parseFloat((parsedTotalAmount / members.length).toFixed(2));
    const amounts = members.map(() => share);
    // Adjust last amount to account for rounding
    const totalShares = parseFloat((share * members.length).toFixed(2));
    if (totalShares !== parsedTotalAmount) {
      amounts[amounts.length - 1] = parseFloat(
        (parsedTotalAmount - share * (members.length - 1)).toFixed(2)
      );
    }

    const billData = {
      groupId: groupId.toString(),
      title: trimmedTitle,
      totalAmount: parsedTotalAmount.toString(),
      payees: members.map((addr) => addr.toLowerCase()),
      amounts: amounts.map((a) => a.toString()),
    };

    console.log("Adding expense with payload:", billData);

    try {
      await createBill(billData);
      toast.success("Expense added successfully");
      onClose();
    } catch (err) {
      console.error("Add expense error:", err);
      toast.error(`Failed to add expense: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur bg-green-700/20 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Expense</h2>

        <input
          type="text"
          placeholder="Title (e.g., Beach House Rental)"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Total Amount"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          min="0"
          step="0.01"
        />

        <p className="text-sm text-gray-600 mb-4">
          This expense will be shared equally among all {members?.length || 0}{" "}
          members.
        </p>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddExpense}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenses;
