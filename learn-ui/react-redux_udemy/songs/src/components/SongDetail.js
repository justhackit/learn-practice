import React from "react";
import { connect } from "react-redux";

const SongDetail = (props) => {
  console.log(props);
  if (!props.selectedSong)
    return <div className="ui segment">Select a Song</div>;
  else
    return (
      <div className="ui segment">
        <p>Song Title : {props.selectedSong.title}</p>
        <p>Song Duration : {props.selectedSong.duration}</p>
      </div>
    );
};

const mapStateToProps = (state) => {
  return { selectedSong: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);
