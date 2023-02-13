import React, { forwardRef, memo } from "react";

import Icon from "/public/elxr/assets/svgs/product.svg";

const Product = (props, ref) => (
  <Icon width="24px" height="24px" ref={ref} {...props} />
);

const ForwardRef = forwardRef(Product);
const Memo = memo(ForwardRef);

Memo.displayName = "Product";

export default Memo;
