import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/course.svg";

const Course = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Course);
const Memo = memo(ForwardRef);

Memo.displayName = "Course";

export default Memo;
