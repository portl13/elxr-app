import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import Router from "next/router";
import Axios from "axios";
import {
  ProfileAvatarWrapper,
  ProfileButtonAction,
  ProfileDataCounter,
} from "./profile.style";

const ProfileCard = ({ user_id = true, token, self }) => {
  const [userProfile, setProfile] = useState(null);

  useEffect(() => {
    if (!user_id) return;
    if (!token) return;
    let unmounted = false;
    const source = Axios.CancelToken.source();

    const getProfile = async () => {
      try {
        if (!unmounted) {
          let url;

          if (self) {
            url = `${process.env.bossApi}/members/me`;
          } else {
            url = `${process.env.bossApi}/members/${user_id}`;
          }

          const { data } = await Axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cancelToken: source.token,
          });

          if (data.success) {
            return;
          }

          setProfile(data);
        }
      } catch (error) {
        if (!unmounted) {
          if (Axios.isCancel(error)) {
          } else {
          }
        }
      }
    };

    getProfile();

    return () => {
      unmounted = true;
      source.cancel("clean request");
    };
  }, [user_id, token]);

  return (
    <>
      <Row>
        <Col
          className="d-flex justify-content-center align-items-center"
          xs="4"
        >
          <ProfileAvatarWrapper className="text-center text-sm-left">
            <img
              className="avatar profile-avatar"
              src={
                userProfile
                  ? userProfile.avatar_urls.full ||
                    userProfile.avatar_urls.thumb
                  : "/img/avatar.jpg"
              }
              alt="username"
            />
          </ProfileAvatarWrapper>
        </Col>
        <Col xs="8">
          <div className="d-flex justify-content-center mb-sm-3">
            <ProfileDataCounter>
              <span className="count">
                {userProfile ? userProfile.followers : 0}
              </span>
              <span className="tilte">Followers</span>
            </ProfileDataCounter>
            <ProfileDataCounter>
              <span className="count">
                {userProfile ? userProfile.following : 0}
              </span>
              <span className="tilte">Following</span>
            </ProfileDataCounter>
          </div>

          <div className="my-2" xs="12" sm="8">
            {self ? (
              <div className="d-flex justify-content-center mt-2 mt-sm-0">
                <ProfileButtonAction
                  onClick={() =>
                    Router.push("/profile-edit?tab=profile-update")
                  }
                  className="btn btn-sm-block"
                >
                  Edit
                </ProfileButtonAction>

                {/* <ProfileButtonAction className="btn btn-sm-block">
                                Settings
                            </ProfileButtonAction> */}
              </div>
            ) : (
              <div className="d-flex justify-content-center mt-2 mt-sm-0">
                <ProfileButtonAction className="btn btn-sm-block">
                  Connect
                </ProfileButtonAction>

                <ProfileButtonAction className="btn btn-sm-block">
                  Follow
                </ProfileButtonAction>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="my-2" xs="12">
          <h2 className="profile-title text-capitalize mt-2 mb-sm-0">
            {userProfile ? userProfile?.name : ""}
          </h2>
          <div className="profile-bio"></div>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default ProfileCard;
