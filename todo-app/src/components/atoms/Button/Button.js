import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ classes, text, ...other }) => {
  return <button {...other}>{text}</button>;
};

Button.propTypes = {
  text: PropTypes.string,
};
Button.defaultProps = { text: "" };

export default Button;
