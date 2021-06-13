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

  const doneTasks = tasks.filter(({ isCompleted }) => isCompleted === true);
  const todoTasks = tasks.filter(({ isCompleted }) => isCompleted === false);

  let doneTaskInProcent = (doneTasks.length / tasks.length) * 100;
  let todoTaskInProcent = (todoTasks.length / tasks.length) * 100;

  const allTasksData = [
    { title: "Done", value: doneTaskInProcent, color: "#E38627" },
    { title: "ToDo", value: todoTaskInProcent, color: "#C13C37" },
  ];

  const doneTasksData = [
    { title: "Done", value: doneTaskInProcent, color: "#E38627" },
  ];

  const todoTasksData = [
    { title: "ToDo", value: todoTaskInProcent, color: "#C13C37" },
  ];

  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };

  const shiftSize = 7;
  return (
    <>
      <div>
        {allTasksData && todoTasks.length > 0 && doneTasks.length > 0 && (
          <PieChart
            data={allTasksData}
            radius={PieChart.defaultProps.radius - shiftSize}
            segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
              ...defaultLabelStyle,
            }}
          />
        )}
      </div>
      <div>
        {todoTasks.length <= 0 && doneTasks.length > 0 && (
          <PieChart
            data={doneTasksData}
            totalValue={100}
            lineWidth={20}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
              fontSize: "25px",
              fontFamily: "sans-serif",
              fill: "#E38627",
            }}
            labelPosition={0}
          />
        )}
      </div>
      <div>
        {doneTasks.length <= 0 && todoTasks.length > 0 && (
          <PieChart
            data={todoTasksData}
            totalValue={100}
            lineWidth={20}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
              fontSize: "25px",
              fontFamily: "sans-serif",
              fill: "#E38627",
            }}
            labelPosition={0}
          />
        )}
      </div>
    </>
  );
};

export default TaskChart;
