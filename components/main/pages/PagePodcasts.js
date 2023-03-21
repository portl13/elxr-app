import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import { genericFetch, getFetchPublic } from "@request/creator";
import React, { useContext, useState } from "react";
import useSWRImmutable from "swr/immutable";
import PodcastCardNew from "@components/main/card/PodcastCardNew";
import SongCard from "@components/main/card/SongCard";
import { FILTERS_POST } from "@utils/constant";
import useSWRInfinite from "swr/infinite";
import InfinitScroll from "react-infinite-scroll-component";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import { ChannelContext } from "@context/ChannelContext";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import ButtonCategory from "@components/main/ui/ButtonCategory";
import { chuckSize } from "@utils/chuckSize";
import useMediaQuery from "@hooks/useMediaQuery";

const podcastsUrl = `${process.env.apiV2}/podcasts?all=true`;
const episodesUrl = `${process.env.apiV2}/episodes?all=true`;
const categoriesUrl = `${process.env.apiV2}/podcasts/categories?hide=true`;
const episodesCategoriesUrl = `${process.env.apiV2}/episodes/categories?hide=true`;

const tags = [
  {
    id: "series",
    name: "SERIES",
  },
  {
    id: "episodes",
    name: "EPISODES",
  },
];

function PagePodcasts() {
  const limit = 20;
  const match = useMediaQuery("(max-width: 767px)");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const { debounceTerm } = useContext(ChannelContext);
  const [type, setType] = useState("series");
  const [filter, setFilter] = useState("desc");

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${type === "series" ? podcastsUrl : episodesUrl}&page=${
        index + 1
      }&per_page=${limit}&order=${filter}&search=${debounceTerm}&category=${category}&single=true`,
    genericFetch
  );

  const audios = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  const all = {
    name: "All",
    id: "",
  };

  const { data: cat } = useSWRImmutable(
    type === "series" ? categoriesUrl : episodesCategoriesUrl,
    getFetchPublic
  );

  const categories =
    Boolean(cat) && match
      ? chuckSize([all, ...cat], 2)
      : Boolean(cat)
      ? [all, ...cat]
      : [];

  return (
    <>
      <div className="mb-4">
        <Splide
          options={{
            perPage: 6,
            gap: "0rem",
            pagination: false,
            arrows: false,
            breakpoints: {
              575: {
                perPage: 2,
              },
              767: {
                perPage: 3,
                arrows: true,
              },
              992: {
                perPage: 4,
                arrows: true,
              },
              1024: {
                perPage: 6,
                arrows: true,
              },
            },
          }}
          hasTrack={false}
        >
          <SplideTrack>
            {categories?.map((value, index) => (
              <SplideSlide key={index}>
                {match &&
                  value.map((item) => (
                    <ButtonCategory
                      setCat={() => setCategory(item.id)}
                      text={item.name}
                      active={category === item.id}
                    />
                  ))}
                {!match ? (
                  <ButtonCategory
                    setCat={() => setCategory(value.id)}
                    text={value.name}
                    active={category === value.id}
                  />
                ) : null}
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Podcasts</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-3">
          <ScrollTags>
            {tags?.map((value) => (
              <div key={value.id} className="p-1">
                <ButtonCategory
                  setCat={() => setType(value.id)}
                  text={value.name}
                  active={type === value.id}
                />
              </div>
            ))}
          </ScrollTags>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-9 mb-3">
          <ScrollTags>
            {FILTERS_POST?.map((fil) => (
              <div key={fil.value} className="p-1">
                <ButtonCategory
                  setCat={() => setFilter(fil.value)}
                  text={fil.label}
                  active={filter === fil.value}
                />
              </div>
            ))}
          </ScrollTags>
        </div>
      </div>

      <div className="row">{isLoadingInitialData && <SpinnerLoader />}</div>

      <InfinitScroll
        className={"row"}
        dataLength={audios.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {audios &&
          audios.map((audio) => (
            <>
              {type === "series" ? (
                <div key={audio.id} className="col-6 col-md-6 col-lg-3 mb-4">
                  <PodcastCardNew audio={audio} />
                </div>
              ) : (
                <div className={"col-6 col-md-6 col-lg-3 mb-4"} key={audio.id}>
                  <SongCard tipo={"episode"} item={audio} />
                </div>
              )}
            </>
          ))}
      </InfinitScroll>
    </>
  );
}

export default PagePodcasts;
