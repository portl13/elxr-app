import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import Router from "next/router";
import { SubNav } from "../../components/livefeed/livefeed.style";
import { MemberContainer } from "../../components/livefeed/connection.style";
import ConnectionRequest from "./connectionrequest";
import MyConnection from "./myconnection";
import { getProfileRoute } from "../../utils/constant";
import { SendInvites } from "../../components/profile/sendInvites";
import { SentInvites } from "../../components/profile/sentInvites";

export default function EmailInvites({
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
    if (tab === "invites") {
      setStatus(queryParam);
    }
  }, [tab]);
  useEffect(() => {
    if (status && tab === "invites")
      Router.push(
        functionRedirect(
          curntUserId.name,
          curntUserId.id,
          "invites",
          status
        )
      );
  }, [status]);

  const getConnectionCount = (childData) => {
    setCount(childData);
  };

  return (
    <>
      <div className="itemBody px-0 px-md-3 profile">
        <div className="item-body-inner">
          <SubNav>
            <ul>
              <li className={status === "invites" ? "active" : ""}>
                <Button type="button" onClick={() => setStatus("invites")}>
                  Send Invites
                </Button>
              </li>
              {isCurntUser && (
                <li className={status === "sent" ? "active" : ""}>
                  <Button type="button" onClick={() => setStatus("sent")}>
                    Sent Invites
                  </Button>
                </li>
              )}
            </ul>
          </SubNav>

          <MemberContainer>
            {status === "invites" ? (
                <SendInvites curntUserId={curntUserId} />
            ) : null}
          </MemberContainer>
          <MemberContainer>
          {status === "sent" ? (
                <SentInvites curntUserId={curntUserId} />
            ) : null}
          </MemberContainer>
        </div>
      </div>
    </>
  );
}
