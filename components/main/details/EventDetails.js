import React, { useContext, useState, useEffect } from "react";
import { getFetchPublic } from "@request/creator";
import useSWR from "swr";
import EventVideoStream from "./event/EventVideoStream";
import ChatEvent from "../../eventChat/component/ChatEvent";
import { UserContext } from "../../../context/UserContext";
import Link from "next/link";
import EventInfo from "@components/events/EventInfo";

const baseUrl = process.env.apiV2;
const url = `${baseUrl}/channel-event`;
const urlChannel = `${baseUrl}/channels`;

const styles = {
  backgroundColor: '#0e0f11',
  borderRadius: '30px',
  border: '2px solid #272A3D'
}

function EventDetails({ classNameIcons = "", id }) {
  const [toggleState, setToggleState] = useState(1);
  const { user } = useContext(UserContext);
  const { data: event } = useSWR(`${url}/${id}`, getFetchPublic);

  const [auth, setAuth] = useState(false);
  const [author, setAuthor] = useState(false);
  const event_id = id;

  const { data: channel } = useSWR(
    event ? `${urlChannel}/${event?.channel_id}` : null,
    getFetchPublic
  );

  useEffect(() => {
    if (event && event?.author) {
      setAuthor(event.author);
    }
  }, [event]);

  useEffect(() => {
    if (!user) return;
    setAuth(!auth);
  }, [user]);

  useEffect(() => {
    if (!user && auth) {
      setAuth(!auth);
    }
  }, [user]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  if (event) {
    console.log(event);
  }

  return (
    <div className="row mx-0">
      <div className="col-12 col-xl-8 padding-0">
        <EventInfo
          event={event}
          event_id={event_id}
          channel={channel}
          author={author}
          user={user}
          toggleTab={toggleTab}
          toggleState={toggleState}
          classNameIcons={classNameIcons}
        />
      </div>
      <div
        className={
          toggleState === 1
            ? "col-12 col-xl-4 padding-0 position-static mb-6 mb-xl-0 col-chat"
            : "d-none col-xl-4 d-lg-flex"
        }
      >
        {author && user && event?.live_chat && (
          <ChatEvent
            auth={auth}
            user={user}
            owner={author}
            vendor_id={event_id}
          />
        )}
        {!event?.live_chat && (
          <div
              style={styles}
              className="d-flex justify-content-center align-items-center h-100  flex-column">
            <p className="mt-2 font-weight-bold">
              Chat is disabled for this event.
            </p>
          </div>
        )}
        {!user && event?.live_chat && (
          <div style={styles} className="d-flex justify-content-center align-items-center h-100  flex-column">
            <Link href={"/login"}>
              <a className="btn btn-primary">SIGN IN</a>
            </Link>
            <p className="mt-2 font-weight-bold">
              login to participate in the chat
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetails;
