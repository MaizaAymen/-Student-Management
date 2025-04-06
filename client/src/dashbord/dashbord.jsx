import { useState, useEffect } from "react";
import axios from "axios";
import "./dashbord.scss";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0); // State for student count

  useEffect(() => {
    // Fetch courses from FastAPI
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/courses/");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    // Fetch total students from FastAPI
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get("http://localhost:8000/etudiants/count");
        setTotalStudents(response.data.total_students);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    fetchCourses();
    fetchStudentCount();
  }, []);

  const stats = [
    { title: "Total Students", count: totalStudents, change: "+12%", icon: "👨‍🎓" },
    { title: "Active Courses", count: courses.length, change: "+2", icon: "📚" },
    { title: "Average Grade", count: "78%", change: "+5%", icon: "📊" },
    { title: "Attendance Rate", count: "92%", change: "+3%", icon: "📅" },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        
       
      </div>

      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <div className="stat-count">{stat.count}</div>
              <div className="stat-change">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-button">Add Student</button>
            <button className="action-button">Record Grades</button>
            <button className="action-button">Take Attendance</button>
            <button className="action-button">Generate Reports</button>
          </div>
        </div>

        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            {courses.length > 0 ? (
              courses.map((course) => (
                <li key={course._id} className="activity-item">
                  <div className="activity-info">
                    <span className="activity-action">New Course Added:</span>
                    <span className="activity-student">{course.name}</span>
                  </div>
                  <span className="activity-time">{course.created_at || "Recently"}</span>
                </li>
              ))
            ) : (
              <li>No recent courses available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
