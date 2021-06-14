import React from "react";
import TaskChart from "../../molecules/TaskChart";
import "./ChartPage.css";
function ChartPage() {
  return (
    <>
      <div className="ChartPage">
        <h1 className={"Hedline"}>{"To Do List Statistics"}</h1>
        <TaskChart />
      </div>
    </>
  );
}

export default ChartPage;
