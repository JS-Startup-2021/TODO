import * as type from "../types";

export function getTasks(tasks) {
  return {
    type: type.GET_TASKS_REQUESTED,
    payload: tasks,
  };
}

export function addTasks(tasks) {
  return {
    type: type.POST_TASKS_REQUESTED,
    payload: tasks,
  };
}

export function setTasks(tasks) {
  return {
    type: type.PUT_TASKS_REQUESTED,
    payload: tasks,
  };
}

export function removeTasks(tasks) {
  return {
    type: type.DELETE_TASKS_REQUESTED,
    payload: tasks,
  };
}
