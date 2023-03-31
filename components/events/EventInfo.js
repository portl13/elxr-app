import React, { useEffect, useRef, useState } from "react";
import SaveButton from "@components/shared/action/SaveButton";
import SharedButton from "@components/shared/action/SharedButton";
import SaveCalendarButton from "@components/shared/action/SaveCalendarButton";
import { convertToUTC, getFormatedDateFromDate } from "@utils/dateFromat";
import { Stream } from "@cloudflare/stream-react";
import ChannelCardMedia from "@components/video/ChannelCardMedia";
import AuthButtons from "@components/home/AuthButtons";
import TicketButton from "@components/shared/button/TicketButton";
import CheckTicketButton from "@components/shared/button/CheckTicketButton";
import SubscriptionBox from "@components/shared/ui/SubscriptionBox";
import WHEPClient from "@utils/WHEPClient";
import useInterval from "@hooks/useInterval";
import axios from "axios";
import PlayerYouTube from "react-player/youtube";
import PlayerVimeo from "react-player/vimeo";

const StreamWeb = ({ stream, poster }) => {
  const url = `https://${process.env.SubdomainCloudflare}/${stream}/webRTC/play`;
  const [status, setStatus] = useState("disconnected");
  const [isRunning, setIsRunning] = useState(true);
  const [isClosed, setIsClosed] = useState(false);

  const videoRef = useRef();

  const checkStream = async (stream) => {
    try {
      const { data } = await axios.get(`/api/cloudflare/status?uid=${stream}`);
      setTimeout(() => {
        setStatus(data.status);
        setIsRunning(false);
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  };

  useInterval(
    () => {
      checkStream(stream).then();
    },
    !isClosed ? (isRunning ? 10000 : 30000) : null
  );

  useEffect(() => {
    return () => {
      setStatus("disconnected");
      setIsClosed(true);
    };
  }, []);

  useEffect(() => {
    if (status === "disconnected") return;
    try {
      new WHEPClient(url, videoRef.current, poster);
    } catch (e) {}
  }, [status]);

  if (status === "disconnected") {
    return (
      <>
        <div
          style={{
            backgroundImage: `url(${poster})`,
          }}
          className={`ratio ratio-16x9 bg-cover border-radius-17`}
        ></div>
      </>
    );
  }

  return (
    <>
      <div className={`ratio ratio-16x9 bg-cover border-radius-17`}>
        <video poster={poster} controls autoPlay muted ref={videoRef}></video>
      </div>
    </>
  );
};

const VideoParty = ({ video }) => {
  return (
    <>
      {video.includes("youtu") && (
        <div className="ratio ratio-16x9 pointer">
          <PlayerYouTube
            width={"100%"}
            height={"100%"}
            url={video}
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

      {video.includes("vimeo") && (
        <div className="ratio ratio-16x9 pointer">
          <PlayerVimeo
            width={"100%"}
            height={"100%"}
            url={video}
            config={{
              vimeo: {
                playerOptions: {
                  title: 1,
                  controls: 1,
                  showinfo: 1,
                  autoplay: false,
                  muted: true,
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
};

function EventInfo(props) {
  const {
    event,
    toggleTab,
    toggleState,
    event_id,
    author,
    user,
    classNameIcons = "",
    mutate,
    status,
  } = props;

  return (
    <div className="card-general no-border">
      {event &&
      !event?.is_subscribed &&
      (event?.private_no_auth ||
        event?.visability === "private" ||
        event?.visability === "ticketed") ? (
        <>
          <div
            style={{
              backgroundImage: `url(${event?.thumbnail})`,
            }}
            className="ratio ratio-16x9 bg-cover border-radius-17"
          ></div>
        </>
      ) : null}

      {event && event?.room && event?.type_stream === "webcam" && (
        <div
          style={{
            backgroundImage: `url(${event?.thumbnail})`,
          }}
          className="ratio ratio-16x9 bg-cover border-radius-17"
        ></div>
      )}

      {event && event?.type_stream === "conference" && (
        <div
          style={{
            backgroundImage: `url(${event?.thumbnail})`,
          }}
          className="ratio ratio-16x9 bg-cover border-radius-17"
        ></div>
      )}

      {event && event?.stream && event?.type_stream === "webcam" && (
        <StreamWeb poster={event?.thumbnail} stream={event?.stream} />
      )}

      {event && event?.type_stream === "third-party" && (
        <VideoParty video={event?.third_party_url} />
      )}

      <div className="mt-4 px-0 px-md-2">
        <div className="d-flex flex-row mb-3 mb-lg-2 w-100 justify-content-between justify-content-md-left justify-content-lg-end">
          <div className="d-flex w-100">
            <div className="mr-2 d-lg-none">
              <button
                onClick={() => toggleTab(1)}
                className={
                  toggleState === 1
                    ? "btn btn-borde-pill-gray active py-1 px-3"
                    : "btn btn-borde-pill-gray py-1 px-3"
                }
              >
                Live Chat
              </button>
            </div>
            <div className="mr-auto mr-md-2 d-lg-none">
              <button
                onClick={() => toggleTab(2)}
                className={
                  toggleState === 2
                    ? "btn btn-borde-pill-gray active py-1 px-3"
                    : "btn btn-borde-pill-gray py-1 px-3"
                }
              >
                Event Info
              </button>
            </div>
            <div className="flex-shrink d-flex align-items-center ml-auto">
              <SaveCalendarButton
                event={event}
                classNameIcons={classNameIcons}
              />
              {/* <CreatedButton typeAdd={"event"} /> */}
              {event && (
                <SaveButton
                  value={event_id}
                  type="event"
                  classNameIcons={classNameIcons}
                />
              )}
              <SharedButton title={event?.title} />
            </div>
          </div>
        </div>
        <div
          className={
            toggleState === 2
              ? "d-flex flex-column"
              : "d-none d-lg-flex flex-column "
          }
        >
          <div className="d-flex justify-content-between">
            <div className="d-none d-md-flex flex-column">
              <span>Scheduled for</span>
              <span className="d-block mb-2">
                {event?.date_time &&
                  getFormatedDateFromDate(
                    convertToUTC(event?.date_time),
                    "MMMM dd, yyyy h:mm aaa"
                  )}
              </span>
            </div>
            <div className={"ml-3"}>
              {event &&
                event?.type_stream === "conference" &&
                event?.meet_guest_link && (
                  <a
                    className={"btn btn-primary"}
                    href={event?.meet_guest_link}
                    target={"_blank"}
                  >
                    Join Meeting
                  </a>
                )}
              {event && event?.type_stream === "webcam" && event?.room && (
                <a
                  className={"btn btn-primary"}
                  href={`${process.env.streamingUrl}/${event?.room?.code}`}
                  target={"_blank"}
                >
                  Join Live
                </a>
              )}
            </div>
          </div>

          <h4 className="font-weight-bold title-responsive color-font">
            {event?.title}{" "}
            {!event?.is_subscribed && event?.visability === "ticketed" ? (
              <span className={"text-primary"}>${event?.ticket_price}</span>
            ) : null}
          </h4>

          {status === "unauthenticated" && status !== "loading" ? (
            <div className={"text-center my-5"}>
              <p
                style={{
                  fontSize: "1.5rem",
                }}
              >
                this event is private and only available to users of the
                platform.
              </p>
              <AuthButtons classNameContainer={"justify-content-center"} />
            </div>
          ) : null}

          {event &&
          !event?.is_subscribed &&
          event?.visability !== "ticketed" ? (
            <SubscriptionBox user={user} vendor_id={event.author} />
          ) : null}

          {event &&
          user &&
          !event?.is_subscribed &&
          event?.visability === "ticketed" ? (
            <div className={"text-center my-5"}>
              <p
                style={{
                  fontSize: "1.5rem",
                }}
              >
                This is a ticketed special event. For event access
              </p>
              <div className={"d-flex justify-content-center"}>
                <TicketButton productID={event.ticket_id} user={user} />
                <CheckTicketButton
                  mutate={mutate}
                  product_id={event.ticket_id}
                  user={user}
                />
              </div>
            </div>
          ) : null}

          {event ? (
            <p
              className="m-0"
              dangerouslySetInnerHTML={{
                __html: event?.description,
              }}
            />
          ) : null}

          <ChannelCardMedia
            is_subscribed={event?.is_subscribed}
            author={author}
          />
        </div>
      </div>
    </div>
  );
}

export default EventInfo;
