import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/blogs.svg";

const Blogs = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Blogs);
const Memo = memo(ForwardRef);

Memo.displayName = "Blogs";

export default Memo;
