// src/components/ApplicationStatus/StepperTabs.jsx
import React from "react";

const StepperTabs = ({ steps, activeStep, onStepChange }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => {
        let tabClass = "";
        if (activeStep === index) {
          tabClass = "active";
        } else if (index < activeStep) {
          tabClass = "completed";
        }
        return (
          <div
            key={index}
            className={`step-tab ${tabClass}`}
            onClick={() => onStepChange(index)}
          >
            <span className="step-number">{index + 1}</span>
            <span className="step-label">{step}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StepperTabs;