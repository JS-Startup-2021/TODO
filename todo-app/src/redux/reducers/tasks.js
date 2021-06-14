import * as type from "../types";

const initialState = { tasks: [] };

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case type.GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
}
