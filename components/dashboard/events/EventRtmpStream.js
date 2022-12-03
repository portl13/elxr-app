import ChatEvent from "@components/eventChat/component/ChatEvent";
import React from "react";
import { Stream } from "@cloudflare/stream-react";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { useRouter } from "next/router";

function EventRtmpStream({ event, auth, user, author, event_id }) {
  const router = useRouter();
  const { data, error } = useSWR(
    user?.token && event?.stream
      ? [`/api/cloudflare/stream?uid=${event?.stream}`, user.token]
      : null,
    genericFetch
  );
  const isLoading = !data && !error;
  return (
    <div className="row mx-0">
      <div className="col-12 col-xl-8">
        <div className="card-general no-border">
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
          {data && (
            <>
              <h5 className={"mt-5"}>SOFTWARE STREAM SETTINGS</h5>
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
          <button
            onClick={() => router.reload()}
            className={"btn btn-outline-primary mt-4"}
          >
            Make Chat Active
          </button>
          <div className="px-3">
            <div className="card-info mt-4  px-3 px-md-0">
              <h4 className="font-weight-bold">{event?.title}</h4>
              <p
                className="m-0"
                dangerouslySetInnerHTML={{
                  __html: event?.description,
                }}
              />
            </div>
            {isLoading && <SpinnerLoader />}
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
  );
}

export default EventRtmpStream;
