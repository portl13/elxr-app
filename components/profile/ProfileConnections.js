import React, { useState } from "react";
import { SubNav } from "@components/livefeed/livefeed.style";
import { Button } from "reactstrap";
import { MemberContainer } from "@components/livefeed/connection.style";
import MyConnection from "@components/profile/myconnection";
import ConnectionRequest from "@components/profile/connectionrequest";

function ProfileConnections({ user, isCurrentUser, profileId }) {
  const [status, setStatus] = useState('connection');
  const [count, setCount] = useState(0);

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
                  {/*<span className="badge badge-pill badge-primary ml-2">*/}
                  {/*  {count}*/}
                  {/*</span>*/}
                </Button>
              </li>
              {isCurrentUser && (
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
                getConnectionCount={getConnectionCount}
                profileId={profileId}
              />
            ) : null}
          </MemberContainer>
          <MemberContainer>
            {Number(profileId) === user?.id && status === "request" ? (
              <ConnectionRequest profileId={profileId} user={user} />
            ) : null}
          </MemberContainer>
        </div>
      </div>
    </>
  );
}

export default ProfileConnections;
