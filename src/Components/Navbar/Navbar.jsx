import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaUserPlus, FaUsers, FaClipboardList, FaExchangeAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="h-screen w-16 md:w-60 bg-gray-900 text-white flex flex-col items-center md:items-start p-4 space-y-6">
      <h2 className="hidden md:block text-xl font-bold">GranthKosh</h2>

      <nav className="flex flex-col space-y-4 w-full">
        <SidebarItem icon={<FaHome />} text="Home" route="/dashboard" />
        <SidebarItem icon={<FaBook />} text="Add Book" route="/add-book" />
        <SidebarItem icon={<FaUserPlus />} text="Add User" route="/add-user" />
        <SidebarItem icon={<FaClipboardList />} text="View Books" route="/view-book" />
        <SidebarItem icon={<FaUsers />} text="View Users" route="/view-user" />
        <SidebarItem icon={<FaExchangeAlt />} text="Issue/Return Book" route="/issuereturn" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, route }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className="flex items-center md:justify-start justify-center w-full p-2 hover:bg-gray-700 rounded-lg cursor-pointer transition"
    >
      <span className="text-xl">{icon}</span>
      <span className="ml-4 hidden md:block">{text}</span>
    </div>
  );
};

export default Navbar;
