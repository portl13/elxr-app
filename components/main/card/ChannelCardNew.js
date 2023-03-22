import React from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";

function ChannelCardNew({ channel }) {
  const { creator } = channel;
  return (
    <article className="card-general-new">
      <Link
        href={`/channel/${stringToSlug(channel.channel_name)}/${channel?.id}`}
      >
        <a>
          <div
            style={{
              backgroundImage: `url(${channel?.channel_cover?.medium})`,
            }}
            className="ratio ratio-16x9 bg-gray border-radius-12 cover-bg"
          ></div>
        </a>
      </Link>

      <div className="d-flex position-relative py-3 px-2">
        <div className="border-colors cover-bg d-flex align-items-center justify-content-center ">
          <Link href={`/creator/${stringToSlug(creator.name)}/${creator.id}`}>
            <a className="text-white">
              <div
                style={{
                  backgroundImage: `url(${creator.logo})`,
                }}
                className="avatar-event-card bg-gray cover-bg"
              ></div>
            </a>
          </Link>
        </div>
        <div className="card-info-content pl-3 pr-0">
          <h3 className="title-even-home line-clamp-2 m-0">
            <Link
              href={`/channel/${stringToSlug(channel.channel_name)}/${
                channel?.id
              }`}
            >
              <a className="color-font">{channel.channel_name}</a>
            </Link>
            <div className=" d-flex flex-column">
              {creator ? (
                <span className="subtitle-even-home color-font-grey mr-1">
                  <Link
                    href={`/creator/${stringToSlug(creator.name)}/${
                      creator.id
                    }`}
                  >
                    <a className={"color-font-grey"}>by {creator.name}</a>
                  </Link>
                </span>
              ) : null}
              <span className="date-even-home color-font">
                {channel.category}
              </span>
            </div>
          </h3>
        </div>
      </div>
    </article>
  );
}

export default ChannelCardNew;
