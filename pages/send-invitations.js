import React, { useState } from "react";
import MainLayout from "@components/main/MainLayout";
import { SendInvites } from "@components/profile/sendInvites";
import { SentInvites } from "@components/profile/sentInvites";
import { Button } from "reactstrap";
import { SubNav } from "@components/livefeed/livefeed.style";
import BackButton from "@components/shared/button/BackButton";

function SendInvitations() {
  const [tab, setTab] = useState("invites");
  const [formInvite, setFormInvite] = useState(null);

  return (
    <MainLayout title="send invitations itemBody px-0 px-md-3">
      <div className="item-body-inner container container-80">
        <SubNav>
          <ul>
            <li
              onClick={() => setTab("invites")}
              className={` ${tab === "invites" ? "active pointer" : "pointer"}`}
            >
              <Button type="button">Send Invites</Button>
            </li>
            <li
              onClick={() => setTab("sent")}
              className={` ${tab === "sent" ? "active pointer" : "pointer"}`}
            >
              <Button type="button">Sent Invites</Button>
            </li>
          </ul>
        </SubNav>
        {tab === "invites" ? (
          <SendInvites setFormInvite={setFormInvite} setStatus={setTab} />
        ) : null}
        {tab === "sent" ? (
          <SentInvites setFormInvite={setFormInvite} formInvite={formInvite} />
        ) : null}
      </div>
    </MainLayout>
  );
}

export default SendInvitations;
