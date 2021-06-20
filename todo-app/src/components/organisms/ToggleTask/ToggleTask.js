import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Task from "../../molecules/Task";
import AddTask from "../../molecules/AddTask";
import RemoveTasks from "../../molecules/RemoveTasks";
import { useSelector, useDispatch } from "react-redux";
import {
  getTasks,
  addTasks,
  setTasks,
  removeTasks,
} from "../../../redux/actions/tasks.js";
import "./ToggleTask.css";

const ToggleTask = ({ isAllTasks, isActiveTasks, isCompletedTasks }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  useEffect(() => {
    let count = 0;
    tasks.map((item) => (!item.isCompleted ? count++ : null));
    document.title = `${count} task${count > 1 ? "s" : ""} todo`;
  });

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  //_____________________________________________________Api_______________________________________

  const setTaskApi = (task) => {
    console.log(task);
    dispatch(setTasks(task));
    return tasks;
  };

  const removeTaskApi = (task) => {
    console.log(task);
    dispatch(removeTasks(task));
    return tasks;
  };

  const removeTasksApi = (tasks) => {
    for (let i = 0; i < tasks.length; i++) {
      dispatch(removeTasks(tasks[i]));
    }
    return tasks;
  };
  const removeSpecialTasksApi = (booleValue, tasks) => {
    for (
      let i = 0;
      i < tasks.filter(({ isCompleted }) => isCompleted === booleValue).length;
      i++
    ) {
      dispatch(removeTasks(tasks[i]));
    }
    return tasks;
  };

  //_____________________________________________________Func_______________________________________

  const addNewTask = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      console.log("do validate");
      alert("hej");
    }
    if (inputValue === "") return <h2>{"input is required"}</h2>;
    dispatch(addTasks({ task: inputValue, isCompleted: false }));
    setInputValue(" ");
    return tasks;
  };

  //_____________________________________________________TODO_______________________________________

  return (
    <>
      {loading && <p>{"Loading"}</p>}
      {error && !loading && <p>{"error"}</p>}

      <div className={"ToggleTask"}>
        <AddTask
          addTask={addNewTask}
          inputValue={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <ul>
          {isAllTasks &&
            tasks &&
            tasks.map((item, index) => {
              return (
                <Task
                  key={index}
                  completedButton={() => setTaskApi(item)}
                  removeButton={() => removeTaskApi(item)}
                  isCompleted={item.isCompleted}
                  task={item.task}
                  index={index + 1}
                />
              );
            })}
        </ul>
        <ul>
          {isActiveTasks &&
            tasks &&
            tasks
              .filter(({ isCompleted }) => isCompleted === false)
              .map((item, index) => (
                <Task
                  key={index}
                  completedButton={() => setTaskApi(item)}
                  removeButton={() => removeTaskApi(item)}
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
                  completedButton={() => setTaskApi(item)}
                  removeButton={() => removeTaskApi(item)}
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
