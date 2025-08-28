
import React, { useState, useEffect } from "react";
import "./FilterPanel.css";
import arrowDownIcon from "../../../Asserts/ApplicationStatus/arrow-down.svg";

const FilterPanel = ({
  activeTab,
  setActiveTab,
  selectedZone,
  setSelectedZone,
  selectedDgm,
  setSelectedDgm,
  selectedCampus,
  setSelectedCampus,
  studentCategory,
  setStudentCategory,
}) => {
  const [isZoneOpen, setIsZoneOpen] = useState(false);
  const [isDgmOpen, setIsDgmOpen] = useState(false);
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [zoneSearch, setZoneSearch] = useState("");
  const [dgmSearch, setDgmSearch] = useState("");
  const [campusSearch, setCampusSearch] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      const insidePanel = event.target.closest('[data-filter-panel="true"]');
      if (!insidePanel) {
        setIsZoneOpen(false);
        setIsDgmOpen(false);
        setIsCampusOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (category) => {
    setStudentCategory((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filteredZones = [
    "All Zones",
    "North Zone",
    "South Zone",
    "East Zone",
    "West Zone",
  ].filter((zone) => zone.toLowerCase().includes(zoneSearch.toLowerCase()));

  const filteredDgms = ["All DGMs", "DGM 1", "DGM 2", "DGM 3", "DGM 4"].filter(
    (dgm) => dgm.toLowerCase().includes(dgmSearch.toLowerCase())
  );

  const filteredCampuses = [
    "All Campuses",
    "Campus A",
    "Campus B",
    "Campus C",
    "Campus D",
  ].filter((campus) =>
    campus.toLowerCase().includes(campusSearch.toLowerCase())
  );

  return (
    <div className="filter_panel" data-filter-panel="true">
      <h2 className="filter_panel__title">Filter Category</h2>

      {/* Tabs */}
      <ul className="filter_panel__tabs">
        {["Zone", "DGM", "Campus"].map((tab) => (
          <li key={tab} className="filter_panel__tab_item">
            <button
              className={`filter_panel__tab_btn ${
                activeTab === tab.toLowerCase()
                  ? "filter_panel__tab_btn--active"
                  : ""
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="filter_panel__tab_content">
        {activeTab === "zone" && (
          <>
            <label className="filter_panel__label">Select Zone</label>
            <div className="filter_panel__select">
              <div
                className="filter_panel__select_header"
                onClick={() => setIsZoneOpen(!isZoneOpen)}
              >
                {selectedZone || "Select Zone"}
                <img
                  src={arrowDownIcon}
                  alt="arrow"
                  className={`filter_panel__dropdown_icon ${
                    isZoneOpen ? "open" : ""
                  }`}
                />
              </div>
              {isZoneOpen && (
                <div className="filter_panel__dropdown">
                  <input
                    type="text"
                    className="filter_panel__input"
                    placeholder="Search Zone..."
                    value={zoneSearch}
                    onChange={(e) => setZoneSearch(e.target.value)}
                  />
                  <ul className="filter_panel__options">
                    {filteredZones.map((zone) => (
                      <li
                        key={zone}
                        className="filter_panel__option"
                        onClick={() => {
                          setSelectedZone(zone);
                          setZoneSearch("");
                          setIsZoneOpen(false);
                        }}
                      >
                        {zone}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "dgm" && (
          <>
            <label className="filter_panel__label">Select DGM</label>
            <div className="filter_panel__select">
              <div
                className="filter_panel__select_header"
                onClick={() => setIsDgmOpen(!isDgmOpen)}
              >
                {selectedDgm || "Select DGM"}
                <img
                  src={arrowDownIcon}
                  alt="arrow"
                  className={`filter_panel__dropdown_icon ${
                    isDgmOpen ? "open" : ""
                  }`}
                />
              </div>
              {isDgmOpen && (
                <div className="filter_panel__dropdown">
                  <input
                    type="text"
                    className="filter_panel__input"
                    placeholder="Search DGM..."
                    value={dgmSearch}
                    onChange={(e) => setDgmSearch(e.target.value)}
                  />
                  <ul className="filter_panel__options">
                    {filteredDgms.map((dgm) => (
                      <li
                        key={dgm}
                        className="filter_panel__option"
                        onClick={() => {
                          setSelectedDgm(dgm);
                          setDgmSearch("");
                          setIsDgmOpen(false);
                        }}
                      >
                        {dgm}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "campus" && (
          <>
            <label className="filter_panel__label">Select Campus</label>
            <div className="filter_panel__select">
              <div
                className="filter_panel__select_header"
                onClick={() => setIsCampusOpen(!isCampusOpen)}
              >
                {selectedCampus || "Select Campus"}
                <img
                  src={arrowDownIcon}
                  alt="arrow"
                  className={`filter_panel__dropdown_icon ${
                    isCampusOpen ? "open" : ""
                  }`}
                />
              </div>
              {isCampusOpen && (
                <div className="filter_panel__dropdown">
                  <input
                    type="text"
                    className="filter_panel__input"
                    placeholder="Search Campus..."
                    value={campusSearch}
                    onChange={(e) => setCampusSearch(e.target.value)}
                  />
                  <ul className="filter_panel__options">
                    {filteredCampuses.map((campus) => (
                      <li
                        key={campus}
                        className="filter_panel__option"
                        onClick={() => {
                          setSelectedCampus(campus);
                          setCampusSearch("");
                          setIsCampusOpen(false);
                        }}
                      >
                        {campus}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Student Category */}
      <div className="filter_panel__student_category">
        <label className="filter_panel__student_category_label">
          Student Category
        </label>
        <div className="filter_panel__student_category_grid">
          {[
            { key: "all", label: "All" },
            { key: "sold", label: "Sold" },
            { key: "conformed", label: "Conformed" },
            { key: "unsold", label: "UnSold" },
            { key: "withPro", label: "With PRO" },
            { key: "damaged", label: "Damaged" },
          ].map(({ key, label }) => (
            <div className="filter_panel__category_item" key={key}>
              <input
                type="checkbox"
                className="filter_panel__checkbox"
                id={key}
                checked={studentCategory[key]}
                onChange={() => handleCategoryChange(key)}
              />
              <label htmlFor={key} className="filter_panel__checkbox_label">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
