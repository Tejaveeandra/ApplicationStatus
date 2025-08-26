
import React from "react";
import { Button } from "@mui/material";
import Inputbox from "../../../Widgets/Inputbox/Input_box";
import Dropdown from "../../../Widgets/Dropdown/Dropdown";
import CouponDialog from "./CouponDialog";

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
    <div className="form-section">
      <div className="section-box">
        <div className="coupon-wrapper">
          <Button
            variant="contained"
            onClick={() => setShowCouponModal(true)}
            sx={{
              borderRadius: "20px",
              padding: "8px 24px",
              backgroundColor: "#3425FF",
              textTransform: "none",
              fontSize: "14px",
            }}
          >
            Apply Coupon
          </Button>
          <CouponDialog
            open={showCouponModal}
            onClose={() => setShowCouponModal(false)}
            couponDetails={couponDetails}
            setCouponDetails={setCouponDetails}
            onApply={onCouponSubmit}
          />
        </div>
        <div className="form-grid">
          {fields.map((row, rowIndex) => (
            <div key={rowIndex} className="form-row">
              {row.map((field, index) => (
                <React.Fragment key={index}>
                  {field.type === "select" ? (
                    <Dropdown
                      dropdownname={field.label}
                      name={field.name}
                      results={field.options}
                      value={values[field.name] || ""}
                      onChange={(e) => setFieldValue(field.name, e.target.value)}
                    />
                  ) : field.type === "radio" ? (
                    <div className="form-field full-width">
                      <div className="field-label-wrapper">
                        <span className="field-label">{field.label}</span>
                        <div className="line"></div>
                      </div>
                      <div className="category-options">
                        {field.options.map((option, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`category-label ${values[field.name] === option ? "active" : ""}`}
                            onClick={() => setFieldValue(field.name, option)}
                          >
                            <span className="category-text">{option}</span>
                          </button>
                        ))}
                      </div>
                      {touched[field.name] && errors[field.name] && (
                        <div className="error">{errors[field.name]}</div>
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
                  <div key={`pad-${rowIndex}-${padIndex}`} className="empty-field"></div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Form navigation with Proceed to Next button */}
      <div className="form-actions" style={{ justifyContent: "center", marginTop: "20px" }}>
        <Button
          type="button"
          onClick={handleNext}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
            padding: "10px 20px",
          }}
        >
          Proceed to Next
        </Button>
      </div>
    </div>
  );
};

export default ConcessionInfoSection;
