import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/arrow-down.svg";

const ArrowDown = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(ArrowDown);
const Memo = memo(ForwardRef);

Memo.displayName = "ArrowDown";

export default Memo;
