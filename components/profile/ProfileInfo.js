import React from "react";
import { MentionStyle, followerWrap } from "./profile.style";
import moment from "moment";
import {formatCustomDistance} from "@utils/dateFromat";

const ProfileInfo = ({ profile }) => {

  const {
    followers = 0,
    following = 0,
    mention_name = "",
    registered_date = Date.now(),
    profile_name
  } = profile;

  return (
    <div className={"profile-info"}>
      <h2 className="group-title d-flex justify-content-center justify-content-lg-start align-items-center">
        {profile_name}
      </h2>
      <p className="text-center text-lg-left" css={MentionStyle}>
        @{mention_name} • Joined {moment(registered_date).format("MMMM YYYY")} •
        Active {formatCustomDistance(profile?.last_activity)}
      </p>
      <p className="d-flex justify-content-center flex-md-column">
        <span css={followerWrap}>
          <b>{followers}&nbsp;</b> followers
        </span>
        <span css={followerWrap}>
          <b>{following}&nbsp;</b> following
        </span>
      </p>
    </div>
  );
};

export default ProfileInfo;
