import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";

const SmileyAnimation = () => {
  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ x: -50 }}
      animate={{ x: [0, 20, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx="100" cy="100" r="50" fill="#FDE047" stroke="black" strokeWidth="3" />
      <circle cx="80" cy="90" r="5" fill="black" />
      <circle cx="120" cy="90" r="5" fill="black" />
      <path d="M 80 120 Q 100 140, 120 120" stroke="black" strokeWidth="3" fill="transparent" />
    </motion.svg>
  );
};

const AddBook = () => {
  const [formData, setFormData] = useState({
    bookId: "",
    bookName: "",
    genre: "",
    author: "",
    dateAdded: new Date().toISOString().split("T")[0],
    rating: "",
    quantity: "",
  });

  const allFieldsFilled = Object.values(formData).every((value) => value !== "");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allFieldsFilled) return;
    console.log("Book Data Submitted:", formData);
    setFormData({
      bookId: "",
      bookName: "",
      genre: "",
      author: "",
      dateAdded: new Date().toISOString().split("T")[0],
      rating: "",
      quantity: "",
    });
  };

  return (
    <div className="flex max-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="flex items-center space-x-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg space-y-4 bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800">Add New Book</h2>

            <motion.div whileHover={{ scale: 1.05 }}>
              <label className="block text-sm font-medium text-gray-700">Book ID</label>
              <input
                type="text"
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <label className="block text-sm font-medium text-gray-700">Book Name</label>
              <input
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <label className="block text-sm font-medium text-gray-700">Date of Addition</label>
              <input
                type="text"
                name="dateOfAddition"
                value={formData.dateAdded}
                readOnly
                className="input"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <label className="block text-sm font-medium text-gray-700">Genre</label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  min="1"
                  max="5"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </motion.div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              disabled={!allFieldsFilled}
              className={`w-full py-2 px-4 rounded-md transition ${
                allFieldsFilled ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              Add Book
            </motion.button>
          </motion.form>

          <SmileyAnimation />
        </div>
      </div>
    </div>
  );
  
};

export default AddBook;