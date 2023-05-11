import React from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";

function VideoCardNew({ video }) {
  const { creator } = video;
  return (
    <article className="card-general-new">
      <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
        <a>
          {onlyLettersAndNumbers(video?.video) && !video.thumbnail && (
            <div
              style={{
                backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video.video}/thumbnails/thumbnail.jpg?time=${video.size}s)`,
              }}
              className="ratio ratio-16x9 pointer border-radius-12 cover-bg"
            ></div>
          )}

          {video.thumbnail && (
            <div
              style={{
                backgroundImage: `url(${video.thumbnail})`,
              }}
              className="ratio ratio-16x9 border-radius-12 pointer  cover-bg"
            ></div>
          )}
        </a>
      </Link>

      <div className="py-3 px-2 d-flex ">
        <div className="border-colors cover-bg d-flex align-items-center justify-content-center ">
          <Link href={`/professionals/${stringToSlug(creator?.name)}/${creator?.id}`}>
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
          <div className="d-flex justify-content-between align-items-start">
            <h3 className="title-even-home line-clamp-2 m-0">
              <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
                <a className="color-font">{video.title}</a>
              </Link>
            </h3>
          </div>

          <div className="d-flex alig-items-center ">
            <span className="subtitle-even-home text-ellipsis mr-3 color-font-grey">
              <Link
                href={`/professionals/${stringToSlug(creator?.name)}/${creator?.id}`}
              >
                <a className={"color-font"}>by {creator?.name}</a>
              </Link>
            </span>
          </div>
          <div className=" d-flex ">
            <span className="date-even-home color-font">{video.category}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default VideoCardNew;
