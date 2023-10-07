import React from "react";
import "./button.css";

const Button = ({ text, onClick }) => {
  // The text for the button is provided as a prop called "text"
  return <button className="button" onClick={onClick}>{text}</button>;
};

export default Button;