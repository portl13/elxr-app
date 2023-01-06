import ChatEvent from "@components/eventChat/component/ChatEvent";
import React from "react";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import Head from "next/head";
import Script from "next/script";
import StreamWebRtc from "@components/shared/stream/StreamWebRTC";

function EventWebStream({ event, auth, user, author, event_id }) {
  const { data: stream, error } = useSWR(
    user?.token && event?.stream
      ? [`/api/cloudflare/stream?uid=${event?.stream}`, user.token]
      : null,
    genericFetch
  );
  const isLoading = !stream && !error;
  
  return (
    <>
      <Head>
        <title>Event Web</title>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/8.1.2/adapter.min.js"
          integrity="sha512-l40eBFtXx+ve5RryIELC3y6/OM6Nu89mLGQd7fg1C93tN6XrkC3supb+/YiD/Y+B8P37kdJjtG1MT1kOO2VzxA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <div className="row mx-0">
        <div className="col-12 col-xl-8">
          <div className="card-general no-border">
            <StreamWebRtc stream={stream} />

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
    </>
  );
}

export default EventWebStream;
