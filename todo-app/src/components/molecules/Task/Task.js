import React from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button";
import "./Task.css";

const Task = ({ completedButton, removeButton, isCompleted, task, index }) => {
  return (
    <>
      <div className={"Task"}>
        <p>
          <span
            style={{
              textDecoration: isCompleted && "line-through",
              color: isCompleted && "darkorange",
            }}
          >
            <h2
              style={{
                color: isCompleted ? " #9999" : "darkorange",
                marginBottom: "-10px",
              }}
            >
              <span> {"Task"}</span>
              <span> {index}</span>
            </h2>
          </span>
          <span className={"Container"}>
            <span
              style={{
                textDecoration: isCompleted && "line-through",
                color: isCompleted && "darkorange",
              }}
            >
              <h4
                style={{
                  color: isCompleted ? " #9999" : "white",
                  marginBottom: "-10px",
                }}
              >
                {task}
              </h4>
            </span>
            <span>
              {!isCompleted && (
                <span style={{ paddingLeft: "10px" }}>
                  <Button
                    isButton
                    isDone
                    onClick={completedButton}
                    text={"Completed"}
                  />
                </span>
              )}
              <Button
                isButton
                isRemove
                onClick={removeButton}
                text={"Remove"}
              />
            </span>
          </span>
        </p>
      </div>
    </>
  );
};

Task.propTypes = {
  completedButton: PropTypes.func.isRequired,
  removeButton: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool,
  task: PropTypes.string,
  index: PropTypes.number.isRequired,
};

Task.defaultProps = {
  isCompleted: false,
  task: "",
};

export default Task;
