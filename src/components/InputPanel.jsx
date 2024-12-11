import React from "react";
import "../assets/InputPanel.css";

const InputPanel = ({
  totalTickets,
  vendorRate,
  customerRate,
  maxCapacity,
  setTotalTickets,
  setVendorRate,
  setCustomerRate,
  setMaxCapacity,
  handleAddTickets,
  resetConfiguration,
  isRunning,
  setIsRunning,
}) => {
  return (
    <div className="input-panel">
      <h2>Input</h2>
      <label>
        Total Tickets:
        <input
          type="number"
          value={totalTickets}
          onChange={(e) => setTotalTickets(Number(e.target.value))}
        />
      </label>
      <label>
        Vendor Release Rate (tickets/sec):
        <input
          type="number"
          value={vendorRate}
          onChange={(e) => setVendorRate(Number(e.target.value))}
        />
      </label>
      <label>
        Customer Retrieval Rate (tickets/sec):
        <input
          type="number"
          value={customerRate}
          onChange={(e) => setCustomerRate(Number(e.target.value))}
        />
      </label>
      <label>
        Maximum Ticket Capacity:
        <input
          type="number"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(Number(e.target.value))}
        />
      </label>
      <button onClick={handleAddTickets}>Add Tickets</button>
      <button onClick={resetConfiguration} className="reset-button">
        Reset Configuration
      </button>
      <button
        onClick={() => setIsRunning((prev) => !prev)}
        className={isRunning ? "stop-button" : "start-button"}
      >
        {isRunning ? "Stop System" : "Start System"}
      </button>
    </div>
  );
};

export default InputPanel;
