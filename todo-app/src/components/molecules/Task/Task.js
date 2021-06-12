import React from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button";
import s from "./Task.css";

const Task = ({
  completedButton,
  removeButton,
  isCompleted,
  isRemove,
  task,
}) => {
  console.log(isCompleted);
  return (
    <>
      <li style={{ textDecoration: isCompleted && "line-through" }}>
        {task}
        {!isCompleted && (
          <Button onClick={completedButton} text={"Completed"} />
        )}
        <Button onClick={removeButton} text={"Remove"} />
      </li>
    </>
  );
};

Task.propTypes = {
  completedButton: PropTypes.func.isRequired,
  removeButton: PropTypes.func.isRequired,
  isRemove: PropTypes.bool,
  isCompleted: PropTypes.bool,
  task: PropTypes.string,
};

Task.defaultProps = {
  isRemove: true,
  isCompleted: false,
  task: "",
};

export default Task;
