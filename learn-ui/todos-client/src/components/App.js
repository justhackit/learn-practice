import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";

import Header from "./Header";
import Landing from "./Landing";
import Tasks from "./Tasks";
import CreateTask from "./CreateTask";

const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Container maxWidth="md">
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/tasks">
              <Tasks />
            </Route>
            <Route exact path="/create-task">
              <CreateTask />
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;
