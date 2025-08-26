import React, { useState, useEffect } from "react";
import styles from "./ApplicationStatus.module.css";

import searchIcon from "../../../Asserts/ApplicationStatus/Group.svg";
import filterIcon from "../../../Asserts/ApplicationStatus/Filter.svg";
import appliedFilterIcon from "../../../Asserts/ApplicationStatus/Vector.svg";
import exportIcon from "../../../Asserts/ApplicationStatus/Arrow up.svg";

import FilterPanel from "../FilterComponent/FilterPanel";
import FileExport from "../ExportComponent/FileExport";
import ApplicationStatusTable from "../ApplicationStatusTable/ApplicationStatusTable";
import SearchCards from "../SearchComponent/SearchCards";
import ApplicationStatusForm from "../ApplicationStatusForm/ApplicationStatusForm";

const ApplicationStatus = () => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filteredData, setFilteredData] = useState([]); // State to hold filtered data from table
  const [showForm, setShowForm] = useState(false); // New state to control form visibility

  // Lifted states from FilterPanel
  const [activeTab, setActiveTab] = useState("zone");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedDgm, setSelectedDgm] = useState("All DGMs");
  const [selectedCampus, setSelectedCampus] = useState("All Campuses");
  const [studentCategory, setStudentCategory] = useState({
    all: true,
    sold: false,
    conformed: false,
    unsold: false,
    withPro: false,
  });

  // Check filter applied
  useEffect(() => {
    const applied =
      selectedZone !== "All Zones" ||
      selectedDgm !== "All DGMs" ||
      selectedCampus !== "All Campuses" ||
      !studentCategory.all ||
      studentCategory.sold ||
      studentCategory.conformed ||
      studentCategory.unsold ||
      studentCategory.withPro;
    setIsFilterApplied(applied);
  }, [selectedZone, selectedDgm, selectedCampus, studentCategory]);

  // Close filter/export on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      const exportPanel = document.querySelector(".export-container");
      const filterPanel = document.querySelector(".filter_panel");
      const filterButton = event.target.closest(`.${styles["application-status__filter-btn"]}`);
      const exportButton = event.target.closest(`.${styles["application-status__export-btn"]}`);

      if (showExport && exportPanel && !exportPanel.contains(event.target) && !exportButton) {
        setShowExport(false);
      }
      if (showFilter && filterPanel && !filterPanel.contains(event.target) && !filterButton) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showExport, showFilter]);

  // Callback to open form when SearchCard is clicked
  const handleCardClick = () => {
    setShowForm(true);
  };

  // Callback to go back to ApplicationStatus
  const handleBack = () => {
    setShowForm(false);
  };

  return (
    <div className={styles["application-status"]}>
      {/* Blur Overlay */}
      {(showFilter || showExport || showForm) && (
        <div
          className={styles["application-status__overlay"]}
          onClick={() => {
            setShowFilter(false);
            setShowExport(false);
            if (showForm) setShowForm(false); // Close form if open and clicked outside
          }}
        />
      )}

      {!showForm && (
        <div className={styles["application-status__card"]}>
          {/* Header */}
          <h2 className={styles["application-status__title"]}>Application Status</h2>
          <p className={styles["application-status__subtitle"]}>
            Access and manage comprehensive student details seamlessly. View personalized profiles tailored to your campus.
          </p>

          {/* Search + Actions */}
          <div className={styles["application-status__actions"]}>
            {/* Search Box */}
            <div className={styles["application-status__search"]}>
              <figure className={styles["application-status__search-icon"]}>
                <img src={searchIcon} alt="Search" />
              </figure>
              <input
                type="text"
                placeholder="Search with application no"
                value={search}
                onChange={(e) => setSearch(e.target.value.trim())}
              />
            </div>

            {/* Filter Button */}
            {!search && (
              <div className={styles["application-status__filter"]}>
                <button
                  className={styles["application-status__filter-btn"]}
                  onClick={() => setShowFilter((prev) => !prev)}
                >
                  <span className={styles["application-status__filter-icon-wrapper"]}>
                    <img src={isFilterApplied ? appliedFilterIcon : filterIcon} alt="Filter" />
                    {isFilterApplied && (
                      <span className={styles["application-status__filter-dot"]}></span>
                    )}
                  </span>
                  Filter
                </button>
                {showFilter && (
                  <FilterPanel
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    selectedZone={selectedZone}
                    setSelectedZone={setSelectedZone}
                    selectedDgm={selectedDgm}
                    setSelectedDgm={setSelectedDgm}
                    selectedCampus={selectedCampus}
                    setSelectedCampus={setSelectedCampus}
                    studentCategory={studentCategory}
                    setStudentCategory={setStudentCategory}
                  />
                )}
              </div>
            )}

            {/* Export Button */}
            {!search && (
              <div className={styles["application-status__export"]}>
                <button
                  className={styles["application-status__export-btn"]}
                  onClick={() => setShowExport((prev) => !prev)}
                >
                  <img src={exportIcon} alt="Export" /> Export
                </button>
                {showExport && (
                  <FileExport onExport={(type) => console.log("Export:", type)} />
                )}
              </div>
            )}
          </div>

          {/* Conditional Rendering: Table or SearchCards */}
          {search ? (
            <SearchCards
              search={search}
              data={filteredData} // Use the filtered data passed from table
              maxResults={5}
              onCardClick={handleCardClick} // Pass callback to open form
            />
          ) : (
            <ApplicationStatusTable
              search={search}
              selectedZone={selectedZone}
              selectedDgm={selectedDgm}
              selectedCampus={selectedCampus}
              studentCategory={studentCategory}
              onDataFilter={(data) => setFilteredData(data)} // Callback to receive filtered data
            />
          )}
        </div>
      )}

      {/* Render Form full page when showForm is true */}
      {showForm && (
        <div className={styles["application-status__form-container"]}>
          <ApplicationStatusForm onBack={handleBack} /> {/* Pass onBack callback */}
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;