import CardAudio from "@components/creator/cards/CardAudio";
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

const podcastslUrl = `${process.env.apiV2}/podcasts?all=true`;
const categoriesUrl = `${process.env.apiV2}/podcasts/categories`;

function PagePodcasts() {
  const limit = 12;
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const debounceTerm = useDebounce(search, 500);

  const { data: audios, error } = useSWR(
    `${podcastslUrl}&page=${page}&per_page=${limit}&search=${debounceTerm}&category=${category}`,
    getFetchPublic
  );

  const isLoading = !audios && !error;

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  }

  useEffect(() => {
    if(audios && audios.total_items) {
      setTotal(audios.total_items)
    }
  }, [audios])

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
            {categories?.map((value) => (
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
        {audios &&
          audios.audios &&
          audios.audios.length > 0 &&
          audios.audios.map((audio) => (
            <div key={audio.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <CardAudio audio={audio} />
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
