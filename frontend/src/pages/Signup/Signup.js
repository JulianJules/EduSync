import React, { useState } from "react";
import './Signup.css'
import { FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [rePasswordShown, setRePasswordShown] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [successMessage, setSuccessMessage] = useState(null);
  
   // Initialize the navigate function
    const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);
  const togglePasswordVisibility2 = () => setRePasswordShown(!rePasswordShown);

 // Function to handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission
  
  // Validate user input (basic example)
  if (!email || !password) {
    setError('All fields are required!');
    return;
  }

  // Reset error state before making request
  setError(null);
  setLoading(true);  // Start loading
  
  try {
    // Sending a POST request to the backend to sign up the user
    const response = await axios.post('https://localhost:4000/api/users/signup', {
      email,
      password
    }, {
      withCredentials: true
    })
    .then(response => {
      //const tokens = response.data.token;
      
      // const id = response.data.id

      //   document.cookie = `token=${tokens}; path=/; Secure;`;
      //   document.cookie = `ID=${id}; path=/; Secure;`;  // Store 'id' as 'userId'

         //console.log('Token set in cookie:', tokens);
      // console.log('User signed up:', response.data); // Logs email and token from the response
    })

    
    // Handle the response (for example, show success message)
    // setSuccessMessage('Account created successfully!');
    setEmail('');
    setPassword('');
    navigate('/study');
  } catch (err) {
    // Handle errors (e.g., user already exists, etc.)
    console.error('Error response:', err.response?.data || err.message || err);
    setError(err.error || 'An error occurred. Please try again.');  } finally {
    setLoading(false);  // Stop loading
  }
};

  return (
    <div className="bodyS">
    <div className="Signup-page">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        {/* Email Input */}
        <div className="Signup-email">
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
            className="S-email"
            // type="email"
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

        {/* Confirm Password Input */}
        <div className="confirm-password">
          <i className="eye-password2" onClick={togglePasswordVisibility2}>
            {rePasswordShown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </i>
          <input
            value={confirmPassword}
            name="confirm-password"
            autoComplete="off"
            type={rePasswordShown ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="re-password"
          />
          <label htmlFor="re-password" className="S-label-password2">
            <span className="S-re-content-password">
              <AiOutlineLock /> Confirm Password
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <input
          disabled={loading}
          className="buttonSU"
          type="submit"
          value={loading ? "Signing Up..." : "SIGN UP"}
        />
        {/* Link to Login page */}
        <p>Already have an account? <Link to="/login">Login here</Link></p>
        {/* Error Message */}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
    </div>
  );
};

export default Signup;

