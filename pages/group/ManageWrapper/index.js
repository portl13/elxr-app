import React, { useEffect, useState } from "react";

import Details from "./Details";
import Photos from "./Photos";
import Setting from "./Setting";
import Delete from "./Delete";
import Member from "./Member";
import Request from "./Request";
import Meet from "./Meet";
import Forum from "./Forum";
import { GROUP_MANAGE_NAV } from "../../../utils/constant";
import { getSubNav } from "../InviteWrapper";

const ManageWrapper = (props) => {
  const [subNav, setSubNav] = useState(null);
  const groupStatus = props.status;
  useEffect(() => {
    if (props.tab === "manage") {
      setSubNav(props.innerNav ? props.innerNav : "details");
    }
  }, [props.tab]);
  const handleRedirect = (ele) => {
    setSubNav(ele);
    props.router.push(`${window.location.pathname}?tab=manage&nav=${ele}`);
  };
  if (!subNav) return false;
  return (
    <>
      {groupStatus === undefined
        ? null
        : getSubNav({
            nav: GROUP_MANAGE_NAV,
            setSubNav: handleRedirect,
            subNav,
            groupStatus,
          })}
      {subNav === "details" && <Details {...props} />}
      {subNav === "setting" && <Setting {...props} />}
      {subNav === "photos" && <Photos {...props} status={"photo"} />}
      {subNav === "cover-photo" && <Photos {...props} status={"cover"} />}
      {subNav === "member" && <Member {...props} />}
      {subNav === "request" && <Request {...props} />}
      {/*{subNav === "forum" && <Forum {...props} />}*/}
      {subNav === "meet" && <Meet {...props} />}
      {subNav === "delete" && <Delete {...props} />}
    </>
  );
};

export default ManageWrapper;
