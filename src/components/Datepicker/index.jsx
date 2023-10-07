import React, { useState, useEffect } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";
import DateImage from "../../assets/date.svg";
import "./date.css";

const Datepicker = ({ selectedDayStart, selectedDayEnd, onChangeStart, onChangeEnd }) => {
  // Define state variables
  const [isDateStart, setIsDateStart] = useState(false);
  const [isDateEnd, setIsDateEnd] = useState(false);
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");

  // Event handlers for selecting start and end dates
  const handleDateFrom = (e) => {
    e.preventDefault();
    setIsDateStart(!isDateStart);
    setIsDateEnd(false);
  };

  const handleDateTo = (e) => {
    e.preventDefault();
    setIsDateEnd(!isDateEnd);
    setIsDateStart(false);
  };

  // Convert selected dates to formatted strings
  const startDate = `${selectedDayStart?.day}-${selectedDayStart?.month}-${selectedDayStart?.year}`;
  const endDate = `${selectedDayEnd?.day}-${selectedDayEnd?.month}-${selectedDayEnd?.year}`;

  // Update start date value when selectedDayStart changes
  useEffect(() => {
    if (selectedDayStart !== null) {
      setStartDateValue(startDate);
    }
  }, [selectedDayStart, startDate]);

  // Update end date value when selectedDayEnd changes
  useEffect(() => {
    if (selectedDayEnd !== null) {
      setEndDateValue(endDate);
    }
  }, [selectedDayEnd, endDate]);

  // Handle submission of start date
  const handleStartDateSubmit = () => {
    setStartDateValue(startDate);
    setIsDateStart(false);
  };

  // Handle submission of end date
  const handleEndDateSubmit = () => {
    setEndDateValue(endDate);
    setIsDateEnd(false);
  };

  return (
    <>
      <div className="date-container">
        {/* Start Date */}
        <div className="left-inner-addon">
          <button onClick={handleDateFrom}>
            {!startDateValue ? "Today" : startDateValue}
          </button>
          <img src={DateImage} alt="date" />
        </div>
        <span>&#8594;</span>
        {/* End Date */}
        <div className="left-inner-addon">
          <button onClick={handleDateTo}>
            {!endDateValue ? "No Date" : endDateValue}
          </button>
          <img src={DateImage} alt="date" />
        </div>
      </div>
      {/* Calendar for selecting start date */}
      {isDateStart && (
        <Calendar
          value={selectedDayStart}
          onChange={onChangeStart}
          shouldHighlightWeekends
          className="calendar"
          colorPrimary="#1DA1F2"
          calendarClassName="custom-calendar"
          calendarTodayClassName="custom-today-day"
          renderFooter={() => (
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <div className="left-date">
                <img src={DateImage} alt="date" />
                {selectedDayStart != null && (
                  <span className="date-name">
                    {selectedDayStart?.day}-{selectedDayStart?.month}-
                    {selectedDayStart?.year}
                  </span>
                )}
              </div>
              {/* Cancel and Save buttons */}
              <button
                type="button"
                onClick={() => {
                  setIsDateStart(false);
                }}
                style={{
                  cursor: "pointer",
                  border: "#0fbcf9",
                  color: "#1DA1F2",
                  borderRadius: "0.5rem",
                  padding: "10px 15px",
                  backgroundColor: "#1DA1F220",
                  margin: "5px",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartDateSubmit}
                style={{
                  cursor: "pointer",
                  border: "#0fbcf9",
                  color: "#fff",
                  borderRadius: "0.5rem",
                  padding: "10px 15px",
                  backgroundColor: "#1DA1F2",
                  margin: "5px",
                }}
              >
                Save
              </button>
            </div>
          )}
        />
      )}
      {/* Calendar for selecting end date */}
      {isDateEnd && (
        <Calendar
          value={selectedDayEnd}
          onChange={onChangeEnd}
          shouldHighlightWeekends
          className="calendar"
          colorPrimary="#1DA1F2"
          calendarClassName="custom-calendar"
          calendarTodayClassName="custom-today-day"
          renderFooter={() => (
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <div className="left-date">
                <img src={DateImage} alt="date" />
                {selectedDayEnd != null && (
                  <span className="date-name">
                    {selectedDayEnd?.day}-{selectedDayEnd?.month}-
                    {selectedDayEnd?.year}
                  </span>
                )}
              </div>
              {/* Cancel and Save buttons */}
              <button
                type="button"
                onClick={() => {
                  setIsDateEnd(false);
                }}
                style={{
                  cursor: "pointer",
                  border: "#0fbcf9",
                  color: "#1DA1F2",
                  borderRadius: "0.5rem",
                  padding: "10px 15px",
                  backgroundColor: "#1DA1F220",
                  margin: "5px",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEndDateSubmit}
                style={{
                  cursor: "pointer",
                  border: "#0fbcf9",
                  color: "#fff",
                  borderRadius: "0.5rem",
                  padding: "10px 15px",
                  backgroundColor: "#1DA1F2",
                  margin: "5px",
                }}
              >
                Save
              </button>
            </div>
          )}
        />
      )}
    </>
  );
};

export default Datepicker;
