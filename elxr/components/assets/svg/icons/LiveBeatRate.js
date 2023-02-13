import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/live-beat-rate.svg";

const LiveBeatRate = (props, ref) => (
  <Icon width="2.5em" height="2.5em" ref={ref} {...props} />
);

const ForwardRef = forwardRef(LiveBeatRate);
const Memo = memo(ForwardRef);

Memo.displayName = "LiveBeatRate";

export default Memo;
