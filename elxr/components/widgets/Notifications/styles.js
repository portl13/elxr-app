import { css } from "@emotion/core";

import { smoothing } from "@/elxr/helpers/styles/fonts";
import { elipsisBreak } from "@/elxr/helpers/styles/text";

import { mediumRectangularCardCSS } from "@/elxr/components/widgets/styles";

export const cardCSS = css`
  ${mediumRectangularCardCSS}
`;

export const HeaderSection = (props) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      `}
      {...props}
    />
  );
};

export const NoResults = (props) => {
  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: Quicksand;
        font-size: 16px;
      `}
      {...props}
    />
  );
};

export const NotificationList = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        height: 100%;
        min-width: 0;
        overflow-y: auto;
        align-items: flex-start;
      `}
      {...props}
    />
  );
};

export const NotificationItem = (props) => {
  return (
    <div
      css={css`
        border-bottom: 1px dashed #c9ae9c;
        padding-bottom: 12px;
        margin-bottom: 12px;
        width: calc(100% - 12px) ;
        ${elipsisBreak}
        ${smoothing}
      `}
      {...props}
    />
  );
};

export const TimeAgo = (props) => {
  return (
    <span
      css={css`
        display: block;
        font-family: "Quicksand";
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #b3b3b3;
        ${smoothing}
      `}
      {...props}
    />
  );
};
