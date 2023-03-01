import { css } from "@emotion/core";
import React, { forwardRef, memo } from "react";
import BaseHeader from "@/elxr/components/bits/text/Header";

export const cardCSS = css`
  height: calc(100vh - 350px);

  @media (min-width: 768px) {
    height: 100vh;
    max-height: 830px;
  }
`;

export const HeaderSection = (props) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: flex-start;
        gap: 4px;
        margin-bottom: 21px;
      `}
      {...props}
    />
  );
};

export const Header = (props) => (
  <BaseHeader
    titleCSS={css`
      font-size: 38px;
      line-height: 38px;
      color: #313131;
    `}
    {...props}
  />
);

export const HeaderLive = (props) => (
  <BaseHeader
    titleCSS={css`
      font-size: 38px;
      line-height: 38px;

      background: linear-gradient(
        124.74deg,
        #00e0fc 2.17%,
        #ff73f8 50.65%,
        #f5d1b5 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    `}
    {...props}
  />
);

export const NavigationSection = (props) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 21px;
      `}
      {...props}
    />
  );
};

export const CommunitiesText = (props) => {
  return (
    <div
      css={css`
        font-family: Quicksand;
        font-size: 14px;
        line-height: 18px;
        font-weight: 700;
        color: #313131;
      `}
      {...props}
    />
  );
};

const InternalList = (props, ref) => {
  return (
    <div
      css={css`
        height: calc(100% - 128px);
        min-width: 0;
        width: 100%;
        overflow-y: auto;
        padding-right: 8px;
        margin-right: -16px;
      `}
      {...props}
      ref={ref}
    />
  );
};

const ForwardedRef = forwardRef(InternalList);
export const List = memo(ForwardedRef);

List.displayName = "List";
