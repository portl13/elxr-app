import { stringToSlug } from "@lib/stringToSlug";
import Link from "next/link";
import React from "react";

function PodcastCardNew({ audio }) {
  return (
    <article className="card-general-new">
      <Link href={`/podcasts/${stringToSlug(audio.title)}/${audio.id}`}>
        <a>
          <div
            className="ratio ratio-1x1 border-radius-17 bg-gray card-head cover-bg bg-gray"
            style={{
              backgroundImage: `url(${audio.thumbnail || audio.cover})`,
            }}
          ></div>
        </a>
      </Link>
      <div className="py-3">
        <h3 className="font-size-12  m-0">
          <Link href={`/podcasts/${stringToSlug(audio.title)}/${audio.id}`}>
            <a className="color-font">{audio.title}</a>
          </Link>
        </h3>
        <div className="d-flex alig-items-center color-font-grey ">
          <span className="font-size-13">
            Channel:{" "}
            {audio && audio.channel_name && (
              <Link href={`/channel/${audio.channel_id}`}>
                <a className="color-font-grey">{audio.channel_name}</a>
              </Link>
            )}
          </span>
        </div>
        <div className=" d-flex color-font-grey">
          <span className="font-size-13 mr-1">Category:</span>
          <span className="font-size-13">{audio.category}</span>
        </div>
      </div>
    </article>
  );
}

export default PodcastCardNew;
