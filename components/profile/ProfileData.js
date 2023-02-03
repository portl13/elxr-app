import React, { useState, useEffect } from "react";
import Router from "next/router";
import Biography from "@components/profile/biography";
import Axios from "axios";
import Loader from "../loader";
import useSWR from "swr";
import {genericFetch} from "@request/creator";
const profileUrl = process.env.bossApi + "/members";

function ProfileData({
  user,
  profileId,
  isCurrentUser
}) {

  const {data, error} = useSWR( user ? `${profileUrl}/${profileId}` : null ,genericFetch)

  if(!data && !error)
    return (
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    );

  return (
    <>
      <div className="itemBody">
        <div className="item-body-inner">
          <div className="button-right-container">
            {isCurrentUser && (
              <button
                type="button"
                onClick={(e) => Router.push("/profile-edit?tab=profile-update")}
                className="btn btn-outline-primary"
              >
                Edit Profile
              </button>
            )}
          </div>
          {data && <Biography user={data} />}
        </div>
      </div>
    </>
  );
}

export default ProfileData;
