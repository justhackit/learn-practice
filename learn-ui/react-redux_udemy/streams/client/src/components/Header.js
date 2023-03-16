import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "white" }}>
            Streamy
          </Link>
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/streams/new" style={{ color: "white" }}>
            Create Stream
          </Link>
        </Typography>
        <Typography
          variant="h6"
          component="div"
          style={{ textAlign: "right" }}
          sx={{ flexGrow: 1 }}
        >
          <GoogleAuth />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
