import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import SubscriptionButton from "@components/shared/button/SubscriptionButton";
import FollowButton from "@components/shared/button/FollowButton";

const creatorData = `${process.env.baseUrl}/wp-json/portl/v1/channel?user_id=`;

function ChannelCardMedia({ author, is_subscribed = null }) {
  const { user } = useContext(UserContext);

  const { data: creator, error } = useSWR(
    author ? `${creatorData}${author}` : null,
    getFetchPublic
  );

  if (error) {
    return "";
  }

  if (!creator) {
    return <SpinnerLoader />;
  }

  return (
    <div className="card-channel-media  py-3 px-3 mt-4 py-md-3 border-radius-17">
      <div className="img-channel-media">
        <div
          style={{
            backgroundImage: `url('${creator?.vendor_shop_logo}')`,
          }}
          className="avatar-detail bg-cover"
        ></div>
      </div>

      <div className="d-flex flex-column flex-md-row name-channel-media">
        <div className="ml-md-3 w-100">
          <h4 className="mb-0 font-weight-bold">{creator.vendor_shop_name}</h4>
        </div>
      </div>

      <div className="d-flex mt-2 buttons-channel-media">
        <div className="position-relative">
          {creator && author && <FollowButton user_id={author} />}
        </div>
        <div className="position-relative ml-3">
          {author && is_subscribed && (
            <SubscriptionButton
              subscription_id={creator?.subscription_id}
              vendor_id={author}
              user={user}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChannelCardMedia;
