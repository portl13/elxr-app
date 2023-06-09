import Router from "next/router";
import React, { useState, useEffect } from "react";
import { Nav, NavItem, TabContent, TabPane, Alert } from "reactstrap";
import { parseCookies } from "@lib/parseCookies";
import TimeLine from "../profile/timeline";
import ProfileData from "@components/profile/ProfileData";
import Photos from "@components/profile/photos";
import Community from "@components/profile/community";
import Connection from "@components/profile/connection";
import {
  ProfileContainer,
  ProfileLeft,
  ProfileRight,
} from "@components/livefeed/profile.style";
import { INNER_NAV_NAME } from "@utils/constant";
import MyCourse from "../course/myCourse";
import { getMyCourses } from "@pages/api/course/course.api";

import EmailInvites from "@components/profile/emailInvites";

import axios from "axios";

const baseApi = process.env.bossApi;
const courseApi = process.env.courseUrl;

const BadgeNav = ({ tab, value, count }) => {
  return (
    <>
      {value === tab && count !== null && count > 0 && (
        <span className="badge badge-circle badge-pribadge badge-circle badge-primary">
          {count}
        </span>
      )}
    </>
  );
};

export const getTab = ({
  tab,
  setTab,
  nav,
  myMonnectionCounts,
  setPhoto,
  setCourses,
  showTab,
  isForum,
}) => {
  const subNav = {
    connections: "connection",
    timeline: "personal",
    community: "group",
    photos: "photos",
    invite: "invites",
    courses: "courses",
    profile: "",
  };

  const handlerChange = (e) => {
    let value = e.target.value;
    setTab(value, subNav[value]);
  };

  const newNav = nav.map((tab) => {
    if (tab.value === "manage" && !showTab) {
      tab.public = false;
      return tab;
    }
    if (tab.value === "discusion" && !isForum) {
      tab.public = false;
      return tab;
    }
    tab.public = true;
    return tab;
  });

  return (
    <ProfileLeft>
      <div className="nav-wrapper sidenav-list p-0">
        <Nav
          className="nav-fill flex-row d-none d-lg-flex"
          id="tabs-icons-text"
          pills
          role="tablist"
        >
          {newNav.map((ele) => {
            return (
              ele.public && (
                <NavItem key={ele.value}>
                  <button
                    className={`nav-link  ${
                      tab === ele.value ? "selected" : ""
                    }`}
                    onClick={() => setTab(ele.value, ele.route)}
                  >
                    {ele.name}
                    <BadgeNav
                      value={ele.value}
                      tab={"connections"}
                      count={myMonnectionCounts}
                    />
                    <BadgeNav
                      value={ele.value}
                      tab={"photos"}
                      count={setPhoto}
                    />
                    <BadgeNav
                      value={ele.value}
                      tab={"courses"}
                      count={setCourses}
                    />
                  </button>
                </NavItem>
              )
            );
          })}
        </Nav>
        <div className="form-group  option-menu w-100 d-flex d-lg-none mb-0 mb-md-3">
          <select
            className="form-control bg-black"
            onChange={handlerChange}
            value={tab}
            name="nav_profile"
          >
            {newNav.map(
              (nav) =>
                nav.public && <option value={nav.value}>{nav.name}</option>
            )}
          </select>
        </div>
      </div>
    </ProfileLeft>
  );
};

function InnerNav({
  setfollowStatus,
  curntUserId,
  user,
  isCurntUser,
  selectedUseDet,
  activeKey,
  activeTab,
  albumId,
  functionRedirect,
}) {
  const [tab, setTab] = useState();
  const [count, setCount] = useState(0);
  const [queryParam, setQuery] = useState();
  const [myMonnectionCounts, setMyConnections] = useState(0);
  const [setPhoto, setAllPhotos] = useState(0);
  const [setCourses, setMyCount] = useState(0);

  function getMyCourseList() {
    getMyCourses(
      user,
      {
        page: 1,
        per_page: 1,
      },
      user?.id
    )
      .then((res) => {
        const courseLength = res.data.length;
        setMyCount(courseLength);
      })
      .catch((err) => console.log(err));
  }

  const handleRedirect = (keyName, tabName) => {
    Router.push(
      functionRedirect(curntUserId.name, curntUserId.id, keyName, tabName)
    );
    setTab(keyName);
    setQuery(tabName);
  };

  function getAllConnection() {
    if (!user) return;

    axios
      .head(baseApi + "/friends", {
        params: {
          per_page: 1,
          user_id: user?.id,
        },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then(({ headers }) => {
        if (headers["x-wp-total"] !== undefined) {
          setMyConnections(headers["x-wp-total"]);
        }
      });
  }
  function getAllPhotps() {
    if (!user) return;
    axios
      .head(`${baseApi}/media`, {
        params: {
          per_page: 1,
          user_id: user?.id,
          scope: "personal",
        },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then(({ headers }) => {
        if (headers["x-wp-total"] !== undefined) {
          let total =
            headers["x-wp-total"] !== undefined ? headers["x-wp-total"] : null;
          setAllPhotos(total);
        }
      });
  }

  useEffect(() => {
    if (user) {
      getAllConnection();
      getAllPhotps();
      getMyCourseList();
    }
  }, [user]);

  const getPhotoCount = (childData) => {
    const countVal = Number(childData);
    setCount(typeof countVal === "number" ? countVal : 0);
  };

  useEffect(() => {
    setTab(activeKey);
    setQuery(activeTab);
  }, [activeKey, activeTab]);

  return (
    <ProfileContainer>
      {getTab({
        tab,
        count,
        myMonnectionCounts,
        setPhoto,
        setCourses,
        setTab: handleRedirect,
        nav: INNER_NAV_NAME,
      })}

      <ProfileRight>
        <TabContent activeTab={tab} className="itemBody profile">
          <TabPane tabId="timeline">
            {tab === "timeline" ? (
              <TimeLine
                user={user}
                curntUserId={curntUserId}
                tab={tab}
                queryParam={queryParam}
                isCurntUser={isCurntUser}
                functionRedirect={functionRedirect}
              />
            ) : null}
          </TabPane>
          <TabPane tabId="profile">
            {tab === "profile" ? (
              <ProfileData
                user={user}
                tab={tab}
                curntUserId={curntUserId}
                isCurrentUser={isCurntUser}
                functionRedirect={functionRedirect}
              />
            ) : null}
          </TabPane>
          <TabPane tabId="connections">
            {tab === "connections" ? (
              <Connection
                user={user}
                tab={tab}
                curntUserId={curntUserId}
                isCurntUser={isCurntUser}
                queryParam={queryParam}
                setfollowStatus={setfollowStatus}
                functionRedirect={functionRedirect}
              />
            ) : null}
          </TabPane>
          <TabPane tabId="community">
            {tab === "community" ? (
              <Community
                user={user}
                tab={tab}
                curntUserId={curntUserId}
                queryParam={queryParam}
                isCurntUser={isCurntUser}
                functionRedirect={functionRedirect}
              />
            ) : null}
          </TabPane>
          <TabPane tabId="photos">
            {tab === "photos" ? (
              <Photos
                user={user}
                tab={tab}
                curntUserId={curntUserId}
                queryParam={queryParam}
                parentCallback={getPhotoCount}
                photoCount={count}
                isCurntUser={isCurntUser}
                albumId={albumId}
                selectedUseDet={selectedUseDet}
                isGroup={false}
                functionRedirect={functionRedirect}
              />
            ) : null}
          </TabPane>
          <TabPane tabId="invites">
            <EmailInvites
              user={user}
              tab={tab}
              curntUserId={curntUserId}
              isCurntUser={isCurntUser}
              queryParam={queryParam}
              setfollowStatus={setfollowStatus}
              functionRedirect={functionRedirect}
            />
          </TabPane>
          <TabPane tabId="courses">
            <div className="bb-ul-tag">
              {tab === "courses" ? (
                <MyCourse
                  user={user}
                  curntUserId={curntUserId}
                  tab={tab}
                  queryParam={queryParam}
                  isCurntUser={isCurntUser}
                />
              ) : null}
            </div>
          </TabPane>
        </TabContent>
      </ProfileRight>
    </ProfileContainer>
  );
}

InnerNav.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);

  return {
    initialRememberValue: cookies.tab,
  };
};
export default InnerNav;
