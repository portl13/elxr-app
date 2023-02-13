import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/client-tips.svg";

const ClientTips = (props, ref) => (
  <Icon width="42px" height="42px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(ClientTips);
const Memo = memo(ForwardRef);

Memo.displayName = "ClientTips";

export default Memo;
