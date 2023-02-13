import { css } from "@emotion/core";
import PropTypes from "prop-types";

import ArrowRightIcon from "@/elxr/components/assets/svg/icons/ArrowRight";
import ButtonLink from "@/elxr/components/bits/buttons/ButtonLink";

const ViewAllLink = ({ children = "View all", ...props }) => {
  return (
    <ButtonLink
      variant="label"
      iconRight={ArrowRightIcon}
      css={css`
        padding: 8px;
        font-size: 10px;
        line-height: 10px;
      `}
      {...props}
    >
      {children}
    </ButtonLink>
  );
};

ViewAllLink.propTypes = {
  children: PropTypes.string,
};

export default ViewAllLink;
