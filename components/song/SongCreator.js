import React from "react";
import { css } from "@emotion/core";
import SubscriptionButton from "@components/shared/button/SubscriptionButton";
import AuthBox from "@components/shared/ui/AuthBox";
import AuthButtons from "@components/home/AuthButtons";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const carCss = css`
  display: grid;
  grid-template-columns: 40% 1fr;
  gap: 50px;
  .song-body {
    height: 90%;
  }
  .cat {
    color: #5d6291;
  }
  .no-ul {
    list-style: none;
    padding-left: 0;
  }
  .btn-play {
    background-color: #5d6291;
    color: white;
  }
  .icon-xs {
    width: 0.8rem;
  }
`;

function SongCreator({ song, user, vendor_id, status }) {
  return (
    <div css={carCss} className={"mb-5 mt-5"}>
      <div>
        <div
          className="ratio ratio-1x1  cover-bg bg-gray border-radius-17"
          style={{
            backgroundImage: `url(${song?.thumbnail})`,
          }}
        ></div>
      </div>
      <div className={"d-flex align-items-end"}>
        <div className={"song-body"}>
          <h3 className={"font-size-22"}>
            <Link href={`/song/${stringToSlug(song.title)}/${song.id}`}>
              {song.title}
            </Link>
          </h3>
          <span className={"d-flex cat text-uppercase"}>{song.category}</span>
          <ul className={"no-ul"}>
            {song?.tags.map((tag) => (
              <li className={"baged-gris d-inline mr-2"} key={tag.value}>
                {tag.label}
              </li>
            ))}
          </ul>
          {user || song?.is_subscribed ? (
            <div
              className={"line-clamp-3 mb-2"}
              dangerouslySetInnerHTML={{
                __html: song.content,
              }}
            />
          ) : null}
          {user && song?.is_subscribed ? (
            <button className={"btn btn-play d-flex"}>
              <FontAwesomeIcon className={"icon-xs"} icon={faPlay} />
              <span>play</span>
            </button>
          ) : null}
          {user && !song?.is_subscribed ? (
            <SubscriptionButton vendor_id={vendor_id} user={user} />
          ) : null}

          {status === "unauthenticated" &&
          status !== "loading" &&
          song.type === "subscribers" ? (
            <>
              this content is private and only available to users of the
              platform.
              <AuthButtons classNameContainer={"mt-2"} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SongCreator;
