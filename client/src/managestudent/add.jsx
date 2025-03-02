"use client"

import { useState } from "react"
import axios from "axios"
import "./add.css"
import Navbar from "../navbar/navbar.jsx";

function AddEtudiant() {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [speciality, setSpeciality] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    const studentData = {
      nom,
      prenom,
      speciality,
      email,
      age: age ? Number.parseInt(age) : undefined,
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/etudiants/", studentData)
      console.log("Student added:", response.data)

      // Clear form after successful submission
      setNom("")
      setPrenom("")
      setSpeciality("")
      setEmail("")
      setAge("")
    } catch (error) {
      console.error("There was an error!", error)
    }
  }

  return (
      <div>
        <Navbar/>
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Add New Student</h2>
          <p>Enter the student details to register them in the system</p>
        </div>

        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-group">
            <label htmlFor="nom">Last Name</label>
            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prenom">First Name</label>
            <input
              id="prenom"
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="First Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="speciality">Speciality</label>
            <input
              id="speciality"
              type="text"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              placeholder="Speciality"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
          </div>

          <button type="submit" className="submit-button">
            Add Student
          </button>
        </form>

        <div className="form-footer">
          <p>All fields except age are required</p>
        </div>
      </div>
    </div>
        </div>
  )
}

export default AddEtudiant

