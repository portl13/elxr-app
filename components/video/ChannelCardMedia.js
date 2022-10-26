import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import CategoryAndTags from "@components/shared/cards/CategoryAndTags";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import SubscriptionButton from "@components/shared/button/SubscriptionButton";
import FollowButton from "@components/shared/button/FollowButton";

const url = `${process.env.apiV2}/channels`;

function ChannelCardMedia({ channel_id }) {
  const { user } = useContext(UserContext);

  const { data: channel, error } = useSWR(
    `${url}/${channel_id}`,
    getFetchPublic
  );

  if (error) {
    return "";
  }

  if (!channel) {
    return <SpinnerLoader />;
  }

  return (
    <div className="card-channel-media border py-2 px-3 mt-4 py-md-3">
      <div className="img-channel-media">
        <div className="avatar-detail">
          {channel && channel.channel_logo && (
            <img src={channel.channel_logo} alt={channel.channel_name} />
          )}
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row name-channel-media w-100">
        <div className="ml-md-3 mt-2 mt-md-0 w-100">
          <h4 className="m-0 font-weight-bold">{channel.channel_name}</h4>
          <CategoryAndTags category={channel.category} tags={channel.tags} />
        </div>
      </div>

      <div className="d-flex mt-2 buttons-channel-media">
        <div className="position-relative">
          {channel && channel?.vendor_id && (
            <FollowButton user_id={channel.vendor_id} />
          )}
        </div>
        <div className="position-relative ml-3">
          {channel?.vendor_id && (
            <SubscriptionButton vendor_id={channel?.vendor_id} user={user} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChannelCardMedia;
