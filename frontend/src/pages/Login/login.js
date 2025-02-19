import React, { useState } from "react";
import './login.css'
import { FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);

  // Initialize the navigate function
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }
    try {
      // Sending a POST request to the backend to sign up the user
      const response = await axios.post('https://localhost:4000/api/users/login', {
        email,
        password
      }, {
        withCredentials: true
      })

      console.log(response)
      setEmail('');
      setPassword('');
      navigate('/study');
      
    } catch (err) {
      // Handle errors (e.g., user already exists, etc.)
      console.log(err.response.data.message)
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);  // Stop loading
    }
  };

  return (
    <div className="bodyS">
      <div className="Signup-page">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          {/* Email Input */}
          <div className="Signup-email">
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
              className="S-email"
            />
            <label htmlFor="S-email" className="S-label-email">
              <span className="S-content-email">
                <FiMail /> Email
              </span>
            </label>
          </div>

          {/* Password Input */}
          <div className="Signup-password">
            <i className="eye-password" onClick={togglePasswordVisibility}>
              {passwordShown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </i>
            <input
              value={password}
              name="password"
              autoComplete="off"
              type={passwordShown ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="S-password"
            />
            <label htmlFor="S-password" className="S-label-password">
              <span className="S-content-password">
                <AiOutlineLock /> Password
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <input
            disabled={isLoading}
            className="buttonSU"
            type="submit"
            value={isLoading ? "Logging In..." : "LOGIN"}
          />
        {/* Link to Sign up page */}
        <p>Don't have an account? <Link to="/signup">Sign Up here</Link></p>
          {/* Error Message */}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
