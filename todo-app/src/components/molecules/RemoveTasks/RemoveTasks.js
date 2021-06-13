import React from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button";
import s from "./RemoveTasks.css";

const RemoveTasks = ({
  tasks,
  isCompletedTasks,
  isActiveTasks,
  isAllTasks,
  removeCompletedTasks,
  removeActiveTasks,
  removeTasks,
}) => {
  return (
    <>
      {tasks.filter(({ isCompleted }) => isCompleted === true).length > 0 &&
        isCompletedTasks && (
          <Button
            text={"Delete completed tasks"}
            onClick={() => removeCompletedTasks()}
          />
        )}
      {tasks.filter(({ isCompleted }) => isCompleted === false).length > 0 &&
        isActiveTasks && (
          <Button
            text={"Delete done tasks"}
            onClick={() => removeActiveTasks()}
          />
        )}
      {tasks && tasks.length > 0 && isAllTasks && (
        <Button text={"Delete all tasks"} onClick={() => removeTasks()} />
      )}
    </>
  );
};

RemoveTasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  removeTasks: PropTypes.func.isRequired,
  removeActiveTasks: PropTypes.func.isRequired,
  removeCompletedTasks: PropTypes.func.isRequired,
  isCompletedTasks: PropTypes.bool.isRequired,
  isActiveTasks: PropTypes.bool.isRequired,
  isAllTasks: PropTypes.bool,
};
RemoveTasks.defaultProps = { isAllTasks: true };
export default RemoveTasks;
