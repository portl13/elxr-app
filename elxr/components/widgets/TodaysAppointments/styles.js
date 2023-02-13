import { css } from "@emotion/core";

import BaseHeader from "@/elxr/components/bits/text/Header";

import { smoothing } from "@/elxr/helpers/styles/fonts";
import { elipsisBreak } from "@/elxr/helpers/styles/text";

import { mediumRectangularCardCSS } from "@/elxr/components/widgets/styles";

export const Header = (props) => (
  <BaseHeader
    titleCSS={css`
      font-size: 20px;
      line-height: 30px;
    `}
    subCSS={css`
      font-size: 40px;
      line-height: 40px;
    `}
    {...props}
  />
);

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

export const List = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        height: 100%;
        min-width: 0;
        overflow-y: auto;
      `}
      {...props}
    />
  );
};

export const Appointment = (props) => {
  return (
    <div
      css={css`
        width: 100%;
        font-size: 16px;
        line-height: 20px;
        color: #424242;
        display: flex;
        flex-direction: column;
        gap: 5px;

        ${smoothing}
      `}
      {...props}
    />
  );
};

export const Description = (props) => {
  return (
    <div
      css={css`
        ${elipsisBreak}
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

export const Duration = (props) => {
  return (
    <div
      css={css`
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        color: #7f7f7f;
      `}
      {...props}
    />
  );
};
