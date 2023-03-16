import { CREATE_TASK, FETCH_TASKS, UPDATE_TASK } from "./types";
import todos from "../apis-client/todos";
import _ from "lodash";

export const doSomething = () => {
  return { type: "action", payload: "blah blah" };
};

export const fetchTasks = () => {
  return async (dispatch) => {
    const response = await todos.get("/tasks", {
      params: { pageOffset: 0, pageLimit: 500 },
    });
    //console.log(`API Response : ${JSON.stringify(response.data)}`);
    dispatch({ type: FETCH_TASKS, payload: response.data });
  };
};

export const createTask = ({ taskTitle, taskDescription, priority, dueBy }) => {
  return async (dispatch) => {
    const payload = {
      title: taskTitle,
      description: taskDescription,
      priority: priority,
      createdOn: Date.now(),
      createdBy: "ajayedap",
      dueBy: new Date(dueBy).getTime(),
      status: "CREATED",
      statusLastUpdated: Date.now(),
    };
    const response = await todos.post("/tasks", payload);
    dispatch({ type: CREATE_TASK, payload: response.data });
  };
};

export const updateTask = (taskObject) => {
  return async (dispatch) => {
    const payload = _.omit(
      { ...taskObject, statusLastUpdated: Date.now() },
      "taskId"
    );
    const response = await todos.put("/tasks/" + taskObject.taskId, payload);
    dispatch({ type: UPDATE_TASK, payload: response.data });
  };
};
