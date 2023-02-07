import React, { useState } from "react";
import axios from "axios";
import { Alert, Button, Input, Spinner } from "reactstrap";
import {
  LoaderContainer,
  LoadingBtn,
  SubNav,
} from "@components/livefeed/livefeed.style";
import { ActionBar } from "@components/livefeed/connection.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClock, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { GroupContainer } from "@components/livefeed/community.style";
import InfinitScroll from "react-infinite-scroll-component";
import CommunityCard from "@components/profile/communitycard";
import Invitation from "@components/profile/invitation";
import useSWRInfinite from "swr/infinite";
import { genericFetch } from "@request/creator";

const url = process.env.bossApi + "/groups/";

function ProfileCommunity({ user, profileId }) {
  const token = user?.token;
  const limit = 20;
  const [view, setView] = useState("grid");
  const [group_type, setGroupType] = useState("");
  const [type, setType] = useState("active");
  const [invite, setInvite] = useState("group");
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  const { data, error, size, setSize, mutate } = useSWRInfinite(
      (index) =>
          profileId
              ? `${url}?per_page=${limit}&page=${
                  index + 1
              }&scope=personal&show_hidden=true&user_id=${profileId}&type=${type}${
                  group_type !== "" ? `&group_type=${group_type}` : ""
              }`
              : null,
      genericFetch
  );

  const communities = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
      isEmpty || (data && data[data.length - 1]?.length < limit);

  function cancelGroupMembership(childData) {
    axios(process.env.bossApi + `/groups/${childData}/members/${user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then( async (res) => {
        await mutate()
        setVisible(true);
        setTimeout(() => setVisible(false), [1000]);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  const loadMore = async () => {
    await setSize(size + 1);
  };

  return (
    <>
      <Alert color="success" isOpen={visible} toggle={onDismiss}>
        You successfully left the group.
      </Alert>
      <div className="itemBody profile">
        <div className="item-body-inner">
          <SubNav className="d-flex justify-content-center justify-content-md-start ">
            <ul>
              <li className={invite === "group" ? "active" : ""}>
                <Button
                  type="button"
                  onClick={() => {
                    setInvite("group");
                  }}
                >
                  My Communities
                </Button>
              </li>
              {Number(profileId) === user?.id ? (
                <li className={invite === "invitation" ? "active" : ""}>
                  <Button
                    type="button"
                    onClick={() => {
                      setInvite("invitation");
                    }}
                  >
                    Invitations
                  </Button>
                </li>
              ) : null}
            </ul>
          </SubNav>

          {invite === "group" ? (
            <>
              <ActionBar className="d-flex justify-content-center justify-content-md-end">
                <Input
                  type="select"
                  id="filterCommunityType"
                  onChange={(e) => {
                    setGroupType(e.target.value);
                  }}
                >
                  <option value="">All Types</option>
                  <option value="network">Network</option>
                  <option value="activism">Activism</option>
                  <option value="camps">Camps</option>
                  <option value="conferences">Conferences</option>
                  <option value="festivals">Festivals</option>
                  <option value="music-artists">Musicians</option>
                  <option value="vendors">Vendors</option>
                </Input>
                <Input
                  type="select"
                  id="filterConnection"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value="active">Recently Active</option>
                  <option value="popular">Most Members</option>
                  <option value="newest">Newly Created</option>
                  <option value="alphabetical">Alphabetical</option>
                </Input>
                <div className="has-tooltip select d-none d-md-flex">
                  <div className="popover bs-popover-top">
                    <div className="arrow"></div>
                    <div className="popover-body">Grid view</div>
                  </div>
                  <FontAwesomeIcon
                    icon={faThLarge}
                    onClick={() => setView("grid")}
                  />
                </div>
                <div className="has-tooltip select d-none d-md-flex">
                  <div className="popover bs-popover-top">
                    <div className="arrow"></div>
                    <div className="popover-body">List view</div>
                  </div>
                  <FontAwesomeIcon
                    icon={faBars}
                    onClick={() => setView("list")}
                  />
                </div>
              </ActionBar>

              <GroupContainer>
                {!isLoadingInitialData === false ? (
                  <p css={LoaderContainer}>
                    <span>
                      <FontAwesomeIcon icon={faClock} />
                    </span>
                    Loading your groups. Please wait.
                  </p>
                ) : null}

                {isEmpty ? (
                  <p css={LoaderContainer}>
                    <span>
                      <FontAwesomeIcon icon={faClock} />
                    </span>
                    No Results.
                  </p>
                ) : null}

                {!isLoadingInitialData ? (
                  <div className="d-flex flex-column flex-fill w-100">
                    <InfinitScroll
                      dataLength={communities.length}
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
                        className={
                          view === "grid" ? "groups-list grid" : "groups-list"
                        }
                      >
                        {communities &&
                          communities.map((group) => {
                            return (
                              <CommunityCard
                                key={group.id}
                                group={group}
                                user={user}
                                parentDelete={cancelGroupMembership}
                              />
                            );
                          })}
                      </ul>
                    </InfinitScroll>
                  </div>
                ) : null}
              </GroupContainer>
            </>
          ) : null}

          {invite === "invitation" ? (
            <>
              <h1 className="group-invite-panel">Group Invites</h1>
              <Invitation profileId={profileId} user={user} />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ProfileCommunity;
