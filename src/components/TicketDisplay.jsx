import React from "react";
import "../assets/TicketDisplay.css";

const TicketDisplay = ({ currentTickets, maxCapacity }) => {
  const progress = (currentTickets / maxCapacity) * 100;

  return (
    <div className="ticket-display">
      <div className="ticket-info">
        <h2>Current Tickets</h2>
        <p>{currentTickets}</p>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default TicketDisplay;