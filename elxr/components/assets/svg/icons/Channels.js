import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/channels.svg";

const Channels = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Channels);
const Memo = memo(ForwardRef);

Memo.displayName = "Channels";

export default Memo;
