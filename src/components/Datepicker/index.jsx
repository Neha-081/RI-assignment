import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@amir04lm26/react-modern-calendar-date-picker";
import DateImage from "../../assets/date.svg";
import "./date.css";
import { useEffect } from "react";

const Datepicker = ({selectedDayStart, selectedDayEnd, onChangeStart, onChangeEnd}) => {
  const [isDateStart, setIsDateStart] = useState(false);
  const [isDateEnd, setIsDateEnd] = useState(false);
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");

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

  const startDate = `${selectedDayStart?.day}-${selectedDayStart?.month}-${selectedDayStart?.year}`;
  const endDate = `${selectedDayEnd?.day}-${selectedDayEnd?.month}-${selectedDayEnd?.year}`;

  useEffect(() => {
    if (selectedDayStart !== null) {
    setStartDateValue(startDate);
    }
  }, [selectedDayStart])

  useEffect(() => {
    if (selectedDayEnd !== null) {
    setEndDateValue(endDate);
    }
  }, [selectedDayEnd])

  const handleStartDateSubmit = () => {
    setStartDateValue(startDate);
    setIsDateStart(false);
  };

  const handleEndDateSubmit = () => {
    setEndDateValue(endDate);
    setIsDateEnd(false);
  };

  return (
    <>
      <div className="date-container">
        <div className="left-inner-addon">
          <button onClick={handleDateFrom}>
            {!startDateValue ? "Today" : startDateValue}
          </button>
          <img role="img" src={DateImage} />
        </div>
        <span>&#8594;</span>
        <div className="left-inner-addon">
          <button onClick={handleDateTo}>
            {!endDateValue ? "No Date" : endDateValue}
          </button>
          <img role="img" src={DateImage} />
        </div>
      </div>
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
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <div className="left-date">
                <img role="img" src={DateImage} />
                {selectedDayStart != null && (
                  <span className="date-name">
                    {selectedDayStart?.day}-{selectedDayStart?.month}-
                    {selectedDayStart?.year}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsDateStart(false);
                }}
                style={{
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
            <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <div className="left-date">
                <img role="img" src={DateImage} />
                {selectedDayEnd != null && (
                  <span className="date-name">
                    {selectedDayEnd?.day}-{selectedDayEnd?.month}-
                    {selectedDayEnd?.year}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsDateEnd(false);
                }}
                style={{
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
            <div>
              <button
                type="button"
                onClick={handleEndDateSubmit}
                style={{
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
            </>
          )}
        />
      )}
    </>
  );
};

export default Datepicker;
