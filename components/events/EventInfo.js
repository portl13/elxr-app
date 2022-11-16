import React from "react";
import SaveButton from "@components/shared/action/SaveButton";
import SharedButton from "@components/shared/action/SharedButton";
import SaveCalendarButton from "@components/shared/action/SaveCalendarButton";
import SubscriptionButton from "@components/shared/button/SubscriptionButton";
import { convertToUTC, getFormatedDateFromDate } from "@utils/dateFromat";
import { Stream } from "@cloudflare/stream-react";
import EventVideoStream from "@components/main/details/event/EventVideoStream";
import useSWR from "swr";
import { genericFetch } from "@request/creator";
import ChannelCardMedia from "@components/video/ChannelCardMedia";
import AuthButtons from "@components/home/AuthButtons";
import TicketButton from "@components/shared/button/TicketButton";
import CheckTicketButton from "@components/shared/button/CheckTicketButton";
import SubscriptionBox from "@components/shared/ui/SubscriptionBox";

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
  } = props;

  const { data } = useSWR(
    user?.token && event?.stream_livepeer
      ? [`/api/livepeer/stream?uid=${event?.stream_livepeer}`, user.token]
      : null,
    genericFetch
  );

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

      {event && event?.stream && event?.type_stream !== "webcam" && (
        <Stream
          controls
          src={event?.stream}
          poster={event?.thumbnail}
          height={"100%"}
          width={"100%"}
          responsive={false}
          className={`ratio ratio-16x9`}
        />
      )}

      {event && event?.type_stream === "webcam" && data && (
        <EventVideoStream
          imageOffline={event?.thumbnail}
          stream_data={{
            id: event?.stream_livepeer,
            playback_url: `https://livepeercdn.com/hls/${data?.playbackId}/index.m3u8`,
          }}
        />
      )}
      <div className="card-info mt-4  px-0 px-md-2">
        <div className="d-flex flex-row mb-3 mb-lg-2 w-100 justify-content-between justify-content-md-left justify-content-lg-end">
          <div className="d-flex">
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
            <div className="mr-2 d-lg-none">
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
            <div className="flex-shrink d-flex align-items-center">
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
          <div className="d-none d-md-flex flex-column ">
            <span>Scheduled for</span>

            <span className="d-block mb-2">
              {event?.date_time &&
                getFormatedDateFromDate(
                  convertToUTC(event?.date_time),
                  "MMMM dd, yyyy h:mm aaa"
                )}
            </span>
          </div>

          <h4 className="font-weight-bold title-responsive">
            {event?.title}{" "}
            {event?.visability === "ticketed"
              ? `$${event?.ticket_price}`
              : null}
          </h4>

          {event && event?.private_no_auth ? (
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
            <SubscriptionBox
              text={"this event is private and only available to subscribers."}
              user={user}
              vendor_id={event.author}
            />
          ) : null}

          {event && user &&
          !event?.is_subscribed &&
          event?.visability === "ticketed" ? (
            <div className={"text-center my-5"}>
              <p
                style={{
                  fontSize: "1.5rem",
                }}
              >
                that event is protected by a ticket.
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

          <ChannelCardMedia author={author} />
        </div>
      </div>
    </div>
  );
}

export default EventInfo;
