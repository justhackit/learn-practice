import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        //Success callback function
        console.log(position);
        this.setState({ lat: position.coords.latitude });
      },
      (err) => {
        //Failure callback
        this.setState({
          errorMessage: "Error while fetching coordinates: " + err.message,
        });
      }
    );
  }

  componentDidUpdate() {
    console.log(this + "component just got updated");
  }

  renderHelper() {
    if (this.state.lat == null) {
      if (this.errorMessage == null) {
        return <Spinner message="Fetching your Geo Location..." />;
      } else {
        return <div>Error : {this.state.errorMessage}</div>;
      }
    } else {
      return <SeasonDisplay lat={this.state.lat} />;
    }
  }

  render() {
    return <div className="ui border red">{this.renderHelper()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
