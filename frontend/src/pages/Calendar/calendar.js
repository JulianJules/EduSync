import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar'; // Import Navbar
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default calendar styles
import './calendar.css'; // Custom styles for the calendar page
import Modal from './Modal'; // Import the Modal component

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Open the modal to view tasks for the selected date
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Add a new assignment to the selected date
  const addAssignment = (assignmentText) => {
    const dateString = date.toDateString();
    const updatedTasks = {
      ...tasks,
      [dateString]: [
        ...(tasks[dateString] || []),
        { type: 'assignment', text: assignmentText },
      ],
    };
    setTasks(updatedTasks);
  };

// Function to check if a date has assignments
const tileClassName = ({ date, view }) => {
  if (view === "month") { // Only apply the class for the month view
    const dateString = date.toDateString(); // Format the date as a string
    if (tasks[dateString] && tasks[dateString].length > 0) {
      return "assignment-day"; // CSS class for days with assignments
    }
  }
  return null; // No class for days without assignments
};


  return (
    <div className="home-container">
      <Navbar />
      <div className="calendar-page">
        <h2 className="calendar-title">Your Study Calendar</h2>
        
        <div className="calendar-container">
          {/* Calendar */}
          <Calendar 
            onChange={handleDateChange}
            value={date}
            className="calendar" 
            tileClassName={tileClassName}
          />

          {/* Button to view tasks for selected date */}
          <button className="view-tasks-btn" onClick={openModal}>
            View Tasks for {date.toDateString()}
          </button>
        </div>
      </div>

      {/* Modal for displaying tasks */}
      <Modal 
        isOpen={isModalOpen} 
        date={date} 
        tasks={tasks} 
        addAssignment={addAssignment} 
        closeModal={closeModal} 
      />
    </div>
  );
};

export default CalendarPage;


