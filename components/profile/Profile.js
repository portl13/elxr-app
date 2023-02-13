import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import { Col, Nav, NavItem } from "reactstrap";
import ProfileHeader from "@components/profile/ProfileHeader";
import {
  ProfileContainer,
  ProfileLeft,
  ProfileRight,
} from "@components/profile/profile.style";
import Link from "next/link";
import { profileLink } from "@utils/links";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { genericFetch } from "@request/creator";
import axios from "axios";

const baseApi = process.env.bossApi;

const headRequest = (url, token) => {
  return axios.head(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

function Profile({ profileId, children, path }) {
  const { user } = useContext(UserContext);
  const [photosCount, setPhotosCount] = useState(null);
  const [friendsCount, setFriendsCount] = useState();
  const router = useRouter();
  const { query } = router;
  const { name = null } = query;
  const isCurrentUser = Number(profileId) === user?.id;

  const { data: userProfile, mutate } = useSWR(
    profileId ? baseApi + "/members/" + profileId : null,
    genericFetch,
    {
      revalidateOnFocus: false,
    }
  );

  const getCounts = (id, token) => {
    const urls = [
      `${baseApi}/media?per_page=1&user_id=${id}&scope=personal`,
      `${baseApi}/friends?per_page=1&user_id=${id}&scope=personal`,
    ];

    const requests = urls.map((url) => headRequest(url, token));

    Promise.allSettled(requests).then((rest) => {
      const [mediaCount, friendsCount] = rest;

      if (mediaCount.status === "fulfilled") {
        setPhotosCount(mediaCount.value.headers["x-wp-total"] || null);
      }
      if (friendsCount.status === "fulfilled") {
        setFriendsCount(friendsCount.value.headers["x-wp-total"] || null);
      }
    });
  };

  useEffect(() => {
    if (user && userProfile) {
      getCounts(user?.id, user?.token);
    }
  }, [user, userProfile]);

  return (
    <MainLayout title={"Profile"} sidebar={<MainSidebar />}>
      <Col xs="12" className="px-0">
        <ProfileHeader
          user={user}
          profileId={profileId}
          currentUser={user}
          isCurrentUser={isCurrentUser}
          userProfile={userProfile}
          mutate={mutate}
        />
      </Col>
      <ProfileContainer>
        <ProfileLeft>
          <div className="nav-wrapper sidenav-list p-0">
            <Nav
              className="nav-fill flex-row d-none d-lg-flex"
              id="tabs-icons-text"
              pills
              role="tablist"
            >
              <NavItem>
                <Link href={profileLink(name, profileId)}>
                  <a
                    className={`nav-link ${
                      path === "timeline" ? "selected" : ""
                    }`}
                  >
                    Timeline
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`${profileLink(name, profileId)}/profile`}>
                  <a
                    className={`nav-link ${
                      path === "profile" ? "selected" : ""
                    }`}
                  >
                    Profile
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`${profileLink(name, profileId)}/connections`}>
                  <a
                    className={`nav-link ${
                      path === "connections" ? "selected" : ""
                    }`}
                  >
                    Connections
                    {friendsCount ? (
                      <span className="badge badge-circle badge-pribadge badge-circle badge-primary mr-1">
                        {friendsCount}
                      </span>
                    ) : null}
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`${profileLink(name, profileId)}/community`}>
                  <a
                    className={`nav-link ${
                      path === "community" ? "selected" : ""
                    }`}
                  >
                    Community
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`${profileLink(name, profileId)}/photos`}>
                  <a
                    className={`nav-link ${
                      path === "photos" ? "selected" : ""
                    }`}
                  >
                    Photos
                    {photosCount ? (
                      <span className="badge badge-circle badge-pribadge badge-circle badge-primary mr-1">
                        {photosCount}
                      </span>
                    ) : null}
                  </a>
                </Link>
              </NavItem>
              {isCurrentUser ? (
                <NavItem>
                  <Link href={`${profileLink(name, profileId)}/invites`}>
                    <a
                      className={`nav-link ${
                        path === "email" ? "selected" : ""
                      }`}
                    >
                      Email Invites
                    </a>
                  </Link>
                </NavItem>
              ) : null}
            </Nav>
          </div>
        </ProfileLeft>
        <ProfileRight>{children}</ProfileRight>
      </ProfileContainer>
    </MainLayout>
  );
}

export default Profile;
