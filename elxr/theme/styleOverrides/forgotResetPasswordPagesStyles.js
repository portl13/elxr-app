import { css } from "@emotion/core";

export const inputStyle = css`
  background: transparent;
  color: inherit;

  &:focus {
    color: inherit;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

export const linkToLogin = css`
  color: initial !important;
`;
