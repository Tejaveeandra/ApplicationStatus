import React from "react";
import "./Inputbox.css";

const Inputbox = ({ label, id, name, placeholder, onChange, value, type = "text", disabled = false, error }) => {
  return (
    <div className="inputbox-wrapper">
      <label htmlFor={name} className="inputbox-label">{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onChange}
        className={`input-box ${error ? "input-box-error" : ""}`}
        disabled={disabled}
      />
     
    </div>
  );
};

export default Inputbox;
