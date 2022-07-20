import ChannelCard from "@components/creator/cards/ChannelCard";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, { useState } from "react";
import useSWR from "swr";

const tabs = [
  {
    tab: "all",
    label: "All",
  },
  {
    tab: "art",
    label: "Art",
  },
  {
    tab: "food",
    label: "Food",
  },
  {
    tab: "music",
    label: "Music",
  },
  {
    tab: "yoga",
    label: "Yoga",
  },
];

const channelUrl = `${process.env.apiV2}/channels?all=true`;

function PageChannels() {
  const [tab, setTab] = useState("");

  const { data: channels, error } = useSWR(
    `${channelUrl}&page=1&per_page=12`,
    getFetchPublic
  );

  const isLoading = !channels && !error;

  return (
    <>
      <div className="row mt-5">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Channels</h4>
        </div>
        <div className="col-12 col-md-6 mb-5">
          {tabs.map((item) => (
            <button
              key={item.tab}
              onClick={() => setTab(item.tab)}
              className={`${
                tab === item.tab ? "active" : ""
              }btn btn-transparent btn-transparent-grey font-weight-500 py-2 px-3 mr-3`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="col-12 col-md-6 mb-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch />
          </div>
        </div>
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
