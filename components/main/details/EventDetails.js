import React, { useContext, useState, useEffect } from "react";
import { getFetchPublic } from "@request/creator";
import useSWR from "swr";
import ChatEvent from "../../eventChat/component/ChatEvent";
import { UserContext } from "@context/UserContext";
import Link from "next/link";
import EventInfo from "@components/events/EventInfo";
import SkeletonEventDetail from "@components/SkeletonLoading/events/SkeletonEventDetail";
import { useSession } from "next-auth/react";
import { countView } from "@request/shared";
import { css } from "@emotion/core";

const baseUrl = process.env.apiV2;
const url = `${baseUrl}/channel-event`;

const styles = {
  background:
    "linear-gradient( 160deg,var(--bg-menu-top-left) 0%,var(--bg-menu-bottom-right) 60%)",
};

const styleChat = css`
  @media (max-width: 1199px) {
    display: grid;
    grid-auto-rows: auto 1fr;
    height: calc(80vh - 90px);
    .chat-container > div {
      margin-right: -15px;
      margin-left: -15px;
    }
  }
`;

function EventDetails({ classNameIcons = "", id }) {
  const [toggleState, setToggleState] = useState(1);

  const { status } = useSession();

  const { user, auth } = useContext(UserContext);

  const {
    data: event,
    error,
    mutate,
  } = useSWR(
    status === "unauthenticated" && status !== "loading" && !user
      ? `${url}/${id}`
      : [`${url}/${id}`, user?.token],
    getFetchPublic
  );

  const isLoading = !event && !error;

  const [author, setAuthor] = useState(false);
  const event_id = id;

  useEffect(() => {
    if (event && event?.author) {
      setAuthor(event.author);
    }
  }, [event]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const mutateInfo = async () => {
    await mutate();
  };

  useEffect(() => {
    if (id) {
      countView(id).then();
    }
  }, [id]);

  return (
    <div css={styleChat} className="row mx-0">
      <div className="col-12 col-xl-8 padding-0">
        {isLoading && <SkeletonEventDetail />}
        {!isLoading && (
          <EventInfo
            event={event}
            event_id={event_id}
            author={author}
            user={user}
            toggleTab={toggleTab}
            toggleState={toggleState}
            classNameIcons={classNameIcons}
            mutate={mutateInfo}
          />
        )}
      </div>
      <div
        className={
          toggleState === 1
            ? "col-12 col-xl-4 padding-0 mb-xl-0 col-chat chat-container"
            : "d-none col-xl-4 d-lg-flex chat-container"
        }
      >
        {author && user && event?.live_chat && !event?.privete_no_auth && (
          <ChatEvent
            auth={auth}
            user={user}
            owner={author}
            vendor_id={event_id}
          />
        )}

        {!event?.live_chat && !event?.privete_no_auth && event?.is_subscribed && (
          <div
            style={styles}
            className="d-flex justify-content-center align-items-center h-100  flex-column"
          >
            <p className="mt-2 font-weight-bold">
              Chat is disabled for this event.
            </p>
          </div>
        )}

        {!user && event?.live_chat && (
          <div
            style={styles}
            className="d-flex justify-content-center align-items-center h-100  flex-column"
          >
            <Link href={"/login"}>
              <a className="btn btn-primary">SIGN IN</a>
            </Link>
            <p className="mt-2 font-weight-bold">
              login to participate in the chat
            </p>
          </div>
        )}

        {(!user && event?.privete_no_auth) ||
          (!event?.is_subscribed && (
            <div
              style={styles}
              className="d-flex justify-content-center align-items-center h-100  flex-column"
            ></div>
          ))}
      </div>
    </div>
  );
}

export default EventDetails;
