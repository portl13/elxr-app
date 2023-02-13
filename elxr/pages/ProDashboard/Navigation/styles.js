import { css } from "@emotion/core";

export const NavigationContainer = ({ ...props }) => {
  return (
    <div
      css={css`
        margin-right: 82px;
        min-width: 240px;
        overflow-y: auto;
        height: calc(100vh - 200px);
      `}
      {...props}
    />
  );
};

export const DashboardItem = ({ ...props }) => {
  return (
    <div
      css={css`
        width: 160px;
        display: flex;
        gap: 8px;
        align-items: center;
        background: #f3f8ff;
        border: 1px solid #2166e3;
        border-radius: 26px;
        padding: 14px 24px;
        cursor: pointer;
        margin-left: 28px;
        margin-bottom: 10px;
      `}
      {...props}
    />
  );
};

export const DashboardText = (props) => {
  return (
    <div
      css={css`
        font-family: Quicksand;
        font-size: 15px;
        line-height: 19px;
        font-weight: 600;
        color: #2166e3;
      `}
      {...props}
    />
  );
};

export const MenuItem = ({ ...props }) => {
  return (
    <div
      css={css`
        padding: 14px 24px;
        margin-left: 12px;
        margin-bottom: 8px;
        font-family: Quicksand;
        font-size: 15px;
        line-height: 19px;
        font-weight: 600;
        color: #141414;
        cursor: pointer;
        &:hover {
          color: #2166e3;
        }
      `}
      {...props}
    />
  );
};

export const CollapsableItem = (props) => {
  return (
    <div
      css={css`
        padding-left: 30px;
      `}
      {...props}
    />
  );
};
