import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import { Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock } from "@fortawesome/free-solid-svg-icons";
import BlockUserCard from "../components/profile/BlockUserCard";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { LoaderContainer } from "../components/livefeed/livefeed.style";
import { getProfileRoute } from "../utils/constant";
import Router from "next/router";

export default function BlockPage() {
  const { user } = useContext(UserContext);
  const [result, setResult] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => getBlockUser(), []);
  function getBlockUser() {
    axios
      .get(process.env.bossApi + `/moderation`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setResult(res.data);
        setLoadData(true);
      });
  }
  function unblockUser(childData) {
    axios(process.env.bossApi + `/moderation/${childData}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setResult(result.filter((item) => item.id !== childData));
      setLoad(false);
    });
  }
  return (
    <Layout>
      <Head>
        <title>Block User</title>
      </Head>
      <Col xs="12">
        <div className="row">
          <div className="block-container">
            <div className="left-panel"></div>
            <div className="right-panel">
              <button
                className="view-button"
                onClick={() =>
                  Router.push(getProfileRoute(user.name, user.id, "profile"))
                }
              >
                <FontAwesomeIcon icon={faUser} /> View My Profile
              </button>
              {!loadData && (
                <p css={LoaderContainer}>
                  <span>
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                  Loading blocked members. Please wait.
                </p>
              )}
              {loadData && result.length == 0 && (
                <p css={LoaderContainer}>
                  <span>
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                  No results.
                </p>
              )}
              {loadData && result.length >= 1 && (
                <div className="inner-container">
                  <div className="main-text">
                    Blocked Members
                    {result.map((blockuser) => (
                      <BlockUserCard
                        id={blockuser.item_id}
                        user={user}
                        blockId={blockuser.id}
                        handleDelete={unblockUser}
                        load={load}
                        setLoad={setLoad}
                        date={blockuser.last_updated}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Col>
    </Layout>
  );
}