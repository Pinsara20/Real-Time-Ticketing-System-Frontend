import React, { useState, useEffect } from "react";
import InputPanel from "./components/InputPanel";
import TicketDisplay from "./components/TicketDisplay";
import ActivityLogs from "./components/ActivityLogs";

const App = () => {
  const [totalTickets, setTotalTickets] = useState(0);
  const [vendorRate, setVendorRate] = useState(0);
  const [customerRate, setCustomerRate] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [currentTickets, setCurrentTickets] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        // Vendor adds tickets
        setCurrentTickets((prev) => {
          const addedTickets = prev + vendorRate;
          const newTotal = Math.min(addedTickets, maxCapacity);
          if (vendorRate > 0) {
            addLog(`Vendor added ${Math.min(vendorRate, maxCapacity - prev)} tickets.`);
          }
          return newTotal;
        });

        // Customer retrieves tickets
        setCurrentTickets((prev) => {
          const deductedTickets = Math.max(prev - customerRate, 0);
          if (customerRate > 0 && prev > 0) {
            addLog(`Customer retrieved ${Math.min(customerRate, prev)} tickets.`);
          }
          return deductedTickets;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, vendorRate, customerRate, maxCapacity]);

  const addLog = (message) => {
    setLogs((prevLogs) => [message, ...prevLogs]);
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
    setVendorRate(0);
    setCustomerRate(0);
    setMaxCapacity(0);
    setCurrentTickets(0);
    setLogs([]);
    setIsRunning(false);
    addLog("Configuration reset.");
  };

  return (
    <div className="container">
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
        resetConfiguration={resetConfiguration}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />
      <div className="right-panel">
        <TicketDisplay currentTickets={currentTickets} />
        <ActivityLogs logs={logs} />
      </div>
    </div>
  );
};

export default App;
