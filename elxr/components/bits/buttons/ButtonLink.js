import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { renderChildren } from "./Button";
import {
  defaultButtonCSS,
  labelButtonCSS,
  tagButtonCSS,
  gradientButtonCSS,
} from "./styles";

const variants = {
  label: labelButtonCSS,
  tag: tagButtonCSS,
  gradient: gradientButtonCSS,
};

const ButtonLink = ({ variant, children, iconRight, ...props }) => {
  const variantCSS = React.useMemo(() => variants[variant], [variant]);

  return (
    <Link href={props.href}>
      <a css={[defaultButtonCSS, variantCSS]} {...props}>
        {renderChildren({ children, iconRight })}
      </a>
    </Link>
  );
};

ButtonLink.propTypes = {
  variant: PropTypes.oneOf(["label", "tag", "gradient"]),
};

export default ButtonLink;
