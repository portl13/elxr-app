import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import { useRouter } from "next/router";
import useDebounce from "@hooks/useDebounce";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import Link from "next/link";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import CardSong from "@components/manage/card/CardSong";
import Pagination from "@components/shared/pagination/Pagination";
import CardAlbum from "@components/manage/card/CardAlbum";

const url = `${process.env.apiV2}/albums`;

function ManageAlbums() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const router = useRouter();
  const limit = 20;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("publish");

  const { data: albums, mutate: mutateAlbums } = useSWR(
    token
      ? [
          `${url}?author=${user?.id}&page=${page}&per_page=${limit}&status=${status}&search=${debounceTerm}`,
          token,
        ]
      : null,
    genericFetch
  );

  const mutate = async (id) => {
    const newAlbums = {
        albums: [...albums.albums.filter((event) => event.id !== id)],
      items: Number(albums.items) - 1,
      total_items: Number(albums.total_items) - 1,
    };

    return await mutateAlbums(newAlbums, { revalidate: true });
  };

  useEffect(() => {
    if (albums && albums.total_items) {
      setTotal(albums.total_items);
    }
  }, [albums]);

  return (
    <div className="container">
      <div className="row d-flex  justify-content-between mb-5">
        <div className="col-12 col-md-6">
          <h4 className="list-nav-item-title pl-0">Albums</h4>
        </div>
        <div className="col-12 col-md-3">
          <InputDashSearch
            value={search}
            name={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-auto mt-4 mt-md-0">
          <Link href={"/create/album"}>
            <a className={"btn btn-primary btn-create w-100"}>Create an Album</a>
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
        {!albums && <SpinnerLoader />}
        {albums &&
          albums.albums &&
          albums.albums?.map((album) => (
            <div className={"col-12 col-md-6 col-lg-4 mb-4"} key={album.id}>
              <CardAlbum mutate={mutate} album={album} />
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

export default ManageAlbums;
