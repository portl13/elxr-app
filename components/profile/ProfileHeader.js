import React, { useEffect, useState } from "react";
import SocialList from "../layout/SocialList";
import { SkeletonProfile } from "./profile-skeleton";
import { ProfileCardStyle } from "./profile.style";
import ProfileInfo from "./ProfileInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faArrowsAlt, faBars } from "@fortawesome/free-solid-svg-icons";

import Router from "next/router";
import useSWR from "swr";
import { genericFetch } from "@request/creator";
import ProfileBlockMember from "@components/profile/ProfileBlockMember";
import ProfileConnect from "@components/profile/ProfileConnect";

const baseApi = process.env.bossApi;

const ProfileHeader = ({ currentUser, isCurrentUser, user, mutate,  userProfile}) => {
  const token = user?.token;

  const [reposition, setReposition] = useState(false);

  const [followText, setFollowText] = useState(false);
  const [blockUserId, setBlockUserId] = useState();
  const [showOption, setShowOption] = useState(false);
  const [show, setShow] = useState(false);
  const [reqLoad, setReqLoad] = useState(false);

  const close = () => {
    setShow(false);
    setShowOption(false);
  };

  const setProfile = async () => {
    await mutate()
  }

  useEffect(() => {
    if (userProfile) {
      setFollowText(!userProfile.is_following);
      setReqLoad(false);
      setBlockUserId(userProfile.id);
    }
  }, [userProfile]);

  return (
    <>
      <div css={ProfileCardStyle}>
        <div
          className="header-cover-image"
          style={{
            backgroundImage: `url(${userProfile?.cover_url})`,
          }}
        >
          {isCurrentUser && (
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
          {reposition && isCurrentUser && (
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
              <img src="/img/avatar.jpg" alt={"avatar"} />
            ) : (
              <img src={userProfile.avatar_urls?.full} alt={"avatar"} />
            )}
            {isCurrentUser && (
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
          <div className="d-flex flex-column justify-content-center justify-content-md-start item-header-content connection-detail-section">
            {!userProfile && <SkeletonProfile />}
            {userProfile && (
              <ProfileInfo profile={userProfile} isCurntUser={isCurrentUser} />
            )}
            {user && !isCurrentUser && userProfile && (
              <ProfileConnect
                user={user}
                userProfile={userProfile}
                showOption={showOption}
                setShowOption={setShowOption}
                reqLoad={reqLoad}
                currentUser={currentUser}
                setProfile={setProfile}
                setFollowText={setFollowText}
                setReqLoad={setReqLoad}
                followText={followText}
                setShow={setShow}
                setBlockUserId={setBlockUserId}
              />
            )}
            {userProfile && <SocialList socialLinks={userProfile} />}
          </div>
        </div>
      </div>
      {show && (
        <ProfileBlockMember
          show={show}
          close={close}
          token={token}
          blockUserId={blockUserId}
          setShow={setShow}
          setShowOption={setShowOption}
        />
      )}
    </>
  );
};
export default ProfileHeader;
