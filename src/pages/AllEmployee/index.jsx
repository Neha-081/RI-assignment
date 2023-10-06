import React from "react";
import Navbar from "../../components/Navbar";
import noRecordsFound from "../../assets/no-records.svg";
import "./allEmployee.css";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useContext } from "react";
import { AppContext } from "../../appContext";

const AllEmployee = () => {
  const {allUsers} = useContext(AppContext);
  return (
    <div>
      <header>
        <Navbar heading="Employee List" />
      </header>
      <main>
        <Link to="/add-employee"><Button text="+" /></Link>
      </main>
    </div>
  );
};

export default AllEmployee;
