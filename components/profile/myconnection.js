import React, { useState, useEffect } from "react";
import axios from "axios";
import MyConnectionCard from "./myconnectioncard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import ActionBar from "../actionBar";
import { Spinner } from "reactstrap";
import InfinitScroll from "react-infinite-scroll-component";
import { LoaderContainer, LoadingBtn } from "../livefeed/livefeed.style";
import useSWRInfinite from "swr/infinite";
import { genericFetch } from "@request/dashboard";
import { css } from "@emotion/core";
const url = process.env.bossApi;

export default function MyConnection({ user, profileId }) {
  const token = user?.token;
  const limit = 20;
  const [type, setType] = useState("active");
  const [view, setView] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [currentIsLoading, setCurrentIsLoading] = useState(null);

  const { data, error, size, setSize, mutate } = useSWRInfinite(
    (index) =>
      profileId && token
        ? [
            `${url}/members?per_page=${limit}&page=${
              index + 1
            }&scope=personal&type=${type}`,
            token,
          ]
        : null,
    genericFetch
  );

  const connections = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const handleDelete = (childData) => {
    setIsLoading(true);
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
      .then(async (res) => {
        const data = connections.filter((item) => item.id !== id);
        await mutate([...data], {
          revalidate: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
        setCurrentIsLoading(null);
      });
  };

  const handleActivityChange = (e) => {
    setType(e.target.value);
  };

  const followMember = (childData) => {
    setIsLoading(true);
    const user_id = childData;
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
      .then(async (res) => {
        await mutate();
      })
      .finally(() => {
        setIsLoading(false);
        setCurrentIsLoading(null);
      });
  };

  const unFollowMember = (childData) => {
    setIsLoading(true);
    const user_id = childData;
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
      .then(async (res) => {
        await mutate();
      })
      .finally(() => {
        setIsLoading(false);
        setCurrentIsLoading(null);
      });
  };

  const loadMore = async () => {
    await setSize(size + 1);
  };

  return (
    <>
      <ActionBar
        handleActivityChange={handleActivityChange}
        setView={setView}
        type={type}
      />
      {isLoadingInitialData ? (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          Loading your connections. Please wait.
        </p>
      ) : null}

      {isEmpty ? (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          Sorry, there were no connections found.
        </p>
      ) : null}

      {!isLoadingInitialData ? (
        <div className="d-flex flex-column flex-fill w-100">
          <InfinitScroll
            dataLength={connections.length}
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
            <ul
              css={css`
                &.members-list.grid {
                  display: grid;
                  grid-template-columns: 100%;
                  @media (min-width: 768px) {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                  }
                  @media (min-width: 992px) {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                  }
                }
              `}
              className={view === "grid" ? "members-list grid" : "members-list"}
            >
              {connections &&
                connections?.map((connection) => {
                  return (
                    <MyConnectionCard
                      key={connection.id}
                      connection={connection}
                      parentCallback={handleDelete}
                      parentFollow={followMember}
                      parentUnFollow={unFollowMember}
                      isLoading={isLoading}
                      currentIsLoading={currentIsLoading}
                      setCurrentIsLoading={setCurrentIsLoading}
                    />
                  );
                })}
            </ul>
          </InfinitScroll>
        </div>
      ) : null}
    </>
  );
}
