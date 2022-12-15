import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import SongCard from "@components/main/card/SongCard";

function ChannelMusic({ music, isLoading, setTab }) {
  if (music && music.albums && music.albums.length === 0) {
    return "";
  }

  return (
    <div className="row mt-5">
      <div className="col-12 d-flex justify-content-between mb-3 align-items-baseline">
        <h4 className="color-font font-size-14 mb-3">Music</h4>
        <span>
          <button className={"no-btn"} onClick={() => setTab("blog")}>
            <span className="font-size-14 color-font">See all</span>
          </button>
        </span>
      </div>
      {isLoading && <SpinnerLoader />}
      {music &&
        music.albums &&
        music.albums.length > 0 &&
        music.albums.map((album) => (
          <div key={album.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <SongCard tipo="album" item={album} />
          </div>
        ))}
    </div>
  );
}

export default ChannelMusic;
