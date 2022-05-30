import React, { useState, useEffect } from "react";
import axios from "axios";
import InfinitScroll from "react-infinite-scroll-component";
import { Spinner } from "reactstrap";
import GroupInviteCard from "./GroupInviteCard";
import {
  LoaderContainer,
  LoadingBtn,
} from "../../../components/livefeed/livefeed.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
function Request({ id, user }) {
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [result, setResult] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [length, setLength] = useState(0);
  async function getMembershipRequest() {
    await axios(process.env.bossApi + "/groups/membership-requests", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: {
        page: page,
        per_page: 20,
        group_id: id,
      },
    }).then((res) => {
      setResult((invitedata) => [...result, ...res.data]);
      setLoadData(true);
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

  useEffect(() => getMembershipRequest(), [page]);

  const handleDelete = (childData) => {
    const request_id = childData;
    axios
      .delete(
        process.env.bossApi + `/groups/membership-requests/${request_id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setResult(result.filter((item) => item.id !== request_id));
        setLength(length - 1);
      });
  };
  const acceptInvite = (childData) => {
    const request_id = childData;
    axios
      .patch(
        process.env.bossApi + `/groups/membership-requests/${request_id}`,
        {
          request_id: request_id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setResult(result.filter((item) => item.id !== request_id));
        setLength(length - 1);
      });
  };

  return (
    <>
      {loadData === false ? (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          Loading group membership requests. Please wait.
        </p>
      ) : null}

      {length == 0 && loadData ? (
        <p css={LoaderContainer}>
          <span>
            <FontAwesomeIcon icon={faClock} />
          </span>
          Sorry, no request were found.{" "}
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
            {result.map((d, i) => (
              <GroupInviteCard
                parentCallback={handleDelete}
                parentCall={acceptInvite}
                userId={d.user_id}
                user={user}
                date={d.date_modified}
                requestId={d.id}
              />
            ))}
          </InfinitScroll>
        </div>
      ) : null}
      <div className="pagination">
        <div className="page-count">
          {length == 1 ? (
            <p className="text-right">Viewing {length} request</p>
          ) : length > 1 ? (
            <p className="text-right">
              Viewing 1-{length} of {length} requests
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default Request;
