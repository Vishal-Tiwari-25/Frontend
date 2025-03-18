import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios'

const ViewBook = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null)
  const [filters, setFilters] = useState({ bookId: "", bookName: "", genre: "", author: "", ratings: "" });
  const booksPerPage = 10;

  useEffect(() => {
    const fetchBooks = async () => {
      console.log("Fetched books data:");
      try {
        const response = await axios.get('http://localhost:8080/Book/get-books');
        console.log("Fetched books data:", response.data);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    Object.keys(filters).every((key) =>
      filters[key] ? (book[key] ? book[key].toString().toLowerCase().includes(filters[key].toString().toLowerCase()) : false) : true
    )
  );

  const searchedBooks = filteredBooks.filter((book) =>
    book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(searchedBooks.length / booksPerPage);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8080/Book/delete-book/by-Id/${bookId}`);
      setBooks(books.filter((book) => book.bookId !== bookId));
    }catch(error){
      console.log(error);
    }
    
  };

  const handleUpdate = (book) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };
 
 
  const handleUpdateQuantity = (bookId, newQuantity) => {
    setBooks(books.map(book => book.bookId === bookId ? { ...book, quantity: newQuantity } : book));
  };
 
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedBook(null);
  };
 
  // Add the UpdateQuantityPopup component
// const UpdateQuantityPopup = ({ isOpen, onClose, book, onUpdate }) => {
//   const [quantity, setQuantity] = useState(book ? book.quantity : 0);
 
//   const handleQuantityChange = (e) => {
//     setQuantity(e.target.value);
//   };
 
//   const handleSubmit = async () => {
//     console.log(typeof(quantity));
//     try {
//       const response = await axios.put(`http://localhost:8080/Book/update-book/update-quantity/${book.bookId}`, quantity);
//       if (response.status === 200) {
//         console.log('Quantity updated successfully');
//         onUpdate(book.bookId,quantity);
//       } else {
//         console.error('Failed to update quantity');
//       }
//     }catch(error){
//       console.log(error);
//     }

//     // onUpdate(book.bookId, quantity);
//     onClose();
//   };
 
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h3 className="text-lg font-semibold mb-4">Update Quantity</h3>
//         <input
//           type="number"
//           value={quantity}
//           onChange={handleQuantityChange}
//           className="w-full p-2 border rounded mb-4"
//         />
//         <div className="flex justify-end space-x-2">
//           <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

const UpdateQuantityPopup = ({ isOpen, onClose, book, onUpdate }) => {
  const [quantity, setQuantity] = useState(book ? book.quantity : 0);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value) || 0); // Convert to integer, default to 0 if invalid
  };

  const handleSubmit = async () => {
    const updatedQuantity = parseInt(quantity); // Ensure it's an integer

    if (isNaN(updatedQuantity)) {
      console.error("Invalid quantity entered");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/Book/update-book/update-quantity/${book.bookId}`,
        updatedQuantity,
        {
          headers: { "Content-Type": "application/json" }, // Ensure JSON format
        }
      );

      if (response.status === 200) {
        console.log("Quantity updated successfully");
        onUpdate(book.bookId, updatedQuantity);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Update Quantity</h3>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
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
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBooks.map((book) => (
                  <tr key={book.bookId} className="border-b  text-center">
                    <td className="p-3">{book.bookId}</td>
                    <td className="p-3">{book.bookTitle}</td>
                    <td className="p-3">{book.genre}</td>
                    <td className="p-3">{book.authorName}</td>
                    <td className="p-3">{book.ratings}</td>
                    <td className="p-3">{book.quantity}</td>
                    <td className="p-3 flex gap-3  text-center ml-8">
                      <FaEdit className="text-blue-600 cursor-pointer" onClick={() => handleUpdate(book)}/>
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
      <UpdateQuantityPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        book={selectedBook}
        onUpdate={handleUpdateQuantity}
      />
 
    </div>
  );
};

export default ViewBook;
