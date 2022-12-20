import React, { useEffect, useState } from "react";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useDebounce from "@hooks/useDebounce";
import { getFetchPublic } from "@request/creator";
import useSWR from "swr";
import Pagination from "@components/shared/pagination/Pagination";
import ChannelCardNew from "@components/main/card/ChannelCardNew";
import ScrollTags from '@components/shared/slider/ScrollTags'
import {FILTERS_POST} from "@utils/constant";

const channelUrl = `${process.env.apiV2}/channels?all=true`;

const categoriesUrl = `${process.env.apiV2}/channels/categories/`;

function PageChannels() {
  const limit = 12;
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState('desc');

  const { data: channels, error } = useSWR(
    `${channelUrl}&page=${page}&per_page=${limit}&order=${filter}&search=${debounceTerm}`,
    getFetchPublic
  );

  const isLoading = !channels && !error;

  useEffect(() => {
    if(channels && channels.total_items) {
      setTotal(channels.total_items)
    }
  }, [channels])

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Channels</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 mb-4 mb-md-5">
          <ScrollTags>
            {FILTERS_POST?.map((fil) => (
              <div key={fil.value} className="p-1">
                <button
                  onClick={() => setFilter(fil.value)}
                  className={`custom-pills pills-gray nowrap ${
                    filter === fil.value ? 'active' : ''
                  }`}
                >
                  {fil.label}
                </button>
              </div>
            ))}
          </ScrollTags>
        </div>
      </div>
      <div className="row d-flex  justify-content-end">
        <div className="col-12 col-md-3 mb-4 mb-md-5 ">
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
            <div className="col-6 col-md-6 col-lg-3 mb-4" key={channel.id}>
              <ChannelCardNew channel={channel} />
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

export default PageChannels;
