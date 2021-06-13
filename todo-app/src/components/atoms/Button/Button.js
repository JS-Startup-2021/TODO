import React from "react";
import PropTypes from "prop-types";
import { BiCheck } from "react-icons/bi";
import { CgTrash } from "react-icons/cg";
import "./Button.css";

const Button = ({
  text,
  isButton,
  isButtonSubmit,
  isVeryBigButton,
  isBigButton,
  isDone,
  isRemove,
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
        <button className={"BigButton"} {...other}>
          {text}
        </button>
      )}
      {isButton && isDone && (
        <button className={"ButtonDone"} {...other}>
          <BiCheck />
        </button>
      )}
      {isButton && isRemove && (
        <button className={"ButtonRemove"} {...other}>
          <CgTrash />
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  isButtonSubmit: PropTypes.bool,
  isVeryBigButton: PropTypes.bool,
  isBigButton: PropTypes.bool,
  isButton: PropTypes.bool,
  isDone: PropTypes.bool,
  isRemove: PropTypes.bool,
};
Button.defaultProps = {
  text: "",
  isButtonSubmit: false,
  isVeryBigButton: false,
  isBigButton: false,
  isButton: false,
  isDone: false,
  isRemove: false,
};

export default Button;
