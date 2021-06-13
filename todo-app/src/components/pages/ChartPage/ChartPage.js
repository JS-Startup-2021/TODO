import React from "react";
import TaskChart from "../../molecules/TaskChart";
import "./ChartPage.css";
function ChartPage() {
  return (
    <>
      <div className="ChartPage">
        <h1>{"Todo List"}</h1>
        <TaskChart />
      </div>
    </>
  );
}

export default ChartPage;
