import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/plus-button.svg";

const PlusButton = (props, ref) => (
  <Icon width="40px" height="40px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(PlusButton);
const Memo = memo(ForwardRef);

Memo.displayName = "PlusButton";

export default Memo;
