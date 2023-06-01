import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import SaveButton from "@components/shared/action/SaveButton"
import SharedButton from "@components/shared/action/SharedButton"
import CategoryAndTags from "@components/shared/cards/CategoryAndTags"
import ChannelCardMedia from "@components/video/ChannelCardMedia"
import VideoContainer from "@components/video/VideoContainer"
import { useSession } from "next-auth/react"
import SubscriptionBox from "@components/shared/ui/SubscriptionBox"
import AuthBox from "@components/shared/ui/AuthBox"
import useSWR from "swr"
import { getFetchPublic } from "@request/creator"
const url = `${process.env.apiV2}/video`
import NonSsrWrapper from "../../components/no-ssr-wrapper/NonSSRWrapper"
import TicketButton from "@components/shared/button/TicketButton"

function VideoInfo({ videoData, user, id }) {
  const { status } = useSession()

  const {
    data: video,
    isLoading,
    isValidating,
  } = useSWR(
    status === "unauthenticated" && status !== "loading" && !user
      ? `${url}/${id}`
      : [`${url}/${id}`, user?.token],
    getFetchPublic,
    {
      revalidateOnFocus: false,
    }
  )

  return (
    <>
      {video && video.video && video?.is_subscribed ? (
        <NonSsrWrapper>
          <VideoContainer
            isLoading={isLoading || isValidating}
            time={video.size}
            video={video.video}
          />
        </NonSsrWrapper>
      ) : null}

      {videoData && !videoData?.is_subscribed ? (
        <div
          style={{
            backgroundImage: `url(${videoData.thumbnail}?time=${videoData.size}s)`,
          }}
          className="ratio ratio-16x9 pointer bg-cover bg-gray border-radius-17"
        >
          <span className="duration-video">
            <FontAwesomeIcon className="play-icon" icon={faPlay} />
          </span>
        </div>
      ) : null}

      <div className="d-flex flex-column flex-md-row w-100 justify-content-between">
        <h4 className="color-font font-weight-bold mt-4 mb-2 flex-grow">
          {videoData?.title}
        </h4>
        <div className="flex-shrink d-flex align-items-center">
          {videoData && <SaveButton value={videoData?.id} type="video" />}
          <SharedButton title={videoData?.title} />
        </div>
      </div>

      {videoData && (
        <CategoryAndTags category={videoData.category} tags={videoData.tags} />
      )}

      {status === "unauthenticated" &&
      status !== "loading" &&
      (videoData.type === "subscribers" || video?.type === "ticketed") ? (
        <AuthBox />
      ) : null}

      {!videoData?.is_subscribed && user && videoData.type === "subscribers" ? (
        <SubscriptionBox vendor_id={videoData?.author} user={user} />
      ) : null}

      {user && !video?.is_subscribed && video?.type === "ticketed" ? (
        <div className={"text-center my-5"}>
          <p
            style={{
              fontSize: "1.5rem",
            }}
          >
            This Video is Available for On Demand Purchase.
          </p>
          <div className={"d-flex justify-content-center"}>
            <TicketButton
              author={videoData?.author}
              productID={video?.ticket_id}
              user={user}
              event_id={video?.id}
              text="Buy Video"
            />
          </div>
        </div>
      ) : null}

      {videoData?.description ? (
        <div
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: videoData?.description,
          }}
        />
      ) : null}

      {videoData && videoData.author && (
        <ChannelCardMedia
          is_subscribed={videoData?.is_subscribed}
          author={videoData.author}
        />
      )}
    </>
  )
}

export default VideoInfo
