import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import CardAudio from "@components/creator/cards/CardAudio";

function CreatorPodcasts({ audios, isLoading, setTab }) {
  if (audios && audios.audios && audios.audios.length === 0) {
    return "";
  }

  return (
    <div className="row mt-5">
      <div className="col-12 d-flex justify-content-between mb-3 align-items-baseline">
        <h4 className="font-size-14 mb-3 color-font">PODCASTS</h4>
        <span>
          <button className={"no-btn"} onClick={() => setTab("podcasts")}>
            <span className="font-size-14 color-font">See all</span>
          </button>
        </span>
      </div>
      {isLoading && <SpinnerLoader />}
      {audios &&
        audios.audios &&
        audios.audios.length > 0 &&
        audios.audios.map((audio) => (
          <div key={audio.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <CardAudio audio={audio} />
          </div>
        ))}
    </div>
  );
}

export default CreatorPodcasts;
