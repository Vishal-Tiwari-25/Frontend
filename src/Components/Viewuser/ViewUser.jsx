
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaBook, FaMoneyBill, FaTimes, FaFilter } from "react-icons/fa";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ userId: "", name: "", email: "", phone: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [finePopup, setFinePopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const usersPerPage = 10;


  //fetching all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/Users/get-users"); // Replace with your API endpoint
        console.log("Fetched users data:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = async (userId) => {
    console.log(`fetching details for user: ${userId}`);
    try{
      const response = await axios.get(`http://localhost:8080/Users/get-users/by-id/${userId}`)
      console.log("fetched user's data: ", response.data);
      setSelectedUser(users.find(user => user.userId === userId));
      setUpdatePopup(true);
    }catch(error){
      console.log(error);
    }

  }

  const handleSaveUpdate = async (userId) => {
    console.log(`Saving updated user details: ${userId}`, selectedUser);
  
    try {
      const response = await axios.put(`http://localhost:8080/Users/update-user/${userId}`, {
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone,
        dob: selectedUser.dob,
        gender: selectedUser.gender
      });
      console.log("Updated data: ", response.data);
      setUpdatePopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) =>
    Object.keys(filters).every((key) =>
      filters[key] ? user[key]?.toString().toLowerCase().includes(filters[key].toString().toLowerCase()) : true
    )
  );

  const searchedUsers = filteredUsers.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = searchedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(searchedUsers.length / usersPerPage);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/Users/delete-user/${userId}`); // Replace with your API endpoint
      setUsers(users.filter((user) => user.userId !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  //handle fine by userid
  // const [fineAmount, setFineAmount] = useState(null);
  // // useEffect(() => {
  // //   if (selectedUser) {
  // //     axios.get(`http://localhost:8080/fines/unpaid/${selectedUser.userId}`)
  // //       .then(response => setFineAmount(response.data.amount))
  // //       .catch(error => console.error('Error fetching fine:', error));
  // //   }
  // // }, [selectedUser])

  // useEffect(() => {
  //   if (selectedUser) {
  //     axios.get(`http://localhost:8080/fines/unpaid/${selectedUser.userId}`)
  //       .then(response => setFineAmount(response.data.amount)) // Correct state update
  //       .catch(error => console.error('Error fetching fine:', error));
  //   }
  // }, [selectedUser]);
  


  return (
    <div className="flex max-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6 overflow-hidden relative">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-2/3 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
          <motion.div whileHover={{ scale: 1.1 }}>
            <button
              className="px-4 py-2 text-indigo-500 rounded-md flex items-center justify-center"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <FaFilter size={20} />
              <span>Filter</span>
            </button>
          </motion.div>
        </div>

       {filterOpen && (
           <motion.div
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             className="absolute bg-white p-4 shadow-lg rounded-md top-16 left-0 right-0 z-10"
           >
             <div className="grid grid-cols-3 gap-4">
               <input type="text" placeholder="User ID" className="p-2 border rounded" onChange={(e) => setFilters({ ...filters, userId: e.target.value })} />
               <input type="text" placeholder="User Name" className="p-2 border rounded" onChange={(e) => setFilters({ ...filters, userName: e.target.value })} />
               <input type="text" placeholder="Email" className="p-2 border rounded" onChange={(e) => setFilters({ ...filters, email: e.target.value })} />
               <input type="text" placeholder="Phone No." className="p-2 border rounded" onChange={(e) => setFilters({ ...filters, phone: e.target.value })} />
             </div>
           </motion.div>
         )} 

        <div className="overflow-hidden">
          <div className="h-[400px] overflow-y-auto">
            <table className="w-full border-collapse border bg-white shadow-md">
              <thead>
                <tr className="bg-indigo-500 text-white">
                  <th className="p-3">User ID</th>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone No.</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.userId} className="border-b text-center">
                    <td className="p-3">{user.userId}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3 flex gap-3 ml-6">
                      <FaEdit className="text-blue-600 cursor-pointer" onClick={() => handleUpdate(user.userId)}/>
                      <FaTrash className="text-red-600 cursor-pointer" onClick={() => handleDelete(user.userId)} />
                      {/* <FaBook className="text-green-600 cursor-pointer" /> */}
                      {/* <FaMoneyBill
                        className="text-yellow-600 cursor-pointer"
                        onClick={() => {
                          setSelectedUser(user);
                          setFinePopup(true);
                        }}
                      /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          

        {/*Update popup */}
              {updatePopup && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-md shadow-lg relative w-96">
                  <FaTimes className="absolute top-3 right-3 text-gray-600 cursor-pointer" onClick={() => setUpdatePopup(false)} />
                    <h2 className="text-lg font-semibold mb-4">Update User</h2>
                    <input type="text" value={selectedUser.name} className="w-full p-2 border rounded mb-2" onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />
                    <input type="email" value={selectedUser.email} className="w-full p-2 border rounded mb-2" onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
                    <input type="text" value={selectedUser.phone} className="w-full p-2 border rounded mb-2" onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })} />
                    <input type="text" value={selectedUser.dob} className="w-full p-2 border rounded mb-2" onChange={(e) => setSelectedUser({ ...selectedUser, dob: e.target.value })} />
                    <input type="text" value={selectedUser.gender} className="w-full p-2 border rounded mb-2" onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })} />
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded" onClick={()=> handleSaveUpdate(selectedUser.userId)}>Save</button>
                  </div>
                </div>
              )}
 

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === i + 1 ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* {finePopup && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-lg relative w-96">
                <FaTimes
                  className="absolute top-3 right-3 text-gray-600 cursor-pointer"
                  onClick={() => setFinePopup(false)}
                />
                {fineAmount !== null ? (
                  fineAmount > 0 ? (
                    <>
                      <h2 className="text-lg font-semibold mb-4">Outstanding Fine</h2>
                      <p className="text-gray-700">User <strong>{selectedUser.name}</strong> has a pending fine of:</p>
                      <p className="text-red-600 text-2xl font-bold">₹{selectedUser.amount}</p>
                      <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded">Pay Fine</button>
                    </>
                  ) : (
                    <p className="text-green-600 text-lg font-semibold flex items-center">
                      No fine! 😊 You can issue another book.
                    </p>
                  )
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          )
      }; */}

      {/* {fineAmount !== null ? (
        fineAmount > 0 ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Outstanding Fine</h2>
            <p className="text-gray-700">User <strong>{selectedUser.name}</strong> has a pending fine of:</p>
            <p className="text-red-600 text-2xl font-bold">₹{fineAmount}</p>  
            <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded">Pay Fine</button>
          </>
        ) : (
          <p className="text-green-600 text-lg font-semibold flex items-center">
            No fine! 😊 You can issue another book.
          </p>
        )
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
};

export default ViewUser;