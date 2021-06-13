import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  text,
  isButton,
  isButtonSubmit,
  isVeryBigButton,
  isBigButton,
  ...other
}) => {
  return (
    <>
      {isButtonSubmit && (
        <button className={"ButtonSubmit"} {...other}>
          {text}
        </button>
      )}
      {isVeryBigButton && (
        <button className={"VeryBigButton"} {...other}>
          {text}
        </button>
      )}
      {isBigButton && (
        <button className={"VeryBigButton"} {...other}>
          {text}
        </button>
      )}
      {isButton && <button {...other}>{text}</button>}
    </>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  isButtonSubmit: PropTypes.bool,
  isVeryBigButton: PropTypes.bool,
  isBigButton: PropTypes.bool,
  isButton: PropTypes.bool,
};
Button.defaultProps = {
  text: "",
  isButtonSubmit: false,
  isVeryBigButton: false,
  isBigButton: false,
  isButton: false,
};

export default Button;
