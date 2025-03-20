
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import axios from 'axios'
 
const LibraryUnlockAnimation = ({ progress }) => {
  const openAmount = progress * 20; // Adjust the opening effect
 
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Library Base */}
      <rect x="50" y="50" width="100" height="100" fill="#8B5CF6" stroke="black" strokeWidth="3" rx="5" />
     
      {/* Locked Door */}
      <motion.rect
        x="90"
        y="90"
        width="20"
        height="40"
        fill="#4C1D95"
        stroke="black"
        strokeWidth="2"
        initial={{ x: 0 }}
        animate={{ x: -openAmount }}
        transition={{ duration: 0.5 }}
      />
     
      {/* Right Door */}
      <motion.rect
        x="90"
        y="90"
        width="20"
        height="40"
        fill="#4C1D95"
        stroke="black"
        strokeWidth="2"
        initial={{ x: 0 }}
        animate={{ x: openAmount }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  );
};
 
const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });
 
  const filledFields = Object.values(formData).filter((value) => value !== "").length;
  const progress = filledFields / Object.keys(formData).length;
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/Users/add-user", formData);
      console.log('User data submitted: ', response.data);
      setFormData({
          name: "",
          email: "",
          phone: "",
          gender: "",
          dob: "",
      })
    }catch(error){
      console.log("error submiting form: ", error);
    }
  }
 
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar on the left */}
      <Navbar />
 
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="flex items-center space-x-12">
          {/* Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg space-y-4 bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </motion.div>
 
              <motion.div whileHover={{ scale: 1.05 }}>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </motion.div>
            </div>
 
            <motion.div whileHover={{ scale: 1.05 }}>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </motion.div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </motion.div>
 
              <motion.div whileHover={{ scale: 1.05 }}>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </motion.div>
            </div>
 
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Add User
            </motion.button>
          </motion.form>
 
          {/* Animated Library SVG */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hidden md:block"
          >
            {/* <LibraryUnlockAnimation progress={progress} /> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
 
export default AddUser;