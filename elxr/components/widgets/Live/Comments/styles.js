import { css } from "@emotion/core";

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
