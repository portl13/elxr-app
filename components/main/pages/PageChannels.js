import React, { useState } from "react";
import ChannelCard from "@components/creator/cards/ChannelCard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useDebounce from "@hooks/useDebounce";
import { getFetchPublic } from "@request/creator";
import useSWR from "swr";

const channelUrl = `${process.env.apiV2}/channels?all=true`;

function PageChannels() {
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);

  const { data: channels, error } = useSWR(
    `${channelUrl}&page=1&per_page=12&search=${debounceTerm}`,
    getFetchPublic
  );

  const isLoading = !channels && !error;

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Channels</h4>
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
            <div className="col-12 col-md-6 col-lg-3 mb-4" key={channel.id}>
              <ChannelCard channel={channel} />
            </div>
          ))}
        {channels && channels.channels && channels.channels.length === 0 && (
          <h3 className="col display-4">
            You have not created any channel yet
          </h3>
        )}
      </div>
    </>
  );
}

export default PageChannels;
