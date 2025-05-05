import React, { useState } from "react";
import { toast } from "react-toastify";

const AddExpenses = ({ groupId, members, onClose }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = async () => {
    const trimmedDescription = description.trim();
    const totalAmount = parseFloat(amount);

    if (!trimmedDescription || isNaN(totalAmount) || totalAmount <= 0) {
      toast.error("Please enter a valid description and amount");
      return;
    }

    const share = parseFloat((totalAmount / members.length).toFixed(2));
    const payees = members;
    const amounts = members.map(() => share);

    try {
      // 🔧 MOCKING submission
      console.log("Mock expense added:", {
        groupId,
        description: trimmedDescription,
        payees,
        amounts,
      });

      toast.success("Expense added successfully! (mocked)");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add expense");
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur bg-green-700/20 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Expense</h2>

        <input
          type="text"
          placeholder="Description"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Total Amount"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <p className="text-sm text-gray-600 mb-4">
          This expense will be shared equally among all members.
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
