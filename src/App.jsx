import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Landing from './Components/Landing/Landing'
import SignIn from "./Components/SignIn/SignIn";
import Dashboard from "./Components/DashBoard/Dashboard";
import AdminProfile from "./Components/AdminProfile/AdminProfile";
import AddUser from "./Components/Adduser/AddUser";
import AddBook from "./Components/Addbook/AddBook";
import ViewBook from "./Components/Viewbook/ViewBook";
import ViewUser from "./Components/Viewuser/ViewUser";
import IssueReturnBook from "./Components/IssueReturn/IssueReturn";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} /> 
          <Route path="/profile" element={<AdminProfile/>}/>
          <Route path="/add-user" element={<AddUser/>}/>
          <Route path="/add-book" element={<AddBook/>}/>
          <Route path="/view-book" element={<ViewBook/>}/>
          <Route path="/view-user" element={<ViewUser/>}/>
          <Route path="/issuereturn" element={<IssueReturnBook/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
