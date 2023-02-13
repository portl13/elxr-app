import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/members.svg";

const Members = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Members);
const Memo = memo(ForwardRef);

Memo.displayName = "Members";

export default Memo;
