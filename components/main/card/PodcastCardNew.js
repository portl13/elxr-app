import CategoryAndTags from "@components/shared/cards/CategoryAndTags";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stringToSlug } from "@lib/stringToSlug";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

function PodcastCardNew({ audio }) {
  const [play, setPlay] = useState(false);
  const audioRef = useRef();
  useEffect(() => {
    if (play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);
  return (
    <article className="card-general-new">
      <Link href={`/podcasts/${stringToSlug(audio.title)}/${audio.id}`}>
        <a>
          <div
            className="ratio ratio-1x1 border-radius-17 bg-gray card-head cover-bg bg-gray"
            style={{
              backgroundImage: `url(${audio.thumbnail || audio.cover})`,
            }}
          >
            {/* <span className="duration-video">
          <div onClick={() => setPlay(!play)} className="player-circle">
            {!play && <FontAwesomeIcon className="play-icon" icon={faPlay} />}
            {play && <FontAwesomeIcon className="play-icon" icon={faStop} />}
          </div>
        </span> */}
          </div>
        </a>
      </Link>
      <div className="py-3">
        <audio
          className={`w-100 ${audio.audio && play ? "d-block" : "d-none"}`}
          ref={audioRef}
          controls
          src={audio.audio}
        />

        <h3 className="font-size-12  m-0">
          <Link href={`/podcasts/${stringToSlug(audio.title)}/${audio.id}`}>
            <a className="text-white">{audio.title}</a>
          </Link>
        </h3>
        <div className="d-flex alig-items-center text-grey ">
          <span className="font-size-13">Channel: {audio && audio.channel_name && (
              <Link href={`/channel/${audio.channel_id}`}>
                <a className="text-grey">{audio.channel_name}</a>
              </Link>
            )}</span>
        </div>
        <div className=" d-flex text-grey">
          <span className="font-size-13 mr-1">Category:</span>
          <span className="font-size-13">{audio.category}</span>
        </div>
      </div>
    </article>
  );
}

export default PodcastCardNew;
