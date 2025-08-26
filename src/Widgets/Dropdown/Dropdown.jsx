import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.css";
import downarrow from "../../Asserts/ApplicationStatus/Arrow_down";
 
const dropdownsearchicon = (
  <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5677 14.6599L15.567 14.6592L12.336 11.4134C13.0024 10.5599 13.4033 9.48326 13.4033 8.31873C13.4033 5.5151 11.1223 3.23413 8.31875 3.23413C5.51522 3.23413 3.23425 5.5151 3.23425 8.31863C3.23425 11.1173 5.51522 13.3981 8.31875 13.3981C9.43346 13.3981 10.4604 13.0365 11.298 12.4244L14.5441 15.6754L14.5445 15.6758C14.6796 15.8162 14.8675 15.8851 15.0584 15.8851C15.482 15.8851 15.7658 15.5613 15.7658 15.1628C15.7658 14.9659 15.6964 14.7939 15.5677 14.6599ZM4.26625 8.31863C4.26625 6.08371 6.08373 4.26613 8.31875 4.26613C10.5537 4.26613 12.3663 6.08361 12.3663 8.31863C12.3663 10.5487 10.5537 12.3661 8.31875 12.3661C6.08373 12.3661 4.26625 10.5487 4.26625 8.31863Z" fill="#A1A5B0" stroke="#A1A5B0" stroke-width="0.101865"/>
</svg>
)
 
const Dropdown = ({ dropdownname, results, onChange, value, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
 
  // Filter results based on search term (case-insensitive)
  const filteredResults = Array.isArray(results)
    ? results.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
 
  // Toggle dropdown
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
 
  // Handle input change for search
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
 
  // Handle option selection
  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setIsOpen(false);
    onChange({ target: { name, value: option } }); // Emit Formik-compatible event
  };
 
  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  // Sync searchTerm with value prop and focus input when opened
  useEffect(() => {
    setSearchTerm(value || "");
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [value, isOpen]);
 
  return (
    <div className={styles.dropdown_wrapper} ref={dropdownRef}>
      <label htmlFor={name} className={styles.dropdown_label}>
        {dropdownname}
      </label>
      <button
        type="button"
        className={styles.dropdown_button}
        onClick={handleToggle}
      >
        {value || `Select ${dropdownname}`}
        <span className={styles.dropdown_arrow}>{downarrow}</span>
      </button>
      {isOpen && (
        <ul className={styles.dropdown_list}>
          <li className={styles.dropdown_search_list}>
            <div className={styles.dropdown_search_icon}>
              {dropdownsearchicon}
            </div>
            <input
            placeholder="Search"
             className={styles.dropdown_search_box}
            />
 
          </li>
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <li className={styles.dropdown_result_list} key={result}>
                <span
                  className={styles.dropdown_option}
                  onClick={() => handleOptionClick(result)}
                >
                  {result}
                </span>
              </li>
            ))
          ) : (
            <li>
              <span className={styles.dropdown_no_results}>
                No results found
              </span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
 
export default Dropdown;