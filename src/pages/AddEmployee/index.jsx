import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./employee.css";
import UserImage from "../../assets/user.svg";
import Dropdown from "../../components/Dropdown";
import Datepicker from "../../components/Datepicker";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../appContext";

const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const insertDataInIndexedDb = () => {
  //check for support
  if (!idb) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const request = idb.open("test-db", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");

    const db = request.result;

    var tx = db.transaction("userData", "readwrite");
    var userData = tx.objectStore("userData");

    return tx.complete;
  };
};

const AddEmployee = () => {
  const {
    // allUsers,
    // setAllUsers,
    addUser,
    setAddUser,
    editUser,
    setEditUser,
    selectedUser,
    setSelectedUser,
    employeeName, 
    setEmployeeName,     
    selectedRole,
    setSelectedRole,
    selectedDayStart,
    setSelectedDayStart,
    selectedDayEnd,
    setSelectedDayEnd} = useContext(AppContext);

    const [allUsers, setAllUsers] = useState([])
  const navigate = useNavigate();

  const value = "add"

  const handleRoleChange = (newOption) => {
    setSelectedRole(newOption);
  };

  const handleStartDateChange = (newDate) => {
    setSelectedDayStart(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setSelectedDayEnd(newDate);
  };

  useEffect(() => {
    insertDataInIndexedDb();
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

  const handleSubmit = (event) => {
    const dbPromise = idb.open("test-db", 1);
    if (employeeName && selectedRole && selectedDayStart && selectedDayEnd) {
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
            alert("User added!");
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
            alert("User updated!");
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
    } else {
      alert("Please enter all details");
    }
    navigate("/");
  };

  return (
    <div className="main-container">
      <header>
        <Navbar heading={value ? "Edit Employee Details" : "Add Employee Details"} />
      </header>
      <form style={{ paddingTop: "120px", margin: "auto" }}>
        <div className="left-inner-addon">
          <input
            type="text"
            placeholder="Employee name"
            onChange={(e) => setEmployeeName(e.target.value)}
            value={employeeName}
          />
          <img role="img" src={UserImage} />
        </div>
        <Dropdown selectedRole={selectedRole} onChange={handleRoleChange} />
        <Datepicker
          selectedDayStart={selectedDayStart}
          selectedDayEnd={selectedDayEnd}
          onChangeStart={handleStartDateChange}
          onChangeEnd={handleEndDateChange}
        />
      </form>
      <footer className="footer">
        <button className="cancel-btn" onClick={() => getAllData()}>
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
