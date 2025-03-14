import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaEdit, FaTrash } from "react-icons/fa";

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ bookId: "", bookName: "", genre: "", author: "", ratings: "" });
  const booksPerPage = 10;

  useEffect(() => {
    const fetchedBooks = Array.from({ length: 50 }, (_, i) => ({
      bookId: `BID${i + 1}`,
      bookName: `Book ${i + 1}`,
      genre: ["Fiction", "Non-fiction", "Sci-Fi", "Mystery", "Biography"][i % 5],
      author: "Author " + (i + 1),
      ratings: Math.floor(Math.random() * 5) + 1,
      quantity: Math.floor(Math.random() * 20) + 1,
    }));
    setBooks(fetchedBooks);
  }, []);

  const filteredBooks = books.filter((book) =>
    Object.keys(filters).every((key) =>
      filters[key] ? book[key].toString().toLowerCase().includes(filters[key].toString().toLowerCase()) : true
    )
  );

  const searchedBooks = filteredBooks.filter((book) =>
    book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(searchedBooks.length / booksPerPage);

  const handleDelete = (bookId) => {
    setBooks(books.filter((book) => book.bookId !== bookId));
  };

  return (
    <div className="flex max-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6 overflow-hidden relative">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-2/3">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <FaFilter
              className="text-xl cursor-pointer text-gray-600 hover:text-indigo-600"
              onClick={() => setFilterOpen(!filterOpen)}
            />
          </motion.div>
        </div>

        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bg-white p-4 shadow-lg rounded-md top-12 left-0 right-0 z-10"
          >
            <div className="grid grid-cols-3 gap-4">
              <input type="text" placeholder="Book ID" className="p-2 border rounded" onChange={(e) => setFilters({ ...filters, bookId: e.target.value })} />
              <input type="text" placeholder="Book Name" className="p-2 border rounded" onChange={(e) => setFilters({ ...filters, bookName: e.target.value })} />
              <input type="text" placeholder="Author" className="p-2 border rounded" onChange={(e) => setFilters({ ...filters, author: e.target.value })} />
              <select className="p-2 border rounded" onChange={(e) => setFilters({ ...filters, genre: e.target.value })}>
                <option value="">Genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Mystery">Mystery</option>
                <option value="Biography">Biography</option>
              </select>
              <input type="number" placeholder="Ratings" className="p-2 border rounded" onChange={(e) => setFilters({ ...filters, ratings: e.target.value })} />
            </div>
          </motion.div>
        )}

        <div className="overflow-hidden">
          <div className="h-[400px] overflow-y-auto">
            <table className="w-full border-collapse border bg-white shadow-md">
              <thead>
                <tr className="bg-indigo-500 text-white">
                  <th className="p-3">Book ID</th>
                  <th className="p-3">Book Name</th>
                  <th className="p-3">Genre</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Ratings</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBooks.map((book) => (
                  <tr key={book.bookId} className="border-b  text-center">
                    <td className="p-3">{book.bookId}</td>
                    <td className="p-3">{book.bookName}</td>
                    <td className="p-3">{book.genre}</td>
                    <td className="p-3">{book.author}</td>
                    <td className="p-3">{book.ratings}</td>
                    <td className="p-3 flex gap-3  text-center ml-8">
                      <FaEdit className="text-blue-600 cursor-pointer" />
                      <FaTrash className="text-red-600 cursor-pointer" onClick={() => handleDelete(book.bookId)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination with numbers */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === i + 1 ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
