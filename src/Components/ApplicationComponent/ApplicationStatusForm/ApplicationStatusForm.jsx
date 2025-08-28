import React, { useState } from "react";
import { Button } from "@mui/material";
import { Formik, Form, FieldArray } from "formik";
import ArrowBack from "@mui/icons-material/ArrowBack";
import StatusSelector from "../../../Widgets/StatusSelector/StatusSelector";
import ProgressHeader from "../../../Widgets/ProgressHeader/ProgressHeader";
import StepperTabs from "../../../Widgets/StepperTabs/StepperTabs";
import GeneralInfoSection from "../../GeneralInfoSection/GeneralInfoSection";
import ConcessionInfoSection from "./ConcessionInfoSection";
import AddressInfoSection from "../../AddressInfoSection/AddressInfoSection";
import PaymentInfoSection from "../../PaymentInfoSection/PaymentInfoSection";
import "./ApplicationStatusForm.css";

const StatusDetails = ({ status }) => {
  const details = {
    Confirmation: [
     
    ],
    Damaged: [
      { label: "Damage Date", value: "2024-01-10" },
      { label: "Damage Type", value: "Document Damage" },
      { label: "Status", value: "Damaged" },
    ],
  };

  return (
    <div className="status-details">
      <h3>{status} Details</h3>
      <ul>
        {details[status]?.map((item, index) => (
          <li key={index}>
            <strong>{item.label}:</strong> {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ApplicationStatusForm = ({ onBack, initialData = {} }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("Sale");
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
    doorNo: "",
    street: "",
    landmark: "",
    area: "",
    pincode: "",
    district: "",
    mandal: "",
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

  const initialValues = {
    ...defaultInitialValues,
    ...initialData,
    htNo: initialData.applicationNo || initialData.htNo || "",
    joinedCampus: initialData.campus || initialData.joinedCampus || "",
    district: initialData.zone || initialData.district || "",
  };

  const validate = (values) => {
    const errors = {};
    if (activeStep === 0 && selectedStatus === "Sale") {
      if (!values.htNo) errors.htNo = "HT No is required";
      if (!values.studentName) errors.studentName = "Student Name is required";
      if (!values.phoneNumber) errors.phoneNumber = "Phone Number is required";
      if (!values.category) errors.category = "Category is required";
      if (!values.appType) errors.appType = "App Type is required";
      if (!values.studentType) errors.studentType = "Student Type is required";
      if (!values.gender) errors.gender = "Gender is required";
      if (!values.joinedCampus) errors.joinedCampus = "Joined Campus is required";
      if (!values.joinInto) errors.joinInto = "Join Into is required";
      if (!values.course) errors.course = "Course is required";
      if (!values.courseBatch) errors.courseBatch = "Course Batch is required";
      if (!values.courseDates) errors.courseDates = "Course Dates is required";
      if (!values.schoolState) errors.schoolState = "School State is required";
      if (!values.schoolDistrict) errors.schoolDistrict = "School District is required";
      if (!values.schoolType) errors.schoolType = "School Type is required";
     
    }
    if (activeStep === 1 && selectedStatus === "Sale") {
      if (!values.reason) errors.reason = "Reason is required";
      if (!values.concessionWritten) errors.concessionWritten = "Concession Written is required";
    }
    if (activeStep === 2 && selectedStatus === "Sale") {
      if (!values.doorNo) errors.doorNo = "Door No is required";
      if (!values.street) errors.street = "Street is required";
      if (!values.area) errors.area = "Area is required";
      if (!values.pincode) errors.pincode = "Pincode is required";
      if (!values.district) errors.district = "District is required";
      if (!values.mandal) errors.mandal = "Mandal is required";
      if (!values.city) errors.city = "City is required";
    }
    if (activeStep === 3 && selectedStatus === "Sale") {
      if (!values.payMode) errors.payMode = "Payment Mode is required";
      if (!values.paymentDate) errors.paymentDate = "Payment Date is required";
      if (!values.amount) errors.amount = "Amount is required";
      if (values.appFeeReceived) {
        if (!values.appFeePayMode) errors.appFeePayMode = "Application Fee Pay Mode is required";
        if (!values.appFeePayDate) errors.appFeePayDate = "Application Fee Pay Date is required";
        if (!values.appFeeAmount) errors.appFeeAmount = "Application Fee Amount is required";
      }
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
            { label: "Sibling Information", name: "siblingInformation", type: "custom" },
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
            { label: "Door No", name: "doorNo", placeholder: "Enter Door No" },
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
            { label: "Application Fee Pay Mode", name: "payMode", type: "custom" },
            { label: "Application Fee Received", name: "appFeeReceived", type: "checkbox" },
            { label: "Application Fee Pay Date", name: "paymentDate", placeholder: "Select Payment Date", type: "date" },
            { label: "Application Fee Amount", name: "amount", placeholder: "Enter Amount", type: "number" },
            { label: "Pre Printed Receipt No", name: "prePrintedReceiptNo", placeholder: "Enter Receipt No" },
            { label: "Pay Mode", name: "appFeePayMode", type: "custom" },
            { label: "Application Fee Pay Date", name: "appFeePayDate", placeholder: "Select Pay Date", type: "date" },
            { label: "Application Fee Amount", name: "appFeeAmount", placeholder: "Enter Amount", type: "number" },
            { label: "Pre Printed Receipt No", name: "appFeeReceiptNo", placeholder: "Enter Receipt No" },
          ];
          break;
        default:
          allFields = [];
      }
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

  const handleNext = (values, setFieldValue, validateForm, setTouched) => {
    validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        if (activeStep === 1) {
          setFieldValue("couponMobile", couponDetails.mobile);
          setFieldValue("couponCode", couponDetails.code);
        }
        if (activeStep < steps.length - 1) {
          setActiveStep((prev) => prev + 1);
        } else {
          handleSubmit(values);
        }
      } else {
        const touchedFields = {};
        Object.keys(errors).forEach((field) => {
          touchedFields[field] = true;
          if (field.includes("siblingInformation")) {
            const match = field.match(/siblingInformation\[(\d+)\]\.(\w+)/);
            if (match) {
              const [, index, subField] = match;
              if (!touchedFields.siblingInformation) touchedFields.siblingInformation = [];
              if (!touchedFields.siblingInformation[index]) touchedFields.siblingInformation[index] = {};
              touchedFields.siblingInformation[index][subField] = true;
            }
          }
        });
        setTouched(touchedFields);
      }
    });
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

  const handleStepChange = (step) => {
    if (step <= activeStep) {
      setActiveStep(step);
    }
  };

  return (
    <div className="main-app-status-container">
      <Button className="main-back-btn" onClick={onBack} sx={{ mb: 2 }}>
        <ArrowBack sx={{ fontSize: 24 }} />
      </Button>
      <div className="main-layout-wrapper">
        <StatusSelector selectedStatus={selectedStatus} onStatusSelect={setSelectedStatus} />
        {selectedStatus && <ProgressHeader step={activeStep} totalSteps={steps.length} />}
      </div>
      {selectedStatus === "Sale" ? (
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, errors, touched, setFieldValue, handleChange, validateForm, setTouched }) => (
            <Form className="main-application-form">
              <div className="main-form-wrapper">
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
                    handleNext={() => handleNext(values, setFieldValue, validateForm, setTouched)}
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
                    handleNext={() => handleNext(values, setFieldValue, validateForm, setTouched)}
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
                    handleNext={() => handleNext(values, setFieldValue, validateForm, setTouched)}
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
                    setFieldValue={setFieldValue}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    steps={steps}
                    handleNext={() => handleNext(values, setFieldValue, validateForm, setTouched)}
                    handleBack={handleBack}
                  />
                )}
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <StatusDetails status={selectedStatus} />
      )}
    </div>
  );
};

export default ApplicationStatusForm;
