import React from "react";
import { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DoneIcon from "@mui/icons-material/Done";
import Checkbox from "@mui/material/Checkbox";
import { connect } from "react-redux";
import { fetchTasks, updateTask } from "../actions";
import { Typography } from "@mui/material";

const Tasks = (props) => {
  useEffect(() => {
    props.fetchTasks();
  }, []);
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const renderList = (task) => {
    return (
      <div key={task.taskid}>
        <ListItem key={task.taskid} divider={true}>
          <ListItemButton onClick={handleToggle(task.taskid)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(task.taskid) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <div style={{ display: "flex" }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {task.title}
                  </Typography>
                </div>
              }
              //secondary={getSecondaryText(task)}
              secondary={
                <Typography>
                  {task.description}
                  <br />
                  Priority : {task.priority}
                  <br />
                  Due By : {task.dueby}
                </Typography>
              }
            />
            <Stack spacing={2} direction="column">
              <Button variant="outlined" startIcon={<CreateOutlinedIcon />}>
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Stack>
          </ListItemButton>
        </ListItem>
      </div>
    );
  };

  const onMarkAsCompletedClicked = () => {
    checked.map((taskId) => {
      const taskObject = { taskId: taskId };
      taskObject["status"] = "COMPLETED";
      props.updateTask(taskObject);
      props.fetchTasks();
    });
  };

  if (props.tasks) {
    return (
      <div>
        <List disablePadding>
          {props.tasks.map((task) => {
            return renderList(task);
          })}
        </List>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
        >
          <Button variant="contained" startIcon={<CalendarMonthOutlinedIcon />}>
            Add to Today
          </Button>
          <Button
            variant="contained"
            startIcon={<DoneIcon />}
            onClick={onMarkAsCompletedClicked}
          >
            Mark as completed
          </Button>
        </Stack>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Fetching Tasks...</h3>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};

export default connect(mapStateToProps, { fetchTasks, updateTask })(Tasks);
