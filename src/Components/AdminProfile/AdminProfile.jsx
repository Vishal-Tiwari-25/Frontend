import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Save, Edit2, LucideHome } from "lucide-react";
import { useNavigate } from "react-router-dom";


const AdminProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    name: "John Doe",
    dob: "1990-05-15",
    age: "34",
    gender: "Male",
    email: "admin@example.com",
    phone: "+91 98765 43210",
    address: "123, Library Road, Pune",
    role: "Library Admin",
  });

  const handleChange = (e) => {
    setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
  };

  const handleGoBack = () => {
    navigate("/dashboard"); // Navigate to the dashboard page
  };

  return (
    <>  
    
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#111827] p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl text-white"
            >

        <button
          onClick={handleGoBack}
          className="absolute top-10 right-40 flex items-center space-x-2 text-white hover:text-gray-300 transition"
        >
          <LucideHome size={24} />
          <span>Back to dashboard</span>
        </button>

                {/* Profile Header */}
                <div className="flex items-center space-x-6">
                <img
                    src="https://tse1.mm.bing.net/th?id=OIP.Ft2_B2dl_HsB8FkLIqsprQHaLG&pid=Api&P=0&h=180"
                    alt="Admin Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <div>
                    <h1 className="text-3xl font-bold">{adminDetails.name}</h1>
                    <p className="text-lg opacity-80">{adminDetails.role}</p>
                </div>
                </div>

                {/* Profile Details */}
                <div className="mt-6 grid grid-cols-2 gap-6">
                {Object.keys(adminDetails).map((key) => (
                    key !== "role" && (
                    <div key={key} className="flex flex-col">
                        <label className="text-sm opacity-80 capitalize">{key.replace("_", " ")}</label>
                        {isEditing ? (
                        <input
                            type="text"
                            name={key}
                            value={adminDetails[key]}
                            onChange={handleChange}
                            className="mt-1 px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        ) : (
                        <p className="mt-1 text-lg font-medium">{adminDetails[key]}</p>
                        )}
                    </div>
                    )
                ))}
                </div>

                {/* Edit Button */}
                <div className="mt-6 flex justify-end">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white text-[#EB3678] font-semibold rounded-md hover:bg-gray-200 transition"
                >
                    {isEditing ? <Save size={20} /> : <Edit2 size={20} />}
                    <span>{isEditing ? "Save Details" : "Edit Details"}</span>
                </button>
                </div>
            </motion.div>
        </div>
    </>
  );
};

export default AdminProfile;