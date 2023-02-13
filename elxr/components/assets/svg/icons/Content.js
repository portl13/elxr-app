import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/content.svg";

const Content = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Content);
const Memo = memo(ForwardRef);

Memo.displayName = "Content";

export default Memo;
