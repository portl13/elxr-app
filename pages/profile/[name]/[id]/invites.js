import React, { useContext, useState } from "react";
import { UserContext } from "@context/UserContext";
import Profile from "@components/profile/Profile";
import { SubNav } from "@components/livefeed/livefeed.style";
import { Button } from "reactstrap";
import { SendInvites } from "@components/profile/sendInvites";
import { SentInvites } from "@components/profile/sentInvites";

function Invites({ profileId }) {
  const { user } = useContext(UserContext);
  const [tab, setTab] = useState("invites");
  const [formInvite, setFormInvite] = useState(null);
  return (
    <Profile path={"email"} user={user} profileId={profileId}>
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
    </Profile>
  );
}

export default Invites;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { profileId: id },
  };
}
