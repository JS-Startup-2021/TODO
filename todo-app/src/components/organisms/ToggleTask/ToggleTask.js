import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Task from "../../molecules/Task";
import AddTask from "../../molecules/AddTask";
import RemoveTasks from "../../molecules/RemoveTasks";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../../redux/actions/tasks.js";
import "./ToggleTask.css";
import axios from "axios";

const ToggleTask = ({ isAllTasks, isActiveTasks, isCompletedTasks }) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  //const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  // console.log(useSelector((state) => state.tasks.error));
  useEffect(() => {
    let count = 0;
    tasks.map((item) => (!item.isCompleted ? count++ : null));
    document.title = `${count} task${count > 1 ? "s" : ""} todo`;
  });

  useEffect(() => {
    dispatch(getTasks());
  }, []);

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
    return tasks;
  };

  const removeTaskApi = (id) => {
    getTaskApi();
    const api = `http://localhost:3000/tasks/${id}`;
    axios.delete(api).then(() => console.log("Delete successful"));
    return tasks;
  };

  const removeTasksApi = (tasks) => {
    getTaskApi();
    for (let i = 0; i < tasks.length; i++) {
      const api = `http://localhost:3000/tasks/${tasks[i].id}`;
      axios.delete(api).then(() => console.log("Delete successful"));
    }
    return tasks;
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
    return tasks;
  };

  //_____________________________________________________Func_______________________________________

  const addTask = (e) => {
    e.preventDefault();
    if (inputValue === "") return <h2>{"input is required"}</h2>;

    //  const newArr = tasks.slice();
    // newArr.splice(0, 0, { task: inputValue, isCompleted: false });
    setInputValue(" ");
    addTaskApi();
    return tasks;
  };

  // console.log(tasks2);
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
                completedButton={() => setTaskApi(item.task, item.id)}
                removeButton={() => removeTaskApi(item.id)}
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
                  completedButton={() => setTaskApi(item.task, item.id)}
                  removeButton={() => removeTaskApi(item.id)}
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
                  completedButton={() => setTaskApi(item.task, item.id)}
                  removeButton={() => removeTaskApi(item.id)}
                  isCompleted={item.isCompleted}
                  task={item.task}
                  index={index + 1}
                />
              ))}
        </ul>

        <RemoveTasks
          tasks={tasks}
          isCompletedTasks={isCompletedTasks}
          isAllTasks={isAllTasks}
          removeCompletedTasks={() => removeSpecialTasksApi(true, tasks)}
          removeTasks={() => removeTasksApi(tasks)}
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
