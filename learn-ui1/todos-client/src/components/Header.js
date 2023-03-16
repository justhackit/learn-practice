import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "white" }}>
            Today
          </Link>
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/tasks" style={{ color: "white" }}>
            Tasks
          </Link>
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/create-task" style={{ color: "white" }}>
            Add Task
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
