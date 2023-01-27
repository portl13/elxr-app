import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import GalleryCard from "@components/main/card/GalleryCard";

function ChannelGalleries({ galleries, isLoading, setTab }) {
  if (galleries && galleries.galleries && galleries.galleries.length === 0) {
    return "";
  }

  return (
    <div className="row mt-5">
      <div className="col-12 d-flex justify-content-between mb-3 align-items-baseline">
        <h4 className="color-font font-size-14 mb-3">Galleries</h4>
        <span>
          <button className={"no-btn"} onClick={() => setTab("galleries")}>
            <span className="font-size-14 color-font">See all</span>
          </button>
        </span>
      </div>
      {isLoading && <SpinnerLoader />}
      {galleries &&
        galleries.galleries &&
        galleries.galleries.length > 0 &&
        galleries.galleries.map((gallery) => (
          <div key={gallery.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <GalleryCard gallery={gallery} />
          </div>
        ))}
    </div>
  );
}

export default ChannelGalleries;
