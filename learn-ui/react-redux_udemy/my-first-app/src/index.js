// Import react and react-dom libraries
import React from "react";
import ReactDOM from "react-dom";

function getButtonText() {
  return "Click me here!";
}

// Create a react component
const App = function () {
  const labelText = "Enter your name: ";
  return (
    <div>
      <label className="label" for="name">
        {labelText}
      </label>
      <input id="name"></input>
      <button style={{ backgroundColor: "blue", color: "white" }}>
        {getButtonText()}
      </button>
    </div>
  );
};

// Take the react component and show it to screen
ReactDOM.render(<App />, document.querySelector("#root"));
