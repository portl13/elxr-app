import React, { useEffect, useState } from "react";
import Router from "next/router";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEnvelope,
  faUserTimes,
  faUserCheck,
  faUserClock,
  faEllipsisH,
  faUserAltSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  NOT_FRIEND,
  PENDING,
  IS_FRIEND,
  AWAITING,
  removeSpecailChar,
  getProfileRoute,
} from "@utils/constant";
import Loader from "../loader";
import Link from "next/link";
import jstz from "jstz";
import { utcToZonedTime } from "date-fns-tz";
import { formatDistanceToNow } from "date-fns";
import { Modal, ModalBody, Button, ModalHeader, ModalFooter } from "reactstrap";
import { reportModal } from "../livefeed/livefeed.style";
import { preload } from "swr";
import { genericFetch } from "@request/dashboard";

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
  let posted = "";

  if (last_activity || date_modified) {
    const newDate = new Date(`${isGroup ? date_modified : last_activity}Z`);
    const timeZone = jstz.determine().name();
    const zonedDate = utcToZonedTime(newDate, timeZone);
    posted = formatDistanceToNow(zonedDate, { addSuffix: true });
  }

  let activity = "";
  if (isGroup) {
    activity = `Joined ${
      posted === "less than a minute" ? `${posted} ago` : posted
    }`;
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
  preloadProfile,
}) => {
  if (is_following === undefined) {
    return;
  }

  const [showOption, setShowOption] = useState(false);
  const [show, setShow] = useState(false);
  const [blockUserId, setBlockUserId] = useState();

  const close = () => {
    setShow(false);
    setShowOption(false);
  };

  function actionOption() {
    if (!showOption) {
      setShowOption(true);
    } else {
      setShowOption(false);
    }
  }

  function blockUser() {
    Axios.post(
      process.env.bossApi + "/moderation",
      {
        item_id: blockUserId,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    ).then((res) => {
      console.log(res.data);
    });
  }

  return (
    <>
      <div className="col-md-4 col-12 p-0 mb-2 mb-md-0">
        <h2 onMouseEnter={preloadProfile} className="list-title">
          <Link
            className="mr-1"
            href={getProfileRoute(profile_name, id, "timeline", "personal")}
          >
            <a>{profile_name}</a>
          </Link>
        </h2>
        <p className="item-meta">
          {getActivity(isGroup, last_activity, date_modified)}
        </p>
      </div>
      <div className="button-wrap member-button-wrap only-list-view 
        col-md-8 col-12 p-0 justify-content-start justify-content-md-end"
      >
        {/* <div className="followers-wrap">
          <b>{followers}</b>
          {followers < 2 ? "follower" : "followers"}
        </div> */}
        {!isOrganizer && (
          <>
            <button 
              className="btn btn-connection-transparent mb-2 mb-md-0"
              onClick={() => handleReq(data, index)}
            >
              <a className=" color-font">
                {/* <FontAwesomeIcon
                  icon={checkIsRequested(friendship_status)[0]}
                  onClick={() => handleReq(data, index)}
                /> */}
                <div
                  className={`tooltip-panel ${
                    isConnected && "connectivity-text"
                  }`}
                >
                  {checkIsRequested(friendship_status)[1]} <em></em>
                </div>
              </a>
            </button>
            <div className="generic-button m-0 ml-md-3 mb-2 mb-md-0">
              <button
                className={
                  !is_following
                    ? "btn-connection-transparent px-4"
                    : "btn-connection-transparent"
                }
                onClick={() => handleMemberUnfollow(data, index)}
              >
                {getFollowText(data, reqlMembersId)}
                {spinnerLoad && reqlMembersId === id ? <Loader /> : ""}
              </button>
            </div>
            <div className="generic-button m-0 ml-md-3">
              {activeTab === 1 && (
                <a className="send-message btn btn-transparent no-hover color-font">
                  Message
                </a>
              )}
            </div>
            {/* <div className="dots-div">
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="icon-setting"
                onClick={() => actionOption()}
              />
              <div className="tooltip-panel">More Options</div>
              {showOption && (
                <div className="more-action-list">
                  <div className="inner-tag">
                    <div className="main-tag">
                      <div className="item-link" onClick={() => setShow(true)}>
                        <FontAwesomeIcon icon={faUserAltSlash} />
                        Block
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div> */}
            <div className="generic-button">
              {activeTab === 1 && (
                <a className=" color-font">
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    className="icon-setting"
                    onClick={() => actionOption()}
                  />
                </a>
              )}
              <div className="tooltip-panel-connection">More Options</div>
              {showOption && (
                <div className="more-action-list-connection">
                  <div className="inner-tag-connection">
                    <div className="main-tag-connection">
                      <div
                        className="item-link-connection"
                        onClick={() => setShow(true)}
                      >
                        <FontAwesomeIcon
                          icon={faUserAltSlash}
                          className="icon-setting mr-1"
                        />
                        Block
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {show && (
              <Modal
                className="modal-dialog-centered"
                isOpen={show}
                css={reportModal}
                toggle={close}
              >
                <ModalHeader toggle={close} className="block-panel">
                  Block Member?
                </ModalHeader>
                <ModalBody>
                  <p>Please confirm you want to block this member.</p>
                  <p>You will no longer be able to:</p>
                  <ul>
                    <li>See blocked member's posts</li>
                    <li>Mention this member in posts</li>
                    <li>Invite this member to groups</li>
                    <li>Message this member</li>
                    <li>Add this member as a connection</li>
                  </ul>

                  <p>
                    <span className="bold-tag">Please note:</span> This action
                    will also remove this member from your connections and send
                    a report to the site admin. Please allow a few minutes for
                    this process to complete.
                  </p>
                </ModalBody>
                <ModalFooter className="py-3">
                  <Button
                    color="secondary-text"
                    onClick={() => {
                      setShow(false);
                      setShowOption(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Link href={"/account-setting?tab=blocked-members.js"}>
                    <Button
                      color="primary"
                      onClick={() => {
                        setShow(false);
                        setShowOption(false);
                        blockUser();
                      }}
                    >
                      Confirm
                    </Button>
                  </Link>
                </ModalFooter>
              </Modal>
            )}
          </>
        )}
      </div>      
      <div className="flex only-grid-view align-items-center follow-container">
        {/* <div className="followers-wrap">
          <b>{followers}</b> {followers < 2 ? "follower" : "followers"}
        </div> */}
        {!isOrganizer && (
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
  user,
}) {
  const profile_name = data?.profile_name;
  const avatar_urls = data?.avatar_urls;
  const last_activity = data?.last_activity;
  const followers = data?.followers;
  const is_following = data?.is_following;
  const id = data?.id;
  const friendship_status = data?.friendship_status;
  const date_modified = data?.date_modified;

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
    Router.push(
      `/messages/compose/${removeSpecailChar(e.name)}/${e.id}`
    ).then();
  };

  const preloadProfile = () => {
    const url = `${process.env.bossApi}/activity?per_page=20&page=1&scope=just-me&user_id=${id}`;
    preload([url, user?.token], genericFetch);
  };

  return (
    <>
      <li className="list-wrap">
        <div className="list-wrap-inner">
          <div onMouseEnter={preloadProfile} className="item-avatar">
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
          <div className="item row mx-0 w-100">
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
              preloadProfile
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
