import React, { useState, useEffect, useRef, useReducer } from 'react';
import './Navbar.css'; // Import your CSS file here
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';




const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    /*Delays it so when logging out the cookie can be updated before 
      this runs for a third time when setIsLoggedIn is set to false */
    setTimeout(() => {
      getCookie(); 
    }, 100);
  }, []);  

  const handleLogout = async () => {
      try {
        const response = await axios.post('https://localhost:4000/api/navbar/logout', {}, { withCredentials: true });
        console.log(response);
  localStorage.removeItem("chatMessages");  
  localStorage.removeItem("scheduleData");
      } catch (error) {
        console.error('Error during logout:', error);
      }
      setIsLoggedIn(false)
      navigate('/');

  };
  
  const getCookie = async () => {
    try {
      const response = await axios.get('https://localhost:4000/api/navbar/cookie', {
        withCredentials: true
      });
        console.log(response)

        if (response.data.loggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          // Clear localStorage if unauthorized
          localStorage.removeItem("scheduleData");
          localStorage.removeItem("chatMessages"); // Add any other keys you want to clear
        }
        setIsLoggedIn(response.data.loggedIn)
    } catch (error) {
      console.error('Error checking login status:', error);
          // In case of an error (e.g., network issue), clear localStorage
    localStorage.removeItem("scheduleData");
    localStorage.removeItem("chatMessages"); // Add any other keys you want to clear
    }
  };
  
  return (
    <div >
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">AI Study Assistant</div>
        <div className="nav-links">
        {/* <Link to={isLoggedIn ? "/dash" : "/"}>
        {isLoggedIn ? "Dashboard" : "Home"}
      </Link> */}
      {isLoggedIn ? (
        <>
          <Link to="/study">Study Timetable</Link>
          <Link to="/setting">Settings</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
        </div>
                {/* Conditional rendering of Log In / Log Out button
                <button className="nav-btn" onClick={toggleLogin}>
          {isLoggedIn ? "Log Out" : "Log In"}
        </button> */}
      </nav>
      </div>
  );
};

export default App;
