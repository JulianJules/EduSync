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

MongoDB (Atlas): NoSQL database for storing user data.

JWT HTTPOnly Cookies: Secure user authentication and session management.

Helmet.js: Enhances security by setting HTTP headers appropriately.

CORS: Enables secure cross-origin requests.

HTTPS with SSL Certificates: Ensures secure communication between client and server.

#### Features

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

cd EduSync

##### Install backend dependencies

cd backend

npm install

npm install nodemon 

##### Set up backend environment variables

Create a .env file in the backend folder

PORT=your_port

MONGO_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=random_sha256 value

#### Set up certification & key files (MAC & Linux)

In the backend folder:

mkdir cert

cd cert

openssl genrsa -out localhost-key.pem

openssl req -new -key localhost-key.pem -out localhost-csr.pem

> When filling out the information, you need to provide one information. When using localhost use must fill out Common Name: localhost

openssl x509 -req -days 365 -in localhost-csr.pem -signkey localhost-key.pem -out localhost-cert.pem


##### Browser to trust the Self Signed Certificate (MAC Only)
Go into keychain Access, press on System and then certificates. Find the localhost certificate and Always Trust.

> It won’t affect the website, but it will remove the "Not Secure" label when accessing it.

##### Start the backend server

npm run dev

#### Run the frontend

Make a new terminal in VS Code

###### Navigate to the frontend directory:

cd frontend

npm install

##### Set up frontend environment variables

Create a .env file in the frontend folder

HTTPS=true

SSL_CRT_FILE= ../backend/cert/localhost-cert.pem

SSL_KEY_FILE= ../backend/cert/localhost-cert.pem

###### Navigate to the frontend directory and start React:

cd frontend

npm start
