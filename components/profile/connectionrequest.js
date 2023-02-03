import React, { useState, useEffect } from "react";
import ConnectionRequestCard from "./connectionrequestcard";
import axios from "axios";
import InfinitScroll from "react-infinite-scroll-component";
import {
  LoaderContainer,
  LoadingBtn,
} from "../livefeed/livefeed.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "reactstrap";
function ConnectionRequest({ user }) {
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [loadData, setLoadData] = useState(false);
  const [length, setLength] = useState(0);
  async function getFriendsInvite() {
    await axios(process.env.bossApi + "/friends", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: {
        page: page,
        per_page: 20,
        user_id: user.id,
        friend_id: user.id,
      },
    }).then((res) => {
      setResult((invitedata) => [...result, ...res.data]);
      setLoadData(true);
      var total =
        res.headers["x-wp-total"] != undefined
          ? res.headers["x-wp-total"]
          : null;
      page === 1 ? setCount(total) : setCount(count);
      for (var i = 1; i <= page; i++) {
        setLength(length + parseInt(res.data.length));
      }
      if (res.data.length === 0) {
        setLoader(false);
      } else {
        setLoader(true);
      }
    });
  }
  useEffect(() => getFriendsInvite(), [page]);
  const handleDelete = (childData) => {
    const actId = childData;
    axios(process.env.bossApi + `/friends/${actId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      setResult(result.filter((item) => item.id !== actId));
      setLength(length - 1);
      setCount(count - 1);
      var len = count - 1;
      len == 0 ? setLoader(false) : null;
    });
  };
  const acceptInvite = (childData) => {
    const id = childData;
    axios
      .patch(
        process.env.bossApi + `/friends/${id}`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setResult(result.filter((item) => item.id !== id));
        setLength(length - 1);
        setCount(count - 1);
        var len = count - 1;
        len == 0 ? setLoader(false) : null;
      });
  };
  return (
    <>
      <ul className="members-list">
        {loadData === false ? (
          <p css={LoaderContainer}>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            Loading group invitations. Please wait.
          </p>
        ) : null}
        {length == 0 && loadData ? (
          <p css={LoaderContainer}>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            Sorry, no invitations were found.{" "}
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
              {result &&
                result.map((d, i) => (
                  <ConnectionRequestCard
                    id={d.id}
                    user={user}
                    initiatorId={d.initiator_id}
                    parentCallback={handleDelete}
                    parentCall={acceptInvite}
                  />
                ))}
            </InfinitScroll>
          </div>
        ) : null}
      </ul>
      <div className="pagination">
        <div className="page-count">
          {length == 0 ? null : length == 1 ? (
            <p className="text-right">Viewing {length} member</p>
          ) : length > 1 ? (
            <p className="text-right">
              Viewing 1-{length} of {count} members
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default ConnectionRequest;
