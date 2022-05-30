import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

import SendInvites from "./SendInvites";
import PendingInvites from "./PendingInvites";
import { GROUP_SUB_NAV } from "../../../utils/constant";
import { SubNav } from "../../../components/livefeed/livefeed.style";

export const getSubNav = ({ nav, setSubNav, subNav, groupStatus }) => (
  <SubNav className="w-100">
    <ul>
      {nav.map((ele) => (
        <li className={subNav === ele.value && "active"}>
          {ele.value === "request" ? (
            groupStatus === "private" ? (
              <Button onClick={() => setSubNav(ele.value)}>{ele.name}</Button>
            ) : null
          ) : (
            <Button onClick={() => setSubNav(ele.value)}>{ele.name}</Button>
          )}
        </li>
      ))}
    </ul>
  </SubNav>
);

const InvitesWrapper = (props) => {
  const [subNav, setSubNav] = useState(null);

  useEffect(() => {
    if (props.tab === "invites") {
      setSubNav("send-invites");
    }
  }, [props.tab]);

  if (!subNav) return false;
  return (
    <>
      {getSubNav({ nav: GROUP_SUB_NAV, setSubNav, subNav })}
      {subNav === "send-invites" && <SendInvites {...props} />}
      {subNav === "pending-invites" && <PendingInvites {...props} />}
    </>
  );
};

export default InvitesWrapper;
