import React, { useRef, useState } from "react";
import CategoryAndTags from "@components/shared/cards/CategoryAndTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import SaveButton from "@components/shared/action/SaveButton";
import SharedButton from "@components/shared/action/SharedButton";
import SongPlayer from "@components/song/SongPlayer";
import AuthBox from "@components/shared/ui/AuthBox";
import SubscriptionBox from "@components/shared/ui/SubscriptionBox";
import { useSession } from "next-auth/react";

function EpisodeDetailCard({ episode, user }) {
  console.log(episode)
  const { status } = useSession();
  const audioRef = useRef();
  const [play, setPlay] = useState(false);
  const playMusic = () => {
    setPlay(!play);
    const music = play ? audioRef.current.pause() : audioRef.current.play();
  };

  return (
    <>
      <article className="song-card-reponsive">
        <div>
          <div
            className="ratio ratio-1x1  cover-bg bg-gray border-radius-17"
            style={{
              backgroundImage: `url(${episode?.thumbnail})`,
            }}
          ></div>
        </div>
        <div className="pl-lg-3">
          <h4 className="font-weight-bold mt-1  mb-0">{episode?.title}</h4>
          <h5 className="text-primary m-0">{episode?.channel_name}</h5>
          {episode && (
            <CategoryAndTags
              category={episode?.category}
              tags={episode?.tags}
            />
          )}
          <div className="mt-2 flex-shrink d-flex justify-content-between align-items-center">
            {episode?.episode ? (
              <>
                {play ? (
                  <button
                    onClick={playMusic}
                    className="btn  btn-primary radius-sm text-capitalize "
                  >
                    <i className="pr-2">
                      <FontAwesomeIcon
                        className="icon-setting"
                        icon={faPause}
                      />
                    </i>
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={playMusic}
                    className="btn btn-primary text-capitalize "
                  >
                    <i className="pr-2">
                      <FontAwesomeIcon className="icon-setting" icon={faPlay} />
                    </i>
                    Play
                  </button>
                )}
              </>
            ) : null}
            <div className="d-flex">
              {episode && <SaveButton value={episode?.id} type="episode" />}
              <SharedButton title={episode?.title} />
            </div>
          </div>
          {episode?.episode && (
              <SongPlayer
                  playMusic={playMusic}
                  audioRef={audioRef}
                  play={play}
                  setPlay={setPlay}
                  song={{...episode,song: episode.episode}}
              />
          )}
        </div>
      </article>
      {episode && episode?.content ? (
          <div
              className="mt-3 editor-detail"
              dangerouslySetInnerHTML={{
                __html: episode?.content,
              }}
          />
      ) : null}

      {status === "unauthenticated" &&
      status !== "loading" &&
      episode.type === "subscribers" ? (
        <AuthBox />
      ) : null}

      {!episode?.is_subscribed && user ? (
        <SubscriptionBox vendor_id={episode?.author} user={user} />
      ) : null}
    </>
  );
}

export default EpisodeDetailCard;
