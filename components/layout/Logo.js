import Link from "next/link";
import { css } from "@emotion/core";

const Logo = ({ logo, alt, className = "", link = "/", isCustom }) => {
  return (
    <Link href={link}>
      <a
        css={
          isCustom
            ? css`
                &.logo {
                  min-width: 148px;
                  max-width: 149px;
                }
                @media (min-width: 1200px) {
                  &.logo {
                    min-width: 158px;
                    max-width: 159px;
                  }
                }
              `
            : {}
        }
        className={"navbar-brand logo pointer " + className}
      >
        <img className="img-fluid" src={logo} alt={alt} />
      </a>
    </Link>
  );
};

export default Logo;
