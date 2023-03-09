import { css } from "@emotion/core";

import BaseHeader from "@/elxr/components/bits/text/Header";

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

export const List = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 20px;
        height: 100%;
        min-width: 0;
        overflow-y: auto;
        overflow-x: hidden;
      `}
      {...props}
    />
  );
};

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

export const UpcomingEvent = (props) => {
  return (
    <div
      css={css`
        width: 100%;
        display: grid;
        grid-template-columns: 60px 1fr;
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
        & * {
          font-size: 14px;
          font-weight: 500;
          line-height: 22px;
          color: #8b8b8b;
        }
        & p {
          margin-bottom: 0;
        }
        img {
          display: none;
        }
        ${elipsisBreak}
      `}
      {...props}
    />
  );
};

export const Title = (props) => {
  return (
    <div
      css={css`
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: #424242;

        ${elipsisBreak}
      `}
      {...props}
    />
  );
};

export const Duration = (props) => {
  return (
    <div
      css={css`
        font-family: "Oswald";
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 18px;
        color: #9d9d9d;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 6px;
      `}
      {...props}
    />
  );
};
