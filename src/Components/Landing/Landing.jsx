import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#180161] to-[#4F1787] text-white flex flex-col items-center justify-center p-6 md:p-12 text-center">
      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl pt-10 md:text-6xl font-extrabold drop-shadow-lg"
      >
        Welcome to GranthKosh!
      </motion.h1>


      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl"
      >
        Discover, manage, and explore a world of books effortlessly with our modern library management system.
      </motion.p>

      {/* Call to Action */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-6"
      >
        <button 
        onClick={() => {
            navigate("/signin");
        }}
        className="px-6 md:px-8 py-3 md:py-4 bg-[#EB3678] text-white font-bold rounded-xl shadow-lg hover:scale-110 transition-all hover:bg-[#d12e6a]">
          Get Started
        </button>
      </motion.div>

      {/* Animated Bookshelf Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="w-full flex justify-center"
      >
        <svg
          width="100%"
          height="auto"
          viewBox="0 0 300 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-xs md:max-w-md"
        >
          {/* Bookshelf Base */}
          <rect x="20" y="150" width="260" height="20" fill="#180161" rx="4" />
          
          {/* Books */}
          <rect x="30" y="100" width="20" height="50" fill="#FF69B4" rx="2" />
          <rect x="55" y="90" width="20" height="60" fill="#8A2BE2" rx="2" />
          <rect x="80" y="95" width="20" height="55" fill="#00BFFF" rx="2" />
          <rect x="105" y="85" width="20" height="65" fill="#FF4500" rx="2" />
          <rect x="130" y="100" width="20" height="50" fill="#32CD32" rx="2" />
          <rect x="155" y="90" width="20" height="60" fill="#FFD700" rx="2" />
          <rect x="180" y="95" width="20" height="55" fill="#00FA9A" rx="2" />
          <rect x="205" y="85" width="20" height="65" fill="#FF6347" rx="2" />
          
        </svg>
      </motion.div>
    </div>
  );
}
