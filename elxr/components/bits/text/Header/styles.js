import { css } from "@emotion/core";
import { smoothing } from "@/elxr/helpers/styles/fonts";

export const headerCSS = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const commonHeaderCSS = css`
  font-family: "Oswald";
  font-weight: 700;
  text-transform: uppercase;
  color: #313131;
  margin: 0;
  ${smoothing}
`;

export const h1CSS = css`
  ${commonHeaderCSS}
  font-size: 30px;
  line-height: 44px;
`;

export const h2CSS = css`
  ${commonHeaderCSS}
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 4.6px;
`;

export const pCSS = css`
  font-family: "Quicksand";
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #7f7f7f;
`;
