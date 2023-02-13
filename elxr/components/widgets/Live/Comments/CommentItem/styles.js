import { css } from "@emotion/core";

export const CommentContainer = (props) => {
  return (
    <div
      css={css`
        margin-bottom: 8px;
      `}
      {...props}
    />
  );
};

export const ProfileInfo = (props) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      `}
      {...props}
    />
  );
};

export const ProfileName = (props) => {
  return (
    <div
      css={css`
        font-family: Quicksand;
        font-size: 13px;
        line-height: 16px;
        font-weight: 700;
        color: #313131;
        margin-right: 6px;
      `}
      {...props}
    />
  );
};

export const CommentTime = (props) => {
  return (
    <div
      css={css`
        font-family: Quicksand;
        font-size: 13px;
        line-height: 16px;
        font-weight: 700;
        color: #313131;
        opacity: 0.5;
      `}
      {...props}
    />
  );
};

export const CommentText = (props) => {
  return (
    <div
      css={css`
        font-family: Quicksand;
        font-size: 13px;
        line-height: 16px;
        font-weight: 700;
        color: #313131;
      `}
      {...props}
    />
  );
};
