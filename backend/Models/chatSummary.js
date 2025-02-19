const mongoose = require("mongoose");

const studyModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User collection
    ref: "User",
    required: true,
  },
  thread_id: {
    type: String,
  },
  assistant_id: {
    type: String,
  },
  messages: [
    {
      sender: { type: String, required: true }, // "user" or "bot"
      text: { type: String, required: true }, // Chat message content
      timestamp: { type: Date, default: Date.now }, // When the message was sent
    },
  ],
});

  module.exports = mongoose.model("studyModel", studyModel);
  