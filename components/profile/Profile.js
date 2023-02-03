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

function Profile({ profileId, children, path, user }) {
  const router = useRouter();
  const query = router.query;
  const { id = null, name = null } = query;
  const [currentUser, setCurrentUserId] = useState({ name: null, id: null });
  const isCurrentUser = Number(id) === user?.id;

  useEffect(() => {
    if (user?.id && id && Number(id) !== currentUser.id) {
      const userID = Number(id);
      setCurrentUserId({ id: userID });
    }
  }, [id, user]);

  return (
    <MainLayout title={"Profile"} sidebar={<MainSidebar />}>
      <Col xs="12" className="px-0">
        <ProfileHeader
          user={user}
          profileId={profileId}
          currentUser={currentUser}
          isCurrentUser={isCurrentUser}
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
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`${profileLink(name, profileId)}/invites`}>
                  <a
                    className={`nav-link ${path === "email" ? "selected" : ""}`}
                  >
                    Email Invites
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`${profileLink(name, profileId)}/courses`}>
                  <a
                    className={`nav-link ${
                      path === "courses" ? "selected" : ""
                    }`}
                  >
                    Courses
                  </a>
                </Link>
              </NavItem>
            </Nav>
          </div>
        </ProfileLeft>
        <ProfileRight>{children}</ProfileRight>
      </ProfileContainer>
    </MainLayout>
  );
}

export default Profile;
