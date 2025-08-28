import React, { useState } from "react";
import Inputbox from "../../../Widgets/Inputbox/Input_box";
import Dropdown from "../../../Widgets/Dropdown/Dropdown";
import { Button } from "@mui/material";
import TrendingUpIcon from "../../../Asserts/ApplicationStatus/Trending up.svg";


const ConcessionInfoSection = ({
  fields,
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
  showCouponModal,
  setShowCouponModal,
  couponDetails,
  setCouponDetails,
  onCouponSubmit,
  activeStep,
  setActiveStep,
  steps,
  handleNext,
  handleBack,
}) => {
  return (
    <div className="concession-form-section">
      <div className="concession-section-box">
        <div className="concession-form-grid">
          {fields.map((row, rowIndex) => (
            <div key={rowIndex} className="concession-form-row">
              {row.map((field, index) => (
                <React.Fragment key={index}>
                  {field.type === "select" ? (
                    <Dropdown
                      dropdownname={field.label}
                      name={field.name}
                      results={field.options}
                      value={values[field.name] || ""}
                      onChange={(e) => setFieldValue(field.name, e.target.value)}
                      error={touched[field.name] && errors[field.name]}
                    />
                  ) : field.type === "radio" ? (
                    <div className="concession-radio-container">
                      <div className="concession-field-label-wrapper">
                        <span className="concession-field-label">{field.label}</span>
                        <div className="concession-line"></div>
                      </div>
                      <div className="concession-radio-options">
                        {field.options.map((option, i) => (
                          <label key={i} className="concession-radio-label-wrapper">
                            <input
                              type="radio"
                              name={field.name}
                              value={option}
                              checked={values[field.name] === option}
                              onChange={() => setFieldValue(field.name, option)}
                              className="concession-radio"
                            />
                            <span
                              className={`concession-radio-label ${values[field.name] === option ? "concession-radio-active" : ""}`}
                              onClick={() => setFieldValue(field.name, option)}
                            >
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                      {touched[field.name] && errors[field.name] && (
                        <div className="concession-error">{errors[field.name]}</div>
                      )}
                    </div>
                  ) : (
                    <Inputbox
                      label={field.label}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={values[field.name] || ""}
                      onChange={handleChange}
                      type={field.type || "text"}
                      error={touched[field.name] && errors[field.name]}
                    />
                  )}
                </React.Fragment>
              ))}
              {row.length < 3 &&
                Array.from({ length: 3 - row.length }).map((_, padIndex) => (
                  <div key={`pad-${rowIndex}-${padIndex}`} className="concession-empty-field"></div>
                ))}
            </div>
          ))}
        </div>
        <div className="concession-form-actions" style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            type="button"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{
              padding: "12px 24px",
              borderRadius: "10px",
              borderColor: "#3425FF",
              color: "#3425FF",
              fontSize: "14px",
              textTransform: "none",
              fontWeight: 500,
              marginRight: "10px",
              "&:hover": {
                borderColor: "#2a1fd6",
                backgroundColor: "#f5f5ff",
              },
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={handleNext}
            sx={{
              padding: "12px 28px",
              borderRadius: "10px",
              backgroundColor: "#3425FF",
              fontSize: "14px",
              textTransform: "none",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              "&:hover": {
                backgroundColor: "#2a1fd6",
              },
            }}
          >
            Proceed to Add Address Info
            <img src={TrendingUpIcon} alt="Trending Up" style={{ width: "18px", height: "18px" }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConcessionInfoSection;
