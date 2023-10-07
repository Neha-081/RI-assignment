import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./employee.css";
import UserImage from "../../assets/user.svg";
import Dropdown from "../../components/Dropdown";
import Datepicker from "../../components/Datepicker";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../appContext";
import { toast } from "react-toastify";

// IndexedDB initialization and data insertion function
const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const insertDataInIndexedDb = () => {
  // Check for IndexedDB support
  if (!idb) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  // Open the IndexedDB database
  const request = idb.open("test-db", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function (event) {
    console.log(event);
    const db = request.result;

    if (!db.objectStoreNames.contains("userData")) {
      const objectStore = db.createObjectStore("userData", { keyPath: "id" });

      objectStore.createIndex("employee", "employee", {
        unique: false,
      });
    }
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");

    const db = request.result;

    var tx = db.transaction("userData", "readwrite");

    return tx.complete;
  };
};

const AddEmployee = () => {
  const {
    addUser,
    setAddUser,
    editUser,
    selectedUser,
    setSelectedUser,
    employeeName,
    setEmployeeName,
    selectedRole,
    setSelectedRole,
    selectedDayStart,
    setSelectedDayStart,
    selectedDayEnd,
    setSelectedDayEnd
  } = useContext(AppContext);

  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  // Handle role change
  const handleRoleChange = (newOption) => {
    setSelectedRole(newOption);
  };

  // Handle start date change
  const handleStartDateChange = (newDate) => {
    setSelectedDayStart(newDate);
  };

  // Handle end date change
  const handleEndDateChange = (newDate) => {
    setSelectedDayEnd(newDate);
  };

  // Insert data in IndexedDB and retrieve all data on component mount
  useEffect(() => {
    insertDataInIndexedDb();
    getAllData();
  }, []);

  // Retrieve all data from IndexedDB
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

  // Handle form submission
  const handleSubmit = (event) => {
    const dbPromise = idb.open("test-db", 1);
    if (employeeName && selectedRole && selectedDayStart) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;

        var tx = db.transaction("userData", "readwrite");
        var userData = tx.objectStore("userData");

        if (addUser) {
          const users = userData.put({
            id: allUsers?.length + 1,
            employeeName,
            selectedRole,
            selectedDayStart,
            selectedDayEnd,
          });

          console.log("add");
          users.onsuccess = (query) => {
            tx.oncomplete = function () {
              db.close();
            };
            toast.success("User added!");
            setEmployeeName("");
            setSelectedRole(null);
            setSelectedDayStart(null);
            setSelectedDayEnd(null);
            setAddUser(false);
            getAllData();
            event.preventDefault();
          };
        } else {
          const users = userData.put({
            id: selectedUser?.id,
            employeeName,
            selectedRole,
            selectedDayStart,
            selectedDayEnd,
          });
          console.log("edit");

          users.onsuccess = (query) => {
            tx.oncomplete = function () {
              db.close();
            };
            toast.success("User updated!");
            setEmployeeName("");
            setSelectedRole(null);
            setSelectedDayStart(null);
            setSelectedDayEnd(null);
            setAddUser(false);
            getAllData();
            setSelectedUser({});
            event.preventDefault();
          };
        }
      };
      navigate("/");
    } else {
      toast.warning("Please enter all details");
    }
  };

  // Render the AddEmployee component
  return (
    <div className="main-container">
      <header>
        {/* Display the Navbar with a dynamic heading */}
        <Navbar heading={editUser ? "Edit Employee Details" : "Add Employee Details"} />
      </header>
      <form>
        <div className="left-inner-addon">
          <input
            type="text"
            placeholder="Employee name"
            onChange={(e) => setEmployeeName(e.target.value)}
            value={employeeName}
          />
          <img src={UserImage} alt="User" />
        </div>
        {/* Render the Dropdown and Datepicker components */}
        <Dropdown selectedRole={selectedRole} onChange={handleRoleChange} />
        <Datepicker
          selectedDayStart={selectedDayStart}
          selectedDayEnd={selectedDayEnd}
          onChangeStart={handleStartDateChange}
          onChangeEnd={handleEndDateChange}
        />
      </form>
      <footer className="footer">
        {/* Navigation buttons */}
        <button className="cancel-btn" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button className="save-btn" onClick={handleSubmit}>
          {editUser ? "Update" : "Save"}
        </button>
      </footer>
    </div>
  );
};

export default AddEmployee;
