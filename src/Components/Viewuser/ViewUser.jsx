import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaBook, FaMoneyBill, FaTimes, FaFilter } from "react-icons/fa";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ userId: "", userName: "", email: "", phone: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [finePopup, setFinePopup] = useState(false);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchedUsers = Array.from({ length: 50 }, (_, i) => ({
      userId: `UID${i + 1}`,
      userName: `User ${i + 1}`,
      email: `user${i + 1}@mail.com`,
      phone: `98765432${i % 10}`,
      booksIssued: Math.floor(Math.random() * 5),
      fine: Math.random() > 0.5 ? (Math.floor(Math.random() * 500) + 50) : 0, // Random fine
    }));
    setUsers(fetchedUsers);
  }, []);

  const filteredUsers = users.filter((user) =>
    Object.keys(filters).every((key) =>
      filters[key] ? user[key].toString().toLowerCase().includes(filters[key].toString().toLowerCase()) : true
    )
  );

  const searchedUsers = filteredUsers.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = searchedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(searchedUsers.length / usersPerPage);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.userId !== userId));
  };

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
          {/* <motion.div whileHover={{ scale: 1.1 }}>
            <button
              className="px-4 py-2 bg-indigo-500 text-white rounded-md"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              Filter
            </button>
          </motion.div> */}

          <motion.div whileHover={{ scale: 1.1 }}>
            <button
              className="px-4 py-2 text-indigo-500 rounded-md flex items-center justify-center"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <FaFilter size={20}/>
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
                  <th className="p-3">Books Issued</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.userId} className="border-b text-center">
                    <td className="p-3">{user.userId}</td>
                    <td className="p-3">{user.userName}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.booksIssued}</td>
                    <td className="p-3 flex gap-3 ml-6">
                      <FaEdit className="text-blue-600 cursor-pointer" />
                      <FaTrash className="text-red-600 cursor-pointer" onClick={() => handleDelete(user.userId)} />
                      <FaBook className="text-green-600 cursor-pointer" />
                      <FaMoneyBill
                        className="text-yellow-600 cursor-pointer"
                        onClick={() => {
                          setSelectedUser(user);
                          setFinePopup(true);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

      {/* Fine Modal */}
      {finePopup && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg relative w-96">
            <FaTimes
              className="absolute top-3 right-3 text-gray-600 cursor-pointer"
              onClick={() => setFinePopup(false)}
            />
            {selectedUser.fine > 0 ? (
              <>
                <h2 className="text-lg font-semibold mb-4">Outstanding Fine</h2>
                <p className="text-gray-700">User <strong>{selectedUser.userName}</strong> has a pending fine of:</p>
                <p className="text-red-600 text-2xl font-bold">₹{selectedUser.fine}</p>
                <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded">Pay Fine</button>
              </>
            ) : (
              <p className="text-green-600 text-lg font-semibold flex items-center">
                No fine! 😊 You can issue another book.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUser;
