import { useState, useEffect } from "react";
import axios from "axios";
import { data } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import scheduleCard from "./scheduleCard";
import "./studyTable.css";
import "./card.css";

axios.defaults.baseURL = "https://localhost:4000"; // Backend URL

const getCookie = async (req, res) => {
  console.log("TEST");
  const response = await axios.post(
    "https://localhost:4000/api/navbar/id", {},
    { withCredentials: true }
  );
  console.log(response.data.id);
  return response.data.id;
};

function isValidTaskStructure(response) {
  return response && response.sessions && Array.isArray(response.sessions);
}

const StudyTimetable = () => {
    // State to track the current week index
    const [currentWeek, setCurrentWeek] = useState(1);
      // State to store the schedule (this will hold the JSON object)
    const [schedule2, setSchedule] = useState([])
    

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const formatTime = (hour) => {
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? "AM" : "PM";
    return `${formattedHour}:00 ${ampm}`;
  };

  const hours = Array.from({ length: 17 }, (_, i) => formatTime(i + 6));

  //const [schedule, setSchedule] = useState();
  const [prebuiltSchedule, setTasks] = useState([]);
  const [expandedCell, setExpandedCell] = useState(null);
  const [chatWindowVisible, setChatWindowVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem("chatMessages")) || []);
  const [userInput, setUserInput] = useState("");
  const [scheduleTest, setTest] = useState(JSON.parse(localStorage.getItem("scheduleData")) || [])
  const [weekData, setWeekData] = useState(null);  // Hold current week data

  // const handleInputChange = (row, col, value) => {
  //   const updatedSchedule = schedule.map((r, i) =>
  //     i === row ? r.map((c, j) => (j === col ? value : c)) : r
  //   );
  //   setSchedule(updatedSchedule);
  // };

  const handleInputFocus = (row, col) => setExpandedCell({ row, col });

  const handleInputBlur = () => {
    setTimeout(() => setExpandedCell(null), 200);
  };

  const toggleChatWindow = () => setChatWindowVisible(!chatWindowVisible);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    setChatMessages((prevMessages) => [...prevMessages, { sender: "user", text: userInput }]);
    setUserInput("");

    try {
      const userId = await getCookie();
      await axios.post("https://localhost:4000/api/openai/habit", { userInput, userId }, { withCredentials: true });

      let accumulatedMessage = "";
      let isLoading = true;
      const eventSource = new EventSource(`https://localhost:4000/api/openai/habit?userId=${userId}`);

      setChatMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "..." }]);

      eventSource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        accumulatedMessage += data.message;
        
        if (data.message) {
          setChatMessages((prevMessages) => {
            const updatedMessages = [
              ...prevMessages.slice(0, -1),
              { sender: "bot", text: accumulatedMessage + (isLoading ? "..." : "") },
            ];

        
            // Save the updated chatMessages to localStorage immediately
            localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
        
            return updatedMessages;
          });
        }
        
      
      if (data.structuredPlan) {
        console.log("Raw structuredPlan:", data.structuredPlan);

        let structuredPlan;
        
        try {
          // Ensure it's always an array
          structuredPlan = typeof data.structuredPlan === "string" 
            ? JSON.parse(data.structuredPlan) 
            : data.structuredPlan;
        
          // If it's an object and not already an array, wrap it in an array
          if (!Array.isArray(structuredPlan)) {
            structuredPlan = [structuredPlan];
          }
          
          console.log("Parsed structuredPlan:", structuredPlan);
          
          // Store in localStorage
          localStorage.setItem("scheduleData", JSON.stringify(structuredPlan));
          
          // Update state
          setTest(structuredPlan);
          
        } catch (error) {
          console.error("Error parsing structuredPlan:", error);
        }
        
      }
        
      };


      eventSource.onerror = function () {
        eventSource.close();
        setSchedule([]);
      };

      eventSource.addEventListener("end", () => {
        isLoading = false;
        setChatMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { sender: "bot", text: accumulatedMessage },
        ]);
      });
    } catch (error) {
      console.error("Error while sending message to backend:", error);
      setChatMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Sorry, there was an error. Please try again." }]);
    }
  };
  
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(scheduleData.length ? scheduleData[0].week : "");
  //const weekData = scheduleData.find(week => week.week === selectedWeek);

  const savedSchedule = localStorage.getItem("scheduleData");

  useEffect(() => {
    
    
    if (savedSchedule) {
      // If data exists in localStorage, parse it and set the schedule
      try {
        const parsedSchedule = JSON.parse(savedSchedule);
        setScheduleData(parsedSchedule);
        console.log("Loaded schedule data from localStorage:", parsedSchedule);
      } catch (error) {
        console.error("Error parsing saved schedule data:", error);
      }
    } else if (scheduleTest) {
      // If no data in localStorage, use the scheduleTest (e.g., from backend or API)
      try {
        const parsedSchedule = typeof scheduleTest === "string" ? JSON.parse(scheduleTest) : scheduleTest;
  
        if (Array.isArray(parsedSchedule)) {
          // Check if each week has a valid 'sessions' array
          parsedSchedule.forEach((week) => {
            if (week && Array.isArray(week.sessions)) {
              console.log("Week with sessions:", week);
            } else {
              console.warn("Week does not have a valid sessions array:", week);
            }
          });
  
          // Update scheduleData and localStorage directly after parsing
          setScheduleData(parsedSchedule);
          localStorage.setItem("scheduleData", JSON.stringify(parsedSchedule));
          console.log("Schedule data updated:", parsedSchedule);
  
        } else if (parsedSchedule && parsedSchedule.sessions && Array.isArray(parsedSchedule.sessions)) {
          // If it's a single week with sessions array, wrap it in an array
          setScheduleData([parsedSchedule]);
          localStorage.setItem("scheduleData", JSON.stringify([parsedSchedule]));
          console.log("Single week schedule data updated:", parsedSchedule);
        } else {
          console.warn("Parsed schedule is not valid:", parsedSchedule);
        }
      } catch (error) {
        console.error("Error parsing scheduleTest:", error);
      }
    }
  }, [scheduleTest]);  // Ensure useEffect runs when scheduleTest changes
  
    // Simulate loading schedule data
    useEffect(() => {
      const savedSchedule = localStorage.getItem("scheduleData");
  
      if (savedSchedule) {
        const parsedSchedule = JSON.parse(savedSchedule);
        setScheduleData(parsedSchedule);
        // If there's schedule data, select the first week
        if (parsedSchedule.length > 0) {
          setSelectedWeek(parsedSchedule[0].week);
          setWeekData(parsedSchedule[0]);  // Set the initial week data
        }
      }
    }, []);

    // Whenever selectedWeek changes, update the weekData
    useEffect(() => {
      if (scheduleData.length > 0 && selectedWeek) {
        const currentWeekData = scheduleData.find(week => week.week === selectedWeek);
        setWeekData(currentWeekData);  // Update weekData based on selected week
      }
    }, [selectedWeek, scheduleData]);
  
  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };


  return (
    <div>
      <Navbar />
      <div className="bodyS">
        <div className="StudyTimetable-page">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Study Timetable</h2>
          
          <div className="week-nav flex justify-center items-center mb-6">
          <select onChange={handleWeekChange} value={selectedWeek} className="week-selector">
        {scheduleData.map((week, index) => (
          <option key={index} value={week.week}>{week.week}</option>
        ))}
      </select>
        </div>
        
        <div className="table-container">
        <table>
          <thead>
            <tr className="bg-gray-300 text-gray-800 text-center">
              <th className="border p-3">Time</th>
              {days.map(day => (
                <th key={day} className="border p-3">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, rowIndex) => (
              <tr key={hour}>
                <td className="hour-cell">{hour}</td>
                {days.map((day, colIndex) => {
                  if (!weekData) return <td key={colIndex}></td>; // If no data for the week

                  // Find session for the current day and time
                  const session = weekData.sessions.find(session => 
                    session.day === colIndex && session.startTime === hour
                  );

                  if (session) {
                    return (
                      <td
                        key={colIndex}
                        className="schedule-card"
                        rowSpan={Math.max(
                          hours.indexOf(session.endTime) - hours.indexOf(session.startTime), 
                          1
                        )}
                        style={{ backgroundColor: session.color || "#f1f1f1" }}
                      >
                        <div className="event-details">
                          <p className="event-name">{session.name}</p>
                          <p className="event-time">{session.startTime} - {session.endTime}</p>
                          <p className="event-description">{session.description}</p>
                        </div>
                      </td>
                    );
                  }
                  return <td key={colIndex}></td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      
        <button className="chat-button" onClick={toggleChatWindow}>💬</button>
        {chatWindowVisible && (
          <div className="chat-window">
            <div className="chat-header">Chat with Study Assistant</div>
            <div className="chat-messages">
              {chatMessages.map((message, index) => (
                <div key={index} className={`chat-message ${message.sender}-message`}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <input type="text" className="chat-input" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Type a message" />
              <button className="chat-send-button" onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyTimetable;



