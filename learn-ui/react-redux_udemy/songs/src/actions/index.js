export const selectSong = (song) => {
  return {
    type: "SONG_SELECTED",
    payload: song,
  };
};

export const songAdded = (song) => {
  const title = song.split("|")[0];
  const dur = song.split("|")[1];
  return {
    type: "SONG_ADDED",
    payload: { title: title, duration: dur },
  };
};
