import React from "react";

import { isNil } from "@/elxr/lib/utilities";

import { h1CSS, h2CSS, pCSS, headerCSS } from "./styles";

const Header = ({
  children,
  titleCSS,
  sub,
  subCSS,
  accentInfo,
  accentInfoCSS,
  ...props
}) => {
  return (
    <header css={headerCSS} {...props}>
      {!isNil(sub) && <h2 css={[h2CSS, subCSS]}>{sub}</h2>}

      <h1 css={[h1CSS, titleCSS]}>{children}</h1>

      {!isNil(accentInfo) && <p css={[pCSS, accentInfoCSS]}>{accentInfo}</p>}
    </header>
  );
};

export default Header;
