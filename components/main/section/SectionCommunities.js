import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import {
  OPTIONS_SPLIDE_EVENT,
} from "@utils/constant";
import CardHomeCommunities from "../card/CardHomeCommunities";

const communitiesUrl = `${process.env.bossApi}/groups`;

const filters = [
  {
    value: "newest",
    label: "Recently Uploaded",
  },
  {
    value: "popular",
    label: "Popular",
  },
  {
    value: "alphabetical",
    label: "Alphabetical",
  },
];

function SectionCommunities({ search }) {
  const [filter, setFilter] = useState("newest");

  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: communities, error } = useSWR(
    `${communitiesUrl}?page=1&per_page=6&status=public&type=${filter}&scope=all&search=${search}`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const isLoading = !communities && !error;


  if (communities?.length === 0) {
    return "";
  } 

  return (
    <section className={"section-dark"}>
<div className="row mb-2">
        <div className="col-12 mb-3 d-flex flex-row  justify-content-between">
          <div>
          <h4 className="section-event-title ">
          Top Communities           
          </h4>
          <span className='sub-title-event'>
          Join most engaging and active fitness communities to help you meet your fitness goals.          </span>
          </div>
          <Link href="/communities">
            <a
                className={`text-capitalize text-font nowrap d-flex d-lg-none font-size-12 align-items-center`}
            >
              See All
            </a>
          </Link>
        </div>

        <div className="col-12 mb-3">
          <div className="row mx-0 d-flex justify-content-between">
            <div className="col-12 col-lg-10 p-0 mx-0">
            <div className="col-12 mb-3">
          <div className={"d-flex"}>
            {filters.map((fil) => (
              <button
                key={fil.value}
                onClick={() => setFilter(fil.value)}
                className={`custom-pills nowrap ${
                  filter === fil.value ? "active" : null
                }`}
              >
                {fil.label}
              </button>
            ))}
          </div>
        </div>
            </div>
              <div className='col-12 col-md-2 d-flex align-items-end justify-content-end'>
              <Link href={"/communities"}>
              <a className={`text-capitalize section-more-btn-light nowrap d-none d-lg-block mr-0`}>
                Discover more communities{" "}
              </a>
            </Link>
              </div>
          </div>
        </div>
      </div>

        {isLoading && <SpinnerLoader />}
        <div className="section-comunities">
          <Splide
            options={OPTIONS_SPLIDE_EVENT}
            hasTrack={false}
            ref={refSlide}
          >
            <SplideTrack>
              {communities &&
                communities.map((community) => (
                  <SplideSlide key={community.id}>
                    <CardHomeCommunities community={community} />
                  </SplideSlide>
                ))}
            </SplideTrack>
          </Splide>
        </div>

        <div className="row mx-0 d-flex justify-content-end mt-4">
          <button onClick={prev} className="arrow-slide section-arrow-btn mr-3">
            <FontAwesomeIcon className="center-absolute" icon={faChevronLeft} />
          </button>
          <button onClick={next} className="arrow-slide section-arrow-btn mr-4">
            <FontAwesomeIcon
              className="center-absolute"
              icon={faChevronRight}
            />
          </button>
        </div>
    </section>
  );
}

export default SectionCommunities;
