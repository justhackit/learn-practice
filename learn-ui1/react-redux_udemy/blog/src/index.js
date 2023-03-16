import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));
const mystore = createStore(reducers, applyMiddleware(thunk));
root.render(
  <Provider store={mystore}>
    <App />
  </Provider>
);
