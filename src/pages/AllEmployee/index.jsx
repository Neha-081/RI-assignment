import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import noRecordsFound from "../../assets/no-records.svg";
import "./allEmployee.css";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { formatDate } from "../../utils";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../appContext";
import { toast } from "react-toastify";
import trashImage from '../../assets/trash.svg';
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

// IndexedDB initialization
const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const AllEmployee = () => {
  // Use context to access shared state and functions
  const {
    setAddUser,
    setEditUser,
    setEmployeeName,
    setSelectedRole,
    setSelectedDayStart,
    setSelectedDayEnd,
    setSelectedUser,
  } = useContext(AppContext);

  const [allUsers, setAllUsers] = useState([]);

  // Retrieve all data from IndexedDB on component mount
  useEffect(() => {
    getAllData(setAllUsers);
  }, []);

  // Function to retrieve all data from IndexedDB
  const getAllData = () => {
    const dbPromise = idb.open("test-db", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      var tx = db.transaction("userData", "readonly");
      var userData = tx.objectStore("userData");
      const users = userData.getAll();

      users.onsuccess = (query) => {
        setAllUsers(query.srcElement.result);
      };

      tx.oncomplete = function () {
        db.close();
      };
    };
  };

  // Function to delete a selected user
  const deleteSelected = (user) => {
    const dbPromise = idb.open("test-db", 1);

    dbPromise.onsuccess = function () {
      const db = dbPromise.result;
      var tx = db.transaction("userData", "readwrite");
      var userData = tx.objectStore("userData");
      const deleteUser = userData.delete(user.id);

      deleteUser.onsuccess = (query) => {
        tx.oncomplete = function () {
          db.close();
        };
        toast.error("User Deleted!");
        getAllData();
      };
    };
  };

  // Function to handle clicking the edit button for a user
  const handleEditClick = (user) => {
    setAddUser(false);
    setEditUser(true);
    setSelectedUser(user);
    setEmployeeName(user.employeeName);
    setSelectedRole(user.selectedRole);
    setSelectedDayStart(user.selectedDayStart);
    setSelectedDayEnd(user.selectedDayEnd);
  };

  // Function to handle clicking the add button
  const handleAddClick = () => {
    setAddUser(true);
    setEditUser(false);
    setSelectedUser({});
    setEmployeeName("");
    setSelectedRole(null);
    setSelectedDayStart(null);
    setSelectedDayEnd(null);
  };

  // Function to render trailing actions for swipeable list items
  const trailingActions = (user) => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => deleteSelected(user)}
      >
        <div className="swipe-dlt">
        <img src={trashImage} alt="trash" />
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className="all-employees">
      <header>
        {/* Display the Navbar with a static heading */}
        <Navbar heading="Employee List" />
      </header>
      <main>
        <Link to="/add-employee">
          {/* Render an add button */}
          <Button text="+" onClick={handleAddClick} />
        </Link>
        {allUsers?.length !== 0 ? (
          <>
            <div className="current-emp">Current Employees</div>
            <div className="sub-container">
              {/* Map through and render employee details */}
              {allUsers?.map((employee) => (
                <SwipeableList key={employee.id}>
                  <SwipeableListItem
                    trailingActions={trailingActions(employee)}
                  >
                    <div className="employee-box">
                      <h4>{employee.employeeName}</h4>
                      <p>{employee.selectedRole.label}</p>
                      {employee?.selectedDayEnd !== null ? (
                        <p>
                          <span>
                            {employee?.selectedDayStart &&
                              formatDate(employee?.selectedDayStart)}{" "}
                            -{" "}
                          </span>{" "}
                          <span>
                            {" "}
                            {employee?.selectedDayEnd &&
                              formatDate(employee?.selectedDayEnd)}
                          </span>
                        </p>
                      ) : (
                        <p>
                          <span>
                            From{" "}
                            {employee?.selectedDayStart &&
                              formatDate(employee?.selectedDayStart)}
                          </span>
                        </p>
                      )}
                      <Link
                        to="/add-employee"
                        className="edit-btn"
                        onClick={() => handleEditClick(employee)}
                      >
                        ✎
                      </Link>
                    </div>
                  </SwipeableListItem>
                </SwipeableList>
              ))}
            </div>
              <div className="swipe-text">Swipe left to delete</div>
          </>
        ) : (
          <main>
            {/* Display a message when no records are found */}
            <img
              className="no-records"
              src={noRecordsFound}
              alt="no-records-img"
            />
          </main>
        )}
      </main>
    </div>
  );
};

export default AllEmployee;
