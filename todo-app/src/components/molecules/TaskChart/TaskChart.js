import React, { useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../../redux/actions/tasks.js";

const TaskChart = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const doneTasks = tasks.filter(({ isCompleted }) => isCompleted === true);
  const todoTasks = tasks.filter(({ isCompleted }) => isCompleted === false);

  let doneTaskInProcent = (doneTasks.length / tasks.length) * 100;
  let todoTaskInProcent = (todoTasks.length / tasks.length) * 100;

  const allTasksData = [
    { title: "Done", value: doneTaskInProcent, color: "darkturquoise" },
    { title: "ToDo", value: todoTaskInProcent, color: "#bc4e46" },
  ];

  const doneTasksData = [
    { title: "Done", value: doneTaskInProcent, color: "darkturquoise" },
  ];

  const todoTasksData = [
    { title: "ToDo", value: todoTaskInProcent, color: "#bc4e46" },
  ];

  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };

  const shiftSize = 7;
  return (
    <>
      <div>
        {loading && <p>{"Loading"}</p>}
        {error && !loading && <p>{"error"}</p>}

        <h3>
          {"Total tasks: "}
          {tasks.length}
        </h3>
        <h3>
          {"To do tasks: "}
          {todoTasks.length}
        </h3>
        <h3>
          {"Completed tasks: "}
          {doneTasks.length}
        </h3>
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
