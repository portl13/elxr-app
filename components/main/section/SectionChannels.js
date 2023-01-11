import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import ChannelCardNew from "../card/ChannelCardNew";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import {
  FILTERS_POST,
  OPTIONS_SPLIDE_CREATOR,
  OPTIONS_SPLIDE_GENERAL,
} from "@utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import CreatorCardNew from "@components/main/card/CreatorCardNew";
import useSWRImmutable from "swr/immutable";

const channelUrl = `${process.env.apiV2}/channels?all=true`;

const categoriesUrl = `${process.env.apiV2}/channels/categories?hide=true`;

function SectionChannels({ search }) {
  const [filter, setFilter] = useState("desc");
  const [category, setCategory] = useState("");

  const refSlide = useRef();

  const next = () => {
    refSlide.current.splide.go(">");
  };

  const prev = () => {
    refSlide.current.splide.go("<");
  };

  const { data: channels, error } = useSWR(
    `${channelUrl}&page=1&per_page=6&order=${filter}&search=${search}&category=${category}`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const isLoading = !channels && !error;

  const all = () => {
    setCategory("");
  };

  if (channels?.channels?.length === 0) {
    return "";
  }

  return (
    <>
      <section>
        <div className="row mt-5 mb-5">
          <div className="col-12 mb-3">
            <h4 className="section-main-title text-capitalize">
              Channels you will love
            </h4>
          </div>

          <div className="col-12 mb-3">
            <div className={"d-none d-md-flex mb-4"}>
              {FILTERS_POST.map((fil) => (
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
            <div className="row mx-0 d-flex justify-content-between">
              <div className="row mx-0">
                <div  className="p-1">
                  <span
                      onClick={all}
                      className={`text-capitalize section-category nowrap pointer ${category === '' ? 'active' : ''}`}
                  >
                    All
                  </span>
                </div>
                {categories?.map((value) => (
                    <div key={value.label} className="p-1">
                      <span
                          onClick={() => setCategory(value.value)}
                          className={`text-capitalize section-category nowrap pointer ${category === value.value ? 'active' : ''}`}
                      >
                        {value.label}
                      </span>
                    </div>
                ))}
              </div>

              <Link href="/channels">
                <a className={`text-capitalize section-more-btn nowrap`}>
                  Discover more channels
                </a>
              </Link>
            </div>
          </div>
        </div>

        {isLoading && <SpinnerLoader />}

        <div className="section-creator">
          <Splide
            ref={refSlide}
            options={OPTIONS_SPLIDE_GENERAL}
            hasTrack={false}
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
