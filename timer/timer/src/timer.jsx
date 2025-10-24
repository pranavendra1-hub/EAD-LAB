import React, { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(0); // time in seconds
  const [isRunning, setIsRunning] = useState(false);

  // useEffect hook to run timer
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Handlers
  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⏱️ React Timer</h2>
      <div style={styles.timerDisplay}>{formatTime(time)}</div>

      <div style={styles.buttons}>
        {!isRunning ? (
          <button onClick={startTimer} style={styles.startBtn}>Start</button>
        ) : (
          <button onClick={pauseTimer} style={styles.pauseBtn}>Pause</button>
        )}
        <button onClick={resetTimer} style={styles.resetBtn}>Reset</button>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    width: "300px",
    margin: "80px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
  },
  timerDisplay: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#4e54c8",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  startBtn: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  pauseBtn: {
    padding: "10px 20px",
    backgroundColor: "#f39c12",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  resetBtn: {
    padding: "10px 20px",
    backgroundColor: "#e74c3c",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Timer;
