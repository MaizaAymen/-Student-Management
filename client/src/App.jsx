import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import AddEtudiant from "./managestudent/add.jsx";
import StudentTable from "./managestudent/showstudent.jsx";
import Navbar from "./navbar/navbar.jsx";
import Dashboard from "./dashbord/dashbord.jsx";
import "./assets/style/golobal.css"
import Footer from "./dashbord/footer.jsx";
import HomePage from "./maindashbord/dashbordmain.jsx";
import AddCourseForm from "./courses/coures.jsx";
import Auth from './Auth/Auth.jsx';
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddEtudiant />} />
        <Route path="/Auth" element={<Auth />} />
          <Route path="/StudentTable" element={<StudentTable />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/HomePage" element={<HomePage />} />
         <Route path="/AddCourseForm" element={<AddCourseForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
