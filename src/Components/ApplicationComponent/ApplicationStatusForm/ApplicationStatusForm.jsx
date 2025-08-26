
import React, { useState } from "react";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import ArrowBack from "@mui/icons-material/ArrowBack";
import StatusSelector from "./StatusSelector";
import ProgressHeader from "./ProgressHeader";
import StepperTabs from "./StepperTabs";
import GeneralInfoSection from "./GeneralInfoSection";
import ConcessionInfoSection from "./ConcessionInfoSection";
import AddressInfoSection from "./AddressInfoSection";
import PaymentInfoSection from "./PaymentInfoSection";
import "./ApplicationStatusForm.css";

const ApplicationStatusForm = ({ onBack, initialData = {} }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponDetails, setCouponDetails] = useState({ mobile: "", code: "" });

  const steps = [
    "General Information",
    "Concession Information",
    "Address Information",
    "Payment Information",
  ];

  const defaultInitialValues = {
    status: "Sale",
    additionalCourseFee: "",
    scoreAppNo: "",
    marks: "",
    camp: "",
    admissionReferredBy: { name: "" },
    siblingInformation: [{ fullName: "", relationType: "", class: "", schoolName: "", gender: "" }],
    category: "SSC",
    htNo: "",
    aadhaar: "",
    appType: "Camp",
    appFee: "",
    surname: "",
    studentName: "",
    fatherName: "",
    occupation: "",
    phoneNumber: "",
    studentType: "",
    dob: "",
    gender: "Male",
    joinedCampus: "",
    city: "",
    joinInto: "",
    course: "",
    courseBatch: "",
    courseDates: "",
    fee: "",
    schoolState: "",
    schoolDistrict: "",
    schoolType: "",
    schoolName: "",
    totalFee: "",
    yearConcession1st: "",
    yearConcession2nd: "",
    yearConcession3rd: "",
    givenBy: "",
    description: "",
    authorizedBy: "",
    reason: "",
    concessionWritten: "",
    couponMobile: "",
    couponCode: "",
    payMode: "Cash",
    paymentDate: "",
    amount: "",
    prePrintedReceiptNo: "",
    appFeeReceived: false,
    appFeePayMode: "Cash",
    appFeePayDate: "",
    appFeeAmount: "",
    appFeeReceiptNo: "",
  };

  const initialValues = { ...defaultInitialValues, ...initialData };

  const validate = (values) => {
    const errors = {};
    if (activeStep === 0 && selectedStatus === "Sale") {
      if (!values.htNo) errors.htNo = "HT No is required";
      if (!values.studentName) errors.studentName = "Student Name is required";
      if (!values.phoneNumber) errors.phoneNumber = "Phone Number is required";
      if (values.siblingInformation) {
        values.siblingInformation.forEach((sibling, i) => {
          if (!sibling.fullName) errors[`siblingInformation[${i}].fullName`] = "Full Name is required";
          if (!sibling.relationType) errors[`siblingInformation[${i}].relationType`] = "Relation Type is required";
        });
      }
    }
    if (activeStep === 1 && selectedStatus === "Sale") {
      if (!values.reason) errors.reason = "Reason is required";
    }
    if (activeStep === 3 && selectedStatus === "Sale") {
      if (!values.paymentDate) errors.paymentDate = "Payment Date is required";
      if (!values.amount) errors.amount = "Amount is required";
      if (values.appFeeReceived && !values.appFeePayDate)
        errors.appFeePayDate = "Application Fee Pay Date is required";
      if (values.appFeeReceived && !values.appFeeAmount)
        errors.appFeeAmount = "Application Fee Amount is required";
    }
    return errors;
  };

  const getStepFields = (step, status) => {
    let allFields = [];
    if (status === "Sale") {
      switch (step) {
        case 0:
          allFields = [
            { label: "Category", name: "category", type: "radio", options: ["SSC", "Other"] },
            { label: "HT No", name: "htNo", placeholder: "Enter HT No" },
            { label: "Aadhaar Card No", name: "aadhaar", placeholder: "Enter Aadhaar" },
            { label: "App Type", name: "appType", type: "select", options: ["Camp"] },
            { label: "App Fee", name: "appFee", type: "number", placeholder: "Enter Fee" },
            { label: "Surname", name: "surname", placeholder: "Enter Surname" },
            { label: "Student Name", name: "studentName", placeholder: "Enter Name" },
            { label: "Father Name", name: "fatherName", placeholder: "Enter Father Name" },
            { label: "Occupation", name: "occupation", placeholder: "Enter Occupation" },
            { label: "Phone Number", name: "phoneNumber", placeholder: "Enter Phone" },
            { label: "Student Type", name: "studentType", type: "select", options: ["Regular", "Private", "Distance"] },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Gender", name: "gender", type: "radio", options: ["Male", "Female"] },
            { label: "Joined Campus", name: "joinedCampus", type: "select", options: ["Hyderabad", "Bangalore", "Chennai"] },
            { label: "City", name: "city", placeholder: "Enter City" },
            { label: "Join Into", name: "joinInto", type: "select", options: ["10th", "Intermediate", "Degree"] },
            { label: "Course", name: "course", type: "select", options: ["Maths", "Science", "Commerce"] },
            { label: "Course Batch", name: "courseBatch", type: "select", options: ["Morning", "Evening"] },
            { label: "Course Dates", name: "courseDates", type: "date" },
            { label: "Fee", name: "fee", type: "number", placeholder: "Enter Fee" },
            { label: "School State", name: "schoolState", type: "select", options: ["Telangana", "AP", "Karnataka"] },
            { label: "School District", name: "schoolDistrict", type: "select", options: ["Hyderabad", "Vizag", "Bangalore"] },
            { label: "School Type", name: "schoolType", type: "select", options: ["SSC", "CBSE", "ICSE"] },
            { label: "School Name", name: "schoolName", placeholder: "Enter School Name" },
            { label: "Total Fee", name: "totalFee", type: "number", placeholder: "Enter Total Fee" },
            { label: "Additional Course Fee", name: "additionalCourseFee", placeholder: "Enter Fee" },
            { label: "Score App No", name: "scoreAppNo", placeholder: "Enter Score App No" },
            { label: "Marks", name: "marks", placeholder: "Enter Marks" },
            { label: "Admission Referred By", name: "admissionReferredBy.name", placeholder: "Enter Name" },
            { label: "Quota", name: "camp", type: "select", options: ["", "SC", "ST", "BC", "OC"] },
            { label: "Sibling Information", name: "siblingInformation", type: "custom" }, // No subFields needed, handled by FieldArray
          ];
          break;
        case 1:
          allFields = [
            { label: "1st Year Concession", name: "yearConcession1st", placeholder: "Enter 1st Year Concession" },
            { label: "2nd Year Concession", name: "yearConcession2nd", placeholder: "Enter 2nd Year Concession" },
            { label: "3rd Year Concession", name: "yearConcession3rd", placeholder: "Enter 3rd Year Concession" },
            { label: "Given By", name: "givenBy", placeholder: "Enter Given By" },
            { label: "Description", name: "description", placeholder: "Enter Description" },
            { label: "Authorized By", name: "authorizedBy", placeholder: "Enter Authorized By" },
            { label: "Concession Written on Application", name: "concessionWritten", type: "radio", options: ["Yes", "No"] },
            { label: "Reason", name: "reason", type: "select", options: ["", "MLA", "Merit", "Employee", "Other"] },
          ];
          break;
        case 2:
          allFields = [
            { label: "Door No ", name: "doorNo", placeholder: "Enter Door No" },
            { label: "Street", name: "street", placeholder: "Enter Street" },
            { label: "Landmark", name: "landmark", placeholder: "Enter Landmark" },
            { label: "Area", name: "area", placeholder: "Enter Area" },
            { label: "Pincode", name: "pincode", placeholder: "Enter Pincode" },
            { label: "District", name: "district", type: "select", options: ["Hyderabad", "Vizag", "Bangalore"] },
            { label: "Mandal", name: "mandal", type: "select", options: ["Hyderabad", "Vizag", "Bangalore"] },
            { label: "City", name: "city", type: "select", options: ["Hyderabad", "Vizag", "Bangalore"] },
          ];
          break;
        case 3:
          allFields = [
            { label: "Pay Mode", name: "payMode", type: "custom" },
            { label: "Application Fee Received", name: "appFeeReceived", type: "checkbox" },
            { label: "Application Fee Pay Mode", name: "appFeePayMode", type: "custom" },
            { label: "Application Fee Pay Date", name: "appFeePayDate", placeholder: "Select Pay Date" },
            { label: "Application Fee Amount", name: "appFeeAmount", placeholder: "Enter Amount" },
            { label: "Pre Printed Receipt No", name: "appFeeReceiptNo", placeholder: "Enter Receipt No" },
          ];
          break;
        default:
          allFields = [];
      }
    } else {
      allFields = [];
    }

    const groupedFields = [];
    for (let i = 0; i < allFields.length; i += 3) {
      groupedFields.push(allFields.slice(i, i + 3));
    }
    while (groupedFields.length < 4) {
      groupedFields.push([]);
    }
    return groupedFields;
  };

  const handleNext = (values, setFieldValue) => {
    console.log("handleNext called, current step:", activeStep);
    if (activeStep === 1) {
      setFieldValue("couponMobile", couponDetails.mobile);
      setFieldValue("couponCode", couponDetails.code);
    }
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
      console.log("Moving to step:", activeStep + 1);
    } else {
      handleSubmit(values);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  const handleCouponSubmit = (setFieldValue) => {
    setFieldValue("couponMobile", couponDetails.mobile);
    setFieldValue("couponCode", couponDetails.code);
    console.log("Applied Coupon:", couponDetails);
    setShowCouponModal(false);
  };

  // Prevent direct step change via stepper unless it's the current or previous step
  const handleStepChange = (step) => {
    if (step <= activeStep) {
      setActiveStep(step); // Allow going back to previous steps
    } else {
      console.log("Cannot jump to future steps. Use 'Next' button.");
    }
  };

  return (
    <div className="app-status-container">
      <Button className="back-btn" onClick={onBack} sx={{ mb: 2 }}>
        <ArrowBack sx={{ fontSize: 24 }} />
      </Button>
      <div className="layout-wrapper">
        <StatusSelector selectedStatus={selectedStatus} onStatusSelect={setSelectedStatus} />
        {selectedStatus && <ProgressHeader step={activeStep} totalSteps={steps.length} />}
      </div>
      {selectedStatus && (
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, errors, touched, setFieldValue, handleChange }) => (
            <Form className="application-form">
              <div className="form-wrapper">
                <StepperTabs steps={steps} activeStep={activeStep} onStepChange={handleStepChange} />
                {activeStep === 0 && (
                  <GeneralInfoSection
                    fields={getStepFields(0, selectedStatus)}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    steps={steps}
                    handleNext={() => handleNext(values, setFieldValue)}
                    handleBack={handleBack}
                  />
                )}
                {activeStep === 1 && (
                  <ConcessionInfoSection
                    fields={getStepFields(1, selectedStatus)}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    showCouponModal={showCouponModal}
                    setShowCouponModal={setShowCouponModal}
                    couponDetails={couponDetails}
                    setCouponDetails={setCouponDetails}
                    onCouponSubmit={() => handleCouponSubmit(setFieldValue)}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    steps={steps}
                    handleNext={() => handleNext(values, setFieldValue)}
                    handleBack={handleBack}
                  />
                )}
                {activeStep === 2 && (
                  <AddressInfoSection
                    fields={getStepFields(2, selectedStatus)}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    steps={steps}
                    handleNext={() => handleNext(values, setFieldValue)}
                    handleBack={handleBack}
                  />
                )}
                {activeStep === 3 && (
                  <PaymentInfoSection
                    fields={getStepFields(3, selectedStatus)}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    steps={steps}
                    handleNext={() => handleNext(values, setFieldValue)}
                    handleBack={handleBack}
                  />
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ApplicationStatusForm;
