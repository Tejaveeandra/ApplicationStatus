import React from "react";
import { FieldArray } from "formik";
import Inputbox from "../../Widgets/Inputbox/Input_box";
import Dropdown from "../../Widgets/Dropdown/Dropdown";
import { Button } from "@mui/material";
import TrendingUpIcon from "../../Asserts/ApplicationStatus/Trending up.svg";
import CashIcon from "../../Asserts/ApplicationStatus/Cash.svg";
import DDIcon from "../../Asserts/ApplicationStatus/DD.svg";
import * as Yup from "yup"; // Import Yup for validation
import "./GeneralInfoSection.css";

// Define the validation schema for sibling information
const siblingValidationSchema = Yup.object().shape({
  siblingInformation: Yup.array().of(
    Yup.object().shape({
      fullName: Yup.string()
        .required("Full Name is required")
        .matches(/^[a-zA-Z\s]*$/, "Full Name can only contain letters and spaces"),
      relationType: Yup.string().required("Relation Type is required"),
      class: Yup.string().required("Class is required"),
      schoolName: Yup.string().required("School Name is required"),
      gender: Yup.string().required("Gender is required"),
    })
  ),
});

// The validation schema for the entire form (including other fields if needed)
const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  // Add validations for other fields in `nonCategoryFields` as needed
  siblingInformation: Yup.array().of(
    Yup.object().shape({
      fullName: Yup.string()
        .required("Full Name is required")
        .matches(/^[a-zA-Z\s]*$/, "Full Name can only contain letters and spaces"),
      relationType: Yup.string().required("Relation Type is required"),
      class: Yup.string().required("Class is required"),
      schoolName: Yup.string().required("School Name is required"),
      gender: Yup.string().required("Gender is required"),
    })
  ),
});

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
  const categoryField = fields.flat().find((field) => field.name === "category");
  const nonCategoryFields = fields
    .flat()
    .filter((field) => field.name !== "category" && field.name !== "siblingInformation");
  const siblingField = fields.flat().find((field) => field.name === "siblingInformation");

  const groupedRows = [];
  for (let i = 0; i < nonCategoryFields.length; i += 3) {
    groupedRows.push(nonCategoryFields.slice(i, i + 3));
  }

  // Function to add a new sibling
  const addSibling = (push) => {
    push({
      fullName: "",
      relationType: "",
      class: "",
      schoolName: "",
      gender: "",
    });
  };

  return (
    <div className="general-form-section">
      <div className="general-section-box">
        <div className="general-form-grid">
          <div className="general-form-row">
            {categoryField ? (
              <div className="general-category-container">
                <div className="general-field-label-wrapper">
                  <span className="general-field-label">{categoryField.label}</span>
                  <div className="general-line"></div>
                </div>
                <div className="general-category-options">
                  {categoryField.options.map((option, i) => (
                    <label key={i} className="general-category-label-wrapper">
                      <input
                        type="radio"
                        name={categoryField.name}
                        value={option}
                        checked={values[categoryField.name] === option}
                        onChange={() => setFieldValue(categoryField.name, option)}
                        className="general-category-radio"
                      />
                      <span
                        className={`general-category-label ${values[categoryField.name] === option ? "general-category-active" : ""}`}
                        onClick={() => setFieldValue(categoryField.name, option)}
                      >
                        <span className="general-category-text-with-icon">
                          {option === "SSC" && (
                            <figure className="general-category-icon">
                              <img
                                src={CashIcon}
                                alt="cash-icon"
                                style={{ width: "18px", height: "18px" }}
                              />
                            </figure>
                          )}
                          {option === "Other" && (
                            <figure className="general-category-icon">
                              <img
                                src={DDIcon}
                                alt="dd-icon"
                                style={{ width: "18px", height: "18px" }}
                              />
                            </figure>
                          )}
                          {option}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                {touched[categoryField.name] && errors[categoryField.name] && (
                  <div className="general-error">{errors[categoryField.name]}</div>
                )}
              </div>
            ) : (
              <div className="general-empty-field"></div>
            )}
            <div className="general-empty-field"></div>
            <div className="general-empty-field"></div>
          </div>

          {groupedRows.map((row, rowIndex) => (
            <div key={rowIndex} className="general-form-row">
              {row.map((field, index) => {
                if (field.type === "select") {
                  return (
                    <div key={index} className="general-form-field">
                      <Dropdown
                        dropdownname={field.label}
                        name={field.name}
                        results={field.options}
                        value={values[field.name] || ""}
                        onChange={(e) => setFieldValue(field.name, e.target.value)}
                        error={touched[field.name] && errors[field.name]}
                      />
                      {touched[field.name] && errors[field.name] && (
                        <div className="general-error">{errors[field.name]}</div>
                      )}
                    </div>
                  );
                } else if (field.type === "radio" && field.name === "gender") {
                  return (
                    <div key={index} className="general-gender-container">
                      <div className="general-field-label-wrapper">
                        <span className="general-field-label">{field.label}</span>
                      </div>
                      <div className="general-gender-options">
                        {field.options.map((option, i) => (
                          <label key={i} className="general-gender-label-wrapper">
                            <input
                              type="radio"
                              name={field.name}
                              value={option}
                              checked={values[field.name] === option}
                              onChange={() => setFieldValue(field.name, option)}
                              className="general-gender-radio"
                            />
                            <span
                              className={`general-gender-label ${values[field.name] === option ? "general-gender-active" : ""}`}
                              onClick={() => setFieldValue(field.name, option)}
                            >
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                      {touched[field.name] && errors[field.name] && (
                        <div className="general-error">{errors[field.name]}</div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="general-form-field">
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
                      {touched[field.name] && errors[field.name] && (
                        <div className="general-error">{errors[field.name]}</div>
                      )}
                    </div>
                  );
                }
              })}
              {row.length < 3 &&
                Array.from({ length: 3 - row.length }, (_, padIndex) => (
                  <div key={`pad-${rowIndex}-${padIndex}`} className="general-empty-field"></div>
                ))}
            </div>
          ))}

          {siblingField && (
            <div key="sibling" className="general-form-row">
              <div className="general-sibling-container general-full-width">
                <div className="general-field-label-wrapper">
                  <span className="general-field-label">{siblingField.label}</span>
                  <div className="general-line"></div>
                </div>
                <FieldArray
                  name="siblingInformation"
                  render={({ push, remove }) => (
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
                              error={
                                touched.siblingInformation?.[i]?.fullName &&
                                errors.siblingInformation?.[i]?.fullName
                              }
                            />
                            <Dropdown
                              dropdownname="Relation Type"
                              name={`siblingInformation.${i}.relationType`}
                              results={["Brother", "Sister", "Other"]}
                              value={sibling.relationType}
                              onChange={(e) =>
                                setFieldValue(`siblingInformation.${i}.relationType`, e.target.value)
                              }
                              error={
                                touched.siblingInformation?.[i]?.relationType &&
                                errors.siblingInformation?.[i]?.relationType
                              }
                            />
                            <Dropdown
                              dropdownname="Select Class"
                              name={`siblingInformation.${i}.class`}
                              results={["1st", "2nd", "3rd", "4th"]}
                              value={sibling.class}
                              onChange={(e) =>
                                setFieldValue(`siblingInformation.${i}.class`, e.target.value)
                              }
                              error={
                                touched.siblingInformation?.[i]?.class &&
                                errors.siblingInformation?.[i]?.class
                              }
                            />
                            <Inputbox
                              label="School Name"
                              name={`siblingInformation.${i}.schoolName`}
                              placeholder="Enter School Name"
                              value={sibling.schoolName}
                              onChange={handleChange}
                              error={
                                touched.siblingInformation?.[i]?.schoolName &&
                                errors.siblingInformation?.[i]?.schoolName
                              }
                            />
                            <Dropdown
                              dropdownname="Gender"
                              name={`siblingInformation.${i}.gender`}
                              results={["Male", "Female"]}
                              value={sibling.gender}
                              onChange={(e) =>
                                setFieldValue(`siblingInformation.${i}.gender`, e.target.value)
                              }
                              error={
                                touched.siblingInformation?.[i]?.gender &&
                                errors.siblingInformation?.[i]?.gender
                              }
                            />
                             <Button
                            type="button"
                            variant="outlined"
                            onClick={() => addSibling(push)}
                            sx={{ marginTop: "10px", padding: "10px 20px" }}
                          >
                            + Add Sibling
                          </Button>
                          </div>
                        ))
                      ) : (
                        <div>
                          <p>No siblings added yet.</p>
                        
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
              <div className="general-empty-field"></div>
              <div className="general-empty-field"></div>
            </div>
          )}
        </div>
        <div className="general-form-actions" style={{ justifyContent: "center", marginTop: "20px" }}>
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
    </div>
  );
};

export default GeneralInfoSection;