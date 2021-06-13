import React from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button";
import s from "./Task.css";

const Task = ({ completedButton, removeButton, isCompleted, task }) => {
  return (
    <>
      <p style={{ textDecoration: isCompleted && "line-through" }}>
        {task}
        {!isCompleted && (
          <Button onClick={completedButton} text={"Completed"} />
        )}
        <Button onClick={removeButton} text={"Remove"} />
      </p>
    </>
  );
};

Task.propTypes = {
  completedButton: PropTypes.func.isRequired,
  removeButton: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool,
  task: PropTypes.string,
};

Task.defaultProps = {
  isCompleted: false,
  task: "",
};

export default Task;
