import React from 'react';
import './studyTable.css'; // Import the corresponding CSS file

const ScheduleCard = ({ day, events }) => {
  return (
    <div className="card">
      <h3 className="card-header">{day}</h3>
      {events.map((event, index) => (
        <div key={index} className={event.type === 'event' ? 'sub-header' : 'event'}>
          {event.details.map((detail, idx) => (
            <p key={idx}>{detail}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScheduleCard;
