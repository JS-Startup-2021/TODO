import * as type from "../types";

export function getTasks(tasks) {
  return {
    type: type.GET_TASKS,
    payload: tasks,
  };
}
