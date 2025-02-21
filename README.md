# EdySync

Overview

EduSync is a full-stack web application designed to assist students in managing their academic lives. It includes features such as a chatbot with real-time responses, a dynamic study timetable, a habit tracker, and words of affirmation to support students' well-being.

## Tech Stack

### Frontend

React.js: A modern JavaScript library for building dynamic user interfaces.

Axios: Used for API communication between frontend and backend.

localStorage: Enables data persistence for user settings and preferences.

Server-Sent Events (SSE): Implements real-time chatbot responses.

### Backend

Node.js & Express.js: Provides a robust and scalable server-side framework.

MongoDB (Atlas): NoSQL database for storing user data and chatbot interactions.

JWT HTTPOnly Cookies: Secure user authentication and session management.

Helmet.js: Enhances security by setting HTTP headers appropriately.

CORS: Enables secure cross-origin requests.

Rate Limiting: Protects against abuse by limiting the number of API requests per minute.

HTTPS with SSL Certificates: Ensures secure communication between client and server.

#### Features

Words of Affirmation: Encouraging messages sent via notifications or chatbot.

Events Manager: Displays school and personal events in chronological order.

Habit Tracker: AI-suggested or user-defined habits with progress tracking.

Daily/Weekly Planner: Schedules tasks, assignments, and exams with prioritization.

Chatbot: Provides real-time student support and guidance.

## Installation

#### Prerequisites

Ensure you have the following installed on your system:

Node.js & npm.

MongoDB Atlas account.

OpenAI API key (if required for AI responses).

#### Steps

##### Clone the repository

git clone https://github.com/JulianJules/EdySync.git

cd student-helper-ai.

##### Install dependencies

npm install

##### Set up environment variables
Create a .env file in the root directory and add:

PORT=your_port.
MONGO_URI=your_mongodb_uri.

##### Start the backend server

npm start.

##### Run the frontend
Navigate to the frontend directory and start React:

cd frontend.
npm start.

