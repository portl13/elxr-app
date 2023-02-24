import { css } from "@emotion/core";
import { smoothing } from "@/elxr/helpers/styles/fonts";

export const cardCSS = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: flex-start;
  height: 80px;
  position: relative;

  @media (min-width: 768px) {
    justify-content: flex-start;
    height: 110px;
  }
`;

export const headerCSS = css`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const spinnerCSS = css`
  position: absolute;
  top: 20%;
  left: 0;

  @media (min-width: 768px) {
    top: 28%;
  }
`;

export const CardContents = (props) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        width: 100%;
      `}
      {...props}
    />
  );
};

export const OverviewItem = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 4px;
        padding: 0 16px;
        border-right: 1px solid #e5e5e5;

        &:first-of-type {
          padding-left: 0;
        }

        &:last-child {
          border-right: none;
          padding-right: 0;
        }

        @media (min-width: 768px) {
          padding: 0 40px;
          align-items: flex-start;
        }
      `}
      {...props}
    />
  );
};

export const OverviewItemTitle = (props) => {
  return (
    <span
      css={css`
        font-family: "Oswald";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
        ${smoothing}
      `}
      {...props}
    />
  );
};

export const OverviewItemCount = (props) => {
  return (
    <span
      css={css`
        font-family: "Oswald";
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 20px;
        color: #2166e3;
        ${smoothing}
      `}
      {...props}
    />
  );
};
