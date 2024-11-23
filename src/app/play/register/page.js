"use client";

import React, { useState, useEffect } from "react";
import AppMenubar from "../../menubar";

export default function Register() {
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const generatedDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return date.toISOString().split("T")[0];
    });

    setDays(generatedDays);
    setSelectedDate(generatedDays[0]);
  }, []);

  const timeSlots = Array.from({ length: 16 }, (_, i) => `${8 + i}:00`);

  const handleReserve = () => {
    alert(`Navigating to reservation page for ${selectedDate}`);
  };

  const gridData = Array.from({ length: 7 }, () => Array(16).fill("empty"));

  const statusColors = {
    full: "red",
    empty: "white",
    unavailable: "black"
  };
  gridData[0][0]="full"
  
  return (
    <div>
      <AppMenubar />
      <h1>登記當周 Register</h1>
      {days.length > 0 ? (
        <>
          <table border="1" style={{ width: "100%", textAlign: "center" }}>
            <thead>
              <tr>
                <th>日期</th>
                {timeSlots.map((slot, idx) => (
                  <th key={idx}>{slot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, rowIndex) => (
                <tr key={day}>
                  <td>{day}</td>
                  {timeSlots.map((_, colIndex) => (
              <td
                key={colIndex}
                style={{
                  backgroundColor: statusColors[gridData[rowIndex][colIndex]]
                }}
              >
                {/* {gridData[rowIndex][colIndex]} */}
              </td>
            ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="dateSelect">選擇日期:</label>
            <select
              id="dateSelect"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <button onClick={handleReserve} style={{ marginLeft: "10px" }}>
              確定進入預約
            </button>
          </div>
        </>
      ) : (
        <p>載入中...</p>
      )}
    </div>
  );
}
