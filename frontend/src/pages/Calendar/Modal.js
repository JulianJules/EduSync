import React, { useState } from 'react';
import './Modal.css'; // We'll style the modal here

const Modal = ({ isOpen, date, tasks, addAssignment, closeModal }) => {
  const [newAssignment, setNewAssignment] = useState('');

  if (!isOpen) return null; // Don't show the modal if it is closed

  const selectedDateString = date.toDateString();
  const selectedDateTasks = tasks[selectedDateString] || [];

  const handleAddAssignment = () => {
    if (newAssignment.trim()) {
      addAssignment(newAssignment);
      setNewAssignment(''); // Clear the input field
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Tasks Due on {selectedDateString}</h3>

        {/* Show tasks for selected date */}
        <div className="task-list">
          {selectedDateTasks.length > 0 ? (
            selectedDateTasks.map((task, index) => (
              <div key={index} className="task-item">
                <span className={task.type === 'assignment' ? 'assignment' : 'quiz'}>
                  {task.type === 'assignment' ? 'Assignment: ' : 'Quiz: '}
                  {task.text}
                </span>
              </div>
            ))
          ) : (
            <p>No tasks for this date.</p>
          )}
        </div>

        {/* Add new Assignment */}
        <div className="task-input">
          <input
            type="text"
            placeholder="Enter new assignment"
            value={newAssignment}
            onChange={(e) => setNewAssignment(e.target.value)}
          />
          <button onClick={handleAddAssignment}>Add Assignment</button>
        </div>

        <button className="close-btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;

