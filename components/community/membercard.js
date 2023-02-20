import React, { useState } from "react";
import { Button } from "reactstrap";

export default function MemberCard({ member, parentMember }) {
  const [inviteStatus, setInviteStatus] = useState(true);
  function status() {
    if (inviteStatus === true) {
      parentMember(member.id, member.profile_name, true);
      setInviteStatus(false);
    } else {
      parentMember(member.id, member.profile_name, false);
      setInviteStatus(true);
    }
  }

  return (
    <>
      <div className="members-list-panel">
        <ul>
          <li>
            <div className="item-avatar">
              <img src={member?.avatar_urls.thumb} />
            </div>
            <div className="list-title">
              <span className="text-font">{member?.profile_name}</span>
              <Button className="border-0" onClick={status}>
                {inviteStatus ? "invite+" : "Cancel invite"}
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
