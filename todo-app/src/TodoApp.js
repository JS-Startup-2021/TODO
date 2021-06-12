import React, { useState, useEffect } from "react";
import Task from "./components/molecules/Task";
import ToggleTask from "./components/organisms/ToggleTask";
import Button from "./components/atoms/Button";
import TaskChart from "./components/atoms/TaskChart";

import axios from "axios";

//Initial tasks
const tasks = [
  { task: "task 1", isCompleted: false },
  { task: "task 2", isCompleted: false },
  { task: "task 3", isCompleted: true },
  { task: "task 3a", isCompleted: true },
  { task: "task 3b", isCompleted: true },
  { task: "task 3c", isCompleted: true },
  { task: "task 3d", isCompleted: true },
];

function TodoApp() {
  const [todos, setTodos] = useState(tasks);
  const [posts, setPosts] = useState([]);

  const [toggleList, setToggleList] = useState({
    all: true,
    active: false,
    completed: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(posts);
  return (
    <>
      <div>
        <h1>{"Todo List"}</h1>
      </div>
      <Button
        text={"All"}
        onClick={() =>
          setToggleList({ all: true, active: false, completed: false })
        }
      />
      <Button
        text={"Active"}
        onClick={() =>
          setToggleList({ all: false, active: true, completed: false })
        }
      />
      <Button
        text={"Completed"}
        onClick={() =>
          setToggleList({ all: false, active: false, completed: true })
        }
      />
      <ToggleTask
        items={todos}
        all={toggleList.all}
        active={toggleList.active}
        completed={toggleList.completed}
      />
      <TaskChart />
    </>
  );
}

export default TodoApp;
