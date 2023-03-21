import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { FILTERS_POST, OPTIONS_SPLIDE_CHANNELS } from "@utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useSWRImmutable from "swr/immutable";
import LargeMainCard from "@components/main/card/LargeMainCard";
import ScrollTags from "@components/shared/slider/ScrollTags";
import { useCategories } from "@context/EventsContext";

const channelUrl = `${process.env.apiV2}/channels?all=true`;

const categoriesUrl = `${process.env.apiV2}/channels/categories?hide=true`;

function SectionChannels({ search }) {
  const [filter, setFilter] = useState("desc");
  //const [category, setCategory] = useState("");
  const { cat: category } = useCategories();

  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: channels, error } = useSWR(
    `${channelUrl}&page=1&per_page=6&order=${filter}&search=${search}&category=${category.slug}`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const isLoading = !channels && !error;

  //const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  // const all = () => {
  //   setCategory("");
  // };

  if (channels?.channels?.length === 0) {
    return "";
  }

  return (
    <>
      <section className={"section-light"}>
        <div className="row mb-2 d-flex flex-row  justify-content-between">
          <div className=" col-12 col-lg-9 mb-3 d-flex flex-row align-items-start justify-content-between">
            <div>
              <h4 className="section-event-title-ligth text-white mb-0">
                Channels you will love
              </h4>
              <span className="sub-title-event text-white">
                Find all the shows from your top wellness professionals in one
                place with channels.{" "}
              </span>
            </div>
            <Link href="/channels">
              <a
                className={`text-capitalize mt-3 text-white nowrap d-flex d-lg-none font-size-12 align-items-center`}
              >
                See All
              </a>
            </Link>
          </div>

          <div className="d-flex align-items-end justify-content-end">
            <Link href="/channels">
              <a
                className={` text-capitalize section-more-btn nowrap d-none d-lg-block mr-md-0 px-2 text-center mb-3`}
              >
                Discover more channels
              </a>
            </Link>
          </div>
        </div>

        {isLoading && <SpinnerLoader />}

        <div className="section-creator">
          <Splide
            ref={refSlide}
            options={OPTIONS_SPLIDE_CHANNELS}
            hasTrack={false}
          >
            <SplideTrack>
              {channels &&
                channels.channels &&
                channels.channels.map((channel) => (
                  <SplideSlide key={channel.id}>
                    <LargeMainCard
                      category={channel.category}
                      title={channel?.channel_name}
                      image={channel?.channel_cover?.medium}
                      type={"channel"}
                      item={channel}
                    />
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
    </>
  );
}

export default SectionChannels;
