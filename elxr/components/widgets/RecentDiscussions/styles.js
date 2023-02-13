import { css } from "@emotion/core";

import { smoothing } from "@/elxr/helpers/styles/fonts";
import { elipsisBreak } from "@/elxr/helpers/styles/text";

export const cardCSS = css`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  height: 100%;
  height: 100%;

  @media (max-width: 768px) {
    max-height: 164px;
  }
`;

export const textLinkCSS = css`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: "Quicksand";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
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

export const Discussions = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        height: 100%;
      `}
      {...props}
    />
  );
};

export const DiscussionItem = (props) => {
  return (
    <span
      css={css`
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 12px;
        width: 100%;

        ${elipsisBreak}
        ${smoothing}

        svg {
          height: auto;
          max-width: 18px;
        }
      `}
      {...props}
    />
  );
};
