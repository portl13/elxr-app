import React from "react";
import { css } from "@emotion/core";
import SubscriptionButton from "@components/shared/button/SubscriptionButton";
import AuthButtons from "@components/home/AuthButtons";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useAudio } from "react-use";

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

const PlayButton = ({ url }) => {
    const [audio, state, controls] = useAudio({
        src: url,
        autoPlay: false,
    });

    if (!url) {
        return "";
    }

    return (
        <>
            {audio}
            <button
                onClick={() => {
                    if (state.playing) {
                        controls.pause();
                    }
                    if (!state.playing) {
                        controls.play();
                    }
                }}
                className={"btn btn-play d-flex"}
            >
                <FontAwesomeIcon
                    className={"icon-xs"}
                    icon={state.playing ? faPause : faPlay}
                />
                <span>{state.playing ? "pause" : "play"}</span>
            </button>
        </>
    );
};

function EpisodeCreator({ episode, user, vendor_id, status }) {
    return (
        <div css={carCss} className={"mb-5 mt-5"}>
            <div>
                <Link href={`/episode/${stringToSlug(episode.title)}/${episode.id}`}>
                    <div
                        className="ratio ratio-1x1  cover-bg bg-gray border-radius-17 pointer"
                        style={{
                            backgroundImage: `url(${episode?.thumbnail})`,
                        }}
                    ></div>
                </Link>
            </div>
            <div className={"d-flex align-items-end"}>
                <div className={"song-body"}>
                    <h3 className={"font-size-22"}>
                        <Link href={`/episode/${stringToSlug(episode.title)}/${episode.id}`}>
                            {episode.title}
                        </Link>
                    </h3>
                    <span className={"d-flex cat text-uppercase"}>{episode.category}</span>
                    <ul className={"no-ul"}>
                        {episode?.tags.map((tag) => (
                            <li className={"baged-gris d-inline mr-2"} key={tag.value}>
                                {tag.label}
                            </li>
                        ))}
                    </ul>
                    {user || episode?.is_subscribed ? (
                        <div
                            className={"line-clamp-3 mb-2"}
                            dangerouslySetInnerHTML={{
                                __html: episode.content,
                            }}
                        />
                    ) : null}
                    {user && episode?.is_subscribed ? (
                        <PlayButton url={episode.episode?.url} />
                    ) : null}
                    {user && !episode?.is_subscribed ? (
                        <SubscriptionButton vendor_id={vendor_id} user={user} />
                    ) : null}

                    {status === "unauthenticated" &&
                    status !== "loading" &&
                    episode.type === "subscribers" ? (
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

export default EpisodeCreator;