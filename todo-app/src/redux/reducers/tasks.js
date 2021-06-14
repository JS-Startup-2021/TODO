import * as type from "../types";

const initialState = { tasks: [], loading: false, error: null };

export default function tasks(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case type.GET_TASKS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_TASKS_SUCCES:
      return {
        ...state,
        loading: false,
        tasks: action.tasks,
      };
    case type.GET_TASKS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
