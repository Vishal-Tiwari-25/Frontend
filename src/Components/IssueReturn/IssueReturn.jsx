// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

// const IssueReturnBook = () => {
//   const [isIssueMode, setIsIssueMode] = useState(true);
//   const [userId, setUserId] = useState("");
//   const [bookId, setBookId] = useState("");
//   const [popup, setPopup] = useState(null);
//   const [fine, setFine] = useState(null);

//   const toggleMode = () => {
//     setIsIssueMode(!isIssueMode);
//     setUserId("");
//     setBookId("");
//     setFine(null);
//   };

//   const handleIssueBook = () => {
//     setPopup({ message: "Book issued successfully!", type: "success" });
//   };

//   const handleReturnBook = () => {
//     const dueDatePassed = Math.random() > 0.5;
//     if (dueDatePassed) {
//       setFine(Math.floor(Math.random() * 500) + 50);
//     } else {
//       setPopup({ message: "Book returned successfully!", type: "success" });
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-lg shadow-lg w-96"
//       >
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={toggleMode}
//             className="px-4 py-2 bg-indigo-500 text-white rounded-md focus:outline-none"
//           >
//             {isIssueMode ? "Switch to Return Book" : "Switch to Issue Book"}
//           </button>
//         </div>

//         {isIssueMode ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h2 className="text-xl font-semibold text-center mb-4">Issue a Book</h2>
//             <input
//               type="text"
//               placeholder="User ID"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//               className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//             />
//             <input
//               type="text"
//               placeholder="Book ID"
//               value={bookId}
//               onChange={(e) => setBookId(e.target.value)}
//               className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//             />
//             <button
//               onClick={handleIssueBook}
//               className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
//             >
//               Issue Book
//             </button>
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h2 className="text-xl font-semibold text-center mb-4">Return a Book</h2>
//             <input
//               type="text"
//               placeholder="User ID"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//               className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//             />
//             <input
//               type="text"
//               placeholder="Book ID"
//               value={bookId}
//               onChange={(e) => setBookId(e.target.value)}
//               className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//             />
//             <button
//               onClick={handleReturnBook}
//               className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
//             >
//               Return Book
//             </button>
//           </motion.div>
//         )}

//         {fine !== null && (
//           <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
//             <FaExclamationTriangle className="inline mr-2" />
//             Fine Pending: ₹{fine}
//             <button className="ml-4 bg-red-500 text-white px-3 py-1 rounded">Pay Fine</button>
//           </div>
//         )}

//         {popup && (
//           <motion.div
//             initial={{ y: -10, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.3 }}
//             className={`mt-4 p-3 rounded-md flex items-center justify-between ${
//               popup.type === "success" ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"
//             }`}
//           >
//             {popup.type === "success" ? <FaCheckCircle className="mr-2" /> : <FaExclamationTriangle className="mr-2" />}
//             {popup.message}
//             <FaTimes className="ml-4 cursor-pointer" onClick={() => setPopup(null)} />
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default IssueReturnBook;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import Navbar from "../Navbar/Navbar"; // Importing the sidebar component

const IssueReturnBook = () => {
  const [isIssueMode, setIsIssueMode] = useState(true);
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [popup, setPopup] = useState(null);
  const [fine, setFine] = useState(null);

  const toggleMode = () => {
    setIsIssueMode(!isIssueMode);
    setUserId("");
    setBookId("");
    setFine(null);
  };

  const handleIssueBook = () => {
    setPopup({ message: "Book issued successfully!", type: "success" });
  };

  const handleReturnBook = () => {
    const dueDatePassed = Math.random() > 0.5;
    if (dueDatePassed) {
      setFine(Math.floor(Math.random() * 500) + 50);
    } else {
      setPopup({ message: "Book returned successfully!", type: "success" });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar /> {/* Sidebar on the left */}
      <div className="flex-grow flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg w-96"
        >
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={toggleMode}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md focus:outline-none"
            >
              {isIssueMode ? "Return Book" : "Issue Book"}
            </button>
          </div>

          {isIssueMode ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-center mb-4">Issue a Book</h2>
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Book ID"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleIssueBook}
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
              >
                Issue Book
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-center mb-4">Return a Book</h2>
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Book ID"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleReturnBook}
                className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
              >
                Return Book
              </button>
            </motion.div>
          )}

          {fine !== null && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <FaExclamationTriangle className="inline mr-2" />
              Fine Pending: ₹{fine}
              <button className="ml-4 bg-red-500 text-white px-3 py-1 rounded">Pay Fine</button>
            </div>
          )}

          {popup && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 p-3 rounded-md flex items-center justify-between ${
                popup.type === "success" ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"
              }`}
            >
              {popup.type === "success" ? <FaCheckCircle className="mr-2" /> : <FaExclamationTriangle className="mr-2" />}
              {popup.message}
              <FaTimes className="ml-4 cursor-pointer" onClick={() => setPopup(null)} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default IssueReturnBook;
