import React from "react";
import Router from "next/router";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEnvelope,
  faUserTimes,
  faUserCheck,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  NOT_FRIEND,
  PENDING,
  IS_FRIEND,
  AWAITING,
  removeSpecailChar,
  getProfileRoute,
} from "../../utils/constant";
import Loader from "../../components/loader";
import Link from "next/link";
import jstz from "jstz";
import {utcToZonedTime} from "date-fns-tz";
import {formatDistanceToNow} from "date-fns";

const checkIsRequested = (type) => {
  if (type === NOT_FRIEND) return [faUserPlus, "Connect"];
  if (type === IS_FRIEND) return [faUserCheck, "Connected"];
  if (type === AWAITING) return [faUserClock, "Connect requested"];
  if (type === PENDING) return [faUserTimes, "Cancel connection request"];
  return [];
};

const getFollowText = (val, reqlMembersId) => {
  let text = !val.is_following ? "Follow" : "Following";
  return reqlMembersId === val.id && val.is_following ? "Unfollow" : text;
};

const getActivity = (isGroup, last_activity, date_modified) => {
  const newDate = new Date(`${isGroup ? date_modified : last_activity }Z`);
  const timeZone = jstz.determine().name()
  const zonedDate = utcToZonedTime(newDate, timeZone)
  const posted = formatDistanceToNow(zonedDate,{addSuffix: true})

  let activity = "";
  if (isGroup) {
    activity = `Joined ${posted === 'less than a minute' ? `${posted} ago` : posted}` ;
  } else
    activity =
      last_activity === "Not recently active"
        ? "Not recently active"
        : `active ${posted}`;
  return activity;
};

const renderListView = ({
  handleMemberUnfollow,
  last_activity,
  data,
  index,
  isOrganizer,
  followers,
  is_following,
  friendship_status,
  reqlMembersId,
  handleReq,
  id,
  profile_name,
  spinnerLoad,
  isConnected,
  handleMsgRedirect,
  activeTab,
  isGroup,
  date_modified,
}) => {

  if (is_following === undefined) {
    return;
  }

  return (
    <>
      <div className="item-block">
        <h2 className="list-title">
          <Link
            className="mr-1"
            href={getProfileRoute(profile_name, id, "timeline", "personal")}
          >
            <a>
              {profile_name}
            </a>
          </Link>
        </h2>
        <p className="item-meta">
          {getActivity(isGroup, last_activity, date_modified)}
        </p>
      </div>
      <div className="button-wrap member-button-wrap only-list-view">
        <div className="followers-wrap">
          <b>{followers}</b>
          {followers < 2 ? "follower" : "followers"}
        </div>
        {!isOrganizer && (
          <>
            <div className="generic-button">
              <a className="">
                <FontAwesomeIcon
                  icon={checkIsRequested(friendship_status)[0]}
                  onClick={() => handleReq(data, index)}
                />
                <div
                  className={`tooltip-panel ${
                    isConnected && "connectivity-text"
                  }`}
                >
                  {checkIsRequested(friendship_status)[1]} <em></em>
                </div>
              </a>
            </div>
            <div className="generic-button">
              {activeTab === 1 && (
                <a className="send-message">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    onClick={() => handleMsgRedirect(data)}
                  />
                  <div className="tooltip-panel">
                    Message <em></em>
                  </div>
                </a>
              )}
            </div>
            <div className="generic-button">
              <button
                className={
                  !is_following
                    ? "follow-button"
                    : "follow-button following-white-text"
                }
                onClick={() => handleMemberUnfollow(data, index)}
              >
                {getFollowText(data, reqlMembersId)}
                {spinnerLoad && reqlMembersId === id ? <Loader /> : ""}
              </button>
            </div>
          </>
        )}
      </div>
      <div className="flex only-grid-view align-items-center follow-container">
        <div className="followers-wrap">
          <b>{followers}</b> {followers < 2 ? "follower" : "followers"}
        </div>
        {!isOrganizer && (
          <div
            className="generic-button"
          >
            <button
              className={
                !is_following
                  ? "follow-button"
                  : "follow-button following-white-text"
              }
              onClick={() => handleMemberUnfollow(data, index)}
            >
              {getFollowText(data, reqlMembersId)}
              {spinnerLoad && reqlMembersId === id ? <Loader /> : ""}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

function MemberList({
  data,
  setModalOpen,
  setReqMembersId,
  setReqMembersIndex,
  activeTab,
  index,
  handleReqMember,
  handleFollowMember,
  reqlMembersId,
  spinnerLoad,
  isOrganizer,
  isGroup,
}) {

  const profile_name = data?.profile_name
  const avatar_urls = data?.avatar_urls
  const last_activity = data?.last_activity
  const followers = data?.followers
  const is_following = data?.is_following
  const id = data?.id
  const friendship_status = data?.friendship_status
  const date_modified = data?.date_modified

  const isConnected =
    friendship_status === PENDING ||
    friendship_status === IS_FRIEND ||
    friendship_status === AWAITING;
  const handleReq = (ele, i) => {
    setReqMembersId(ele);
    setReqMembersIndex(i);
    if (
      ele.friendship_status === NOT_FRIEND ||
      ele.friendship_status === AWAITING
    )
      handleReqMember(ele, i);
    else setModalOpen(true);
  };

  const handleMemberUnfollow = (ele, i) => {
    if (
      (ele.is_following && !reqlMembersId) ||
      (ele.is_following && reqlMembersId && ele.id !== reqlMembersId)
    ) {
      setReqMembersId(ele.id);
    } else {
      setReqMembersId(ele.id);
      handleFollowMember(ele, i);
    }
  };

  const handleMsgRedirect = (e) => {
    Router.push(`/messages/compose/${removeSpecailChar(e.name)}/${e.id}`).then();
  };
  return (
    <>
      <li className="list-wrap">
        <div className="list-wrap-inner">
          <div className="item-avatar">
            <Link
              className="mr-1"
              href={getProfileRoute(profile_name, id, "timeline", "personal")}
            >
              <a>
                <img
                  src={avatar_urls?.thumb}
                  className="avatar"
                  alt="Profile photo"
                />{" "}
              </a>
            </Link>
          </div>
          <div className="item">
            {renderListView({
              spinnerLoad,
              handleMemberUnfollow,
              isConnected,
              isOrganizer,
              last_activity,
              followers,
              is_following,
              id,
              handleReq,
              profile_name,
              friendship_status,
              data,
              reqlMembersId,
              index,
              handleMsgRedirect,
              activeTab,
              isGroup,
              date_modified,
            })}
          </div>
          {!isOrganizer && (
            <>
              <div className="flex only-grid-view button-wrap member-button-wrap footer-button-wrap">
                <div className="generic-button">
                  <a className="">
                    <FontAwesomeIcon
                      icon={checkIsRequested(friendship_status)[0]}
                      onClick={() => handleReq(data, index)}
                    />
                    <div
                      className={`tooltip-panel ${
                        isConnected && "connectivity-text"
                      }`}
                    >
                      {checkIsRequested(friendship_status)[1]}
                      <em></em>
                    </div>
                  </a>
                </div>{" "}
                <div className="generic-button">
                  {activeTab === 1 && (
                    <a className="send-message">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        onClick={() => handleMsgRedirect(data)}
                      />
                      <div className="tooltip-panel">
                        Message <em></em>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </li>
    </>
  );
}
export default MemberList;
