
import React, { useState } from "react";
import Inputbox from "../../../Widgets/Inputbox/Input_box";
import "./PaymentInfoSection.css";
import { Button } from "@mui/material";
import TrendingUpIcon from "../../../Asserts/ApplicationStatus/Trending up.svg"; // ✅ Import your SVG

const PaymentInfoSection = ({
  fields,
  values,
  errors,
  touched,
  handleChange,
  activeStep,
  setActiveStep,
  steps,
  handleNext,
  handleBack,
}) => {
  const [payMode, setPayMode] = useState(values.payMode || "Cash");
  const [appFeePayMode, setAppFeePayMode] = useState(values.appFeePayMode || "Cash");

  const renderPaymentModes = (selected, setter, name) => {
    const modes = ["Cash", "DD", "Cheque", "Credit/Debit Card"];

    return (
      <div className="category-options">
        {modes.map((mode) => (
          <button
            key={mode}
            type="button"
            className={`category-label ${selected === mode ? "active" : ""}`}
            onClick={() => {
              setter(mode);
              handleChange({ target: { name, value: mode } });
            }}
          >
            <span className="category-text">{mode}</span>
          </button>
        ))}
      </div>
    );
  };

  const renderInput = (field) => {
    if (field.type === "custom") {
      return (
        <div key={field.name} className="input-group">
          <div className="field-label-wrapper">
            <label className="form-label fw-semibold small-label" htmlFor={field.name}>
              {field.label}
            </label>
            <div className="line"></div>
          </div>
          {renderPaymentModes(
            field.name === "payMode" ? payMode : appFeePayMode,
            field.name === "payMode" ? setPayMode : setAppFeePayMode,
            field.name
          )}
        </div>
      );
    } else if (field.type === "checkbox") {
      return (
        <div key={field.name} className="checkbox-group">
          <label className="form-label small-label" htmlFor={field.name}>
            {field.label}
          </label>
          <input
            type="checkbox"
            name={field.name}
            checked={values[field.name]}
            onChange={handleChange}
          />
        </div>
      );
    } else {
      return (
        <div key={field.name} className="inputbox-wrapper">
          <label className="form-label" htmlFor={field.name}>
            {field.label}
          </label>
          <Inputbox
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder || `Enter ${field.label}`}
            value={values[field.name]}
            onChange={handleChange}
          />
          {touched[field.name] && errors[field.name] && (
            <span className="error-message">{errors[field.name]}</span>
          )}
        </div>
      );
    }
  };

  return (
    <div className="payment-info-section">
      {/* First Header Section */}
      <div className="payment-section-header">
        <div className="header-content">
          {fields.flat().map((field) => field.name === "appFeePayMode" && renderInput(field))}
        </div>
      </div>

      {/* Grid Section */}
      <div className="form-grid">
        {fields
          .flat()
          .map(
            (field) =>
              field.name !== "payMode" &&
              field.name !== "appFeeReceived" &&
              field.name !== "appFeePayMode" &&
              renderInput(field)
          )
          .reduce((rows, item, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(item);
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <div key={rowIndex} className="form-row">
              {row}
              {row.length < 3 &&
                Array.from({ length: 3 - row.length }).map((_, padIndex) => (
                  <div key={`pad-${rowIndex}-${padIndex}`} className="empty-field"></div>
                ))}
            </div>
          ))}
      </div>

      {/* Checkbox */}
      {fields.flat().map((field) => field.name === "appFeeReceived" && renderInput(field))}

      {/* Conditional section (only shows if checkbox is checked) */}
      {values.appFeeReceived && (
        <>
          <div className="app-fee-section">
            <div className="header-content">
              {fields.flat().map((field) => field.name === "payMode" && renderInput(field))}
              <div className="special-concession-block">
                <h6 className="concession-value">0</h6>
                <span className="concession-label">Application Special Concession Value</span>
              </div>
            </div>
          </div>

          <div className="form-grid">
            {fields
              .flat()
              .map(
                (field) =>
                  (field.name === "appFeePayDate" ||
                    field.name === "appFeeAmount" ||
                    field.name === "appFeeReceiptNo") &&
                  renderInput(field)
              )
              .reduce((rows, item, index) => {
                if (index % 3 === 0) rows.push([]);
                rows[rows.length - 1].push(item);
                return rows;
              }, [])
              .map((row, rowIndex) => (
                <div key={rowIndex} className="form-row">
                  {row}
                  {row.length < 3 &&
                    Array.from({ length: 3 - row.length }).map((_, padIndex) => (
                      <div key={`pad-${rowIndex}-${padIndex}`} className="empty-field"></div>
                    ))}
                </div>
              ))}
          </div>
        </>
      )}
      <div className="form-actions">
        {!values.appFeeReceived ? (
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
            Finish
            <img src={TrendingUpIcon} alt="finish-icon" style={{ width: "18px", height: "18px" }} />
          </Button>
        ) : (
          <>
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
                "&:hover": {
                  borderColor: "#2a1fd6",
                  backgroundColor: "#f5f5ff",
                },
              }}
            >
              Continue to Confirmation
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
              Finish
              <img src={TrendingUpIcon} alt="finish-icon" style={{ width: "18px", height: "18px" }} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentInfoSection;
