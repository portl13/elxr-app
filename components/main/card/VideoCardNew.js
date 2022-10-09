import React from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayerYouTube from "react-player/youtube";
import PlayerVimeo from "react-player/vimeo";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import { onlyLettersAndNumbers } from "@utils/onlyLettersAndNumbers";

function VideoCardNew({ video }) {
  return (
    <article className="card-general-new">
      <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
        <div>
          {onlyLettersAndNumbers(video?.video) && !video.thumbnail && (
            <div
              style={{
                backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video.video}/thumbnails/thumbnail.jpg)`,
              }}
              className="ratio ratio-16x9 pointer  cover-bg"
            >
              <span className="duration-video">
                <FontAwesomeIcon className="play-icon" icon={faPlay} />
              </span>
            </div>
          )}
          {!video.video && (
            <div className="ratio ratio-16x9 pointer">
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

          {video.video &&
            !video.thumbnail &&
            !video?.video.includes("youtu") &&
            !video?.video.includes("vimeo") &&
            !onlyLettersAndNumbers(video?.video) && (
              <div className="ratio ratio-16x9 pointer border-radius-17  cover-bg">
                <span className="duration-video">
                  <FontAwesomeIcon className="play-icon" icon={faPlay} />
                </span>
                <video src={video.video}></video>
              </div>
            )}

          {!video.thumbnail && video?.video.includes("youtu") && (
            <div className="ratio ratio-16x9 border-radius-17 pointer">
              <PlayerYouTube
                width={"100%"}
                height={"100%"}
                url={video?.video}
                config={{
                  youtube: {
                    playerVars: {
                      controls: 0,
                      showinfo: 0,
                      fs: 0,
                      disablekb: 1,
                      rel: 0,
                      modestbranding: 1,
                    },
                  },
                }}
              />
            </div>
          )}

          {!video.thumbnail && video?.video.includes("vimeo") && (
            <div className="ratio ratio-16x9 border-radius-17 pointer">
              <PlayerVimeo
                width={"100%"}
                height={"100%"}
                url={video?.video}
                config={{
                  vimeo: {
                    playerOptions: {
                      title: 0,
                      controls: 0,
                      showinfo: 0,
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </Link>

      <div className="py-3">
        <h3 className="font-size-14  m-0">
          <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
            <a className="text-white">{video.title}</a>
          </Link>
        </h3>
        <div className="d-flex alig-items-center text-grey ">
          <span className="font-size-13 mr-1">
            Channel: {video.channel_name}
          </span>
        </div>
        <div className=" d-flex text-grey">
          <span className="font-size-13 mr-1">Category:</span>
          <span className="font-size-13">{video.category}</span>
        </div>
      </div>
    </article>
  );
}

export default VideoCardNew;
