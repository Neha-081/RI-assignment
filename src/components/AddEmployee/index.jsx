import React, { useState } from "react";
import Navbar from "../Navbar";
import "./employee.css";
import UserImage from "../../assets/user.svg";
import Dropdown from "../Dropdown";
import Datepicker from "../Datepicker";

const AddEmployee = () => {
    const [employeeName, setEmployeeName] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);

    const handleRoleChange = (newOption) => {
        setSelectedOption(newOption);
    }
  return (
    <div className="main-container">
      <header>
        <Navbar heading="Add Employee Details" />
      </header>
      <form style={{ paddingTop: "120px", margin: "auto" }}>
        <div className="left-inner-addon">
          <input type="text" placeholder="Employee name" onChange={(e) => setEmployeeName(e.target.value)} />
          <img role="img" src={UserImage} />
        </div>
        <Dropdown selectedOption={selectedOption} onChange={handleRoleChange} />
        <Datepicker />
      </form>
      <footer className="footer">
        <button className="cancel-btn">Cancel</button>
        <button className="save-btn">Save</button>
        {/* <Button text="Save" /> */}
      </footer>
    </div>
  );
};

export default AddEmployee;
