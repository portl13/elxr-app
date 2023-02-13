import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/orders.svg";

const Orders = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Orders);
const Memo = memo(ForwardRef);

Memo.displayName = "Orders";

export default Memo;
