
import React from "react";
import { FieldArray } from "formik";
import Inputbox from "../../../Widgets/Inputbox/Input_box";
import Dropdown from "../../../Widgets/Dropdown/Dropdown";
import { Button } from "@mui/material";
import TrendingUpIcon from "../../../Asserts/ApplicationStatus/Trending up.svg";
import CashIcon from "../../../Asserts/ApplicationStatus/Cash.svg"; // Import the Cash SVG
import DDIcon from "../../../Asserts/ApplicationStatus/DD.svg"; // Import the DD SVG

const GeneralInfoSection = ({
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
          {/* Render normal fields */}
          {fields.map((row, rowIndex) => (
            <div key={rowIndex} className="form-row">
              {row.map((field, index) => {
                if (field.type === "select") {
                  return (
                    <Dropdown
                      key={index}
                      dropdownname={field.label}
                      name={field.name}
                      results={field.options}
                      value={values[field.name] || ""}
                      onChange={(e) => setFieldValue(field.name, e.target.value)}
                    />
                  );
                } else if (field.type === "radio") {
                  // Conditionally apply full-width and field-label-wrapper based on field name
                  const isCategory = field.name === "category";
                  const isGender = field.name === "gender";
                  return (
                    <div key={index} className={`form-field ${isCategory ? "full-width" : ""}`}>
                      {isCategory && (
                        <div className="field-label-wrapper">
                          <span className="field-label">{field.label}</span>
                          <div className="line"></div>
                        </div>
                      )}
                      {isGender && (
                        <div className="field-label-wrapper">
                          <span className="field-label">{field.label}</span>
                          <div className="line"></div>
                        </div>
                      )}
                      {!isCategory && !isGender && <span className="field-label">{field.label}</span>}
                      <div className="category-options">
                        {field.options.map((option, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`category-label ${values[field.name] === option ? "active" : ""}`}
                            onClick={() => setFieldValue(field.name, option)}
                          >
                            <span className="category-text-with-icon">
                              {isCategory && option === "SSC" && (
                                <figure className="cash-icon">
                                  <img
                                    src={CashIcon}
                                    alt="cash-icon"
                                    style={{ width: "18px", height: "18px" }}
                                  />
                                </figure>
                              )}
                              {isCategory && option === "Other" && (
                                <figure className="cash-icon">
                                  <img
                                    src={DDIcon}
                                    alt="dd-icon"
                                    style={{ width: "18px", height: "18px" }}
                                  />
                                </figure>
                              )}
                              {option}
                            </span>
                          </button>
                        ))}
                      </div>
                      {touched[field.name] && errors[field.name] && (
                        <div className="error">{errors[field.name]}</div>
                      )}
                    </div>
                  );
                } else if (field.type === "custom" && field.name === "siblingInformation") {
                  return (
                    <div key={index} className="form-field full-width">
                      <div className="field-label-wrapper">
                        <span className="field-label">{field.label}</span>
                        <div className="line"></div>
                      </div>

                      {/* ✅ Render siblings using FieldArray */}
                      <FieldArray
                        name="siblingInformation"
                        render={(arrayHelpers) => (
                          <div>
                            {values.siblingInformation && values.siblingInformation.length > 0 ? (
                              values.siblingInformation.map((sibling, i) => (
                                <div
                                  key={i}
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: "20px",
                                    marginBottom: "15px",
                                    alignItems: "center",
                                  }}
                                >
                                  <Inputbox
                                    label="Full Name"
                                    name={`siblingInformation.${i}.fullName`}
                                    placeholder="Enter Full Name"
                                    value={sibling.fullName}
                                    onChange={handleChange}
                                  />
                                  <Dropdown
                                    dropdownname="Relation Type"
                                    name={`siblingInformation.${i}.relationType`}
                                    results={["Brother", "Sister", "Other"]}
                                    value={sibling.relationType}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `siblingInformation.${i}.relationType`,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <Dropdown
                                    dropdownname="Select Class"
                                    name={`siblingInformation.${i}.class`}
                                    results={["1st", "2nd", "3rd", "4th"]}
                                    value={sibling.class}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `siblingInformation.${i}.class`,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <Inputbox
                                    label="School Name"
                                    name={`siblingInformation.${i}.schoolName`}
                                    placeholder="Enter School Name"
                                    value={sibling.schoolName}
                                    onChange={handleChange}
                                  />
                                  <Dropdown
                                    dropdownname="Gender"
                                    name={`siblingInformation.${i}.gender`}
                                    results={["Male", "Female"]}
                                    value={sibling.gender}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `siblingInformation.${i}.gender`,
                                        e.target.value
                                      )
                                    }
                                  />
                                  {/* Add Sibling Button */}
                                  <Button
                                    type="button"
                                    variant="outlined"
                                    sx={{ marginTop: "23px" }}
                                  >
                                    + Add Sibling
                                  </Button>
                                </div>
                              ))
                            ) : (
                              <p>No siblings added yet.</p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  );
                } else {
                  return (
                    <Inputbox
                      key={index}
                      label={field.label}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={values[field.name] || ""}
                      onChange={handleChange}
                      type={field.type || "text"}
                      error={touched[field.name] && errors[field.name]}
                    />
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Form navigation replaced with Proceed to Add Concession button */}
      <div className="form-actions" style={{ justifyContent: "center", marginTop: "20px" }}>
        <Button
          type="button"
          onClick={handleNext}
          sx={{
            backgroundColor: "#3425FF",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#3425FF",
            },
            padding: "10px 20px",
          }}
        >
          Proceed to Add Concession
          <img src={TrendingUpIcon} alt="finish-icon" style={{ width: "18px", height: "18px" }} />
        </Button>
      </div>
    </div>
  );
};

export default GeneralInfoSection;
