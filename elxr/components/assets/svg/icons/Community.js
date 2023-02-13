import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/community.svg";

const Community = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Community);
const Memo = memo(ForwardRef);

Memo.displayName = "Community";

export default Memo;
