import React, { useState } from "react";
import "./FileExport.css";

const FileExport = ({ onExport }) => {
  const [selectedType, setSelectedType] = useState("PDF");

  const fileTypes = ["PDF", ".xls", "doc"];

  const handleSelect = (type) => {
    setSelectedType(type);
    if (onExport) {
      onExport(type);
    }
  };

  return (
    <div className="export-container">
    

      <div className="file-type-wrapper">
        <span className="file-type-label">File Type</span>
        <div className="file-type-options">
          {fileTypes.map((type) => (
            <button
              key={type}
              className={`file-type-btn ${
                selectedType === type ? "active" : ""
              }`}
              onClick={() => handleSelect(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileExport;
