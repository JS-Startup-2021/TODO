import React, { useState } from "react";
import ToggleTask from "../../organisms/ToggleTask";
import ButtonsSection from "../../molecules/ButtonsSection";
import "./TodoPage.css";

function TodoPage() {
  const [toggleList, setToggleList] = useState({
    isAllTasks: true,
    isActiveTasks: false,
    isCompletedTasks: false,
  });
  return (
    <>
      <div className={"TodoPage"}>
        <div className={"TodoPageHedline"}>
          <h1>{"To Do List"}</h1>
        </div>
        <ButtonsSection
          allTasksButton={() =>
            setToggleList({
              isAllTasks: true,
              isActiveTasks: false,
              isCompletedTasks: false,
            })
          }
          completedTasksButton={() =>
            setToggleList({
              isAllTasks: false,
              isActiveTasks: false,
              isCompletedTasks: true,
            })
          }
          activeTasksButton={() =>
            setToggleList({
              isAllTasks: false,
              isActiveTasks: true,
              isCompletedTasks: false,
            })
          }
        />
        <ToggleTask
          isAllTasks={toggleList.isAllTasks}
          isActiveTasks={toggleList.isActiveTasks}
          isCompletedTasks={toggleList.isCompletedTasks}
        />
      </div>
    </>
  );
}

export default TodoPage;
