import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Task from "../../molecules/Task";
import AddTask from "../../molecules/AddTask";
import RemoveTasks from "../../molecules/RemoveTasks";
import s from "./ToggleTask.css";
import axios from "axios";

const ToggleTask = ({ isAllTasks, isActiveTasks, isCompletedTasks }) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let count = 0;
    tasks.map((item) => (!item.isCompleted ? count++ : null));
    document.title = `${count} task${count > 1 ? "s" : ""} todo`;
  });

  //_____________________________________________________Api_______________________________________
  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addTaskApi = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: inputValue, isCompleted: false }),
    };
    fetch("http://localhost:3000/tasks", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("err: ", err));
  };
  const removeTaskApi = (id) => {
    const api = `http://localhost:3000/tasks/${id}`;
    axios.delete(api).then(() => console.log("Delete successful"));
  };
  //_____________________________________________________Func_______________________________________

  const addTask = (e) => {
    e.preventDefault();
    if (inputValue === "") return alert("Task name is required");

    const newArr = tasks.slice();
    newArr.splice(0, 0, { task: inputValue, isCompleted: false });
    setTasks(newArr);
    addTaskApi();
    setInputValue("");
  };

  const setTask = (index) => {
    const newArr = tasks.slice();
    newArr[index].isCompleted = true;
    return setTasks(newArr);
  };

  const removeTask = (id, index) => {
    const newArr = tasks.slice();
    newArr.splice(index, 1);
    removeTaskApi(id);
    return setTasks(newArr);
  };
  const removeCompletedTasks = () => {
    const newArr = tasks.slice();
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].isCompleted === true) {
        newArr.splice(i, newArr.length);
        i++;
      }
    }
    return setTasks(newArr);
  };

  const removeActiveTasks = () => {
    const newArr = tasks.slice();
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].isCompleted === false) {
        newArr.splice(i, newArr.length);
        i++;
      }
    }
    return setTasks(newArr);
  };
  const removeTasks = () => {
    const newArr = tasks.slice();
    newArr.splice(0, newArr.length);
    return setTasks(newArr);
  };

  //_____________________________________________________TODO_______________________________________

  return (
    <>
      <AddTask
        addTask={addTask}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ul>
        {isAllTasks &&
          tasks &&
          tasks.map((item, index) => (
            <Task
              key={index}
              completedButton={() => setTask(index)}
              removeButton={() => removeTask(item.id, index)}
              isCompleted={item.isCompleted}
              task={item.task}
            />
          ))}
      </ul>
      <ul>
        {isActiveTasks &&
          tasks &&
          tasks
            .filter(({ isCompleted }) => isCompleted === false)
            .map((item, index) => (
              <Task
                key={index}
                completedButton={() => setTask(index)}
                removeButton={() => removeTask(item.id, index)}
                isCompleted={item.isCompleted}
                task={item.task}
              />
            ))}
      </ul>
      <ul>
        {isCompletedTasks &&
          tasks &&
          tasks
            .filter(({ isCompleted }) => isCompleted === true)
            .map((item, index) => (
              <Task
                key={index}
                completedButton={() => setTask(index)}
                removeButton={() => removeTask(item.id, index)}
                isCompleted={item.isCompleted}
                task={item.task}
              />
            ))}
      </ul>
      <RemoveTasks
        tasks={tasks}
        isCompletedTasks={isCompletedTasks}
        isActiveTasks={isActiveTasks}
        isAllTasks={isAllTasks}
        removeCompletedTasks={() => removeCompletedTasks()}
        removeActiveTasks={() => removeActiveTasks()}
        removeTasks={() => removeTasks()}
      />
    </>
  );
};

ToggleTask.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAllTasks: PropTypes.bool,
  isActiveTasks: PropTypes.bool,
  isCompletedTasks: PropTypes.bool,
};

ToggleTask.defaultProps = {
  isAllTasks: true,
  isActiveTasks: false,
  isCompletedTasks: false,
};

export default ToggleTask;
