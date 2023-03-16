import youtube from "../apis/youtube";

export const selectedVideo = (video) => {
  return {
    type: "SELECTED_VIDEO",
    payload: video,
  };
};

export const searchVideos = (searchTerm) => {
  return async function (dispatch, getState) {
    console.log("Going to call the API...");
    const response = await youtube.get("/search", {
      params: {
        q: searchTerm,
      },
    });
    dispatch({ type: "SEARCH_VIDEOS", payload: response.data.items });
  };
};
