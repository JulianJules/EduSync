# EduSync

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

Certification & Key File for HTTPS

#### Steps

##### Clone the repository

git clone https://github.com/JulianJules/EduSync.git

cd EdySync

##### Install backend dependencies

cd backend

npm install

npm install nodemon (if not available)

npm install openssl (If not available)

##### Set up environment variables
Create a backend .env file in the backend folder

PORT=your_port

MONGO_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=random_sha256 value

#### Set up certification & key files (MAC)

In the backend folder:

mkdir cert

cd cert

openssl genrsa -out localhost-key.pem

openssl req -new -key localhost-key.pem -out localhost-csr.pem

openssl x509 -req -days 365 -in localhost-csr.pem -signkey localhost-key.pem -out localhost-cert.pem


When filling out the information, you need to provide one information

When using localhost use must fill out Common Name: localhost

Go into keychain Access, press on System and then certificates. Find the localhost certificate and Always Trust

##### Start the backend server

npm run dev

#### Run the frontend

Make a new terminal

cd frontend

npm install

##### Set up environment variables

Create a backend .env file in the frontend folder if you have HTTPS Setup

HTTPS=true

SSL_CRT_FILE= (Directory Path of the localhost-cert.pem)

SSL_KEY_FILE= (Directory Path of the localhost-key.pem)

Navigate to the frontend directory and start React:

cd frontend

npm start
