import React from "react";
import { Typography } from "@mui/material";
import "./ProgressHeader.css";

const ProgressHeader = ({ step, totalSteps }) => {
  return (
    <div className="progress-header">
      <Typography variant="body2" className="progress-label">
        Step: <span style={{ color: "#3425FF" }}>{step + 1}</span>
      </Typography>
      <div className="progress-wrapper">
        <div
          className="progress-bar"
          style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressHeader;