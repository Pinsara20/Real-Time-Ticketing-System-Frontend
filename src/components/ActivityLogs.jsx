import React from "react";
import "../assets/ActivityLogs.css";

const ActivityLogs = ({ logs, startSystem, stopSystem, resetConfiguration, isRunning }) => {
  return (
    <div className="activity-logs">
      <h2>Activity Logs</h2>
      <div className="buttons">
        <button onClick={startSystem} disabled={isRunning}>
          Start System
        </button>
        <button onClick={stopSystem} disabled={!isRunning}>
          Stop System
        </button>
        <button onClick={resetConfiguration}>
          Reset Configuration
        </button>
      </div>
      <div className="logs">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogs;