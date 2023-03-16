import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { songAdded } from "../actions";

const AddSong = (props) => {
  const [song, setSong] = useState("None");

  const onUserSubmit = (e) => {
    e.preventDefault();
    console.log("User entered song : " + song);
    props.songAdded(song);
  };
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={onUserSubmit}>
        <div className="ui field">
          <label>Enter Song's title and duration</label>
          <input
            placeholder="song title|duration"
            type="text"
            onChange={(e) => setSong(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { songAdded: songAdded })(AddSong);
