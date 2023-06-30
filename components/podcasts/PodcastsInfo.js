import React, { useRef, useState } from "react"
import SaveButton from "@components/shared/action/SaveButton"
import SharedButton from "@components/shared/action/SharedButton"
import CategoryAndTags from "@components/shared/cards/CategoryAndTags"
import ChannelCardMedia from "@components/video/ChannelCardMedia"
import { useSession } from "next-auth/react"
import AuthBox from "@components/shared/ui/AuthBox"
import SubscriptionBox from "@components/shared/ui/SubscriptionBox"
import AlbumSongList from "@components/album/AlbumSongList"
import GiftButton from "@components/gift/GiftButton"

function PodcastsInfo({ audio, user }) {
  console.log({ audio })
  const { status } = useSession()

  const audioRef = useRef()
  const [play, setPlay] = useState(false)
  const playMusic = () => {
    setPlay(!play)
    const music = play ? audioRef.current.pause() : audioRef.current.play()
  }

  return (
    <>
      <article className="song-card-reponsive">
        <div>
          <div
            className="ratio ratio-1x1  cover-bg bg-gray border-radius-17"
            style={{
              backgroundImage: `url(${audio?.thumbnail})`,
            }}
          ></div>
        </div>
        <div className="pl-lg-3">
          <h4 className="font-weight-bold mt-1 color-font mb-0">
            {audio?.title}
          </h4>
          <h5 className="text-primary m-0">{audio?.channel_name}</h5>
          {audio && (
            <CategoryAndTags category={audio?.category} tags={audio?.tags} />
          )}

          <div className="mt-2 flex-shrink d-flex justify-content-between align-items-center">
            {audio?.song ? (
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
              {audio && <SaveButton value={audio?.id} type="podcast" />}
              <SharedButton title={audio?.title} />
              <GiftButton
                className="btn-icon-action ml-2"
                authorId={audio?.author}
                authorName={audio?.channel_name}
              />
            </div>
          </div>
        </div>
      </article>

      {audio && audio?.description ? (
        <div
          className="mt-3 editor-detail"
          dangerouslySetInnerHTML={{
            __html: audio?.description,
          }}
        />
      ) : null}

      {status === "unauthenticated" &&
      status !== "loading" &&
      audio.type === "subscribers" ? (
        <AuthBox />
      ) : null}

      {!audio?.is_subscribed && user ? (
        <SubscriptionBox vendor_id={audio?.author} user={user} />
      ) : null}

      {audio && audio?.episodes_formated ? (
        <AlbumSongList songs={audio?.episodes_formated} />
      ) : null}

      {/* <div
        className="ratio ratio-16x9 bg-gray card-head cover-bg bg-gray border-radius-17"
        style={{
          backgroundImage: `url(${audio?.thumbnail || audio?.cover})`,
        }}
      ></div>
      {audio?.audio && (
        <div className="audio-container w-100 d-flex">
          <audio className="w-100" src={audio.audio} controls />
        </div>
      )}
      <div className="d-flex flex-column flex-md-row w-100 justify-content-between">
        <h4 className="font-weight-bold mt-4 mb-2 flex-grow color-font">
          {audio?.title}
        </h4>
        <div className="flex-shrink d-flex align-items-center">
          {audio && <SaveButton value={audio?.id} type="podcast" />}
          <SharedButton title={audio?.title} />
        </div>
      </div>
      {audio && (
        <CategoryAndTags category={audio?.category} tags={audio?.tags} />
      )}

      {status === "unauthenticated" &&
      status !== "loading" &&
      audio.type === "subscribers" ? (
        <AuthBox />
      ) : null}

      {!audio?.is_subscribed && user ? (
        <SubscriptionBox vendor_id={audio?.author} user={user} />
      ) : null}

      {audio?.description ? (
        <div
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: audio?.description,
          }}
        />
      ) : null}

      {audio && audio?.episodes_formated ? (
        <AlbumSongList songs={audio?.episodes_formated} />
      ) : null} */}

      {audio && audio?.author && (
        <ChannelCardMedia
          is_subscribed={audio?.is_subscribed}
          author={audio.author}
        />
      )}
    </>
  )
}

export default PodcastsInfo
