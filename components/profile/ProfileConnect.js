import React, { useState } from "react";
import {
  AWAITING,
  FRND_TEXT,
  getProfileRoute,
  IS_FRIEND,
  PENDING,
  removeSpecailChar,
} from "@utils/constant";
import { ButtonSmall } from "@components/ui/button/ButtonSmall";
import Loader from "@components/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import {
  createFriendship,
  deleteConfirmFriendship,
  deleteFriendship,
  followMember,
} from "@api/member.api";
import Router from "next/router";
import Axios from "axios";

const baseApi = process.env.bossApi;

function ProfileConnect({
  userProfile,
  followText,
  showOption,
  reqLoad,
  currentUser,
  setProfile,
  setFollowText,
  user,
  setReqLoad,
  setShowOption,
  setShow,
  setBlockUserId,
}) {
  const [spinnerLoad, setSpinnerLoad] = useState(false);

  const getFollowText = () => {
    let text = !userProfile.is_following ? "Follow" : "Following";
    return followText && userProfile.is_following ? "Unfollow" : text;
  };

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
      .then(async (res) => {
        await getProfile();
      })
      .catch((err) => {
        setReqLoad(false);
      });
  };

  const actionOption = () => {
    if (!showOption) {
      setShowOption(true);
    } else {
      setShowOption(false);
    }
  };

  const getRoute = () => {
    Router.push(
      `/messages/compose/${removeSpecailChar(userProfile.name)}/${
        userProfile.id
      }`
    );
  };

  const getProfile = () => {
    const id = currentUser.id ? currentUser.id : user?.id;
    return Axios.get(baseApi + "/members/" + id, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setProfile(res.data);
      setFollowText(!res.data.is_following);
      setReqLoad(false);
      setBlockUserId(res.data.id);
    });
  };

  return (
    <div className="generic-meta generic-group-wrapper generic-org-button generic-connect-button">
      {FRND_TEXT[userProfile.friendship_status] ? (
        <ButtonSmall className="btn btnfollow" onClick={handleUserRequest}>
          {FRND_TEXT[userProfile.friendship_status]}
          {reqLoad ? <Loader /> : ""}
        </ButtonSmall>
      ) : null}

      <ButtonSmall className="btn" onClick={handleFollowReq}>
        {getFollowText()}
        {spinnerLoad ? <Loader /> : ""}
      </ButtonSmall>

      <div className="message-tag">
        <span onClick={() => getRoute()}>Message</span>
        <div className="dots-div d-flex align-items-center">
          <FontAwesomeIcon icon={faEllipsisH} onClick={() => actionOption()} />
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
        </div>
      </div>
    </div>
  );
}

export default ProfileConnect;
