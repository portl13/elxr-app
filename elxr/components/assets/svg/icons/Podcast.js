import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/podcast.svg";

const Podcast = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Podcast);
const Memo = memo(ForwardRef);

Memo.displayName = "Podcast";

export default Memo;
