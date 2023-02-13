import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/store.svg";

const Store = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Store);
const Memo = memo(ForwardRef);

Memo.displayName = "Store";

export default Memo;
