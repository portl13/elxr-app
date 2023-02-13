import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/client.svg";

const Client = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Client);
const Memo = memo(ForwardRef);

Memo.displayName = "Client";

export default Memo;
