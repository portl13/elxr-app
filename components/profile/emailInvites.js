import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import Router from "next/router";
import { SubNav } from "@components/livefeed/livefeed.style";
import { MemberContainer } from "@components/livefeed/connection.style";
import { SendInvites } from "@components/profile/sendInvites";
import { SentInvites } from "@components/profile/sentInvites";

export default function EmailInvites({
  tab,
  queryParam,
  curntUserId,
  isCurntUser,
  functionRedirect,
}) {
  const [status, setStatus] = useState(null);
  const [formInvite, setFormInvite] = useState(null);

  useEffect(() => {
    if (tab === "invites") {
      setStatus(queryParam);
    }
  }, [tab]);

  useEffect(() => {
    if (status && tab === "invites")
      Router.push(
        functionRedirect(curntUserId.name, curntUserId.id, "invites", status)
      );
  }, [status]);

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
              <SendInvites
                setFormInvite={setFormInvite}
                setStatus={setStatus}
              />
            ) : null}
          </MemberContainer>
          <MemberContainer>
            {status === "sent" ? (
              <SentInvites setFormInvite={setFormInvite} formInvite={formInvite} />
            ) : null}
          </MemberContainer>
        </div>
      </div>
    </>
  );
}
