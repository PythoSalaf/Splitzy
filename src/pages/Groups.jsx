// import { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { GroupCard } from "../components";
// import { AppContext } from "../context/AppContext";

// const Groups = () => {
//   const navigate = useNavigate();
//   const { fetchUserGroups, account } = useContext(AppContext);
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadGroups = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const data = await fetchUserGroups();
//         setGroups(data);
//       } catch (err) {
//         setError(`Failed to load groups: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadGroups();
//   }, [account, fetchUserGroups]);

//   return (
//     <div className="w-[96%] md:w-[95%] mx-auto py-4">
//       {loading ? (
//         <p className="text-center py-24 text-green-700">Loading groups...</p>
//       ) : error ? (
//         <p className="text-center py-24 text-red-700">{error}</p>
//       ) : groups.length < 1 ? (
//         <div className="w-full flex items-center flex-col justify-center pt-24">
//           <h2 className="text-2xl md:text-3xl lg:text-4xl text-red-700 font-semibold">
//             Opps!!!
//           </h2>
//           <p className="my-8 text-base md:text-lg lg:text-xl text-green-700 font-semibold">
//             No Group At the moment
//           </p>
//           <button
//             className="bg-green-900 text-white rounded-lg cursor-pointer text-sm md:text-base py-1.5 px-3"
//             onClick={() => navigate("/groups/create-group")}
//           >
//             Create a Group
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="flex items-start flex-col md:flex-row gap-3 justify-between">
//             <div className="flex items-center gap-x-6">
//               <button className="bg-green-900 text-white rounded-lg text-sm md:text-base py-1.5 px-3">
//                 All Groups
//               </button>
//               <button className="bg-white border border-green-900 text-green-900 py-1.5 px-3 rounded-lg text-sm md:text-base">
//                 Active
//               </button>
//               <button className="bg-white border border-green-900 text-green-900 py-1.5 px-3 rounded-lg text-sm md:text-base">
//                 Archived
//               </button>
//             </div>
//             <button
//               className="bg-green-900 text-white rounded-lg text-sm md:text-base py-1.5 px-3"
//               onClick={() => navigate("/groups/create-group")}
//             >
//               New Group
//             </button>
//           </div>
//           <div className="mt-5 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {groups.map((group, index) => (
//               <GroupCard key={group.groupId || index} {...group} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Groups;

import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GroupCard } from "../components";
import { AppContext } from "../context/AppContext";

const Groups = () => {
  const navigate = useNavigate();
  const { fetchUserGroups, groups, account } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGroups = async () => {
      setLoading(true);
      setError("");
      try {
        await fetchUserGroups();
      } catch (err) {
        setError(`Failed to load groups: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    if (account) {
      loadGroups();
    } else {
      setLoading(false);
      setError("Please connect your wallet");
    }
  }, [account, fetchUserGroups]);

  return (
    <div className="w-[96%] md:w-[95%] mx-auto py-4">
      {loading ? (
        <p className="text-center py-24 text-green-700">Loading groups...</p>
      ) : error ? (
        <p className="text-center py-24 text-red-700">{error}</p>
      ) : groups.length < 1 ? (
        <div className="w-full flex items-center flex-col justify-center pt-24">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-red-700 font-semibold">
            Opps!!!
          </h2>
          <p className="my-8 text-base md:text-lg lg:text-xl text-green-700 font-semibold">
            No Group At the moment
          </p>
          <button
            className="bg-green-900 text-white rounded-lg cursor-pointer text-sm md:text-base py-1.5 px-3"
            onClick={() => navigate("/groups/create-group")}
          >
            Create a Group
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-start flex-col md:flex-row gap-3 justify-between">
            <div className="flex items-center gap-x-6">
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
            <button
              className="bg-green-900 text-white rounded-lg text-sm md:text-base py-1.5 px-3"
              onClick={() => navigate("/groups/create-group")}
            >
              New Group
            </button>
          </div>
          <div className="mt-5 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <GroupCard key={group.groupId} {...group} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Groups;
