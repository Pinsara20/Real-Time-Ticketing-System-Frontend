import React from "react";
import "../assets/TicketDisplay.css";

const TicketDisplay = ({ currentTickets }) => {
  return (
    <div className="ticket-display">
      <h2>Current Tickets</h2>
      <p>{currentTickets}</p>
    </div>
  );
};

export default TicketDisplay;
