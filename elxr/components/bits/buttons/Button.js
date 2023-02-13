import React from "react";
import PropTypes from "prop-types";

import {
  defaultButtonCSS,
  iconRightCSS,
  tagButtonCSS,
  roundedButtonCSS,
} from "./styles";

const variants = {
  default: defaultButtonCSS,
  tag: tagButtonCSS,
  rounded: roundedButtonCSS,
};

export const renderChildren = ({ children, iconRight: IconRight }) => {
  return (
    <>
      {children}
      {IconRight && <IconRight css={iconRightCSS} />}
    </>
  );
};

const Button = ({ variant = "default", children, iconRight, ...props }) => {
  const variantCSS = React.useMemo(() => variants[variant], [variant]);
  return (
    <button css={[defaultButtonCSS, variantCSS]} {...props}>
      {renderChildren({ children, iconRight })}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["default", "tag", "rounded"]),
};

export default Button;
