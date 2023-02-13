import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/meetings.svg";

const Meetings = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Meetings);
const Memo = memo(ForwardRef);

Memo.displayName = "Meetings";

export default Memo;
