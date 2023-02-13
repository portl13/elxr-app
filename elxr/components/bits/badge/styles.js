import { css } from "@emotion/core";
import { linearGradient } from "@/elxr/helpers/styles/colors";

export const BadgeSection = (props) => {
  return (
    <div
      css={css`
        padding: 1px 15px;
        background: ${linearGradient};
        border-radius: 2px;
      `}
      {...props}
    />
  );
};

export const BadgeText = (props) => {
  return (
    <div
      css={css`
        font-family: Quicksand;
        font-size: 11px;
        line-height: 14px;
        font-weight: 600;
        color: #ffffff;
      `}
      {...props}
    />
  );
};
