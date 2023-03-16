import React from "react";
import { connect } from "react-redux";

import { searchVideos } from "../actions";

class SearchBar extends React.Component {
  state = { term: "" };
  onUserTyped = (e) => {
    this.setState({ term: e.target.value });
  };
  onUserSubmit = (e) => {
    e.preventDefault();
    this.props.searchVideos(this.state.term);
  };
  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.onUserSubmit}>
          <div className="field">
            <label>Video Search</label>
            <input
              placeholder="5 minute crafts"
              type="text"
              onChange={this.onUserTyped}
              value={this.state.term}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { searchVideos })(SearchBar);
