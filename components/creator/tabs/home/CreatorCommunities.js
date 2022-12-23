import React, { useRef } from "react";
import CommunityCard from "@components/creator/cards/CommunityCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import {
  OPTIONS_SPLIDE_BID_CARD
} from "@utils/constant";
import CommunityCardNew from "@components/main/card/CommunityCardNew";

function CreatorCommunities({ communities, isLoading, setTab }) {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  if (communities && communities.length === 0) {
    return "";
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4 className="section-main-title">COMMUNITIES</h4>
          <span>
            {communities?.length > OPTIONS_SPLIDE_BID_CARD.perPage && (
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
            <button className={"no-btn"} onClick={()=>setTab('communities')}>
              <span className="font-size-14 color-font">See all</span>
            </button>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>
      <Splide options={OPTIONS_SPLIDE_BID_CARD} hasTrack={false} ref={refSlide}>
        <SplideTrack>
          {communities &&
            communities.map((community) => (
              <SplideSlide key={community.id}>
                <CommunityCardNew community={community} />
              </SplideSlide>
            ))}
        </SplideTrack>
      </Splide>
    </>
  );
}

export default CreatorCommunities;
