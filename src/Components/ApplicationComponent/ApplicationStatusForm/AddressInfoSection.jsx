
import React from "react";
import Inputbox from "../../../Widgets/Inputbox/Input_box";
import Dropdown from "../../../Widgets/Dropdown/Dropdown";
import { Button } from "@mui/material";
import TrendingUpIcon from "../../../Asserts/ApplicationStatus/Trending up.svg";

const AddressInfoSection = ({
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
  return (
    <div className="form-section">
      <div className="section-box">
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

              {/* keep row alignment with empty placeholders */}
              {row.length < 3 &&
                Array.from({ length: 3 - row.length }).map((_, padIndex) => (
                  <div key={`pad-${rowIndex}-${padIndex}`} className="empty-field"></div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Button with icon, centered */}
      <div className="form-actions" style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          type="button"
          onClick={handleNext}
          // disabled={Object.keys(errors).length > 0}
          sx={{
            padding: "12px 28px",
            borderRadius: "10px",
            backgroundColor: "#3425FF",
            fontSize: "14px",
            textTransform: "none",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            "&:hover": {
              backgroundColor: "#2a1fd6",
            },
          }}
        >
          Proceed to Add Payment Info
          <img src={TrendingUpIcon} alt="Trending Up" style={{ width: "18px", height: "18px" }} />
        </Button>
      </div>
    </div>
  );
};

export default AddressInfoSection;