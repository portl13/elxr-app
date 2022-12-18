import ChannelCard from "@components/creator/cards/ChannelCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React, { useState } from "react";
import useSWR from "swr";

const channelUrl = `${process.env.apiV2}/channels?author=`;

function ChannelsTab({ creator_id }) {
  const limit = 12;
  const [page, setPage] = useState(1);
  const { data: channels, error } = useSWR(
    `${channelUrl}${creator_id}&page=${page}&per_page=${limit}`,
    getFetchPublic
  );
  const isLoading = !channels && !error;

  if (channels && channels.channels && channels.channels.length === 0) {
    return '';
  }

  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="color-font font-size-14">CHANNELS</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {channels &&
        channels.channels &&
        channels.channels.map((channel) => (
          <div className="col-12 col-md-6 col-lg-3 mb-4" key={channel.id}>
            <ChannelCard channel={channel} />
          </div>
        ))}
    </div>
  );
}

export default ChannelsTab;
