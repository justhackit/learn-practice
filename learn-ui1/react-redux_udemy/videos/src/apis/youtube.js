import axios from "axios";
const KEY = "AIzaSyA2sX4Ta7WvWpErusE3FUDVch9WgTgLlF4";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    type: "video",
    maxResults: 10,
    key: KEY,
  },
});
