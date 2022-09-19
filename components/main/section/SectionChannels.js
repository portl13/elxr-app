import ChannelCard from "@components/creator/cards/ChannelCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, {useRef, useEffect} from "react";
import useSWR from "swr";
import ChannelCardNew from "../card/ChannelCardNew";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import {OPTIONS_SPLIDE_GENERAL} from "@utils/constant";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

const channelUrl = `${process.env.apiV2}/channels?all=true`;

function SectionChannels() {

  const refSlide = useRef()

  const next = () => {
    refSlide.current.splide.go('>')
  }

  const prev = () => {
    refSlide.current.splide.go('<')
  }


  const { data: channels, error } = useSWR(
    `${channelUrl}&page=1&per_page=6`,
    getFetchPublic
  );

  const isLoading = !channels && !error;



  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3">
          <h4 className="section-main-title">Channels</h4>
          <span>
            <button onClick={prev} className="arrow-slide btn-icon-header mr-3">
              <FontAwesomeIcon className="center-absolute" icon={faChevronLeft} />
            </button>
            <button onClick={next} className="arrow-slide btn-icon-header mr-4">
              <FontAwesomeIcon className="center-absolute" icon={faChevronRight} />
            </button>
            <Link href={"/channels"}>
              <a className="font-size-14 text-white">See all</a>
            </Link>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}

      </div>
      <div className="section-main section-channel">

        <Splide
          options={OPTIONS_SPLIDE_GENERAL}
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

export default SectionChannels;
