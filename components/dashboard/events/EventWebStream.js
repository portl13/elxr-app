import ChatEvent from "@components/eventChat/component/ChatEvent";
import React from "react";
import Head from "next/head";
import {convertToUTC, getFormatedDateFromDate} from "@utils/dateFromat";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

function EventWebStream({ event, auth, user, author, event_id, isLoading }) {
  return (
    <>
      <Head>
        <title>Event Web</title>
      </Head>
      <div className="row mx-0">
        <div className="col-12 col-xl-8">
          <div className="card-general no-border">
            {!isLoading ? (
              <div
                style={{
                  backgroundImage: `url(${event?.thumbnail})`,
                }}
                className="ratio ratio-16x9 bg-cover border-radius-17"
              ></div>
            ) : (
              <SpinnerLoader />
            )}
            <div className="d-flex mt-3 justify-content-between">
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
                <a
                  href={
                    event?.room
                      ? `${process.env.streamingUrl}/${event?.room?.code}`
                      : "/"
                  }
                  className={"btn btn-primary"}
                  target={"_blank"}
                >
                  Go Live
                </a>
              </div>
            </div>
            <div className="mt-4  px-3 px-md-0">
              <h4 className="font-weight-bold">{event?.title}</h4>
              <p
                className="m-0"
                dangerouslySetInnerHTML={{
                  __html: event?.description,
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-3 col-chat">
          {author && (
            <ChatEvent
              auth={auth}
              user={user}
              owner={author}
              vendor_id={event_id}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default EventWebStream;
