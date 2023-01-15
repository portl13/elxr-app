import React from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";

function VideoCardNew({ video }) {
  return (
    <article className="card-general-new">
      <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
        <a>
          {onlyLettersAndNumbers(video?.video) && !video.thumbnail && (
            <div
              style={{
                backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video.video}/thumbnails/thumbnail.jpg?time=${video.size}s)`,
              }}
              className="ratio ratio-16x9 pointer border-radius-17 cover-bg"
            >
              <span className="duration-video">
                <FontAwesomeIcon className="play-icon" icon={faPlay} />
              </span>
            </div>
          )}

          {video.thumbnail && (
            <div
              style={{
                backgroundImage: `url(${video.thumbnail})`,
              }}
              className="ratio ratio-16x9 border-radius-17 pointer  cover-bg"
            >
              <span className="duration-video">
                <FontAwesomeIcon className="play-icon" icon={faPlay} />
              </span>
            </div>
          )}
        </a>
      </Link>

      <div className="py-3">
        <h3 className="font-size-14  m-0">
          <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
            <a className="text-white font-size-12 font-weight-700">
              {video.title}
            </a>
          </Link>
        </h3>
        <div className="d-flex alig-items-center ">
          <span className="font-size-12 mr-1 color-font-grey">
            Channel: {video.channel_name}
          </span>
        </div>
        <div className=" d-flex ">
          <span className="font-size-12 color-font-grey mr-1">Category:</span>
          <span className="font-size-12 color-font-grey">{video.category}</span>
        </div>
      </div>
    </article>
  );
}

export default VideoCardNew;
