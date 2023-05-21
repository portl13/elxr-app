import React, { useRef } from "react"
import SpinnerLoader from "@components/shared/loader/SpinnerLoader"
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide"
import {
  OPTIONS_SPLIDE_BID_CARD,
  OPTIONS_SPLIDE_CHANNELS,
  OPTIONS_SPLIDE_EVENT,
} from "@utils/constant"
import CardHomeCommunities from "@components/main/card/CardHomeCommunities"
import CreatorSectionHeader from "@components/creator/tabs/home/CreatorSectionHeader"

const filters = [
  {
    value: "newest",
    label: "Recently",
  },
  {
    value: "popular",
    label: "Popular",
  },
  {
    value: "alphabetical",
    label: "Alphabetical",
  },
]
function CreatorCommunities({
  communities,
  isLoading,
  setTab,
  filter,
  setFilter,
}) {
  const refSlide = useRef()

  if (communities && communities.length === 0) {
    return ""
  }

  return (
    <>
      <CreatorSectionHeader
        title={"Communities"}
        show={true}
        setTab={() => setTab("communities")}
      >
        {filters.map((fil) => (
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
            {communities &&
              communities.map((community) => (
                <SplideSlide key={community.id}>
                  <CardHomeCommunities community={community} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>
    </>
  )
}

export default CreatorCommunities
