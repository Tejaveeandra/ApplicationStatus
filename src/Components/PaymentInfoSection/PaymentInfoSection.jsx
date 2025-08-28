import React from "react";
import Inputbox from "../../Widgets/Inputbox/Input_box";
import "./PaymentInfoSection.css";
import { Button } from "@mui/material";
import TrendingUpIcon from "../../Asserts/ApplicationStatus/Trending up.svg";

const PaymentInfoSection = ({
  fields,
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
  activeStep,
  setActiveStep,
  steps,
  handleNext,
  handleBack,
}) => {
  const renderPaymentModes = (name, setFieldValue) => {
    const selected = values[name] || "Cash";
    const modes = ["Cash", "DD", "Cheque", "Credit/Debit Card"];

    return (
      <div className="payment-category-options">
        {modes.map((mode) => (
          <button
            key={mode}
            type="button"
            className={`payment-category-label ${selected === mode ? "active" : ""}`}
            onClick={() => {
              setFieldValue(name, mode); // Update Formik field directly
            }}
          >
            <span className="payment-category-text">{mode}</span>
          </button>
        ))}
      </div>
    );
  };

  const renderInput = (field) => {
    if (field.type === "custom") {
      return (
        <div key={field.name} className="payment-input-group">
          <div className="payment-field-label-wrapper">
            <label className="payment-form-label payment-fw-semibold payment-small-label" htmlFor={field.name}>
              {field.label}
            </label>
            <div className="payment-line"></div>
          </div>
          {renderPaymentModes(field.name, setFieldValue)}
          {touched[field.name] && errors[field.name] && (
            <span className="payment-error-message">{errors[field.name]}</span>
          )}
        </div>
      );
    } else if (field.type === "checkbox") {
      return (
        <div key={field.name} className="payment-checkbox-group">
          <label className="payment-form-label payment-small-label" htmlFor={field.name}>
            {field.label}
          </label>
          <input
            type="checkbox"
            name={field.name}
            checked={values[field.name]}
            onChange={handleChange}
          />
          {touched[field.name] && errors[field.name] && (
            <span className="payment-error-message">{errors[field.name]}</span>
          )}
        </div>
      );
    } else {
      return (
        <div key={field.name} className="payment-inputbox-wrapper">
          <label className="payment-form-label" htmlFor={field.name}>
            {field.label}
          </label>
          <Inputbox
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder || `Enter ${field.label}`}
            value={values[field.name]}
            onChange={handleChange}
            error={touched[field.name] && errors[field.name]}
          />
          {touched[field.name] && errors[field.name] && (
            <span className="payment-error-message">{errors[field.name]}</span>
          )}
        </div>
      );
    }
  };

  return (
    <div className="payment-info-section">
      <div className="payment-section-header">
        <div className="payment-header-content">
          {fields.flat().map((field) => field.name === "payMode" && renderInput(field))}
        </div>
      </div>

      <div className="payment-form-grid">
        {fields
          .flat()
          .map(
            (field) =>
              field.name !== "payMode" &&
              field.name !== "appFeeReceived" &&
              field.name !== "appFeePayMode" &&
              field.name !== "appFeePayDate" &&
              field.name !== "appFeeAmount" &&
              field.name !== "appFeeReceiptNo" &&
              renderInput(field)
          )
          .reduce((rows, item, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(item);
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <div key={rowIndex} className="payment-form-row">
              {row}
              {row.length < 3 &&
                Array.from({ length: 3 - row.length }).map((_, padIndex) => (
                  <div key={`pad-${rowIndex}-${padIndex}`} className="payment-empty-field"></div>
                ))}
            </div>
          ))}
      </div>

      {fields.flat().map((field) => field.name === "appFeeReceived" && renderInput(field))}

      {values.appFeeReceived && (
        <>
          <div className="payment-app-fee-section">
            <div className="payment-header-content">
              {fields.flat().map((field) => field.name === "appFeePayMode" && renderInput(field))}
              <div className="payment-special-concession-block">
                <h6 className="payment-concession-value">0</h6>
                <span className="payment-concession-label">Application Special Concession Value</span>
              </div>
            </div>
          </div>

          <div className="payment-form-grid">
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
                <div key={rowIndex} className="payment-form-row">
                  {row}
                  {row.length < 3 &&
                    Array.from({ length: 3 - row.length }).map((_, padIndex) => (
                      <div key={`pad-${rowIndex}-${padIndex}`} className="payment-empty-field"></div>
                    ))}
                </div>
              ))}
          </div>
        </>
      )}
      <div className="payment-form-actions">
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