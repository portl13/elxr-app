import React from "react";
import Link from "next/link";

import { textLinkCSS } from "./styles";

const TextLink = (props) => (
  <Link href={props.href}>
    <a css={textLinkCSS} {...props} />
  </Link>
);

export default TextLink;
