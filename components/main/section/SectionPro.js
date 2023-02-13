import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import Link from "next/link";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { OPTIONS_SPLIDE_CREATOR_PRO } from "@utils/constant";

import ProCard from "../card/ProCard";
import { useEffect } from "react";
import { chuckSize } from "@utils/chuckSize";

const url = `${process.env.apiV2}/creator?page=1&per_page=5`;

function SectionPro({ search }) {

const [creatorsChunks, setCreatorsChunks] = useState([]);

  const refSlide = useRef();

  const { data: creators, error } = useSWR(`${url}&search=${search}`, getFetchPublic, {
    revalidateOnFocus: false,
  });


  useEffect(() => {
    if (creators && creators.users.length > 0) {
      setCreatorsChunks(chuckSize(creators.users, 5));
    }
  }, [creators]);

  if (creators?.user?.length === 0) {
    return "";
  }
  const isLoading = !creators && !error;
  return (
    <>
      <section className={"section-light"}>
        <div className="row mb-2 d-flex flex-row align-items-center  justify-content-between">
          <div className="section-pro col-12 col-md-8 col-lg-9">
            <div className=" d-flex flex-row align-items-center  justify-content-center">
              {/* <Splide
                ref={refSlide}
                options={OPTIONS_SPLIDE_CREATOR_PRO}
                hasTrack={false}
              >
                <SplideTrack> */}
                  {creatorsChunks &&
                    creatorsChunks?.map((creators, index) => (
                      
                        <ProCard key={index} creators={creators} />
                    
                    ))}
                {/* </SplideTrack>
              </Splide> */}
            </div>

            {/* <Splide
              ref={refSlide}
              options={OPTIONS_SPLIDE_CHANNELS}
              hasTrack={false}
            >
              <SplideTrack>
                {channels &&
                  channels.channels &&
                  channels.channels.map((channel) => (
                    <SplideSlide key={channel.id}>
                      <ProCard
                        category={channel.category}
                        title={channel?.channel_name}
                        image={channel?.channel_cover?.medium}
                        type={"channel"}
                        item={channel}
                      />
                    </SplideSlide>
                  ))}
              </SplideTrack>
            </Splide> */}
          </div>
          <div className=" col-12 col-md-4 col-lg-3 mb-3 mt-3 mt-lg-0 d-flex flex-column align-items-lg-start">
            <div>
              <h4 className="section-event-title-ligth font-size-28 text-white mb-0">
                World class professionals
              </h4>
              <span className="sub-title-event text-white">
                Are you ready to be part of wellness revolution?
              </span>
            </div>
            <div className="d-flex align-items-start justify-content-start mt-3">
              <span>
                <Link href="/channels">
                  <a
                    className={` text-capitalize btn-get-started nowrap mr-md-0 px-2 mb-3`}
                  >
                    GET STARTED
                  </a>
                </Link>
              </span>
            </div>
          </div>
        </div>

        {isLoading && <SpinnerLoader />}
      </section>
    </>
  );
}

export default SectionPro;
