import React from 'react';
import './home.css'; // Import the CSS file
import { Link } from "react-router-dom";
import Navbar from '../Navbar/Navbar'; // Import the Navbar component


const Home = () => {
  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your AI-Powered Study Assistant</h1>
          <p>Get personalized study plans, track your habits, and stay organized with AI-driven insights.</p>
          <Link to={"/signup"}>
          <button className="cta-btn">
            {"Get Started"}
          </button>
        </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Main Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>AI Chatbot</h3>
            <p>Get personalized help with assignments and words of affirmation.</p>
          </div>
          <div className="feature-card">
            <h3>Planner & Calendar</h3>
            <p>Organize assignments, quizzes, and exams in one place.</p>
          </div>
          <div className="feature-card">
            <h3>Habit Tracker</h3>
            <p>Build better habits with AI-recommended routines.</p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
