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
import VideoCardNew from "@components/main/card/VideoCardNew";

const videoUrl = `${process.env.apiV2}/video?all=true`;
const categoriesUrl = `${process.env.apiV2}/video/categories`;

function PageVideos() {
  const limit = 12;
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);

  const { data: videos, error } = useSWR(
    `${videoUrl}&page=${page}&per_page=${limit}&search=${debounceTerm}&category=${category}`,
    getFetchPublic
  );

  const isLoading = !videos && !error;

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  const all = () => {
    setCategory("");
  }

  useEffect(() => {
    if(videos && videos.total_items) {
      setTotal(videos.total_items)
    }
  }, [videos])

  return (
    <>
    <Head>
      <title>Videos</title>
    </Head>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Videos</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-4  mb-md-5" >
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
        {videos &&
          videos.videos &&
          videos.videos.length > 0 &&
          videos.videos.map((video) => (
            <div key={video.id} className="col-6 col-md-6 col-lg-3 mb-4">
              <VideoCardNew video={video} />
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

export default PageVideos;
