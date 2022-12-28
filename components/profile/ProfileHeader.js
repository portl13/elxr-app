import Axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { reportModal } from "../livefeed/livefeed.style";
import { UserContext } from "../../context/UserContext";
import SocialList from "../layout/SocialList";
import { SkeletonProfile } from "./profile-skeleton";
import { ProfileCardStyle } from "./profile.style";
import ProfileData from "./ProfileData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEllipsisH,
  faEdit,
  faArrowsAlt,
  faBars,
  faUserAltSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, Button, ModalHeader, ModalFooter } from "reactstrap";
import Router from "next/router";
import { ButtonSmall } from "../ui/button/ButtonSmall";
import {
  FRND_TEXT,
  PENDING,
  IS_FRIEND,
  AWAITING,
  getProfileRoute,
  removeSpecailChar,
} from "../../utils/constant";
import {
  createFriendship,
  deleteFriendship,
  followMember,
  deleteConfirmFriendship,
} from "../../pages/api/member.api";
import Loader from "../loader";

const ProfileHeader = ({
  curntUserId,
  followCount,
  setfollowStatus,
  isCurntUser,
  setSelUserDetails,
}) => {
  const baseApi = process.env.bossApi;
  const { user } = useContext(UserContext);
  const [userProfile, setProfile] = useState(null);
  const [reposition, setReposition] = useState(false);
  const [spinnerLoad, setSpinnerLoad] = useState(false);
  const [followText, setFollowText] = useState(false);
  const [blockUserId, setBlockUserId] = useState();
  const [showOption, setShowOption] = useState(false);
  const [show, setShow] = useState(false);
  const [reqLoad, setReqLoad] = useState(false);

  useEffect(() => {
    if (curntUserId.id !== userProfile?.id) {
      setProfile(null);
    }
  }, [curntUserId]);
  const close = () => {
    setShow(false);
    setShowOption(false);
  };
  const getProfile = () => {
    let id = curntUserId.id ? curntUserId.id : user.id;
    return Axios.get(baseApi + "/members/" + id, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((res) => {
      setSelUserDetails(res.data);
      setProfile(res.data);
      setFollowText(!res.data.is_following);
      setReqLoad(false);
      setBlockUserId(res.data.id);
    });
  };
  useEffect(() => {
    if (followCount) {
      setfollowStatus(false);
      getProfile();
    }
  }, [followCount]);
  useEffect(() => {
    if (curntUserId.id) {
      getProfile();
    }
  }, [curntUserId]);
  const handleFollowReq = () => {
    if (followText) {
      const formData = {
        user_id: userProfile.id,
        action: !userProfile.is_following ? "follow" : "unfollow",
      };
      setSpinnerLoad(true);
      followMember(user, formData)
        .then((resp) => {
          setProfile(resp.data.data);
          setSpinnerLoad(false);
          setFollowText(!resp.data.data.is_following);
        })
        .catch((err) => {
          setSpinnerLoad(false);
          setFollowText(false);
        });
    } else setFollowText(true);
  };
  const getFollowText = () => {
    let text = !userProfile.is_following ? "Follow" : "Following";
    return followText && userProfile.is_following ? "Unfollow" : text;
  };
  const handleUserRequest = () => {
    if (userProfile.friendship_status === AWAITING) {
      Router.push(
        getProfileRoute(user.name, user.id, "connections", "request")
      );
      return;
    }
    setReqLoad(true);
    const formData = {
      friend_id: userProfile.id,
      initiator_id: user.id,
    };
    const deleteId = {
      friend_id: userProfile.id,
    };

    const getRes =
      userProfile.friendship_status === PENDING
        ? deleteFriendship(user, userProfile.friendship_id)
        : userProfile.friendship_status === IS_FRIEND
        ? deleteConfirmFriendship(user, deleteId)
        : createFriendship(user, formData);

    getRes
      .then((res) => {
        getProfile();
      })
      .catch((err) => {
        setReqLoad(false);
      });
  };
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
  function actionOption() {
    if (!showOption) {
      setShowOption(true);
    } else {
      setShowOption(false);
    }
  }
  const getRoute = (ele) => {
    Router.push(
      `/messages/compose/${removeSpecailChar(userProfile.name)}/${
        userProfile.id
      }`
    );
  };

  return (
    <>
      <div css={ProfileCardStyle}>
        <div
          className="header-cover-image"
          style={{
            backgroundImage: `url(${userProfile?.cover_url})`,
          }}
        >
          {isCurntUser && (
            <>
              <div className="edit-avatar-icon">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={(e) => Router.push("/profile-edit?tab=cover-update")}
                />
                <div className="tooltip-panel">
                  Change Cover Photo<em></em>
                </div>
              </div>
              <div className="reposition-avatar-icon">
                <FontAwesomeIcon
                  icon={faArrowsAlt}
                  onClick={() => setReposition(true)}
                />
                <div className="tooltip-panel">
                  Reposition Cover Photo<em></em>
                </div>
              </div>
            </>
          )}
          {reposition && isCurntUser && (
            <div>
              <button className="drag-button">
                <FontAwesomeIcon icon={faBars} />
                Drag to move cover photo
              </button>
              <button
                onClick={() => setReposition(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={() => setReposition(false)}
                className="save-changes-button"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
        <div className="item-header-cover-image">
          <div className="item-header-avatar">
            {!userProfile ? (
              <img src="/img/avatar.jpg" />
            ) : (
              <img src={userProfile.avatar_urls?.full} />
            )}
            {isCurntUser && (
              <div className="edit-avatar-icon" name="change profile">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={(e) =>
                    Router.push("/profile-edit?tab=avatar-update")
                  }
                />
                <div className="tooltip-panel">
                  Change Profile Photo<em></em>
                </div>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center justify-content-md-start item-header-content connection-detail-section">
            {!userProfile && <SkeletonProfile />}
            {userProfile && (
              <ProfileData profile={userProfile} isCurntUser={isCurntUser} />
            )}
            {!isCurntUser && userProfile && (
              <>
                <div className="generic-meta generic-group-wrapper generic-org-button generic-connect-button">
                  {FRND_TEXT[userProfile.friendship_status] ? <ButtonSmall
                      className="btn btnfollow"
                      onClick={handleUserRequest}
                  >
                    {FRND_TEXT[userProfile.friendship_status]}
                    {reqLoad ? <Loader/> : ""}
                  </ButtonSmall> : null}
                  <ButtonSmall className="btn" onClick={handleFollowReq}>
                    {getFollowText()}
                    {spinnerLoad ? <Loader /> : ""}
                  </ButtonSmall>
                  <div className="message-tag">
                    <span onClick={() => getRoute()}>Message</span>
                    <div className="dots-div">
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        onClick={() => actionOption()}
                      />
                      <div className="tooltip-panel">More Options</div>
                      {showOption && (
                        <div className="more-action-list">
                          <div className="inner-tag">
                            <div className="main-tag">
                              <div
                                className="item-link"
                                onClick={() => setShow(true)}
                              >
                                <FontAwesomeIcon icon={faUserAltSlash} />
                                Block
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {userProfile && <SocialList socialLinks={userProfile} />}
          </div>
        </div>
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
              <span className="bold-tag">Please note:</span> This action will
              also remove this member from your connections and send a report to
              the site admin. Please allow a few minutes for this process to
              complete.
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
  );
};
export default ProfileHeader;
