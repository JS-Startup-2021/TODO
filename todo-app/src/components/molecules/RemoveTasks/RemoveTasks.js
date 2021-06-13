import React from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button";
import "./RemoveTasks.css";

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
      <div className={"RemoveTasks"}>
        {tasks.filter(({ isCompleted }) => isCompleted === true).length > 0 &&
          isCompletedTasks && (
            <Button
              isVeryBigButton
              text={"Delete completed tasks"}
              onClick={() => removeCompletedTasks()}
            />
          )}
        {tasks.filter(({ isCompleted }) => isCompleted === false).length > 0 &&
          isActiveTasks && (
            <Button
              isVeryBigButton
              text={"Delete done tasks"}
              onClick={() => removeActiveTasks()}
            />
          )}
        {tasks && tasks.length > 0 && isAllTasks && (
          <Button
            isVeryBigButton
            text={"Delete all tasks"}
            onClick={() => removeTasks()}
          />
        )}
      </div>
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
