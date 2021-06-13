import React, { useState } from "react";
import ToggleTask from "../../organisms/ToggleTask";
import ButtonsSection from "../../molecules/ButtonsSection";
import TaskChart from "../../molecules/TaskChart";

function TodoPage() {
  const [toggleList, setToggleList] = useState({
    isAllTasks: true,
    isActiveTasks: false,
    isCompletedTasks: false,
  });
  return (
    <>
      <div>
        <h1>{"Todo List"}</h1>
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
      <TaskChart />
    </>
  );
}

export default TodoPage;
