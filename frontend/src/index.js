import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/login'; // Assuming you have a Login component
import StudyTable from './pages/studyTable/studyTable';
import Settings from './pages/Settings/settings';
import Home from './pages/Home/home'
import Dashboard from './pages/Dashboard/dashboard';
import Calendar from './pages/Calendar/calendar';

// useEffect(() => {
//   if ('serviceWorker' in navigator && 'PushManager' in window) {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then((registration) => {
//         console.log('Service Worker registered:', registration);
//       })
//       .catch((error) => {
//         console.error('Service Worker registration failed:', error);
//       });
//   }
// }, []);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Define the routes for Signup and Login */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/study" element={<StudyTable />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
