import SpinnerLoader from "@components/shared/loader/SpinnerLoader"
import { genericFetch } from "@request/creator"
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide"
import React from "react"
import useSWR from "swr"
import CardVideoFeatured from "../card/CardVideoFeatured"
import { css } from "@emotion/core"

const url = `${process.env.apiV2}/video/featured/`

function SectionFeatured() {
  const { data, isLoading } = useSWR(url, genericFetch, {
    revalidateOnFocus: false,
  })
  return (
    <section
      css={css`
        & .splide__arrow:disabled {
          opacity: 0;
          display: none;
        }
      `}
      className={"section-light no-border pb-0"}
    >
      {isLoading && <SpinnerLoader />}
      <div className="section-creator">
        <Splide
          options={{
            pagination: false,
            arrows: true,
            perPage: 1,
            width: "100%",
            gap: "1rem",
            autoHeight: true,
            autoplay: true,
            interval: 10000,
            fade: true,
          }}
          hasTrack={false}
        >
          <SplideTrack>
            {data &&
              data.map((video) => (
                <SplideSlide key={video.id}>
                  <CardVideoFeatured video={video} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </section>
  )
}

export default SectionFeatured
