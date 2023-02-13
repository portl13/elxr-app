import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/subscription.svg";

const Subscription = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Subscription);
const Memo = memo(ForwardRef);

Memo.displayName = "Subscription";

export default Memo;
