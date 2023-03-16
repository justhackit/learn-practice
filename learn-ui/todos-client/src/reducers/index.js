import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { CREATE_TASK, FETCH_TASKS } from "../actions/types";

const fetchTasksReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      var newState = { ...state };
      newState["tasks"] = action.payload;
      return newState;
    case CREATE_TASK:
      var newState = { ...state };
      //TODO : Need to add the response to the state
      //newState["tasks"].push(action.payload);
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  tasks: fetchTasksReducer,
  form: formReducer,
});
