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

export const MultiPhotoSection = (props) => {
  return (
    <div
      className={`${props.className}`}
      css={css`
        &.multi-photos-section {
          margin: 0 -3px 10px -3px;

          &.grid-5 {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 3px;
            .act-grid-1-1 {
              grid-area: 1 / 1 / 2 / 4;
            }
            .act-grid-1-2 {
              grid-area: 1 / 4 / 2 / 7;
            }
            .act-grid-1-3 {
              grid-area: 2 / 1 / 3 / 3;
            }
            .act-grid-1-4 {
              grid-area: 2 / 3 / 3 / 5;
            }
            .act-grid-1-5 {
              grid-area: 2 / 5 / 3 / 7;
            }
          }
          &.grid-2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 3px;
          }
          &.grid-3 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas:
              "main main"
              "two three";
            gap: 3px;
            .act-grid-1-1 {
              grid-area: main;
            }
            .act-grid-1-1.ratio-1x1 {
              --aspect-ratio: calc(9 / 16 * 100%);
            }
            .act-grid-1-1.bg-cover-feed {
              background-position: center !important;
            }
          }
          &.grid-4 {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 3px;
            .act-grid-1-1 {
              grid-area: 1 / 1 / 2 / 3;
            }
            .act-grid-1-2 {
              grid-area: 1 / 3 / 2 / 5;
            }
            .act-grid-1-3 {
              grid-area: 2 / 1 / 3 / 3;
            }
            .act-grid-1-4 {
              grid-area: 2 / 3 / 3 / 5;
            }
          }
          .act-grid-1-1 {
            position: relative;
            cursor: pointer;
          }
          .bb-photos-length {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            height: 100%;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.4);
            color: #fff;
            font-size: 16px;
            flex-flow: row wrap;
            span {
              color: #fff;
              font-size: 28px;
              font-weight: 400;
              margin-bottom: 10px;
              em {
                display: block;
                font-style: normal;
                font-size: 17px;
              }
            }
          }
          .act-grid-1-1,
          .act-grid-1-2,
          .act-grid-1-3,
          .act-grid-1-4,
          .act-grid-1-5 {
            min-width: 0;
            position: relative;
            transition: 0.3s;
            cursor: pointer;
            .media-action {
              position: absolute;
              width: 24px;
              right: 15px;
              top: 21px;
              z-index: 9;
              margin: 0;
              opacity: 0;
              visibility: hidden;
              .popover {
                display: none;
              }
              &:hover {
                .more {
                  .popover {
                    width: 110px;
                    display: block;
                    transform: translate(-35%, -130%);
                    left: -40px;
                    &.bs-popover-top .arrow {
                      margin: 0 0 0 78px;
                    }
                  }
                }
              }
              .has-tooltip {
                margin: 0;
              }
              .circle {
                height: 24px;
                width: 24px;
                padding: 4px;
                border: 1px solid #fff;
                background-color: transparent;
                color: #fff;
                border-radius: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                svg {
                  height: 14px;
                  width: 14px;
                }
              }
            }
            .more-action-list {
              position: absolute;
              top: 26px;
              right: 1px;
              background: #fff;
              box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%),
                0 6px 32px 0 rgb(18 43 70 / 10%);
              border-radius: 4px;
              width: 150px;
              z-index: 1;
              &::after {
                content: " ";
                position: absolute;
                width: 0;
                height: 0;
                top: 0;
                margin: 0 auto;
                right: 8px;
                box-sizing: border-box;
                transform-origin: 0 0;
                transform: rotate(-45deg);
                box-shadow: 2px -3px 3px 0 rgb(0 0 0 / 2%);
                z-index: 101;
                opacity: 1;
                visibility: visible;
                pointer-events: none;
              }
              ul {
                list-style: none;
                margin: 5px;
                padding: 0;
                li {
                  margin: 0;
                  padding: 0;
                  list-style-type: none;
                }
              }
              .item-link {
                padding: 10px 14px;
                display: block;
                font-size: 14px;
                line-height: 1;
                color: #7f868f;
                text-align: left;
                svg {
                  height: 15px;
                  display: inline-block;
                  margin-right: 10px;
                  width: 20px;
                }
                &:hover {
                  color: var(--primary-color);
                }
              }
            }
            .hover-effect {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.4);
              display: none;
              transition: 0.3s;
            }
            &:hover,
            &.show {
              .hover-effect {
                display: block;
              }
              .media-action {
                opacity: 1;
                visibility: visible;
              }
            }
            img {
              width: 100%;
              height: 100%;
              cursor: pointer;
              object-fit: cover;
              border-radius: 3px;
            }
          }
        }
      `}
    >
      {props.children}
    </div>
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
