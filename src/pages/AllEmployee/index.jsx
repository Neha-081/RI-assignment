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
  console.log(allUsers, "allcjhevfjkjvemd");

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

  return (
    <div>
      <header>
        <Navbar heading="Employee List" />
      </header>
      <main>
        <Link to="/add-employee">
          <Button text="+" />
        </Link>
        <div>
          <div className="current-emp">Current Employees</div>
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
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllEmployee;
