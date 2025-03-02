"use client"

import { useForm } from "react-hook-form"
import axios from "axios"
import "./course.css"
import Navbar from "../navbar/navbar.jsx";

export default function AddCourseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/courses/", data)
      console.log("Course added:", response.data)
      reset() // Reset form after submission
    } catch (error) {
      console.error("Error adding course:", error)
    }
  }

  return (
      <>
      <nav>
        <Navbar/>
      </nav>
    <div className="form-container">
      <h2 className="form-title">Add Course</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="course-form">
        <div className="form-group">
          <label className="form-label">Course Name</label>
          <input
            {...register("name", { required: "Course name is required" })}
            className="form-input"
            placeholder="Enter course name"
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            {...register("description")}
            className="form-textarea"
            placeholder="Enter course description"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <div className="price-input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className="form-input price-input"
              placeholder="0.00"
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          Add Course
        </button>
      </form>
    </div>
        </>
  )
}

