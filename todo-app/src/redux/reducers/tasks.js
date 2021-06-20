import * as type from "../types";

const initialState = { tasks: [], loading: false, error: null };

export default function tasks(state = initialState, action) {
  // console.log(action);

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
    case type.POST_TASKS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.POST_TASKS_SUCCES:
      return {
        ...state,
        tasks: state.tasks.concat(action.tasks),
        loading: false,
      };
    case type.PUT_TASKS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.PUT_TASKS_SUCCES:
      const addToLists = state.tasks.map((item) =>
        item.id === action.tasks.id ? action.tasks : item
      );
      return {
        ...state,
        tasks: addToLists,
        loading: false,
      };
    case type.DELETE_TASKS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.DELETE_TASKS_SUCCES:
      const setLists = state.tasks.filter(
        (task) => task.id !== action.tasks.id
      );
      return {
        ...state,
        tasks: setLists,
        loading: false,
      };

    default:
      return state;
  }
}
