import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ethers } from "ethers";

const CreateGroup = () => {
  const { account, createGroup } = useContext(AppContext);
  const [groupName, setGroupName] = useState("");
  const [memberAddresses, setMemberAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Add error state for user feedback
  const navigate = useNavigate();

  const handleMemberChange = (index, value) => {
    const updated = [...memberAddresses];
    updated[index] = value;
    setMemberAddresses(updated);
    setError(""); // Clear error on input change
  };

  const addMemberField = () => {
    setMemberAddresses([...memberAddresses, ""]);
    setError("");
  };

  const removeMemberField = (index) => {
    const updated = [...memberAddresses];
    updated.splice(index, 1);
    setMemberAddresses(updated);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!groupName) {
      setError("Group name is required");
      return;
    }
    if (!account || !ethers.isAddress(account)) {
      setError("Please connect a valid wallet");
      return;
    }
    if (memberAddresses.length === 0) {
      setError("At least one additional member is required");
      return;
    }
    const allMembers = [account, ...memberAddresses];
    if (allMembers.some((addr) => !ethers.isAddress(addr))) {
      setError("All member addresses must be valid Ethereum addresses");
      return;
    }

    setLoading(true);
    try {
      await createGroup(groupName, allMembers);
      console.log("DATAS", groupName, memberAddresses);
      navigate("/groups");
    } catch (err) {
      console.error("Error creating group:", err);
      setError(`Failed to create group: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-[96%] md:w-[95%] mx-auto py-4"
    >
      <h2 className="text-xl font-semibold text-gray-700">Create Group</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Group Name
        </label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1 mt-5">
          Group Members (Ethereum addresses)
        </label>
        {memberAddresses.map((address, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={address}
              onChange={(e) => handleMemberChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring"
              placeholder="0x..."
              required
            />
            {memberAddresses.length > 1 && (
              <button
                type="button"
                onClick={() => removeMemberField(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addMemberField}
          className="text-green-700 hover:text-green-900 mt-3"
        >
          + Add Member
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || !account}
        className="bg-green-700 text-white px-4 py-2 rounded mt-6 hover:bg-green-900 transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Group"}
      </button>
    </form>
  );
};

export default CreateGroup;
