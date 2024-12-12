import React from "react";
import "../assets/TicketDisplay.css";

const TicketDisplay = ({ currentTickets, maxCapacity }) => {
  const progress = (currentTickets / maxCapacity) * 100;

  return (
    <div className="ticket-display">
      <div className="ticket-count">
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Current Tickets</h2>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>{currentTickets}</p>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default TicketDisplay;