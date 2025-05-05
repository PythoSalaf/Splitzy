import { useState } from "react";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [memberAddresses, setMemberAddresses] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleMemberChange = (index, value) => {
    const updated = [...memberAddresses];
    updated[index] = value;
    setMemberAddresses(updated);
  };

  const addMemberField = () => {
    setMemberAddresses([...memberAddresses, ""]);
  };

  const removeMemberField = (index) => {
    const updated = [...memberAddresses];
    updated.splice(index, 1);
    setMemberAddresses(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  };

  //     try {
  //       const tx = await contract.createGroup(groupName, memberAddresses);
  //       await tx.wait();
  //       setMessage("Group created successfully!");
  //       setGroupName("");
  //       setMemberAddresses([""]);
  //     } catch (err) {
  //       setMessage("Error creating group.");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-white w-[96%] md:w-[95%] mx-auto py-4"
    >
      <h2 className="text-xl font-semibold text-gray-700">Create Group</h2>

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
          className="text-green-700 hover:text-green-900 md:text-base lg:text-lg mt-3"
        >
          + Add Member
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-700 text-white px-4 py-2 rounded mt-6 hover:bg-green-900 transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Group"}
      </button>

      {message && <p className="text-sm text-center mt-2">{message}</p>}
      {/*  */}
    </form>
  );
};

export default CreateGroup;
