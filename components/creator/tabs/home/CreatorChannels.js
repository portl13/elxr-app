import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

import React, { useRef } from "react";
import ChannelCard from "../../cards/ChannelCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import {
  OPTIONS_SPLIDE_BID_CARD,
  OPTIONS_SPLIDE_GENERAL,
} from "@utils/constant";
import ChannelCardNew from "@components/main/card/ChannelCardNew";

function CreatorChannels({ channels, isLoading }) {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  if (channels && channels.channels && channels.channels.length === 0) {
    return "";
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4 className="section-main-title">Channels</h4>
          <span>
            {channels?.channels.length > OPTIONS_SPLIDE_BID_CARD.perPage && (
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
            <Link href={"/channels"}>
              <a className="font-size-14 text-white">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <div className="section-main section-channel">
        <Splide
          options={OPTIONS_SPLIDE_BID_CARD}
          hasTrack={false}
          ref={refSlide}
        >
          <SplideTrack>
            {channels &&
              channels.channels &&
              channels.channels.map((channel) => (
                <SplideSlide key={channel.id}>
                  <ChannelCardNew channel={channel} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </>
  );
}

export default CreatorChannels;
