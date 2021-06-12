import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Task from "../../molecules/Task";
import Button from "../../atoms/Button";
import s from "./ToggleTask.css";
import axios from "axios";

const ToggleTask = ({ items, all, active, completed }) => {
  const [taskItems, setTaskItems] = useState(items);
  const [inputValue, setInputValue] = useState("");

  const _handleBntClick = ({ type, index }) => {
    const newArr = taskItems.slice();
    if (type === "remove") newArr.splice(index, 1);
    else if (type === "completed") newArr[index].isCompleted = true;

    return setTaskItems(newArr);
  };
  const handleBntRemoveCompleted = () => {
    const newArr = taskItems.slice();
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].isCompleted === true) {
        newArr.splice(i, newArr.length);
        i++;
      }
    }
    return setTaskItems(newArr);
  };

  useEffect(() => {
    let count = 0;
    taskItems.map((item) => (!item.isCompleted ? count++ : null));
    document.title = `${count} task${count > 1 ? "s" : ""} todo`;
  });
  const handleBntRemoveAll = () => {
    const newArr = taskItems.slice();
    newArr.splice(0, newArr.length);
    return setTaskItems(newArr);
  };
  const _handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") return alert("Task name is required");

    const newArr = taskItems.slice();
    newArr.splice(0, 0, { task: inputValue, isCompleted: false });
    setTaskItems(newArr);
    setInputValue("");
  };

  const handleBntRemove = (index) => {
    axios
      .delete("http://localhost:3000/tasks/" + index)
      .then(() => console.log("Delete successful"));
  };

  const handleBntRemoveAll2 = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: "someyaLjjjista", isCompleted: true }),
    };
    fetch("http://localhost:3000/tasks", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("err: ", err));
  };

  return (
    <>
      <form onSubmit={_handleSubmit} style={{ paddingLeft: 40, marginTop: 16 }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ex.: meeting at 4:20"
        />
        <Button text={"Add ToDo"} />
      </form>
      <ul>
        {all &&
          taskItems &&
          taskItems.map((item, index) => (
            <Task
              key={index}
              completedButton={() =>
                _handleBntClick({ type: "completed", index })
              }
              removeButton={() => handleBntRemove(index)}
              isRemove={false}
              isCompleted={item.isCompleted}
              task={item.task}
            />
          ))}
      </ul>
      <ul>
        {active &&
          taskItems &&
          taskItems
            .filter(({ isCompleted }) => isCompleted === false)
            .map((item, index) => (
              <Task
                key={index}
                completedButton={() =>
                  _handleBntClick({ type: "completed", index })
                }
                removeButton={() => handleBntRemove(index)}
                isRemove={false}
                isCompleted={item.isCompleted}
                task={item.task}
              />
            ))}
      </ul>
      <ul>
        {completed &&
          taskItems &&
          taskItems
            .filter(({ isCompleted }) => isCompleted === true)
            .map((item, index) => (
              <Task
                key={index}
                completedButton={() =>
                  _handleBntClick({ type: "completed", index })
                }
                removeButton={() => handleBntRemove(index)}
                isRemove={false}
                isCompleted={item.isCompleted}
                task={item.task}
              />
            ))}
      </ul>
      {taskItems.filter(({ isCompleted }) => isCompleted === true).length > 0 &&
        completed && (
          <button onClick={() => handleBntRemoveCompleted()}>
            Remove Completed
          </button>
        )}
      {taskItems && taskItems.length > 0 && all && (
        <button onClick={() => handleBntRemoveAll()}>Remove All</button>
      )}
      <button onClick={() => handleBntRemoveAll2()}>2</button>
    </>
  );
};

ToggleTask.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  all: PropTypes.bool,
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

ToggleTask.defaultProps = {
  all: true,
  active: false,
  completed: false,
};

export default ToggleTask;
