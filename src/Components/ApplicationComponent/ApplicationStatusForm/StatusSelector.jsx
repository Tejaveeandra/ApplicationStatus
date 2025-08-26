// src/components/ApplicationStatus/StatusSelector.jsx
import React from "react";
import { Button } from "@mui/material";

const StatusSelector = ({ selectedStatus, onStatusSelect }) => {
  const statuses = ["Sale", "Confirmation", "Damaged"];

  return (
    <div className="status-section">
      <h2 className="status-title">Application Status</h2>
      <p className="status-instruction">Select Application Status</p>
      <div className="status-options">
        {statuses.map((status) => (
          <Button
            key={status}
            className={`status-btn ${selectedStatus === status ? "active" : ""}`}
            onClick={() => onStatusSelect(status)}
            sx={{
              borderRadius: "20px",
              padding: "8px 16px",
              textTransform: "none",
              fontSize: "14px",
              color: selectedStatus === status ? "#fff" : "#616161",
              backgroundColor: selectedStatus === status ? "#3425FF" : "transparent",
              "&:hover": { backgroundColor: "#3425FF", color: "#fff" },
            }}
          >
            {status}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatusSelector;