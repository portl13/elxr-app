import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React from "react";
import useSWRInfinite from "swr/infinite";
import ChannelCardNew from "@components/main/card/ChannelCardNew";
import SpinnerLoading from "@components/shared/loader/SpinnerLoading";
import InfinitScroll from "react-infinite-scroll-component";

const channelUrl = `${process.env.apiV2}/channels?author=`;

function ChannelsTab({ creator_id }) {
  const limit = 20;

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${channelUrl}${creator_id}&page=${
        index + 1
      }&per_page=${limit}&single=true`,
    getFetchPublic
  );

  const channels = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  const isLoading = !channels && !error;
  
  return (
    <>
      <div className="row mt-5">
        <div className="col-12">
          <h4 className="color-font font-size-14">CHANNELS</h4>
        </div>
        {isLoading && <SpinnerLoader />}
        <div className="row">{isLoadingInitialData && <SpinnerLoader />}</div>
      </div>
      <InfinitScroll
        className={"row"}
        dataLength={channels.length}
        next={() => loadMore()}
        hasMore={!isReachingEnd}
        loader={!isLoadingInitialData ? <SpinnerLoading /> : null}
      >
        {channels &&
          channels?.map((channel) => (
            <div className="col-12 col-md-6 col-lg-3 mb-4" key={channel.id}>
              <ChannelCardNew channel={channel} />
            </div>
          ))}
      </InfinitScroll>
    </>
  );
}

export default ChannelsTab;
