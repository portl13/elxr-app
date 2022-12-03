import ChatEvent from "@components/eventChat/component/ChatEvent";
import StreamWebVideo from "@components/shared/stream/StreamWebVideo";
import React, { useState } from "react";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import { useRouter } from "next/router";

function EventWebStream({ event, auth, user, author, event_id }) {
  const router = useRouter();
  const { data } = useSWR(
    user?.token && event?.stream_livepeer
      ? [`/api/livepeer/stream?uid=${event?.stream_livepeer}`, user.token]
      : null,
    genericFetch
  );

  return (
    <div className="row mx-0">
      <div className="col-12 col-xl-8">
        <div className="card-general no-border">
          {data && <StreamWebVideo stream_key={data?.streamKey} />}
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

export default EventWebStream;
