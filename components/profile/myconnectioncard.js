import React, { useState } from "react";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { faUserCheck, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import RequestModal from "../requestModal/RequestModal";
import { removeSpecailChar, getProfileRoute } from "@utils/constant";
import Link from "next/link";



function MyConnectionCard({
  connection,
  parentCallback,
  parentFollow,
  parentUnFollow,
}) {
  const [show, setShow] = useState(false);
  const close = () => setShow(false);
  const [leave, setLeave] = useState(false);
  const onTrigger = () => {
    parentCallback(connection?.id);
  };
  const handleDelete = () => {
    onTrigger();
    setShow(false);
  };
  const followMember = () => {
    parentFollow(connection?.id, false);
    setLeave(false);
  };
  const unFollowMember = () => {
    parentUnFollow(connection?.id, false);
  };
  const action = () => {
    if (!connection?.is_following) {
      followMember();
    } else if (connection?.is_following && leave) {
      unFollowMember();
    } else {
      setLeave(true);
    }
  };
  const buttonText = () => {
    return !connection?.is_following
      ? "Follow"
      : connection?.is_following && !leave
      ? "Following"
      : connection?.is_following && leave
      ? "Unfollow"
      : null;
  };
  const handleMsgRedirect = (e) => {
    Router.push(`/messages/compose/${removeSpecailChar(e.name)}/${e?.id}`);
  };
  return (
    <>
      <li className="list-wrap">
        <div className="list-wrap-inner">
          <div className="item-avatar">
            <Link
              className="mr-1"
              href={getProfileRoute(
                connection?.profile_name,
                connection?.id,
                "timeline",
                "personal"
              )}
            >
              <a>
                <img
                  src={connection?.avatar_urls.thumb}
                  className="avatar"
                  alt="Profile photo"
                />
              </a>
            </Link>
          </div>
          <div className="item">
            <div className="item-block">
                <h2 className="list-title">
                <Link
                  className="mr-1"
                  href={getProfileRoute(
                    connection?.profile_name,
                    connection?.id,
                    "timeline",
                    "personal"
                  )}
                >
                  <a>
                    {connection?.profile_name}
                  </a>
                </Link>
              </h2> 
              <p className="item-meta">
                {connection?.last_activity === "Not recently active"
                  ? "Not recently active"
                  : `active ${moment(connection?.last_activity).fromNow()}`}
              </p> 
            </div>
            <div className="button-wrap member-button-wrap only-list-view">
              <div className="followers-wrap">
                <b>{connection?.followers}</b>
                {connection?.followers < 2 ? "follower" : "followers"}
              </div>
              <div className="generic-button" id="">
                <a className="" id="">
                  <FontAwesomeIcon
                    icon={faUserCheck}
                    onClick={() => setShow(true)}
                  />
                  <div className="tooltip-panel">
                    Connected <em></em>
                  </div>
                </a>
              </div>
              <div id="" className="generic-button">
                <a className="send-message">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <div className="tooltip-panel">
                    Message <em></em>
                  </div>
                </a>
              </div>
              <div className="generic-button" id="">
                <button
                  className={
                    connection?.is_following === false
                      ? "follow-button"
                      : "follow-button following-white-text"
                  }
                  id=""
                  onClick={() => action()}
                >
                  {buttonText()}
                </button>
              </div>
            </div>
            <div className="flex only-grid-view align-items-center follow-container">
              <div className="followers-wrap">
                <b>{connection?.followers}</b>{" "}
                {connection?.followers < 2 ? "follower" : "followers"}
              </div>
              <div
                className="generic-button"
                id="follow-button-93056"
              >
                <button
                  className={
                    connection?.is_following === false
                      ? "follow-button"
                      : "follow-button following-white-text"
                  }
                  id=""
                  onClick={() => action()}
                >
                  {buttonText()}
                </button>
              </div>
            </div>
          </div>
          <div className="flex only-grid-view button-wrap member-button-wrap footer-button-wrap">
            <div className="generic-button" id="">
              <a className="" id="">
                <FontAwesomeIcon
                  icon={faUserCheck}
                  onClick={() => setShow(true)}
                />
                <div className="tooltip-panel">
                  Connected <em></em>
                </div>
              </a>
            </div>
            <div id="" className="generic-button">
              <a className="send-message">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  onClick={() => handleMsgRedirect(connection)}
                />
                <div className="tooltip-panel">
                  Message <em></em>
                </div>
              </a>
            </div>
          </div>
        </div>
      </li>
      <RequestModal
        show={show}
        close={close}
        handleDelete={handleDelete}
        showSpinner={false}
      />
    </>
  );
}
export default MyConnectionCard;
