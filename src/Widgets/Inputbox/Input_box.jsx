import React from "react";
import "./Inputbox.css";

const Inputbox = ({ label, id, name, placeholder, onChange, value, type = "text", disabled = false }) => {
  return (
    <div className="inputbox-wrapper">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-box"
        disabled={disabled}
      />
    </div>
  );
};

export default Inputbox;