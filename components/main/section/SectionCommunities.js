import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { OPTIONS_SPLIDE_EVENT } from "@utils/constant";
import CardHomeCommunities from "../card/CardHomeCommunities";
import SeeAllButton from "@components/main/ui/SeeAllButton";
import { useCategories } from "@context/EventsContext";

const communitiesUrl = `${process.env.bossApi}/groups`;

const filters = [
  {
    value: "popular",
    label: "Popular",
  },
  {
    value: "newest",
    label: "Recently",
  },
  {
    value: "alphabetical",
    label: "Alphabetical",
  },
];

function SectionCommunities({ search }) {
  const [filter, setFilter] = useState("popular");
  const { cat } = useCategories();

  const refSlide = useRef();

  const { data: communities, error } = useSWR(
    `${communitiesUrl}?page=1&per_page=4&status=public&type=${filter}&scope=all&search=${search}${
      cat.community ? `&group_type=${cat.community}` : ""
    }`,
    getFetchPublic,
    { revalidateOnFocus: false }
  );

  const isLoading = !communities && !error;

  if (communities?.length === 0) {
    return "";
  }

  return (
    <section className={"section-dark"}>
      <div className="row">
        <div className="col-12 mb-2 d-flex justify-content-between">
          <div className="d-flex flex-column flex-lg-row w-100">
            <h4 className="section-main-title text-capitalize d-flex align-items-center justify-content-between">
              Featured Communities
              <SeeAllButton
                path={"/communities"}
                className={"d-lg-none d-flex"}
              />
            </h4>
            <div className={"filter-contents mb-2 ml-lg-3"}>
              {filters.map((fil) => (
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
          <SeeAllButton path={"/communities"} className={"d-none d-lg-flex"} />
        </div>
      </div>

      {isLoading && <SpinnerLoader />}
      <div className="section-comunities">
        <Splide options={OPTIONS_SPLIDE_EVENT} hasTrack={false} ref={refSlide}>
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
    </section>
  );
}

export default SectionCommunities;
