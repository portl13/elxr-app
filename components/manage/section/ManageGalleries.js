import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import useDebounce from "@hooks/useDebounce";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import Link from "next/link";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import CardGallery from "@components/manage/card/CardGallery";

const url = `${process.env.apiV2}/gallery`;

function ManageGalleries() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const limit = 20;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("publish");

  const { data: galleries, mutate: mutateGalleries } = useSWR(
    token
      ? [
          `${url}?author=${user?.id}&page=${page}&per_page=${limit}&status=${status}&search=${debounceTerm}`,
          token,
        ]
      : null,
    genericFetch
  );

  const mutate = async (id) => {
    const newGalleries = {
      images: [...galleries.images.filter((event) => event.id !== id)],
      items: Number(galleries.items) - 1,
      total_items: Number(galleries.total_items) - 1,
    };
    return await mutateGalleries(newGalleries, { revalidate: true });
  };

  useEffect(() => {
    if (galleries && galleries.total_items) {
      setTotal(galleries.total_items);
    }
  }, [galleries]);

  return (
    <div className="container">
      <div className="row d-flex  justify-content-between mb-5">
        <div className="col-12 col-md-6">
          <h4 className="list-nav-item-title pl-0">Galleries</h4>
        </div>
        <div className="col-12 col-md-3">
          <InputDashSearch
            value={search}
            name={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-auto mt-4 mt-md-0">
          <Link href={"/create/gallery"}>
            <a className={"btn btn-primary btn-create w-100"}>Create a Gallery</a>
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
        {!galleries && <SpinnerLoader />}
        {galleries &&
          galleries.images &&
          galleries.images?.map((gallery) => (
            <div className={"col-12 col-md-6 col-lg-4 mb-4"} key={gallery.id}>
              <CardGallery mutate={mutate} gallery={gallery} />
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

export default ManageGalleries;
