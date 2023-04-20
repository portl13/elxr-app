import React, { useRef } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import {FILTERS_POST, OPTIONS_SPLIDE_CHANNELS} from "@utils/constant";
import ChannelCardNew from "@components/main/card/ChannelCardNew";
import CreatorSectionHeader from "@components/creator/tabs/home/CreatorSectionHeader";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

function CreatorChannels({ channels, isLoading, setTab, setFilter, filter }) {
  const refSlide = useRef();

  if (channels && channels.channels && channels.channels.length === 0) {
    return "";
  }

  return (
      <>
        <CreatorSectionHeader
            title={"Channels"}
            setTab={() => setTab("channels")}
        >
          {FILTERS_POST.map((fil) => (
              <button
                  key={fil.value}
                  onClick={() => setFilter(fil.value)}
                  className={`category-btn ${filter === fil.value ? "active" : null}`}
              >
                {fil.label}
              </button>
          ))}
        </CreatorSectionHeader>
        {isLoading && (
            <div className={"row"}>
              <SpinnerLoader />
            </div>
        )}
        <div className="section-channel">
          <Splide
              options={OPTIONS_SPLIDE_CHANNELS}
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
