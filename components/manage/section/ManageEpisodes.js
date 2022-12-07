import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import { useRouter } from "next/router";
import useDebounce from "@hooks/useDebounce";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import Link from "next/link";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import CardEpisode from "@components/manage/card/CardEpisode";

const url = `${process.env.apiV2}/episodes`;

function ManageEpisodes() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const limit = 20;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("publish");

  const { data: episodes, mutate: mutateEpisodes } = useSWR(
    token
      ? [
          `${url}?author=${user?.id}&page=${page}&per_page=${limit}&status=${status}&search=${debounceTerm}`,
          token,
        ]
      : null,
    genericFetch
  );

  const mutate = async (id) => {
    const newEpisodes = {
      episodes: [...episodes.episodes.filter((event) => event.id !== id)],
      items: Number(episodes.items) - 1,
      total_items: Number(episodes.total_items) - 1,
    };
    return await mutateEpisodes(newEpisodes, { revalidate: true });
  };

  useEffect(() => {
    if (episodes && episodes.total_items) {
      setTotal(episodes.total_items);
    }
  }, [episodes]);

  return (
    <div className="container">
      <div className="row d-flex  justify-content-between mb-5">
        <div className="col-12 col-md-6">
          <h4 className="list-nav-item-title pl-0">Episodes</h4>
        </div>
        <div className="col-12 col-md-3">
          <InputDashSearch
            value={search}
            name={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-auto mt-4 mt-md-0">
          <Link href={"/create/episode"}>
            <a className={"btn btn-primary btn-create w-100"}>Create an Episode</a>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex">
          <div className="p-1">
            <button
              onClick={() => setStatus("publish")}
              className={`custom-pills nowrap ${
                status === "publish" ? "active" : ""
              }`}
            >
              Published
            </button>
          </div>
          <div className="p-1">
            <button
              onClick={() => setStatus("draft")}
              className={`custom-pills nowrap ${
                status === "draft" ? "active" : ""
              }`}
            >
              Drafts
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-4 mt-md-5">
        {!episodes && <SpinnerLoader />}
        {episodes &&
          episodes.episodes &&
          episodes.episodes?.map((episode) => (
            <div className={"col-12 col-md-6 col-lg-4 mb-4"} key={episode.id}>
              <CardEpisode mutate={mutate} episode={episode} />
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
    </div>
  );
}

export default ManageEpisodes;
