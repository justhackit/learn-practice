import React from "react";
import { Field, reduxForm } from "redux-form";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import dayjs from "dayjs";

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      error={touched && error != null}
      helperText={touched && error != null ? error : ""}
      {...input}
      {...custom}
    />
  );
};

const renderTextArea = ({ input, label, meta: { touched, error } }) => (
  <TextField
    variant="outlined"
    label={label}
    error={touched && error != null}
    helperText={touched && error != null ? error : ""}
    multiline
    maxRows={Infinity}
    {...input}
  />
);

const renderDatePicker = ({ input, label, meta: { touched, error } }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={dayjs()}
        renderInput={(params) => <TextField {...params} />}
        {...input}
      />
    </LocalizationProvider>
  );
};

const renderRadioGroup = ({ input, label, ...rest }) => (
  <FormControl>
    <FormLabel id="priority-group-label">{label}</FormLabel>
    <RadioGroup
      aria-labelledby="priority-group-label"
      defaultValue="normal"
      name="priority-group"
      row
      {...input}
    >
      <FormControlLabel value="urgent" control={<Radio />} label="Urgent" />
      <FormControlLabel value="high" control={<Radio />} label="High" />
      <FormControlLabel value="normal" control={<Radio />} label="Normal" />
      <FormControlLabel value="low" control={<Radio />} label="Low" />
    </RadioGroup>
  </FormControl>
);

const TaskForm = (props) => {
  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <div>
          <Field
            name="taskTitle"
            component={renderTextField}
            label="Task Title"
          />
        </div>
        <div>
          <Field
            name="taskDescription"
            component={renderTextArea}
            label="Task Description"
          />
        </div>
        <div>
          <Field
            name="priority"
            component={renderRadioGroup}
            label="Priority"
          />
        </div>
        <div>
          <Field name="dueBy" component={renderDatePicker} label="Due By" />
        </div>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddCircleIcon />}
          >
            Create Task
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

const validate = (values) => {
  const errors = {};
  const requiredFields = ["taskTitle", "taskDescription", "priority", "dueBy"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

export default reduxForm({
  form: "taskForm",
  validate: validate,
})(TaskForm);
