import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import useDebounce from "@hooks/useDebounce";
import useSWR from "swr";
import { getChannelEvents } from "@request/dashboard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";
import CardEvent from "@components/manage/card/CardEvent";
import Link from "next/link";

const baseUrl = process.env.apiV2;
const eventsUrl = `${baseUrl}/channel-event/`;

function ManageEvents() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const limit = 20;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [status, setStatus] = useState('publish');

  const {
    data: events,
    error,
    mutate,
  } = useSWR(
    token
      ? [
          `${eventsUrl}?author=${user?.id}&page=${page}&per_page=${limit}&status=${status}&search=${debounceTerm}`,
          token,
        ]
      : null,
    getChannelEvents
  );

  const isLoading = !events && !error;

  const mutateEvents = async (eventId) => {
    const newEvents = {
      data: [...events.data.filter((event) => event.id !== eventId)],
      items: Number(events.items) - 1,
      status: events.status,
      total_items: Number(events.total_items) - 1,
    };

    return await mutate(newEvents, { revalidate: true });
  };

  useEffect(() => {
    if (events && events.total_items) {
      setTotal(events.total_items);
    }
  }, [events]);

  return (
    <>
      <div className="container ">
        <div className="row d-flex  justify-content-between mb-5">
          <div className="col-12 col-md-6">
            <h4 className="list-nav-item-title pl-0">Events</h4>
          </div>
          <div className="col-12 col-md-3">
            <InputDashSearch
                value={search}
                name={"search"}
                onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-auto mt-4 mt-md-0">
            <Link href={"/dashboard/channel/create-event"}>
              <a className={"btn btn-primary btn-create w-100"}>
                Create a event
              </a>
            </Link>
          </div>
        </div>
        <div className="row">
        <div className="col-12 d-flex">
          <div className="p-1">
            <button
              onClick={() => setStatus('publish')}
              className={`custom-pills nowrap ${
                status === 'publish' ? 'active' : ''
              }`}
            >
              Published
            </button>
          </div>
          <div className="p-1">
            <button
              onClick={() => setStatus('draft')}
              className={`custom-pills nowrap ${
                status === 'draft' ? 'active' : ''
              }`}
            >
              Drafts
            </button>
          </div>
        </div>
      </div>
        <div className="row mt-3 mt-md-5">
          {isLoading && <SpinnerLoader />}
          {events && events.data && events.data.length === 0 && (
            <h3 className="col display-4">
              You have not created any events yet
            </h3>
          )}
          {events &&
            events.data &&
            events.data.length > 0 &&
            events.data.map((event) => (
              <div key={event.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <CardEvent
                  mutateEvents={mutateEvents}
                  event={event}
                />
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
    </>
  );
}

export default ManageEvents;
