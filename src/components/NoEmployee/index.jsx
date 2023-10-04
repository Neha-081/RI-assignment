import React from "react";
import Navbar from "../Navbar";
import noRecordsFound from "../../assets/no-records.svg";
import "./noEmployee.css";
import { Link } from "react-router-dom";

const NoEmployee = () => {
  return (
    <div>
      <header>
        <Navbar heading="Add Employee Details" />
      </header>
      <main>
        <Link to="/add-employee"><button className='plus-button'>+</button></Link>
        <img className="no-records" src={noRecordsFound} alt="no-records-img" />
      </main>
    </div>
  );
};

export default NoEmployee;
