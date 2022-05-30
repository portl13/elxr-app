import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";

import { NavItem, Nav, TabContent, Col, TabPane } from "reactstrap";

import Router, { useRouter } from "next/router";
import { UserContext } from "../../../context/UserContext";
import Layout from "../../../components/layout/Layout";
import { ButtonSmall } from "../../../components/ui/button/ButtonSmall";
import RightSidebar from "../../../components/layout/RightSidebar";
import TabBasicCommunity from "../../../components/community/TabBasicCommunity";
import TabSettings from "../../../components/community/TabSettings";
import CommunityDropZone from "../../../components/community/CommunityDropZone";
import { containerBlockUi } from "../../../components/ui/blockui/BlockUi";

export default function CommunityEditPage() {
  const { user } = useContext(UserContext);

  const { query } = useRouter();

  const { id } = query;

  const [tab, setTab] = useState(1);
  const [group, setGroup] = useState(0);
  const [blocking, setBlocking] = useState(true);
  const primaryButton = "btn-primary";

  useEffect(() => {
    if (!id) return;
    setGroup(id[0]);
    setBlocking(false);
  }, [id]);

  return (
    <Layout>
      <Head>
        <title>WeShare</title>
      </Head>
      <Col xs="12" md="11" lg="7">
        <Col className="d-flex justify-content-between">
          <h2>Edit Community</h2>
          <ButtonSmall onClick={() => Router.push("/profile")} className="btn">
            View Community
          </ButtonSmall>
        </Col>
        <div className="mt-4">
          <div className="nav-wrapper">
            <Nav
              className="nav-fill flex-row"
              id="tabs-icons-text"
              pills
              role="tablist"
            >
              <NavItem>
                <button
                  className={`btn btn-block mb-sm-3 mb-md-0  ${
                    tab === 1 ? primaryButton : ""
                  }`}
                  onClick={() => setTab(1)}
                >
                  Details
                </button>
              </NavItem>
              <NavItem>
                <button
                  className={`btn btn-block mb-sm-3 mb-md-0  ${
                    tab === 2 ? primaryButton : ""
                  }`}
                  onClick={() => setTab(2)}
                >
                  Settings
                </button>
              </NavItem>
              <NavItem>
                <button
                  className={`btn btn-block mb-sm-3 mb-md-0  ${
                    tab === 3 ? primaryButton : ""
                  }`}
                  onClick={() => setTab(3)}
                >
                  Avatar / Cover
                </button>
              </NavItem>
            </Nav>
          </div>

          <TabContent activeTab={"tabs" + tab}>
            <TabPane tabId="tabs1">
              <h2 className="h4">Details</h2>
              <TabBasicCommunity id={id} />
            </TabPane>
            <TabPane tabId="tabs2">
              <h2 className="h4">Settings</h2>
              <TabSettings />
            </TabPane>
            <TabPane tabId="tabs3">
              <h2 className="h4">Avatar</h2>
              <div css={containerBlockUi}>
                <CommunityDropZone
                  user={user}
                  type="avatar"
                  group={group}
                  value="Update Avatar Community"
                  action="bp_avatar_upload"
                />
                <h2 className="h4">Cover</h2>
                <CommunityDropZone
                  user={user}
                  type="cover"
                  group={group}
                  value="Update Cover Community"
                  action="bp_cover_image_upload"
                />
              </div>
            </TabPane>
          </TabContent>
        </div>
      </Col>
      <RightSidebar lg="3"></RightSidebar>
    </Layout>
  );
}
