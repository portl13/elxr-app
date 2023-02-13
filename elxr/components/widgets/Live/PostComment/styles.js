import { css } from "@emotion/core";

export const inputStyle = css`
  font-family: Quicksand;
  font-size: 12px;
  line-height: 15px;
  font-weight: 700;
  color: #b9b6b3;
`;

export const CommentContainer = (props) => {
  return (
    <div
      css={css`
        padding: 12px 25px;
        margin-bottom: 10px;
        background: rgba(255, 255, 255, 0.73473);
        border: 1px solid rgba(255, 255, 255, 0.162642);
        box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.0821405);
        backdrop-filter: blur(13.5914px);
        border-radius: 24px;
        font-family: Quicksand;
        font-size: 12px;
        line-height: 15px;
        font-weight: 700;
      `}
      {...props}
    />
  );
};

export const ActionContainer = (props) => {
  return (
    <div
      css={css`
        display: flex;
        gap: 8px;
      `}
      {...props}
    />
  );
};

export const spinnerCss = css`
  padding: 0 !important;
  justify-content: flex-start !important;
  margin-bottom: 15px;

  & > .spinner-border {
    width: 15px !important;
    height: 15px !important;
    border: 2px solid currentColor;
    border: 2px solid currentColor;
    border-right-color: transparent;
  }
`;
