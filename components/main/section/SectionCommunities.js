import CommunityCard from "@components/creator/cards/CommunityCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef } from "react";
import useSWR from "swr";
import CommunityCardNew from "../card/CommunityCardNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { OPTIONS_SPLIDE_GENERAL } from "@utils/constant";
import ChannelCardNew from "@components/main/card/ChannelCardNew";

const communitiesUrl = `${process.env.bossApi}/groups`;

function SectionCommunities() {
  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: communities, error } = useSWR(
    `${communitiesUrl}?page=1&per_page=6`,
    getFetchPublic
  );

  const isLoading = !communities && !error;

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4 className="section-main-title">COMMUNITIES</h4>
          <span>
            <button onClick={prev} className="arrow-slide btn-icon-header mr-3">
              <FontAwesomeIcon
                className="center-absolute"
                icon={faChevronLeft}
              />
            </button>
            <button onClick={next} className="arrow-slide btn-icon-header mr-4">
              <FontAwesomeIcon
                className="center-absolute"
                icon={faChevronRight}
              />
            </button>
            <Link href={"/communities"}>
              <a className="font-size-14 text-white">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
      </div>

      <Splide options={OPTIONS_SPLIDE_GENERAL} hasTrack={false} ref={refSlide}>
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

export default SectionCommunities;
