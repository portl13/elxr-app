import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/calendar.svg";

const Calendar = (props, ref) => (
  <Icon width="1em" height="1em" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Calendar);
const Memo = memo(ForwardRef);

Memo.displayName = "Calendar";

export default Memo;
