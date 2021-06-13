import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import axios from "axios";

const TaskChart = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tasks]);

  let doneTaskInProcent =
    (tasks.filter(({ isCompleted }) => isCompleted === true).length /
      tasks.length) *
    100;
  let todoTaskInProcent =
    (tasks.filter(({ isCompleted }) => isCompleted === false).length /
      tasks.length) *
    100;

  const allTasks = [
    { title: "Done", value: doneTaskInProcent, color: "#E38627" },
    { title: "ToDo", value: todoTaskInProcent, color: "#C13C37" },
  ];

  const doneTasks = [
    { title: "Done", value: doneTaskInProcent, color: "#E38627" },
  ];

  const todoTasks = [
    { title: "ToDo", value: todoTaskInProcent, color: "#C13C37" },
  ];
  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };

  const tasksData =
    tasks.filter(({ isCompleted }) => isCompleted === true).length <= 0
      ? todoTasks
      : tasks.filter(({ isCompleted }) => isCompleted === false).length <= 0
      ? doneTasks
      : allTasks;

  const shiftSize = 7;
  return (
    <PieChart
      data={tasksData}
      radius={PieChart.defaultProps.radius - shiftSize}
      segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
      label={({ dataEntry }) => dataEntry.value}
      labelStyle={{
        ...defaultLabelStyle,
      }}
    />
  );
};

export default TaskChart;
