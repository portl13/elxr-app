import React, { useRef } from "react";
import { OPTIONS_SPLIDE_SMALL_CARD } from "@utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import SongCard from "@components/main/card/SongCard";

function CreatorAlbum({ albums, match, isLoading, setTab }) {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  if (albums && albums.albums && albums.albums.length === 0) {
    return "";
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3 align-items-baseline">
          <h4 className="section-main-title">MUSIC</h4>
          <span>
            {albums?.albums.length > OPTIONS_SPLIDE_SMALL_CARD.perPage && (
                <>
                  <button
                    onClick={prev}
                    className="arrow-slide btn-icon-header mr-3"
                  >
                    <FontAwesomeIcon
                      className="center-absolute"
                      icon={faChevronLeft}
                    />
                  </button>
                  <button
                    onClick={next}
                    className="arrow-slide btn-icon-header mr-4"
                  >
                    <FontAwesomeIcon
                      className="center-absolute"
                      icon={faChevronRight}
                    />
                  </button>
                </>
              )}
            <button className={"no-btn"} onClick={() => setTab("music")}>
              <span className="font-size-14 text-white">See all</span>
            </button>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-main section-events">
        <Splide
          ref={refSlide}
          options={OPTIONS_SPLIDE_SMALL_CARD}
          hasTrack={false}
        >
          <SplideTrack>
            {albums &&
              albums.albums &&
              albums.albums.length > 0 &&
              albums.albums.map((album) => (
                <SplideSlide key={album.id}>
                  <SongCard tipo={"album"} item={album} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </>
  );
}

export default CreatorAlbum;
