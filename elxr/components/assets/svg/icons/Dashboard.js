import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/dashboard.svg";

const Dashboard = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Dashboard);
const Memo = memo(ForwardRef);

Memo.displayName = "Dashboard";

export default Memo;
