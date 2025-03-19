// import { motion } from "framer-motion";
// import React, { useState } from "react";
// import { FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";
// import axios from "axios";
// import Navbar from "../Navbar/Navbar";

// const IssueReturn = () => {
//   const [isIssueMode, setIsIssueMode] = useState(true);
//   const [userId, setUserId] = useState("");
//   const [bookId, setBookId] = useState("");
//   const [popup, setPopup] = useState(null);
//   const [fine, setFine] = useState(null);
//   const [isDamaged, setIsDamaged] = useState(false);
//   const [enteredFine, setEnteredFine] = useState("");
//   const [isFinePaid, setIsFinePaid] = useState(false);

//   const toggleMode = () => {
//     setIsIssueMode(!isIssueMode);
//     setUserId("");
//     setBookId("");
//     setFine(null);
//     setIsDamaged(false);
//     setEnteredFine("");
//     setIsFinePaid(false);
//   };

//   const handleIssueBook = async () => {
//     try {
//       // Replace with your actual API endpoint
//       const response = await axios.get(`http://localhost:8080/fines/unpaid/${userId}`);
//       const existingFine = response.data ?.amount || 0;
//       console.log(existingFine.amount);

//       if (existingFine > 0) {
//         setFine(existingFine);
//         setPopup({ message: "Please pay the pending fine before issuing a new book.", type: "error" });
//       } else {
//         // Replace with your actual API endpoint
//         await axios.post(`http://localhost:8080/issueBook/issue-books`, { userId, bookId });
//         setPopup({ message: "Book issued successfully!", type: "success" });
//       }
//     } catch (error) {
//       console.error("Error issuing book:", error);
//       setPopup({ message: "Failed to issue book.", type: "error" });
//     }
//   };

//   const handleReturnBook = async () => {
//     try {
//       // Replace with your actual API endpoint
//       const response = await axios.get(`/api/check-fine/${userId}`);
//       const existingFine = response.data.amount;

//       if (isDamaged) {
//         const amount = parseFloat(enteredFine);
//         if (!isNaN(amount) && amount > 0) {
//           setFine(existingFine + amount);
//           // Replace with your actual API endpoint
//           await axios.post(`/api/add-damage-fine`, { userId, bookId, amount, reason: "Damage" });
//         }
//       } else {
//         if (existingFine > 0) {
//           setFine(existingFine);
//         } else {
//           // Replace with your actual API endpoint
//           await axios.post(`/api/return-book`, { userId, bookId });
//           setPopup({ message: "Book returned successfully!", type: "success" });
//         }
//       }
//     } catch (error) {
//       console.error("Error returning book:", error);
//       setPopup({ message: "Failed to return book.", type: "error" });
//     }
//   };

//   const handlePayFine = async () => {
//     const confirmPayment = window.confirm("Have you paid the fine?");
//     if (confirmPayment) {
//       try {
//         // Replace with your actual API endpoint
//         await axios.post(`/api/pay-fine`, { userId, amount: fine });
//         setPopup({ message: "Fine paid successfully!", type: "success" });
//         setIsFinePaid(true);
//       } catch (error) {
//         console.error("Error paying fine:", error);
//         setPopup({ message: "Failed to pay fine.", type: "error" });
//       }
//     } else {
//       setPopup({ message: "Please pay the fine first.", type: "error" });
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="flex-grow flex items-center justify-center p-8">
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white p-8 rounded-lg shadow-lg w-96"
//         >
//           <div className="flex justify-between items-center mb-6">
//             <button
//               onClick={toggleMode}
//               className="px-4 py-2 bg-indigo-500 text-white rounded-md focus:outline-none"
//             >
//               {isIssueMode ? "Return Book" : "Issue Book"}
//             </button>
//           </div>
//           {isIssueMode ? (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
//               <h2 className="text-xl font-semibold text-center mb-4">Issue a Book</h2>
//               <input
//                 type="text"
//                 placeholder="User ID"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//                 className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//               />
//               <input
//                 type="text"
//                 placeholder="Book ID"
//                 value={bookId}
//                 onChange={(e) => setBookId(e.target.value)}
//                 className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//               />
//               <button
//                 onClick={handleIssueBook}
//                 className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
//               >
//                 Issue Book
//               </button>
//             </motion.div>
//           ) : (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
//               <h2 className="text-xl font-semibold text-center mb-4">Return a Book</h2>
//               <input
//                 type="text"
//                 placeholder="User ID"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//                 className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//               />
//               <input
//                 type="text"
//                 placeholder="Book ID"
//                 value={bookId}
//                 onChange={(e) => setBookId(e.target.value)}
//                 className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
//               />
  
//               <div className="mb-4">
//                 <p className="text-lg font-medium">Is the book damaged?</p>
//                 <div className="flex items-center gap-4 mt-2">
//                   <button
//                     className={`px-4 py-2 rounded-md ${isDamaged ? "bg-red-500 text-white" : "bg-gray-300"}`}
//                     onClick={() => setIsDamaged(true)}
//                   >
//                     Yes
//                   </button>
//                   <button
//                     className={`px-4 py-2 rounded-md ${!isDamaged ? "bg-green-500 text-white" : "bg-gray-300"}`}
//                     onClick={() => {
//                       setIsDamaged(false);
//                       setEnteredFine("");
//                     }}
//                   >
//                     No
//                   </button>
//                 </div>
//               </div>
  
//               {isDamaged && (
//                 <input
//                   type="number"
//                   placeholder="Enter fine amount"
//                   value={enteredFine}
//                   onChange={(e) => setEnteredFine(e.target.value)}
//                   className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-red-500"
//                 />
//               )}
  
//               <button
//                 onClick={handleReturnBook}
//                 className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
//                 disabled={!isFinePaid && fine !== null}
//               >
//                 Return Book
//               </button>
//             </motion.div>
//           )}
  
//           {fine !== null && (
//             <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center justify-between">
//               <FaExclamationTriangle className="mr-2" />
//               Fine Pending: ₹{fine}
//               <button
//                 onClick={handlePayFine}
//                 className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Pay Fine
//               </button>
//             </div>
//           )}
  
//           {popup && (
//             <motion.div
//               initial={{ y: -10, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.3 }}
//               className={`mt-4 p-3 rounded-md flex items-center justify-between ${
//                 popup.type === "success"
//                   ? "bg-green-100 border border-green-400 text-green-700"
//                   : "bg-red-100 border border-red-400 text-red-700"
//               }`}
//             >
//               {popup.type === "success" ? <FaCheckCircle className="mr-2" /> : <FaExclamationTriangle className="mr-2" />}
//               {popup.message}
//               <FaTimes className="ml-4 cursor-pointer" onClick={() => setPopup(null)} />
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default IssueReturn;

import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const IssueReturn = () => {
  const [isIssueMode, setIsIssueMode] = useState(true);
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [popup, setPopup] = useState(null);
  const [fine, setFine] = useState(null);
  const [isDamaged, setIsDamaged] = useState(false);
  const [enteredFine, setEnteredFine] = useState("");
  const [isFinePaid, setIsFinePaid] = useState(false);

  const toggleMode = () => {
    setIsIssueMode(!isIssueMode);
    setUserId("");
    setBookId("");
    setFine(null);
    setIsDamaged(false);
    setEnteredFine("");
    setIsFinePaid(false);
  };


  const handleIssueBook = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/fines/unpaid/${userId}`);
      const existingFine = response.data?.amount || 0; // Ensure valid data
  
      console.log("Existing fine:", existingFine);
  
      if (existingFine > 0) {
        setFine(existingFine);
        setPopup({ message: `Please pay the pending fine of ₹${existingFine} before issuing a new book.`, type: "error" });
      } else if(existingFine == 0) {
        await axios.post("http://localhost:8080/issueBook/issue-books", { userId, bookId });
        alert("Book issued")
        setPopup({ message: "Book issued successfully!", type: "success" });
      }
    } catch (error) {
      console.error("Error issuing book:", error);

      //if userid does not exist
      if(error.response && error.response.status === 404){
        // console.log(error.response)
        alert(error.response.data.message);
      }

      //if bookid does not exist
      if(error.response && error.response.status === 404){
        // console.log(error.response)
        alert(error.response.data.message);
      }


      if (error.response && error.response.data && error.response.data.amount) {
        const amount = error.response.data.amount;
        setFine(amount);
        setPopup({ message: `Please pay the pending fine of ₹${amount} before issuing a new book.`, type: "error" });
      } else {
        setPopup({ message: "Failed to issue book.", type: "error" });
      }
    }
  };


  const handleReturnBook = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/fines/unpaid/${userId}`);
      const existingFine = response.data?.amount || 0;
      console.log("Existing fine:", existingFine);
  
      if (isDamaged) {
        const amount = parseFloat(enteredFine);
        if (!isNaN(amount) && amount > 0) {
          const finalFine = existingFine + amount;
          console.log(finalFine);
          setFine(finalFine);
          setPopup({
            message: `Total fine: ${finalFine}. Please pay before returning the book.`,
            type: "warning",
          });

          //send updated fine 
          await axios.post("http://locaslhost:8080/fines/add-damage-fine", {
            userId, 
            bookId,
            fine: finalFine,
            reason: "Damage"
          })

        } else {
          alert("Please enter a valid fine amount.");
        }
      } else {
        if (existingFine > 0) {
          setFine(existingFine);
          setPopup({
            message: `You have an unpaid fine of ${existingFine}. Please pay before returning the book.`,
            type: "warning",
          });
        } else {
          await axios.post("http://localhost:8080/Book/return-book", {
            bookId,
            userId,
            isDamaged: false,
            fine: 0,
            reasonForDamage: "",
          });
          alert("Book returned successfully!");
          setPopup({ message: "Book returned successfully!", type: "success" });
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Extract the error message from backend and display it
        setPopup({ message: error.response.data.message || "You have unpaid fines. Please pay first.", type: "error" });
        setFine(error.response.data.amount || 0); // Set the existing fine amount if available
      } else {
        console.error("Error returning book:", error);
        if(error.response && error.response.status === 404){
          // console.log(error.response.data.error)
          alert("Record not found!")
        }
        setPopup({ message: "Failed to return book. Please try again later.", type: "error" });
      }
    }
  };

  const handlePayFine = async () => {
    const confirmPayment = window.confirm("Have you paid the fine?");
    if (confirmPayment) {
      try {
        await axios.post(`http://localhost:8080/fines/unpaid/pay-fine/${userId}`);
        setPopup({ message: "Fine paid successfully!", type: "success" });
        setIsFinePaid(true);
        setFine(null); // Reset fine after payment
      } catch (error) {
        console.error("Error paying fine:", error);
        setPopup({ message: "Failed to pay fine.", type: "error" });
      }
    } else {
      setPopup({ message: "Please pay the fine first.", type: "error" });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg w-96"
        >
          <div className="flex justify-between items-center mb-6">
            <button onClick={toggleMode} className="px-4 py-2 bg-indigo-500 text-white rounded-md">
              {isIssueMode ? "Return Book" : "Issue Book"}
            </button>
          </div>

          {isIssueMode ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="text-xl font-semibold text-center mb-4">Issue a Book</h2>
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full mb-3 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Book ID"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className="w-full mb-3 p-2 border rounded-md"
              />
              <button
                onClick={handleIssueBook}
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                disabled={fine !== null} // Disable issue button if fine exists
              >
                Issue Book
              </button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="text-xl font-semibold text-center mb-4">Return a Book</h2>
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full mb-3 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Book ID"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className="w-full mb-3 p-2 border rounded-md"
              />

              <div className="mb-4">
                <p className="text-lg font-medium">Is the book damaged?</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    className={`px-4 py-2 rounded-md ${isDamaged ? "bg-red-500 text-white" : "bg-gray-300"}`}
                    onClick={() => setIsDamaged(true)}
                  >
                    Yes
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md ${!isDamaged ? "bg-green-500 text-white" : "bg-gray-300"}`}
                    onClick={() => {
                      setIsDamaged(false);
                      setEnteredFine("");
                    }}
                  >
                    No
                  </button>
                </div>
              </div>

              {isDamaged && (
                <input
                  type="number"
                  placeholder="Enter fine amount"
                  value={enteredFine}
                  onChange={(e) => setEnteredFine(e.target.value)}
                  className="w-full mb-3 p-2 border rounded-md"
                />
              )}

              <button
                onClick={handleReturnBook}
                className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
                disabled={!isFinePaid && fine !== null}
              >
                Return Book
              </button>
            </motion.div>
          )}

          {fine !== null && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center justify-between">
              <FaExclamationTriangle className="mr-2" />
              Fine Pending: ₹{fine}
              <button onClick={handlePayFine} className="ml-4 bg-red-500 text-white px-3 py-1 rounded">
                Pay Fine
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default IssueReturn;