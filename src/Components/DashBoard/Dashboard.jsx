
import React from "react";
import Navbar from "../Navbar/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Search, User } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'

const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

const fetchMonthlyData = async () => {
  const bookData = [];
  for (const month of months) {
    try {
      console.log(bookData)
      const response = await axios.get(`http://localhost:8080/issueBook/monthly-count/${month}`);
      bookData.push({ month, books: response.data });
    } catch (error) {
      console.error(`Error fetching data for ${month}:`, error);
    }
  }
  return bookData;
};


const genreData = [
  { name: "Fiction", value: 400 },
  { name: "Non-Fiction", value: 300 },
  { name: "Sci-Fi", value: 200 },
  { name: "Biography", value: 150 },
];

const returnVsIssued = [
  { name: "Returned", value: 600 },
  { name: "Issued", value: 400 },
];

const usersWithDeadlines = [
  { name: "John Doe", book: "The Great Gatsby", deadline: "2025-03-14" },
  { name: "Jane Smith", book: "1984", deadline: "2025-03-15" },
  { name: "Alice Johnson", book: "To Kill a Mockingbird", deadline: "2025-03-14" },
  { name: "Bob Brown", book: "Moby Dick", deadline: "2025-03-15" },
  { name: "Emma Wilson", book: "War and Peace", deadline: "2025-03-14" },
  { name: "Liam Martinez", book: "The Catcher in the Rye", deadline: "2025-03-15" },
  { name: "Olivia Taylor", book: "Pride and Prejudice", deadline: "2025-03-14" },
  { name: "Noah Anderson", book: "Ulysses", deadline: "2025-03-15" },
];

const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

// Get today's and tomorrow's date
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

// Format the date to match the dataset format (YYYY-MM-DD)
const formatDate = (date) => date.toISOString().split("T")[0];

// Filter users with deadlines for today and tomorrow
const filteredUsers = usersWithDeadlines.filter(user =>
  user.deadline === formatDate(today) || user.deadline === formatDate(tomorrow)
);



const Dashboard = () => {

    //navigate option to profile page
const navigate = useNavigate();

//handle profile click
const handleProfileClick = () => {
    navigate("/profile");
}

  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchMonthlyData();
      setBookData(data);
    };
    getData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 border rounded-md p-2 bg-gray-100 w-1/3">
            <Search className="text-gray-500" size={20} />
            <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-full" />
          </div>
          <button 
          onClick={handleProfileClick}
          className="p-2 bg-white rounded-full shadow-md">
            <User size={24} />
          </button>
        </div>

        {/* Charts Layout */}
        <div className="grid grid-cols-3 gap-4">
          {/* Bar Chart (Books Borrowed) */}
          <div className="bg-white p-4 rounded-lg shadow-md col-span-2 h-[270px]">
      <h2 className="text-md font-semibold mb-2">Books Borrowed (Last 12 Months)</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={bookData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="books" fill="#EB3678" />
        </BarChart>
      </ResponsiveContainer>
    </div>

          {/* Genre Distribution Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md h-[250px]">
            <h2 className="text-md font-semibold mb-2">Genre Distribution</h2>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Returned vs Issued Books Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md h-[250px]">
            <h2 className="text-md font-semibold mb-2">Returned vs Issued Books</h2>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={returnVsIssued}
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  fill="#82ca9d"
                  dataKey="value"
                >
                  {returnVsIssued.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Scrollable Table for User Deadlines */}
          <div className="bg-white p-4 rounded-lg shadow-md col-span-2 h-[270px]">
            <h2 className="text-md font-semibold mb-2">Books Due Today & Tomorrow</h2>
            <div className="overflow-x-auto overflow-y-auto max-h-[220px]">
              <table className="w-full border-collapse">
                <thead className="bg-gray-200 sticky top-0">
                  <tr className="text-left">
                    <th className="p-2 border">User Name</th>
                    <th className="p-2 border">Book</th>
                    <th className="p-2 border">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr key={index} className="border hover:bg-gray-100">
                        <td className="p-2 border">{user.name}</td>
                        <td className="p-2 border">{user.book}</td>
                        <td className="p-2 border">{user.deadline}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="p-2 border text-center text-gray-500">
                        No books due today or tomorrow.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
