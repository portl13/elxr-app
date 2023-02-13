import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/video.svg";

const Video = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Video);
const Memo = memo(ForwardRef);

Memo.displayName = "Video";

export default Memo;
