import { combineReducers } from "redux";

const songsReducer = (allSongsList = [], action) => {
  console.log("songsReducer() method was called");
  if (action.type === "SONG_ADDED") {
    const newSongsList = allSongsList.map((e) => e);
    newSongsList.push(action.payload);
    return newSongsList;
  } else if (action.type === "SONG_SELECTED") {
    return allSongsList;
  } else {
    return [
      { title: "Jaanavule", duration: "4:10" },
      { title: "Naa Kanulu yepudu", duration: "4:05" },
      { title: "Ranjithame", duration: "3:15" },
    ];
  }
};

const selectedSongReducer = (selectedSong = null, action) => {
  console.log("selectedSongReducer() was called");
  if (action.type === "SONG_SELECTED") {
    return action.payload;
  }
  return selectedSong;
};

export default combineReducers({
  songs: songsReducer,
  selectedSong: selectedSongReducer,
});
