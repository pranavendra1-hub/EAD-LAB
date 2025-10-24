import React, { useState } from "react";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const evaluateStrength = (value) => {
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (value.length === 0) {
      setStrength("");
    } else if (score <= 2) {
      setStrength("Weak");
    } else if (score === 3) {
      setStrength("Medium");
    } else {
      setStrength("Strong");
    }
  };

  const handleChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);
    evaluateStrength(newPass);
  };

  const getBorderColor = () => {
    switch (strength) {
      case "Weak":
        return "red";
      case "Medium":
        return "orange";
      case "Strong":
        return "green";
      default:
        return "#ccc";
    }
  };

  return (
    <div style={{ width: "300px", margin: "30px auto", fontFamily: "sans-serif" }}>
      <label htmlFor="password">Enter Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "8px",
          border: `2px solid ${getBorderColor()}`,
          borderRadius: "5px",
          outline: "none",
          transition: "border-color 0.3s",
        }}
        placeholder="Enter your password"
      />
      {strength && (
        <p
          style={{
            marginTop: "10px",
            fontWeight: "bold",
            color: getBorderColor(),
          }}
        >
          Strength: {strength}
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthChecker;
