import React from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";

function ChannelCardNew({ channel }) {
  return (
    <div className="card-general-new">
      <Link href={`/channel/${channel?.id}`}>
        <a>
          <div
            style={{
              backgroundImage: `url(${channel?.channel_cover?.medium})`,
            }}
            className="ratio ratio-16x9 bg-gray border-radius-17 cover-bg"
          ></div>
        </a>
      </Link>
        <div className="mt-3">
          <h3 className="card-title">
            <Link
              href={`/channel/${stringToSlug(channel.channel_name)}/${
                channel?.id
              }`}
            >
              <a className="text-white text-ellipsis">{channel.channel_name}</a>
            </Link>
          </h3>
          <div className=" d-flex my-2 text-grey">
            <span className="font-size-13 mr-1">Category:</span>
            <span className="font-size-13">{channel.category}</span>
          </div>
        </div>
      
    </div>
  );
}

export default ChannelCardNew;
