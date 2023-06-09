import React, { useState } from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import PlayerYouTube from "react-player/youtube";
import PlayerVimeo from "react-player/vimeo";
import ChannelVideoModalDelete from "@components/dashboard/channels/ChannelVideoModalDelete";
import {onlyLettersAndNumbers} from "@utils/onlyLettersAndNumbers";


function CardVideo({ video, mutateVideos }) {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  return (
    <>
      <article className="card-general-new">
        <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
          <a>
            {onlyLettersAndNumbers(video?.video) && !video.thumbnail &&(
                <div
                    style={{
                      backgroundImage: `url(https://${process.env.SubdomainCloudflare}/${video.video}/thumbnails/thumbnail.jpg?time=${video.size}s)`,
                    }}
                    className="ratio ratio-16x9 border-radius-17 pointer  cover-bg"
                >
                <span className="duration-video">
                  <FontAwesomeIcon className="play-icon" icon={faPlay} />
                </span>
                </div>
            )}
            {!video.video && (
              <div className="ratio ratio-16x9 pointer border-radius-17 bg-gray">
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
              <a className="color-font">{video.title}</a>
            </Link>
          </h3>
          <div className="d-flex alig-items-center color-font-grey ">
            <span className="font-size-13 mr-1">
              Channel: {video.channel_name}
            </span>
          </div>
          <div className=" d-flex color-font-grey">
            <span className="font-size-13 mr-1">Category:</span>
            <span className="font-size-13">{video.category}</span>
          </div>
        </div>
        <div className="card-footer-actions w-100">
          <Link href={`/dashboard/videos/edit-video/${video.id}`}>
            <a className="btn btn-action">Edit</a>
          </Link>
          <button
            onClick={() => setOpenModalDelete(!openModalDelete)}
            className="btn btn-action"
          >
            Delete
          </button>{" "}
          <Link href={`/video/${stringToSlug(video.title)}/${video.id}`}>
            <a className="btn btn-action">View</a>
          </Link>
        </div>
      </article>
      <ChannelVideoModalDelete
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        video={video}
        mutateVideos={mutateVideos}
      />
    </>
  );
}

export default CardVideo;
