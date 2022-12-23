import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import Link from "next/link";
import useSWR from "swr";
import useDebounce from "@hooks/useDebounce";
import { genericFetchWithHeader } from "@request/dashboard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import PlusIcon from "@icons/PlusIcon";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import CardCommunity from "@components/manage/card/CardCommunity";

const communitiesUrl = `${process.env.bossApi}/groups`;

function ManageCommunities() {
  const { user } = useContext(UserContext);
  const limit = 20;
  const [page, setPage] = useState(1);
  const { token = null, id = null } = user?.token ? user : {};

  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [total, setTotal] = useState(0);

  const { data: communities, error } = useSWR(
    token
      ? [
          `${communitiesUrl}?page=${page}&per_page=${limit}&user_id=${id}&scope=personal&search=${debounceTerm}`,
          token,
        ]
      : null,
    genericFetchWithHeader
  );

  const isLoading = !communities && !error;

  useEffect(() => {
    if (
      communities &&
      communities.headers &&
      communities.headers["x-wp-total"]
    ) {
      setTotal(communities.headers["x-wp-total"]);
    }
  }, [communities]);

  return (
    <div className="container ">
      <div className="row d-flex  justify-content-between mb-5">
        <div className="col-12 col-md-6">
          <h4 className="list-nav-item-title pl-0">Community</h4>
        </div>
        <div className="col-12 col-md-3">
          <InputDashSearch
            value={search}
            name={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-auto mt-4 mt-md-0">
          <Link href={"/community/create-group"}>
            <a className={"btn btn-primary btn-create w-100"}>
              Create a Community
            </a>
          </Link>
        </div>
      </div>
      <div className="row mt-4 mt-md-5">
        {isLoading && <SpinnerLoader />}
        {communities &&
          communities.data &&
          communities.data.map((community) => (
            <div className="col-6 col-md-6 col-lg-3 mb-4 " key={community.id}>
              <CardCommunity  community={community} />
            </div>
          ))}
        {communities && communities.length === 0 && (
          <h3 className="col display-4">
            You have not created any community yet
          </h3>
        )}
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

export default ManageCommunities;
