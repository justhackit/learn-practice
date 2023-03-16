import React from "react";

import TaskForm from "./TaskForm";
import { connect } from "react-redux";
import { createTask } from "../actions";

const CreateTask = (props) => {
  const onSubmitTask = (formValues) => {
    console.log("Making POST /tasks to create task");
    props.createTask(formValues);
  };

  return (
    <div>
      <h3>Enter Task details:</h3>
      <TaskForm onSubmit={onSubmitTask} />
    </div>
  );
};

export default connect(null, { createTask })(CreateTask);
