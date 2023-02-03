import React, { useState, useEffect } from "react";
import axios from "axios";
import MyConnectionCard from "./myconnectioncard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import ActionBar from "../../components/actionBar";
import { Spinner } from "reactstrap";
import InfinitScroll from "react-infinite-scroll-component";
import {
  LoaderContainer,
  LoadingBtn,
} from "../../components/livefeed/livefeed.style";

export default function MyConnection({
  user,
  parentCallback,
  setfollowStatus,
  curntUserId,
}) {
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("active");
  const [view, setView] = useState("grid");
  const [loadData, setLoadData] = useState(false);
  const [connectionData, setConnectionData] = useState(true);
  const [length, setLength] = useState(0);
  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(0);
  const url = process.env.bossApi;
  useEffect(() => getConnections(), [type, page, curntUserId]);

  function getConnections() {
    axios(process.env.bossApi + "/members", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: {
        page: page,
        per_page: 20,
        scope: "personal",
        user_id: curntUserId.id,
        type: type,
      },
    }).then((res) => {
      setResult((groupData) => [...result, ...res.data]);
      let total =
        res.headers["x-wp-total"] !== undefined
          ? res.headers["x-wp-total"]
          : null;
      setCount(total);
      parentCallback(total);
      for (let i = 1; i <= page; i++) {
        setLength(length + parseInt(res.data.length));
      }
      setLoadData(true);
      setStatus(true);
      if (res.data.length === 0) {
        setLoader(false);
      } else {
        setLoader(true);
      }
    });
  }
  const handleDelete = (childData) => {
    const id = childData;
    axios
      .delete(process.env.bossApi + "/friends", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        data: {
          friend_id: id,
        },
      })
      .then((res) => {
        setResult(result.filter((item) => item.id !== id));
        setLength(length - 1);
        setCount(count - 1);
      });
  };
  const handleActivityChange = (e) => {
    setType(e.target.value);
    setPage(1);
    setResult([]);
    setLength(0);
    setLoadData(false);
    setCount(0);
  };
  const followMember = (childData, connectionStatus) => {
    const user_id = childData;
    setConnectionData(connectionStatus);
    axios
      .post(
        url + `/members/action/${user_id}`,
        {
          user_id: user_id,
          action: "follow",
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        let index = result.findIndex((item) => item.id === user_id);
        result[index] = res.data.data;
        setfollowStatus(true);
        setResult(result);
        setConnectionData(true);
      });
  };
  const unFollowMember = (childData, connectionStatus) => {
    const user_id = childData;
    setConnectionData(connectionStatus);
    axios
      .post(
        url + `/members/action/${user_id}`,
        {
          user_id: user_id,
          action: "unfollow",
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        let index = result.findIndex((item) => item.id === user_id);
        setfollowStatus(true);
        result[index] = res.data.data;
        setResult(result);
        setConnectionData(true);
      });
  };

  return (
    <>
      <ActionBar
        handleActivityChange={handleActivityChange}
        setView={setView}
      />
      {loadData === false ? (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          Loading your connections. Please wait.
        </p>
      ) : null}
      {length === 0 && status && loadData ? (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          Sorry, there were no connections found.
        </p>
      ) : null}
      {loadData === true ? (
        <div className="d-flex flex-column flex-fill w-100">
          <InfinitScroll
            dataLength={result.length}
            next={() => setPage(page + 1)}
            hasMore={true}
            loader={
              loader === true ? (
                <LoadingBtn>
                  Loading ...{" "}
                  <Spinner
                    style={{ width: "1.2rem", height: "1.2rem" }}
                    color="primary"
                  />
                </LoadingBtn>
              ) : (
                <p style={{ textAlign: "center" }}>No More Data</p>
              )
            }
          >
            <ul
              className={view === "grid" ? "members-list grid" : "members-list"}
            >
              {result &&
                result.map((connection) => {
                  return (
                    <MyConnectionCard
                      key={connection.id}
                      connection={connection}
                      parentCallback={handleDelete}
                      parentFollow={followMember}
                      parentUnFollow={unFollowMember}
                      setConnectionData={setConnectionData}
                    />
                  );
                })}
            </ul>
          </InfinitScroll>
        </div>
      ) : null}

      <div className="pagination">
        <div className="page-count">
          {length === 1 ? (
            <p className="text-right">Viewing {length} group</p>
          ) : length > 1 ? (
            <p className="text-right">
              Viewing 1-{length} of {count} groups
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
