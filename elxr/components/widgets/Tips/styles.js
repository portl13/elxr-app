import { css } from "@emotion/core";

export const cardCSS = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  padding: 0;
  overflow: hidden;
  z-index: 2; // This is necessary for Safari to render the border-radius correctly

  @media (min-width: 768px) {
    padding: 0;
  }
`;

export const carouselCSS = css`
  width: 100%;
  height: 100%;

  .control-dots {
    padding: 0 20px;
    text-align: right;
  }

  .dot {
    background: #000 !important;
    box-shadow: none !important;
    margin: 0 3px !important;
    width: 6px !important;
    height: 6px !important;
  }
`;

export const TipContainer = (props) => {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 100%;
        max-width: 100vw;

        @media (min-width: 768px) {
          max-width: calc(100vw - 30px);
        }
      `}
      {...props}
    />
  );
};

export const TipItem = (props) => {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        padding: 30px;
        color: white;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      `}
      {...props}
    />
  );
};

export const iconCSS = css`
  color: white;
`;

export const TipIcon = (props) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 9px;
        width: 60px;
        height: 60px;
        background: linear-gradient(
          131.6deg,
          #00e0fc -26.76%,
          #ff73f8 24.4%,
          #f5d1b5 76.49%
        );
        border-radius: 70px;
      `}
      {...props}
    />
  );
};

export const TipInfo = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-left: 12px;
      `}
      {...props}
    />
  );
};

export const Title = (props) => {
  return (
    <div
      css={css`
        color: #3b3129;
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 6px;
      `}
      {...props}
    />
  );
};

export const Text = (props) => {
  return (
    <div
      css={css`
        color: #3b3129;
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
      `}
      {...props}
    />
  );
};
