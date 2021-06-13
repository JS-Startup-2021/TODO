import React from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button";
import "./AddTask.css";

const AddTask = ({ addTask, onChange, inputValue }) => {
  return (
    <>
      <div className={"Form"}>
        <input
          type="text"
          value={inputValue}
          onChange={onChange}
          placeholder="träna"
          className={"inputText"}
        />
        <Button text={"sunbmit"} onClick={addTask} />
      </div>
    </>
  );
};

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default AddTask;
