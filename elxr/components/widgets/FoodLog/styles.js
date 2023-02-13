import { css } from "@emotion/core";

export const cardCSS = css`
  height: 480px;
  display: grid;
  grid-template-rows: auto 1fr;
`;

export const headerCSS = css`
  margin-top: 32px;
  margin-bottom: 30px;
`;

export const ContentContainer = (props) => {
  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-top: 26px;
        gap: 18px;
      `}
      {...props}
    />
  );
};

export const ContentText = (props) => {
  return (
    <div
      css={css`
        font-family: "Quicksand";
        font-size: 16px;
        font-weight: 500;
        line-height: 18px;
      `}
      {...props}
    />
  );
};

export const ContentTitle = (props) => {
  return (
    <div
      css={css`
        font-family: "Oswald";
        font-weight: 700;
        text-transform: uppercase;
        color: #313131;
        margin: 0;
      `}
      {...props}
    />
  );
};

export const ContentSubTitle = (props) => {
  return (
    <div
      css={css`
        font-family: "Oswald";
        font-weight: 400;
        text-transform: uppercase;
        color: #313131;
        margin: 0;
        font-size: 24px;
      `}
      {...props}
    />
  );
};
