import ChatEvent from "@components/eventChat/component/ChatEvent";
import EventVideoStream from "@components/main/details/event/EventVideoStream";
import StreamWebVideo from "@components/shared/stream/StreamWebVideo";
import useStream from "@hooks/stream/useStream";
import React, { useState } from "react";
import { Stream } from "@cloudflare/stream-react";
import useSWR from "swr";
import { createEventsFecth, genericFetch } from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

function EventDetailsScream({ event, auth, user, author, event_id }) {
  const [open, setOpen] = useState(false);
  const { data, error } = useSWR(
    user?.token && event?.stream
      ? [`/api/cloudflare/stream?uid=${event?.stream}`, user.token]
      : null,
    genericFetch
  );
  const isLoading = !data && !error;
  return (
    <div className="row mx-0">
      <div className="col">
        <div className="card-general no-border">
          {!open && (
            <>
              {!event && <div className="ratio ratio-16x9 bg-gray"></div>}
              {event && event?.stream && (
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
            </>
          )}
          {open && (
            <StreamWebVideo WHIPData={data} stream_key={data?.rtmps?.streamKey} />
          )}
          <div className="px-3">
            <div className="card-info mt-4  px-3 px-md-0">
              <h4 className="font-weight-bold">{event?.title}</h4>
              {/* <span>Scheduled for</span>
            <span>July 24, 2022- 3pm PST</span> */}
              <p
                className="m-0"
                dangerouslySetInnerHTML={{
                  __html: event?.description,
                }}
              />
            </div>
            <h5>BROWSER STREAMING</h5>
            <div className="mt-3 mb-5">
              <button onClick={() => setOpen(!open)} className="btn btn-primary">
                {open ? 'CLOSE LIVE' : 'GO LIVE'}
              </button>
            </div>
            {isLoading && <SpinnerLoader />}
            {data && (
              <>
                <h5>SOFTWARE STREAM SETTINGS</h5>
                <div className="mt-3">
                  <label className="input-search mr-0 mb-4 border-radius-35 w-100  input border-none mb-0">
                    <span className="text-grey">Stream Url</span>
                    <span className="text-red">*</span>
                    <input
                      className="w-100 bg-transparent text-white border-none mt-1"
                      value={data?.rtmps?.url}
                      readOnly
                    />
                  </label>
                  <label className="input-search mr-0 border-radius-35 w-100 input border-none  mb-0">
                    <span className="text-grey">Stream Key</span>
                    <input
                      className="w-100 bg-transparent text-white border-none mt-1"
                      value={data?.rtmps?.streamKey}
                      readOnly
                    />
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="col chat-column">
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
  );
}

export default EventDetailsScream;
