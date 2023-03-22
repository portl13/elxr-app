import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { FILTERS_POST, OPTIONS_SPLIDE_CHANNELS } from "@utils/constant";
import ChannelCardNew from "../card/ChannelCardNew";
import { useCategories } from "@context/EventsContext";
import SeeAllButton from "@components/main/ui/SeeAllButton";

const channelUrl = `${process.env.apiV2}/channels?all=true`;

function SectionChannels({ search }) {
  const [filter, setFilter] = useState("desc");
  const { cat: category } = useCategories();

  const { data: channels, error } = useSWR(
    `${channelUrl}&page=1&per_page=6&order=${filter}&search=${search}&category=${category.slug}&single=true`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const isLoading = !channels && !error;

  if (channels?.length === 0) {
    return "";
  }

  return (
    <section className={"section-dark"}>
      <div className="row">
        <div className="col-12 mb-2 d-flex justify-content-between">
          <div className="d-flex flex-column flex-lg-row w-100">
            <h4 className="section-main-title text-capitalize d-flex align-items-center justify-content-between">
              Channels you will love
              <SeeAllButton path={"/channels"} className={"d-lg-none d-flex"} />
            </h4>
            <div className={"filter-contents mb-2 ml-lg-3"}>
              {FILTERS_POST.map((fil) => (
                <button
                  key={fil.value}
                  onClick={() => setFilter(fil.value)}
                  className={`category-btn ${
                    filter === fil.value ? "active" : null
                  }`}
                >
                  {fil.label}
                </button>
              ))}
            </div>
          </div>
          <SeeAllButton path={"/channels"} className={"d-none d-lg-flex"} />
        </div>
      </div>

      {isLoading && <SpinnerLoader />}
      <div className="section-creator">
        <Splide options={OPTIONS_SPLIDE_CHANNELS} hasTrack={false}>
          <SplideTrack>
            {channels &&
              channels.map((channel) => (
                <SplideSlide key={channel.id}>
                  <ChannelCardNew channel={channel} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </section>
  );
}

export default SectionChannels;
