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
        <Button text={"all"} onClick={allTasksButton} />
        <Button text={"active"} onClick={activeTasksButton} />
        <Button text={"completed"} onClick={completedTasksButton} />
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
