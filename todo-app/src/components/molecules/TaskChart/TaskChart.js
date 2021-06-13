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

  const dataMock = [
    { title: "One", value: 10, color: "#E38627" },
    { title: "Two", value: 15, color: "#C13C37" },
  ];

  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };

  const shiftSize = 7;
  return (
    <PieChart
      data={dataMock}
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
