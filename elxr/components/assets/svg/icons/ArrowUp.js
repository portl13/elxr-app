import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/arrow-up.svg";

const ArrowUp = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(ArrowUp);
const Memo = memo(ForwardRef);

Memo.displayName = "ArrowUp";

export default Memo;
