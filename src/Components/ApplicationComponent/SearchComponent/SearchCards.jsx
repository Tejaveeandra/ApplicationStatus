import React from "react";
import "./SearchCards.css";
import DivisionDesign from "../../../Asserts/ApplicationStatus/DivisionDesign.svg";
import Statusbar from "../../../Widgets/StatusBar/Statusbar";

const SearchCards = ({ search, data, maxResults = 5, onCardClick }) => {
  // Use the provided data prop
  const displayData = data || [];
  const filteredData = search
    ? displayData.filter((item) => item.applicationNo.includes(search)) // Use applicationNo for consistency
    : displayData;

  const limitedData = filteredData.slice(0, maxResults);

  return (
    <div className="recent-search">
      <h3 className="recent-search__title">Recent Search</h3>
      <div className="recent-search__cards">
        {limitedData.length > 0 ? (
          limitedData.map((item) => (
            <div
              key={item.id}
              className="recent-search__card"
              onClick={() => onCardClick && onCardClick(item)} // Trigger form on card click
            >
              <figure className="recent-search__image"></figure>
              <p className="recent-search__id">{item.applicationNo}</p>
              <p className="recent-search__Campus">{item.campus}</p>
              <p className="recent-search__Zone">{item.zone}</p>
              <figure className="recent-search__division">
                <img src={DivisionDesign} alt="Division Design Icon" />
              </figure>

              {/* Statusbar */}
              <div className="recent-search__status">
                <Statusbar
                  isSold={item.status === "Sold"}
                  isConfirmed={item.status === "Confirmed"}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="recent-search__no-results">No results found for ID: {search}</p>
        )}
      </div>
    </div>
  );
};

export default SearchCards;