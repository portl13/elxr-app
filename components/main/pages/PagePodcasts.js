import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import { getFetchPublic } from "@request/creator";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import PodcastCardNew from "@components/main/card/PodcastCardNew";
import CardEpisode from "@components/manage/card/CardEpisode";
import SongCard from "@components/main/card/SongCard";
import {FILTERS_POST} from "@utils/constant";

const podcastslUrl = `${process.env.apiV2}/podcasts?all=true`;
const episodeslUrl = `${process.env.apiV2}/episodes?all=true`;
const categoriesUrl = `${process.env.apiV2}/podcasts/categories`;
const episodesCategoriesUrl = `${process.env.apiV2}/episodes/categories`;

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
  const limit = 12;
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const debounceTerm = useDebounce(search, 500);
  const [type, setType] = useState("series");
  const [filter, setFilter] = useState('desc');

  const { data: audios, error } = useSWR(
    `${
      type === "series" ? podcastslUrl : episodeslUrl
    }&page=${page}&per_page=${limit}&order=${filter}&search=${debounceTerm}&category=${category}`,
    getFetchPublic
  );

  const isLoading = !audios && !error;

  const { data: categories } = useSWRImmutable(
    type === "series" ? categoriesUrl : episodesCategoriesUrl,
    getFetchPublic
  );

  const all = () => {
    setCategory("");
  };

  useEffect(() => {
    if (audios && audios.total_items) {
      setTotal(audios.total_items);
    }
  }, [audios]);

  return (
    <>
      <Head>
        <title>Podcasts</title>
      </Head>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Podcasts</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-4 mb-md-5">
          <ScrollTags>
            {tags?.map((value) => (
              <div key={value.id} className="p-1">
                <button
                  onClick={() => setType(value.id)}
                  className={`custom-pills pills-gray nowrap ${
                    type === value.id ? "active" : ""
                  }`}
                >
                  {value.name}
                </button>
              </div>
            ))}
          </ScrollTags>
        </div>
      </div>


      <div className="row">
        <div className="col-12 col-md-9 mb-4 mb-md-5">
          <ScrollTags>
            {FILTERS_POST?.map((fil) => (
              <div key={fil.value} className="p-1">
                <button
                  onClick={() => setFilter(fil.value)}
                  className={`custom-pills pills-gray nowrap ${
                    filter === fil.value ? 'active' : ''
                  }`}
                >
                  {fil.label}
                </button>
              </div>
            ))}
          </ScrollTags>
        </div>
      </div>






      <div className="row">
        <div className="col-12 col-md-9 mb-4 mb-md-5">
          <ScrollTags>
            <div className="p-1">
              <button
                onClick={all}
                className={`custom-pills nowrap ${
                  category === "" ? "active" : ""
                }`}
              >
                All
              </button>
            </div>
            {type === "series" &&
              categories?.map((value) => (
                <div key={value.id} className="p-1">
                  <button
                    onClick={() => setCategory(value.id)}
                    className={`custom-pills nowrap ${
                      category === value.id ? "active" : ""
                    }`}
                  >
                    {value.name}
                  </button>
                </div>
              ))}
            {type === "episodes" &&
              categories?.map((value) => (
                <div key={value.value} className="p-1">
                  <button
                    onClick={() => setCategory(value.value)}
                    className={`custom-pills nowrap ${
                      category === value.value ? "active" : ""
                    }`}
                  >
                    {value.label}
                  </button>
                </div>
              ))}
          </ScrollTags>
        </div>
        <div className="col-12 col-md-3 mb-4 mb-md-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch
              value={search}
              name={"search"}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        {isLoading && <SpinnerLoader />}
        {type === "series" &&
          audios &&
          audios.audios &&
          audios.audios.length > 0 &&
          audios.audios.map((audio) => (
            <div key={audio.id} className="col-6 col-md-6 col-lg-3 mb-4">
              <PodcastCardNew audio={audio} />
            </div>
          ))}

        {type === "episodes" &&
          audios &&
          audios.episodes &&
          audios.episodes?.map((episode) => (
            <div className={"col-6 col-md-6 col-lg-3 mb-4"} key={episode.id}>
              <SongCard tipo={"episode"} item={episode} />
            </div>
          ))}
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <Pagination
            totalCount={total || 0}
            onPageChange={setPage}
            currentPage={page}
            pageSize={limit}
          />
        </div>
      </div>
    </>
  );
}

export default PagePodcasts;
