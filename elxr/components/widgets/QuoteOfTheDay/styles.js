import { css } from "@emotion/core";

export const cardCSS = css`
  background-color: #2166e3;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  padding: 30px 30px 30px 64px;

  @media (min-width: 768px) {
    padding: 30px 30px 30px 64px;
  }
`;

export const iconCSS = css`
  position: absolute;
  top: 22px;
  left: 20px;
  max-height: 25px;
`;

export const NoResults = (props) => {
  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
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

export const CardContents = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `}
      {...props}
    />
  );
};

export const Title = (props) => {
  return (
    <span
      css={css`
        font-family: "Quicksand";
        font-size: 18px;
        font-weight: 700;
        line-height: 22px;
      `}
      {...props}
    />
  );
};

export const QuoteContainer = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 8px;
      `}
      {...props}
    />
  );
};

export const Quote = (props) => {
  return (
    <span
      css={css`
        font-family: "Quicksand";
        font-size: 18px;
        font-weight: 400;
        line-height: 22px;
      `}
      {...props}
    />
  );
};

export const Author = (props) => {
  return (
    <span
      css={css`
        font-family: "Quicksand";
        font-size: 12px;
        font-weight: 700;
        line-height: 15px;
      `}
      {...props}
    />
  );
};
