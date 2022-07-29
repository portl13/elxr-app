import React, { useContext, useState } from "react";
import { UserContext } from "@context/UserContext";
import LupaIcon from "@icons/LupaIcon";
import PlusIcon from "@icons/PlusIcon";
import Link from "next/link";
import ChannelCard from "./ChannelCard";
import useSWR from "swr";
import { getChannels } from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import useDebounce from "@hooks/useDebounce";
import Pagination from "@components/shared/pagination/Pagination";
const url = `${process.env.apiV2}/channels`;

function Channels() {
  const { user } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(20);

  const debounceTerm = useDebounce(search, 500);

  const token = user?.token;
  const limit = 20;
  const [page, setPage] = useState(1);
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

  return (
    <div className="container ">
      <div className="d-flex flex-column flex-md-row  justify-content-between">
        <div>
          <h2 className="title-dashboard">Channels</h2>
        </div>
        <div className="d-flex flex-column flex-md-row  justify-content-between align-items-left align-items-md-center">
          <InputDashSearch
            placeholder="Search channel"
            value={search}
            name={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="btn-create-client ml-md-3  mt-3 mt-md-0">
            <Link href={"/dashboard/channels/create-channel"}>
              <a className="btn btn-create w-100">
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Create a Channel</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-4 mt-md-5">
        {isLoading && <SpinnerLoader />}
        {channels &&
          channels.channels &&
          channels.channels.map((channel) => (
            <ChannelCard
              mutateChannels={mutateChannels}
              channel={channel}
              key={channel.id}
            />
          ))}
        {channels && channels.channels && channels.channels.length === 0 && (
          <h3 className="col display-4">
            You have not created any channel yet
          </h3>
        )}
      </div>
      <div className="row ">
        <div className="col-12 d-flex justify-content-end">
          {channels &&
            channels?.total_items &&
            channels?.total_items > perPage && (
              <Pagination
                totalCount={channels?.total_items}
                onPageChange={setPage}
                currentPage={page}
                pageSize={perPage}
              />
            )}
        </div>
      </div>
    </div>
  );
}

export default Channels;
