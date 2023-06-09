import React, { useState, useEffect } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ScrollTags from "@components/shared/slider/ScrollTags";
import useDebounce from "@hooks/useDebounce";
import { getFetchPublic } from "@request/creator";
import Pagination from "@components/shared/pagination/Pagination";
import SongCard from "../card/SongCard";


const url = `${process.env.apiV2}/songs?all=true`;
const categoriesUrl = `${process.env.apiV2}/songs/categories`;

function PageSongs() {
    const limit = 12;
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
  
    const debounceTerm = useDebounce(search, 500);
  
    const { data: songs, error } = useSWR(
      `${url}&page=${page}&per_page=${limit}&search=${debounceTerm}&category=${category}`,
      getFetchPublic
    );
  
    const isLoading = !songs && !error;
  
    const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);
  
    const all = () => {
      setCategory("");
    }
  
    useEffect(() => {
      if(songs && songs.total_items) {
        setTotal(songs.total_items)
      }
    }, [songs])

  return (
    <>
    <div className="row">
      <div className="col-12">
        <h4 className="mb-4 font-weight-bold">Songs</h4>
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
      {songs &&
        songs.songs.length > 0 &&
        songs.songs.map((item) => (
          <div key={item.id} className="col-6 col-md-6 col-lg-3 mb-4">
            <SongCard tipo='song' item={item} />
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
  )
}

export default PageSongs