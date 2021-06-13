import React from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/Button";
import "./ButtonsSection.css";

const ButtonsSection = ({
  allTasksButton,
  completedTasksButton,
  activeTasksButton,
}) => {
  return (
    <div className={"ButtonsSection"}>
      <div className={"Section"}>
        <Button isBigButton text={"all"} onClick={allTasksButton} />
        <Button isBigButton text={"active"} onClick={activeTasksButton} />
        <Button isBigButton text={"completed"} onClick={completedTasksButton} />
      </div>
    </div>
  );
};

ButtonsSection.propTypes = {
  allTasksButton: PropTypes.func.isRequired,
  activeTasksButton: PropTypes.func.isRequired,
  completedTasksButton: PropTypes.func.isRequired,
};

export default ButtonsSection;
