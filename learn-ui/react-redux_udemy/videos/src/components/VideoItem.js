import React from "react";
import { connect } from "react-redux";

import "./VideoItem.css";
import { selectedVideo } from "../actions";

const VideoItem = (props) => {
  return (
    <div
      onClick={() => props.selectedVideo(props.video)}
      className="video-item item"
    >
      <img
        className="ui image"
        src={props.video.snippet.thumbnails.medium.url}
      />
      <div className="content">
        <div className="header">{props.video.snippet.title}</div>
        <div class="meta">
          <span>{props.video.snippet.channelTitle}</span>
        </div>
        <div className="extra">
          <i className="green clock icon"></i>
          Published At : {props.video.snippet.publishedAt}
        </div>
      </div>
    </div>
  );
};

export default connect(null, { selectedVideo })(VideoItem);
