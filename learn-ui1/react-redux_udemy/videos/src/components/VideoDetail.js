import React from "react";
import { connect } from "react-redux";

const VideoDetail = (props) => {
  if (!props.videos || props.videos.length == 0) {
    return (
      <div className="ui segment">
        <h4 className="ui header">Enter a search term and hit enter</h4>
      </div>
    );
  }

  if (!props.video) {
    return (
      <div className="ui segment">
        <h4 className="ui header">Select a video from the list</h4>
      </div>
    );
  }

  const videoSrc = `https://www.youtube.com/embed/${props.video.id.videoId}`;
  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{props.video.snippet.title}</h4>
        <p>{props.video.snippet.description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.selectedVideo);
  return { video: state.selectedVideo, videos: state.videos };
};

export default connect(mapStateToProps)(VideoDetail);
