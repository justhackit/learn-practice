import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID hM6dfhqxy1NDnCwtZskv3_oDTRiFIzVsKRVGC2-_0VA",
  },
});
