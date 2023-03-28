import React, { useState } from "react";
import axios from "axios";
import InvitationCard from "./invitationcard";
import InfinitScroll from "react-infinite-scroll-component";
import { LoaderContainer, LoadingBtn } from "../livefeed/livefeed.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "reactstrap";
import useSWRInfinite from "swr/infinite";
import { genericFetch } from "@request/dashboard";

const url = process.env.bossApi + "/groups/invites";

function Invitation({ user, profileId }) {
  const token = user?.token;
  const limit = 20;
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(null);
  const [currentState, setCurrentState] = useState('');
  const { data, error, size, setSize, mutate } = useSWRInfinite(
    (index) =>
      token && profileId
        ? [
            `${url}?per_page=${limit}&page=${
              index + 1
            }&scope=personal&user_id=${profileId}`,
            token,
          ]
        : null,
    genericFetch
  );

  const handleDelete = (childData) => {
    const actId = childData;
    setIsLoading(true);
    axios(process.env.bossApi + `/groups/invites/${actId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async () => {
        await mutate();
      })
      .finally(() => {
        setIsLoading(false);
        setCurrent(null)
        setCurrentState('')
      });
  };

  const acceptInvite = (childData) => {
    setIsLoading(true);
    const id = childData;
    axios
      .patch(
        process.env.bossApi + `/groups/invites/${id}`,
        {
          invite_id: id,
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
        setCurrent(null)
        setCurrentState('')
      });
  };

  const invites = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

  const loadMore = async () => {
    await setSize(size + 1);
  };

  if (user?.id !== Number(profileId)) return "";

  return (
    <>
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
            {invites.map((d, i) => (
              <InvitationCard
                message={d.message.raw}
                date={d.date_modified}
                userId={d.inviter_id}
                groupId={d.group_id}
                id={d.id}
                user={user}
                parentCallback={handleDelete}
                parentCall={acceptInvite}
                isLoading={isLoading}
                current={current}
                setCurrent={setCurrent}
                currentState={currentState}
                setCurrentState={setCurrentState}
              />
            ))}
          </InfinitScroll>
        </div>
      ) : null}
    </>
  );
}
export default Invitation;
