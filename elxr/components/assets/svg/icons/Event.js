import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/event.svg";

const Event = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Event);
const Memo = memo(ForwardRef);

Memo.displayName = "Client";

export default Memo;
