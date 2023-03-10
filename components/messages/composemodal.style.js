import { css } from "@emotion/core";

export const searchField = css`
  font-size: 14px;
  background: var(--bg);
  height: 34px;
  border-radius: 17px;
  padding: 0 20px;
  color: var(--bg-font) !important;
  &:focus {
    background: var(--bg);
    border-color: var(--typo);
    color: var(--typo);
  }
  &:hover {
    background: var(--bg);
    border-color: var(--typo);
    color: var(--typo);
  }
`;
