import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import Router from "next/router";
import { SubNav } from "../../components/livefeed/livefeed.style";
import { MemberContainer } from "../../components/livefeed/connection.style";
import ConnectionRequest from "./connectionrequest";
import MyConnection from "./myconnection";
import { getProfileRoute } from "../../utils/constant";

export default function Connection({
  user,
  setfollowStatus,
  tab,
  queryParam,
  curntUserId,
  isCurntUser,
  functionRedirect,
}) {
  const [status, setStatus] = useState(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (tab === "connections") {
      setStatus(queryParam);
    }
  }, [tab]);
  useEffect(() => {
    if (status && tab === "connections")
      Router.push(
        functionRedirect(
          curntUserId.name,
          curntUserId.id,
          "connections",
          status
        )
      );
  }, [status]);

  const getConnectionCount = (childData) => {
    setCount(childData);
  };

  return (
    <>
      <div className="itemBody profile">
        <div className="item-body-inner">
          <SubNav>
            <ul>
              <li className={status === "connection" ? "active" : ""}>
                <Button type="button" onClick={() => setStatus("connection")}>
                  My Connections{" "}
                  <span className="badge badge-pill badge-primary ml-2">
                    {count}
                  </span>
                </Button>
              </li>
              {isCurntUser && (
                <li className={status === "request" ? "active" : ""}>
                  <Button type="button" onClick={() => setStatus("request")}>
                    Requests
                  </Button>
                </li>
              )}
            </ul>
          </SubNav>

          <MemberContainer>
            {status === "connection" ? (
              <MyConnection
                user={user}
                parentCallback={getConnectionCount}
                setfollowStatus={setfollowStatus}
                curntUserId={curntUserId}
              />
            ) : null}
          </MemberContainer>
          <MemberContainer>
            {status === "request" ? <ConnectionRequest user={user} /> : null}
          </MemberContainer>
        </div>
      </div>
    </>
  );
}
