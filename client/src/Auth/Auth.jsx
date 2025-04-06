import { useState } from "react"
import axios from "axios"
import "./Auth.css"

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nom: "",
    prenom: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [inputFocus, setInputFocus] = useState({
    email: false,
    password: false,
    nom: false,
    prenom: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFocus = (field) => {
    setInputFocus({ ...inputFocus, [field]: true })
  }

  const handleBlur = (field) => {
    setInputFocus({ ...inputFocus, [field]: formData[field].length > 0 })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const url = isSignup ? "http://127.0.0.1:8000/auth/signup" : "http://127.0.0.1:8000/auth/login"
    try {
      const response = await axios.post(url, formData)
      if (isSignup) {
        alert("Signup successful, please login!")
        setIsSignup(false)
      } else {
        alert("Login successful!")
        console.log("User Info:", response.data)
      }
      setFormData({
        email: "",
        password: "",
        nom: "",
        prenom: "",
      })
    } catch (error) {
      setError(error.response ? error.response.data.detail : "Something went wrong.")
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsSignup(!isSignup)
    setError(null)
    setFormData({
      email: "",
      password: "",
      nom: "",
      prenom: "",
    })
    setInputFocus({
      email: false,
      password: false,
      nom: false,
      prenom: false,
    })
  }

  return (
    <div className="auth-container">
      <div className="pen-animation">
        <div className="pen">
          <div className="pen-cap"></div>
          <div className="pen-body"></div>
          <div className="pen-tip"></div>
        </div>
        <div className="ink-trail"></div>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">{isSignup ? "Create Account" : "Welcome Back"}</h2>
          <p className="auth-subtitle">{isSignup ? "Sign up to get started" : "Login to your account"}</p>
          <div className="writing-line">
            <svg className="writing-svg" viewBox="0 0 600 30">
              <path
                className="writing-path"
                d="M0,15 C150,5 300,25 600,15"
                fill="none"
                stroke="#6c63ff"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">!</span>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className={`form-group ${inputFocus.email ? "focused" : ""}`}>
            <label className={formData.email.length > 0 ? "active" : ""}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              required
            />
            <span className="input-highlight"></span>
          </div>

          <div className={`form-group ${inputFocus.password ? "focused" : ""}`}>
            <label className={formData.password.length > 0 ? "active" : ""}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")}
              required
            />
            <span className="input-highlight"></span>
          </div>

          <div className={`signup-fields ${isSignup ? "active" : ""}`}>
            <div className={`form-group ${inputFocus.prenom ? "focused" : ""}`}>
              <label className={formData.prenom.length > 0 ? "active" : ""}>First Name</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                onFocus={() => handleFocus("prenom")}
                onBlur={() => handleBlur("prenom")}
                required={isSignup}
              />
              <span className="input-highlight"></span>
            </div>

            <div className={`form-group ${inputFocus.nom ? "focused" : ""}`}>
              <label className={formData.nom.length > 0 ? "active" : ""}>Last Name</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                onFocus={() => handleFocus("nom")}
                onBlur={() => handleBlur("nom")}
                required={isSignup}
              />
              <span className="input-highlight"></span>
            </div>
          </div>

          <button type="submit" className={`submit-btn ${loading ? "loading" : ""}`}>
            <span className="btn-text">{isSignup ? "Sign Up" : "Login"}</span>
            <span className="loading-spinner"></span>
          </button>
        </form>

        <div className="auth-footer">
          <button onClick={toggleMode} className="toggle-btn">
            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth

