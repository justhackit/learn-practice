import { combineReducers } from "redux";

const selectedVideoReducer = (prevSelectedVideo = null, action) => {
  switch (action.type) {
    case "SELECTED_VIDEO":
      return action.payload;
    default:
      return prevSelectedVideo;
  }
};

const searchVideosReducer = (videos = [], action) => {
  switch (action.type) {
    case "SEARCH_VIDEOS":
      return action.payload;
    default:
      return videos;
  }
};

export default combineReducers({
  selectedVideo: selectedVideoReducer,
  videos: searchVideosReducer,
});
