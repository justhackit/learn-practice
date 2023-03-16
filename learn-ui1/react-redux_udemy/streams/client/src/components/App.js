import React from "react";
import { Router, Route } from "react-router-dom";

import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import Header from "./Header";
import history from "../history";
import { Container, CssBaseline, Typography } from "@material-ui/core";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Router history={history}>
        <Typography component={"span"}>
          <Container maxWidth="md">
            <Header />
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" component={StreamEdit} />
            <Route path="/streams/show" component={StreamShow} />
            <Route path="/streams/delete" component={StreamDelete} />
          </Container>
        </Typography>
      </Router>
    </>
  );
};

export default App;
