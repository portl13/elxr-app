import Head from "next/head";
import React, { useContext, useState, useEffect } from "react";
import { getQuery } from "@utils/routes";
import { NavItem, Nav, TabContent, Col, TabPane } from "reactstrap";
import {
  faEdit,
  faAddressBook,
  faImage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/layout/Layout";
import {
  ProfileContainer,
  ProfileLeft,
  ProfileRight,
} from "@components/profile/profile.style";
import { UserContext } from "@context/UserContext";
import Router from "next/router";
import BiographyTab from "../components/profile-edit/BiographyTab";
import MyCustomDropzone from "../components/profile-edit/MyCustomDropzone";
import Axios from "axios";
import { getProfileRoute } from "@utils/constant";
import { getAccountSetting } from "@api/account.api";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
function ProfileEditPage() {
  const { user } = useContext(UserContext);
  const [tab, setTab] = useState("");
  const [data, setData] = useState();
  const [tabData, setTabData] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const profile = process.env.bossApi + "/members/";
  function getUser() {
    Axios.get(profile + user.id, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setData(res.data);
    });
  }
  useEffect(() => {
    getUser();
    getSetting();
  }, []);
  const getSetting = () => {
    getAccountSetting(user, "profile").then((res) => {
      setTabData(res.data);
      setLoadData(true);
    });
  };
  useEffect(() => {
    const tabName = getQuery(window.location.search);
    setTab(tabName.tab);
    if (tabName) Router.push(`?tab=${tabName.tab}`);
  }, []);
  useEffect(() => {
    if (tab) Router.push(`?tab=${tab}`);
  }, [tab]);
  return (
    <MainLayout title={"Profile Edit - WeShare"} sidebar={<MainSidebar />}>
      <ProfileContainer className="bg-black bd-radius mt-0">
        <Col xs={12} className="d-flex justify-content-between mt-4">
          <h2></h2>
          <button
            onClick={() =>
              Router.push(getProfileRoute(user.name, user.id, "profile"))
            }
            className="btn btn-outline-primary"
          >
            <FontAwesomeIcon icon={faUser} /> View My Profile
          </button>
        </Col>
        <ProfileLeft>
          <div className="nav-wrapper">
            <Nav
              className="nav-fill flex-row"
              id="tabs-icons-text"
              pills
              role="tablist"
            >
              <NavItem>
                <button
                  className={`nav-link justify-content-start ${
                    tab === "profile-update" ? "selected" : ""
                  }`}
                  onClick={() => setTab("profile-update")}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  Edit
                </button>
              </NavItem>
              <NavItem>
                <button
                  className={`nav-link justify-content-start ${
                    tab === "avatar-update" ? "selected" : ""
                  }`}
                  onClick={() => setTab("avatar-update")}
                >
                  <FontAwesomeIcon icon={faAddressBook} />
                  Profile Photo
                </button>
              </NavItem>
              <NavItem>
                <button
                  className={`nav-link justify-content-start ${
                    tab === "cover-update" ? "selected" : ""
                  }`}
                  onClick={() => setTab("cover-update")}
                >
                  <FontAwesomeIcon icon={faImage} />
                  Cover Photo
                </button>
              </NavItem>
            </Nav>
          </div>
        </ProfileLeft>
        <ProfileRight>
          <div className="itemBody">
            <TabContent activeTab={tab}>
              <TabPane tabId="profile-update">
                <h2 className="h4">Edit "Biography" Information</h2>
                {data && (
                  <BiographyTab
                    userDetail={data}
                    tabData={tabData}
                    loadData={loadData}
                  />
                )}
              </TabPane>
              <TabPane tabId="avatar-update">
                <h2 className="h4">Change Profile Photo</h2>
                <MyCustomDropzone
                  userDetail={data}
                  type="avatar"
                  value="Upload Avatar"
                  action="bp_avatar_upload"
                />
              </TabPane>
              <TabPane tabId="cover-update">
                <h2 className="h4">Change Cover Photo</h2>
                <MyCustomDropzone
                  userDetail={data}
                  type="cover"
                  value="Upload Cover"
                  action="bp_cover_image_upload"
                />
              </TabPane>
            </TabContent>
          </div>
        </ProfileRight>
      </ProfileContainer>
    </MainLayout>
  );
}
export default ProfileEditPage;
