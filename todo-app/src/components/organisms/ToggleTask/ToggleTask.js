import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Task from "../../molecules/Task";
import AddTask from "../../molecules/AddTask";
import RemoveTasks from "../../molecules/RemoveTasks";
import "./ToggleTask.css";
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

  const getTaskApi = () => {
    axios
      .get("http://localhost:3000/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTaskApi();
  }, [tasks]);

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

  const setTaskApi = (task, id) => {
    getTaskApi();
    const item = { task: task, isCompleted: true };
    const api = `http://localhost:3000/tasks/${id}`;
    axios.put(api, item).then((response) => console.log(response.data));
  };

  const removeTaskApi = (id) => {
    getTaskApi();
    const api = `http://localhost:3000/tasks/${id}`;
    axios.delete(api).then(() => console.log("Delete successful"));
  };

  const removeTasksApi = (tasks) => {
    getTaskApi();
    for (let i = 0; i < tasks.length; i++) {
      const api = `http://localhost:3000/tasks/${tasks[i].id}`;
      axios.delete(api).then(() => console.log("Delete successful"));
    }
  };
  const removeSpecialTasksApi = (booleValue, tasks) => {
    getTaskApi();
    for (
      let i = 0;
      i < tasks.filter(({ isCompleted }) => isCompleted === booleValue).length;
      i++
    ) {
      const api = `http://localhost:3000/tasks/${tasks[i].id}`;
      axios.delete(api).then(() => console.log("Delete successful"));
    }
  };

  //_____________________________________________________Func_______________________________________

  const addTask = (e) => {
    e.preventDefault();
    if (inputValue === "") return alert("Task name is required");

    const newArr = tasks.slice();
    newArr.splice(0, 0, { task: inputValue, isCompleted: false });
    addTaskApi();
    setInputValue("");
    return setTasks(newArr);
  };

  const setTask = (task, id, index) => {
    const newArr = tasks.slice();
    setTaskApi(task, id);
    newArr[index].isCompleted = true;
    return setTasks(newArr);
  };

  const removeTask = (id, index) => {
    const newArr = tasks.slice();
    newArr.splice(index, 1);
    removeTaskApi(id);
    return setTasks(newArr);
  };

  const removeTasks = (tasks) => {
    const newArr = tasks.slice();
    newArr.splice(0, newArr.length);
    removeTasksApi(tasks);
    return setTasks(newArr);
  };

  const removeSpecialTasks = (booleValue, tasks) => {
    const newArr = tasks.slice();
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].isCompleted === booleValue) {
        newArr.splice(i, newArr.length);
        i++;
      }
    }
    removeSpecialTasksApi(booleValue, tasks);
    return setTasks(newArr);
  };

  //_____________________________________________________TODO_______________________________________

  return (
    <>
      <div className={"ToggleTask"}>
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
                completedButton={() => setTask(item.task, item.id, index)}
                removeButton={() => removeTask(item.id, index)}
                isCompleted={item.isCompleted}
                task={item.task}
                index={index + 1}
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
                  completedButton={() => setTask(item.task, item.id, index)}
                  removeButton={() => removeTask(item.id, index)}
                  isCompleted={item.isCompleted}
                  task={item.task}
                  index={index + 1}
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
                  completedButton={() => setTask(item.task, item.id, index)}
                  removeButton={() => removeTask(item.id, index)}
                  isCompleted={item.isCompleted}
                  task={item.task}
                  index={index + 1}
                />
              ))}
        </ul>

        <RemoveTasks
          tasks={tasks}
          isCompletedTasks={isCompletedTasks}
          isActiveTasks={isActiveTasks}
          isAllTasks={isAllTasks}
          removeCompletedTasks={() => removeSpecialTasks(true, tasks)}
          removeActiveTasks={() => () => removeSpecialTasks(false, tasks)}
          removeTasks={() => removeTasks(tasks)}
        />
      </div>
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
