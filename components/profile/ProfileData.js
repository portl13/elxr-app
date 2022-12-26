import React from "react";
import { MentionStyle, followerWrap } from "./profile.style";
import moment from "moment";
import {formatCustomDistance} from "@utils/dateFromat";

const ProfileData = ({ profile }) => {
  const {
    followers = 0,
    following = 0,
    mention_name = "",
    name = "",
    registered_date = Date.now(),
    xprofile: { groups },
  } = profile;

  const { fields = null } = groups[1];

  let firstName = name;
  let lastName = "";

  if (fields) {
    firstName = 1 in fields ? fields[1]?.value?.raw || name : "";
    lastName = 31 in fields ? fields[31]?.value?.raw || "" : "";
  }

  return (
    <div>
      <h2 className="group-title d-flex justify-content-center justify-content-lg-start align-items-center">
        {`${firstName} ${lastName}`}
      </h2>

      <p className="text-center text-lg-left" css={MentionStyle}>
        @{mention_name} • Joined {moment(registered_date).format("MMMM YYYY")} •
        Active {formatCustomDistance(profile?.last_activity)}
      </p>

      <p className="flex align-items-center">
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

export default ProfileData;
