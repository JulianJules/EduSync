import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import HomeworkChart from './HomeworkChat'; // Import the chart component
import Navbar from '../Navbar/Navbar'; // Import the Navbar component

const Dashboard = () => {
  // Example data to simulate user info and recent activity
  const user = {
    name: "John Doe",
    avatar: "/path/to/avatar.jpg", // Replace with real avatar path
  };

  const recentActivity = [
    { task: "Completed Math Homework", time: "2 hours ago" },
    { task: "Studied Chapter 5 of Biology", time: "1 day ago" },
    { task: "Joined Study Group", time: "3 days ago" },
  ];

  const progress = {
    studyHours: 15,
    tasksCompleted: 10,
    habitsTracked: 7,
  };

  const upcomingEvents = [
    { event: "Math Quiz", date: "2025-02-10" },
    { event: "Science Exam", date: "2025-02-20" },
  ];

  return (
    <div>
      <Navbar />

    <div className="dashboard-container">
      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="user-info">
          {/* <img src={user.avatar} alt="User Avatar" className="avatar" /> */}
          <h1>Welcome back, {user.name}!</h1>
        </div>

        {/* Progress Overview */}
        <div className="progress-overview">
          <div className="progress-item">
            <h3>Study Hours</h3>
            <p>{progress.studyHours} hours this week</p>
          </div>
          <div className="progress-item">
            <h3>Tasks Completed</h3>
            <p>{progress.tasksCompleted} tasks</p>
          </div>
          <div className="progress-item">
            <h3>Habits Tracked</h3>
            <p>{progress.habitsTracked} habits</p>
          </div>
        </div>

        {/* Homework Completion Chart */}
        <div className="homework-chart-container">
          <HomeworkChart /> {/* Include the chart */}
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            {recentActivity.map((activity, index) => (
              <li key={index}>{activity.task} - <span>{activity.time}</span></li>
            ))}
          </ul>
        </div>

        {/* Upcoming Events */}
        <div className="upcoming-events">
          <h2>Upcoming Events</h2>
          <ul>
            {upcomingEvents.map((event, index) => (
              <li key={index}>{event.event} - <span>{event.date}</span></li>
            ))}
          </ul>
        </div>

        {/* Quick Links to Features */}
        <div className="dashboard-links">
          <Link to="/study">
            <button className="dashboard-btn">View Study Timetable</button>
          </Link>
          <Link to="/tasks">
            <button className="dashboard-btn">Manage Tasks</button>
          </Link>
          <Link to="/planner">
            <button className="dashboard-btn">Daily Planner</button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2025 AppName. All rights reserved.</p>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;


