const mongoose = require("mongoose");

// Define the StudySchedule Schema with everything in one schema
const studyScheduleSchema = new mongoose.Schema({
// user_id: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true },
  subject: { type: String, default: null },
  examDate: { type: String, default: null }, 
  studyDuration: { type: String, default: null }, 
  studyDays: { type: [String], default: null }, 
  // totalHours: {
  //   type: Number,
  //   required: true, // Total number of hours
  // },
  // sessionDuration: {
  //   type: Number,
  //   required: true, // Duration of each session in minutes
  // },
  // studyDays: {
  //   type: [String],
  //   enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Valid days of the week
  //   required: true, // Days when study sessions are held
  // },
  sessions: [
    {
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true, // Day of the week (e.g., "Monday")
      },
      time_slots: [
        {
          time: {
            type: String,
            required: true, // Time in 12-hour format (e.g., "09:00 AM")
          },
          subject: {
            type: String,
            required: true, // Subject name (e.g., "Mathematics")
          },
        },
      ], // Array of time slots for that day
    },
  ], // Array of sessions
});

// Create and export the model
module.exports = mongoose.model('StudySchedule', studyScheduleSchema);


