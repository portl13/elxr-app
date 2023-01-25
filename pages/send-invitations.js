import React, { useState } from "react";
import MainLayout from "@components/main/MainLayout";

function SendInvitations() {
  const [tab, setTab] = useState("invites");
  return (
    <MainLayout title="send invitations">
      <div className="container container-80">
        <ul className="nav nav-tabs mb-3">
          <li onClick={() => setTab("invites")} className="nav-item pointer">
            <span className={`nav-link ${tab === "invites" ? "active" : ""}`}>
              Send Invites
            </span>
          </li>
          <li onClick={() => setTab("sent")} className="nav-item pointer">
            <span className={`nav-link ${tab === "sent" ? "active" : ""}`}>
              Sent Invites
            </span>
          </li>
        </ul>
          {tab === 'invites' ? (<div>invites</div>) : null}
          {tab === 'sent' ? (<div>sent</div>) : null}
      </div>
    </MainLayout>
  );
}

export default SendInvitations;
