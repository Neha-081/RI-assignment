import React from "react";
import Navbar from "../Navbar";
import "./employee.css";
import UserImage from '../../assets/user.svg';
import RoleImage from '../../assets/role.svg';
import Dropdown from "../Dropdown";

const AddEmployee = () => {

    return ( 
        <div className="main-container">
         <header>
       <Navbar heading="Add Employee Details" />
    </header>
    <form style={{paddingTop: "120px", margin: "auto"}}>
    <div class="left-inner-addon">
      <input type="text" placeholder="Employee name"/>
      <img role="img" src={UserImage} />
  </div>
  <Dropdown />
    </form>
    <footer className="footer">
        <button className="cancel-btn">Cancel</button>
        <button className="save-btn">Save</button>
        {/* <Button text="Save" /> */}
    </footer>
        </div>
        
    )
}

export default AddEmployee;