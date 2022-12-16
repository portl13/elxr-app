import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, {useRef, useState} from "react";
import useSWR from "swr";
import CommunityCardNew from "../card/CommunityCardNew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import {FILTERS_POST, OPTIONS_SPLIDE_GENERAL} from "@utils/constant";

const communitiesUrl = `${process.env.bossApi}/groups`;

const filters = [
  {
    value: 'newest',
    label: 'Recently Uploaded'
  },
  {
    value: 'popular',
    label: 'Popular'
  },
  {
    value: 'alphabetical',
    label: 'Alphabetical'
  },
]

function SectionCommunities({search}) {
  const [filter, setFilter] = useState('newest');

  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: communities, error } = useSWR(
    `${communitiesUrl}?page=1&per_page=6&type=${filter}&scope=all&search=${search}`,
    getFetchPublic
  );

  const isLoading = !communities && !error;

  return (
    <section className={"section-home"}>
      <div className="row">
        <div className="col-12 d-flex justify-content-between mb-3">
          <div className={"d-flex align-items-center mb-3"}>
            <h4 className="section-main-title text-capitalize mb-0 mr-5">Communities</h4>
            <div className={"d-flex"}>
              {filters.map(fil => (
                  <button
                      key={fil.value}
                      onClick={()=>setFilter(fil.value)}
                      className={`custom-pills nowrap ${filter === fil.value ? 'active' : null}`}>
                    {fil.label}
                  </button>
              ))}
            </div>
          </div>
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
              <a className="font-size-14 color-font">See all</a>
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
    </section>
  );
}

export default SectionCommunities;
