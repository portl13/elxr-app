import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/arrow-right.svg";

const ArrowRight = (props, ref) => (
  <Icon width="1em" height="1em" ref={ref} {...props} />
);

const ForwardRef = forwardRef(ArrowRight);
const Memo = memo(ForwardRef);

Memo.displayName = "ArrowRight";

export default Memo;
