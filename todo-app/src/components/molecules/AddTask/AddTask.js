import React from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button";
import s from "./AddTask.css";

const AddTask = ({ addTask, onChange, inputValue }) => {
  return (
    <>
      <form onSubmit={addTask} style={{ paddingLeft: 40, marginTop: 16 }}>
        <input
          type="text"
          value={inputValue}
          onChange={onChange}
          placeholder="träna"
        />
        <Button text={"Addtask"} />
      </form>
    </>
  );
};

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default AddTask;
