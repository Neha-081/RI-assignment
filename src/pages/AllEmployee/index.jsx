import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import noRecordsFound from "../../assets/no-records.svg";
import "./allEmployee.css";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { formatDate } from "../../utils";
import { useState } from "react";

const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const AllEmployee = () => {
  const [allUsers, setAllUsers] = useState([]);


  useEffect(() => {
    getAllData();
  }, []);

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
        alert("User deleted!");
        getAllData();
      };
    };
  };
  const edit="edit"

  return (
    <div className="all-employees">
      <header>
        <Navbar heading="Employee List" />
      </header>
      <main>
        <Link to="/add-employee">
          <Button text="+" />
        </Link>
          <div className="current-emp">Current Employees</div>
        <div className="sub-container">
          {allUsers?.map((employee) => (
            <div key={employee.id} className="employee-box">
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
              <Link to="/add-employee" state={{ value: "edit", user: employee, employee: employee.employeeName, role: employee.selectedRole, start: employee.selectedDayStart, end: employee.selectedDayEnd}}><p className="edit-btn" >edit</p></Link>
              
              <p className="edit-btn" onClick={() => deleteSelected(employee)}>delete</p>
            </div>
          ))}
          <div className="swipe-text">Swipe left to delete</div>
        </div>
      </main>
    </div>
  );
};

export default AllEmployee;
