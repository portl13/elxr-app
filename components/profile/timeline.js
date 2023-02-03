import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, Spinner } from "reactstrap";
import LiveFeedCard from "../livefeed/LiveFeedCard";
import { SubNav } from "../livefeed/livefeed.style";
import { v4 as uuidv5 } from "uuid";
import InfinitScroll from "react-infinite-scroll-component";
import {
  LoaderContainer,
  LoadingBtn,
} from "@components/livefeed/livefeed.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { PROFILE_TAB_NAME } from "@utils/constant";
import useSWRInfinite from "swr/infinite";
import { genericFetch } from "@request/creator";
import ProfilePostLiveFeed from "@components/profile/ProfilePostLiveFeed";

function TimeLine({ user, profileId }) {
  const PAGE_SIZE = 20;

  const [scope, setScope] = useState("personal");

  const [apiCall, setApiCall] = useState(true);


  const { data, error, size, setSize, mutate } = useSWRInfinite(
    (index) =>
      profileId
        ? `${process.env.bossApi}/activity?per_page=${PAGE_SIZE}&page=${
            index + 1
          }&scope=${PROFILE_TAB_NAME[scope]}&user_id=${profileId}`
        : null,
    genericFetch
  );

  const activities = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const setActivityList = async (activities) => {
    await mutate(activities, {
      revalidate: false,
    });
  };

  const handleTabChange = async (scopeName) => {
    setScope(scopeName);
    await setSize(1);
  };

  const loadMore = async () => {
    await setSize(size + 1);
  };

  const handleDelete = async (childData) => {
    const actId = childData;
    axios(process.env.bossApi + `/activity/${actId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const data = activities.filter((item) => item.id !== actId);
    await mutate(data, {
      revalidate: false,
    });
  };

  return (
    <>
      <SubNav className="w-100">
        <ul className="d-none d-md-flex">
          <li className={scope === "personal" ? "active" : ""}>
            <Button onClick={() => handleTabChange("personal")}>
              Personal
            </Button>
          </li>
          <li className={scope === "likes" ? "active" : ""}>
            <Button onClick={() => handleTabChange("likes")}>Likes</Button>
          </li>
          <li className={scope === "connections" ? "active" : ""}>
            <Button onClick={() => handleTabChange("connections")}>
              Connections
            </Button>
          </li>
          <li className={scope === "groups" ? "active" : ""}>
            <Button onClick={() => handleTabChange("groups")}>
              Communities
            </Button>
          </li>
          <li className={scope === "mentions" ? "active" : ""}>
            <Button onClick={() => handleTabChange("mentions")}>
              Mentions
            </Button>
          </li>
          <li className={scope === "following" ? "active" : ""}>
            <Button onClick={() => handleTabChange("following")}>
              Following
            </Button>
          </li>
        </ul>
      </SubNav>

      {scope === "personal" && user?.id === Number(profileId) ? (
        <ProfilePostLiveFeed
          user={user}
          placeholderText={"Write here or use @ to mention someone."}
          setApiCall={setApiCall}
          mutate={mutate}
          activities={activities}
        />
      ) : null}

      {isLoadingInitialData ? (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          Loading your updates. Please wait.
        </p>
      ) : null}

      {!isLoadingInitialData ? (
        <div className="d-flex flex-column flex-fill w-100">
          <InfinitScroll
            dataLength={activities.length}
            next={() => loadMore()}
            hasMore={!isReachingEnd}
            loader={
              <LoadingBtn>
                Loading ...{" "}
                <Spinner
                  style={{ width: "1.2rem", height: "1.2rem" }}
                  color="primary"
                />
              </LoadingBtn>
            }
          >
            {activities.length
              ? activities.map((act) => (
                  <React.Fragment key={`${act.id}-${uuidv5()}`}>
                    <LiveFeedCard
                      activity={act}
                      parentCallback={handleDelete}
                      activityList={activities}
                      setActivityList={setActivityList}
                      apiCall={apiCall}
                    />
                  </React.Fragment>
                ))
              : ""}
            {isReachingEnd && isLoadingInitialData ? (
              <p style={{ textAlign: "center" }}>No More Data</p>
            ) : null}
          </InfinitScroll>
        </div>
      ) : null}
    </>
  );
}
export default TimeLine;
