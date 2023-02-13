import { css } from "@emotion/core";

export const shareActionsCSS = css`
  margin-bottom: 20px;
`;

export const FeedContainer = (props) => {
  return (
    <div
      css={css`
        margin-bottom: 20px;
      `}
      {...props}
    />
  );
};

export const ProfileSection = (props) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: flex-start;
        margin-bottom: 8px;
      `}
      {...props}
    />
  );
};

export const ProfilePicture = ({ alt, ...props }) => {
  return (
    <img
      alt={alt}
      css={css`
        width: 30px;
        height: 30px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 8px;
        box-sizing: border-box;
        background-image: linear-gradient(
          124.74deg,
          #00e0fc 2.17%,
          #ff73f8 50.65%,
          #f5d1b5 100%
        );
        padding: 1px;
      `}
      {...props}
    />
  );
};

export const PostInfo = (props) => {
  return (
    <div
      css={css`
        margin-right: 6px;
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
        margin-bottom: 1px;
      `}
      {...props}
    />
  );
};

export const FeedTime = (props) => {
  return (
    <div
      css={css`
        font-family: Quicksand;
        font-size: 12px;
        line-height: 15px;
        font-weight: 700;
        color: #313131;
        opacity: 0.5;
      `}
      {...props}
    />
  );
};

export const FeedText = (props) => {
  return (
    <div
      css={css`
        font-family: Quicksand;
        font-size: 13px;
        line-height: 17px;
        font-weight: 700;
        color: #313131;
        margin-bottom: 13px;
      `}
      {...props}
    />
  );
};

export const FeedImage = ({ alt, ...props }) => {
  return (
    <img
      alt={alt}
      css={css`
        height: 180px;
        width: 100%;
        object-fit: cover;
        border-radius: 2px;
        margin-bottom: 15px;
      `}
      {...props}
    />
  );
};

export const FeedInfo = (props) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        font-family: Quicksand;
        font-size: 13px;
        line-height: 17px;
        font-weight: 700;
        color: #313131;
      `}
      {...props}
    />
  );
};

export const FeedNumbers = (props) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 6px;
      `}
      {...props}
    />
  );
};

export const Dot = (props) => {
  return (
    <div
      css={css`
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #313131;
      `}
      {...props}
    />
  );
};

export const Repost = (props) => {
  return (
    <div
      css={css`
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
      `}
      {...props}
    />
  );
};

export const CommentsCounter = (props) => {
  return (
    <div
      css={css`
        cursor: pointer;
      `}
      {...props}
    />
  );
};

export const CommentContainer = (props) => {
  return (
    <div
      css={css`
        padding: 12px 25px;
        margin-bottom: 30px;
        background: rgba(255, 255, 255, 0.73473);
        border: 1px solid rgba(255, 255, 255, 0.162642);
        box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.0821405);
        backdrop-filter: blur(13.5914px);
        border-radius: 24px;
        font-family: Quicksand;
        font-size: 12px;
        line-height: 15px;
        font-weight: 700;
        color: #b9b6b3;
      `}
      {...props}
    />
  );
};

export const dividerCss = css`
  margin-top: 20px;
`;
