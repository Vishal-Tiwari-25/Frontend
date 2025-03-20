import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../Navbar/Navbar';

function Request() {
  const [formData, setFormData] = useState({
    bookName: '',
    edition: '',
    email: '',
    quantity: ''
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Request:", formData);
    try {
      const response = await axios.post('http://localhost:8080/BookRequest/request-book', formData);
      console.log("Response:", response.data);
      setShowPopup(true);
      setFormData ({
        bookName: '',
        edition: '',
        email: '',
        quantity: ''
    });
    // alert("Book request submitted");
    } catch (error) {
      console.error("Error submitting request:", error);
    }


  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full p-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Request a Book</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              name="bookName" 
              placeholder="Book Name" 
              value={formData.bookName} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input 
              type="text" 
              name="edition" 
              placeholder="Edition" 
              value={formData.edition} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Vendor Email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <input 
              type="number" 
              name="quantity" 
              placeholder="Quantity" 
              value={formData.quantity} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Submit Request
            </motion.button>
          </form>
        </motion.div>
      </div>

      {showPopup && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold text-gray-700">Request Submitted Successfully!</p>
            <button onClick={() => setShowPopup(false)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">OK</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Request;