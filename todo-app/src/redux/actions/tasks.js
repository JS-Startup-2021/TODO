import * as type from "../types";

export function getTasks(tasks) {
  console.log(tasks);
  return {
    type: type.GET_TASKS_REQUESTED,
    payload: tasks,
  };
}
