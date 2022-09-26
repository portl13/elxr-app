import React, { useContext, useEffect, useState } from "react";
import useDebounce from "@hooks/useDebounce";
import useSWR from "swr";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import { UserContext } from "@context/UserContext";
import { getChannels } from "@request/dashboard";
import CardChannel from "@components/manage/card/CardChannel";

const url = `${process.env.apiV2}/channels`;

function ManageChannels() {
  const { user } = useContext(UserContext);
  const limit = 12;
  const token = user?.token;
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const {
    data: channels,
    error,
    mutate,
  } = useSWR(
    token
      ? [
          `${url}?author=${user?.id}&page=${page}&per_page=${limit}&search=${debounceTerm}`,
          token,
        ]
      : null,
    getChannels
  );

  const isLoading = !channels && !error;

  const mutateChannels = async (eventId) => {
    const newEvents = {
      channels: [...channels.channels.filter((event) => event.id !== eventId)],
      items: Number(channels.items) - 1,
      status: channels.status,
      total_items: Number(channels.total_items) - 1,
    };

    return await mutate(newEvents);
  };

  useEffect(() => {
    if (channels && channels.total_items) {
      setTotal(channels.total_items);
    }
  }, [channels]);

  return (
    <>
      <div className="row d-flex  justify-content-between mb-5">
        <div className="col-12 col-md-6">
          <h4 className="list-nav-item-title pl-0">Channels</h4>
        </div>
        <div className="col-12 col-md-3">
          <InputDashSearch
            value={search}
            name={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {isLoading && <SpinnerLoader />}
        {channels &&
          channels.channels &&
          channels.channels.map((channel) => (
            <div className="col-12 col-md-6 col-lg-3 mb-4" key={channel.id}>
              <CardChannel mutateChannels={mutateChannels} channel={channel} />
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

export default ManageChannels;
