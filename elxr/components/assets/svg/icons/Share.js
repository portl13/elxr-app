import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/share.svg";

const Share = (props, ref) => (
  <Icon width="18px" height="16px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Share);
const Memo = memo(ForwardRef);

Memo.displayName = "Share";

export default Memo;
