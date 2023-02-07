import React, { useState } from "react";
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
import useSWRInfinite from "swr/infinite";
import {genericFetch} from "@request/dashboard";

const url = process.env.bossApi

function ConnectionRequest({ user, profileId }) {
  const limit = 20
  const token = user?.token
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [loadData, setLoadData] = useState(false);
  const [length, setLength] = useState(0);

  const { data, error, size, setSize } = useSWRInfinite(
      (index) =>
          profileId && token
              ? [`${url}/friends?per_page=${limit}&page=${
                  index + 1
              }&user_id=${profileId}&friend_id=${profileId}`, token]
              : null,
      genericFetch
  );

  const invites = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
      isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

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
      len === 0 ? setLoader(false) : null;
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
        len === 0 ? setLoader(false) : null;
      });
  };

  return (
    <>
      <ul className="members-list">
        {isLoadingInitialData ? (
          <p css={LoaderContainer}>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            Loading group invitations. Please wait.
          </p>
        ) : null}
        {isEmpty ? (
          <p css={LoaderContainer}>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            Sorry, no invitations were found.{" "}
          </p>
        ) : null}
        {!isLoadingInitialData ? (
          <div className="d-flex flex-column flex-fill w-100">
            <InfinitScroll
              dataLength={invites.length}
              next={loadMore}
              hasMore={!isReachingEnd}
              loader={
                !isLoadingInitialData ? (
                  <LoadingBtn>
                    Loading ...{" "}
                    <Spinner
                      style={{ width: "1.2rem", height: "1.2rem" }}
                      color="primary"
                    />
                  </LoadingBtn>
                ) : null
              }
            >
              {invites &&
                  invites.map((d, i) => (
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
    </>
  );
}
export default ConnectionRequest;
