
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBookOpen, faBook } from '@fortawesome/free-solid-svg-icons';


//fetching monthly data
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



//for  genre distribution pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6384', '#36A2EB'];

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Dashboard = () => {

    //navigate option to profile page
const navigate = useNavigate();

//handle profile click
const handleProfileClick = () => {
    navigate("/profile");
}

//for dashboard table

const [dueBooks, setDueBooks] = useState([]);

useEffect(() => {
  const fetchDueBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/dashboard/upcoming-due-books');
      setDueBooks(response.data);
    } catch (error) {
      console.error('Error fetching due books:', error);
    }
  };

  fetchDueBooks();
}, []);


//for stats
  const [stats, setStats] = useState({ totalUsers: 0, totalIssuedBooks: 0, totalBooks: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchMonthlyData();
      setBookData(data);
    };
    getData();
  }, []);

  //for fetching genre wise distribution
  const [genreData, setGenreData] = useState([]);

  const fetchGenreData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/dashboard/genre-counts');
      const data = response.data;
      const transformedData = Object.keys(data).map((key) => ({
        name: key,
        value: data[key],
      }));
      setGenreData(transformedData);
    } catch (error) {
      console.error('Error fetching genre data:', error);
    }
  };

  useEffect(() => {
    fetchGenreData();
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length] || getRandomColor()} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

            <div className="bg-white p-6 rounded-xl shadow-lg h-[250px] flex justify-around items-center backdrop-blur-lg">
                    
            {/* Total Users */}
            <div className="relative bg-white/20 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center w-56 h-44 backdrop-blur-lg border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="bg-white/30 p-3 rounded-full shadow-md">
                <FontAwesomeIcon icon={faUsers} className="text-2xl text-blue-500" />
              </div>
              <h3 className="text-md font-medium text-gray-700 mt-2">Total Users</h3>
              <p className="text-3xl font-extrabold text-gray-900">{stats.totalUsers}</p>
            </div>

            {/* Total Issued Books */}
            <div className="relative bg-white/20 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center w-56 h-44 backdrop-blur-lg border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="bg-white/30 p-3 rounded-full shadow-md">
                <FontAwesomeIcon icon={faBookOpen} className="text-2xl text-green-500" />
              </div>
              <h3 className="text-md font-medium text-gray-700 mt-2">Total Issued Books</h3>
              <p className="text-3xl font-extrabold text-gray-900">{stats.totalIssuedBooks}</p>
            </div>

            {/* Total Books */}
            <div className="relative bg-white/20 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center w-56 h-44 backdrop-blur-lg border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="bg-white/30 p-3 rounded-full shadow-md">
                <FontAwesomeIcon icon={faBook} className="text-2xl text-yellow-500" />
              </div>
              <h3 className="text-md font-medium text-gray-700 mt-2">Total Books</h3>
              <p className="text-3xl font-extrabold text-gray-900">{stats.totalBooks}</p>
            </div>
          </div>


        <div className="bg-white p-4 rounded-lg shadow-md col-span-2 h-[270px]">
          <h2 className="text-md font-semibold mb-2">Books Due</h2>
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
                {dueBooks.length > 0 ? (
                  dueBooks.map((book, index) => (
                    <tr key={index} className="border hover:bg-gray-100">
                      <td className="p-2 border">{book.userName}</td>
                      <td className="p-2 border">{book.bookTitle}</td>
                      <td className="p-2 border">{new Date(book.dueDate).toLocaleString()}</td>
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
