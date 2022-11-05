import React from "react";

const checkInSaveSongs = (songs, song) => {
  const index = songs.findIndex((e) => song.id === e.id);
  return index >= 0;
};

function SongModalItem({ song, selectSongs, selectedSongs }) {
  const isActive = checkInSaveSongs(selectedSongs, song);
  return (
    <article
      onClick={() => selectSongs(song)}
      className={"col-6 col-lg-4 col-xl-3 mb-2 "}
    >
      <div
        className={`ratio ratio-1x1 bg-cover song-item pointer ${
          isActive ? "active" : ""
        }`}
        style={{
          backgroundImage: `url(${song?.thumbnail})`,
          borderRadius: 8,
        }}
      ></div>
      <h5 className={`m-0 font-size-16 song-title ${isActive ? "active" : ""}`}>
        {song.title}
      </h5>
    </article>
  );
}

export default SongModalItem;
