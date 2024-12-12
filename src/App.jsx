import React, { useState, useRef } from "react"; 
import InputPanel from "./components/InputPanel";
import TicketDisplay from "./components/TicketDisplay";
import ActivityLogs from "./components/ActivityLogs";
import "./App.css";

const App = () => {
  const [totalTickets, setTotalTickets] = useState(0);
  const [vendorRate, setVendorRate] = useState(1);
  const [customerRate, setCustomerRate] = useState(1);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [currentTickets, setCurrentTickets] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const vendorInterval = useRef(null);
  const customerInterval = useRef(null);

  const addLog = (message) => {
    setLogs((prevLogs) => [message, ...prevLogs]);
  };

  const startSystem = () => {
    if (isRunning) return;
    setIsRunning(true);

    vendorInterval.current = setInterval(() => {
      setCurrentTickets((prev) => {
        const newTotal = prev + vendorRate;
        if (newTotal > maxCapacity) {
          addLog(
            `Vendor tried to add ${vendorRate} ticket(s), but capacity reached.`
          );
          return maxCapacity;
        } else {
          addLog(`Vendor added ${vendorRate} ticket(s). Total: ${newTotal}`);
          return newTotal;
        }
      });
    }, 1000);

    customerInterval.current = setInterval(() => {
      setCurrentTickets((prev) => {
        if (prev >= customerRate) {
          const newTotal = prev - customerRate;
          addLog(
            `Customer bought ${customerRate} ticket(s). Remaining: ${newTotal}`
          );
          return newTotal;
        } else if (prev > 0) {
          addLog(`Customer bought ${prev} ticket(s). Remaining: 0`);
          return 0;
        } else {
          addLog("Customer tried to buy tickets, but none are available.");
          return 0;
        }
      });
    }, 1000);
  };

  const stopSystem = () => {
    setIsRunning(false);
    clearInterval(vendorInterval.current);
    clearInterval(customerInterval.current);
    addLog("System stopped.");
  };

  const handleAddTickets = () => {
    setCurrentTickets((prev) => {
      const newTotal = prev + totalTickets;
      if (newTotal > maxCapacity) {
        addLog(`Added ${maxCapacity - prev} tickets. Capacity reached.`);
        return maxCapacity;
      } else {
        addLog(`Added ${totalTickets} tickets. Total: ${newTotal}`);
        return newTotal;
      }
    });
  };

  const resetConfiguration = () => {
    setTotalTickets(0);
    setVendorRate(1);
    setCustomerRate(1);
    setMaxCapacity(0);
    setCurrentTickets(0);
    setLogs([]);
    setIsRunning(false);
    clearInterval(vendorInterval.current);
    clearInterval(customerInterval.current);
    addLog("Configuration reset.");
  };

  return (
    <div className="container">
      <div className="header">Event Ticketing System</div>
      <div className="main-content">
        <InputPanel
          totalTickets={totalTickets}
          vendorRate={vendorRate}
          customerRate={customerRate}
          maxCapacity={maxCapacity}
          setTotalTickets={setTotalTickets}
          setVendorRate={setVendorRate}
          setCustomerRate={setCustomerRate}
          setMaxCapacity={setMaxCapacity}
          handleAddTickets={handleAddTickets}
        />
        <div className="right-panel">
          <TicketDisplay currentTickets={currentTickets} maxCapacity={maxCapacity} />
          <ActivityLogs
            logs={logs}
            startSystem={startSystem}
            stopSystem={stopSystem}
            resetConfiguration={resetConfiguration}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
};

export default App;