const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    type: { 
        type: String, 
        enum: ['assignment', 'quiz', 'exam'], },
    title: { 
        type: String,  },
    description: { 
        type: String },
    due_date: { 
        type: Date,  }, // Date to display on the calendar
    subject: { 
        type: String }, // Optional: for organizing tasks by subject
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        default: 'medium' },
    is_completed: { 
        type: Boolean, 
        default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model("Calendar", calendarSchema);