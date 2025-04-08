"use client"

import { useState } from "react"
import "./nav.css"
import HomePage from "../maindashbord/dashbordmain.jsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/nav">Student </a>
        </div>

        <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/StudentTable" className="nav-link active">
                SHOW ALL STUDENTS
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                ADD STUDENT
              </a>
            </li>
            <li className="nav-item">
              <a href="/AddCourseForm" className="nav-link">
                Add COURSE
              </a>
            </li>
            <li className="nav-item">
              <a href="/HomePage" className="nav-link">
                DASHBOARD
              </a>
            </li>
            <li className="nav-item">
              <a href="/HomePage" className="nav-link">
                PROFILE
              </a>
            </li>

          </ul>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`toggle-bar ${isOpen ? "open" : ""}`}></span>
          <span className={`toggle-bar ${isOpen ? "open" : ""}`}></span>
          <span className={`toggle-bar ${isOpen ? "open" : ""}`}></span>
        </div>
      </div>
    </nav>
  )
}

