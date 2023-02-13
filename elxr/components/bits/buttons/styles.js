import { css } from "@emotion/core";

import { smoothing } from "@/elxr/helpers/styles/fonts";

export const defaultButtonCSS = css`
  background-color: white;
  border: 1px solid #000000;
  border-radius: 4px;
  padding: 12px;

  font-family: "Quicksand";
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  ${smoothing}

  &:active {
    color: #000000;
    transform: translateY(1px);
  }

  &:focus {
    outline: none;
    border: 1px solid #000000;
  }

  &:hover:not(:active) {
    color: #000000;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  }
`;

export const labelButtonCSS = css`
  border: none;
  border-radius: 14px;
  background-color: #f4f4f4;
  color: #7a7a7a;

  &:focus {
    border: none;
  }

  &:hover:not(:active) {
    color: #7a7a7a;
  }
`;

export const iconRightCSS = css`
  float: right;
  margin-left: 4px;
`;

export const tagButtonCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #e4f0f4;
  border-radius: 8px;
  min-height: 17px;
  padding: 2px 8px;
  font-size: 11px;
  line-height: 14px;
  color: #2d5866;

  &:focus {
  }

  &:hover:not(:active) {
    background-color: #c2dde6;
    text-decoration: none;
  }
`;

export const roundedButtonCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #e4f0f4;
  border-radius: 8px;
  min-height: 17px;
  padding: 8px 16px;
  font-size: 11px;
  line-height: 14px;
  color: #2d5866;

  &:focus {
    border: none;
  }

  &:hover:not(:active) {
    background-color: #c2dde6;
    text-decoration: none;
  }
`;

export const gradientButtonCSS = css`
  border: none;
  background: linear-gradient(
    106.26deg,
    #00e0fc -20.69%,
    #ff73f8 59.13%,
    #f5d1b5 101.63%
  );
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.0821405);
  backdrop-filter: blur(13.5914px);
  border-radius: 16px;
  padding: 5px 18px;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;

  &:focus {
    border: none;
  }

  &:hover:not(:active) {
    color: #ffffffa3;
  }
`;
