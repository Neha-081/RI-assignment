import React from "react";
import './navbar.css';

const Navbar = ({ heading }) => {
    return (
        <nav className="navbar">
            <div className="container">
                {/* Display the heading provided as a prop */}
                <p>{heading}</p>
            </div>
        </nav>
    );
}

export default Navbar;
