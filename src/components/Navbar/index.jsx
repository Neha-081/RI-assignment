import React from "react";
import './navbar.css';

const Navbar = ({heading}) => {

    return (
        <nav className="navbar">
        <div className="container">
            <p>{heading}</p>
        </div>
    </nav>

    )
}

export default Navbar;