import { css } from "@emotion/core";

export const cardCSS = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 300px;
`;

export const extraUploadsCSS = css`
  display: none;

  @media (min-width: 1920px) {
    display: flex;
  }
`;

export const NoResults = (props) => {
  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: Quicksand;
        font-size: 16px;
      `}
      {...props}
    />
  );
};

export const CardContents = (props) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-areas:
          "featured"
          "upload1"
          "upload2"
          "upload3";
        grid-template-columns: 100%;
        gap: 1rem;
        width: 100%;
        height: 100%;

        @media (min-width: 768px) {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-template-areas:
            "featured featured featured"
            "upload1 upload2 upload3";
        }

        @media (min-width: 1920px) {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-template-areas:
            "featured featured featured"
            "upload1 upload2 upload3"
            "upload4 upload5 upload6";
        }
      `}
      {...props}
    />
  );
};

export const Featured = ({ image, ...props }) => {
  return (
    <article
      css={css`
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        gap: 2rem;
        padding: 20px;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: 8px;
        min-height: 420px;
        position: relative;
        background-image: url(${image});
      `}
      {...props}
    />
  );
};

export const FeaturedControls = (props) => {
  return (
    <a
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        color: var(--white-color);
        font-size: 1.6rem;
        text-decoration: none;
        font-family: Quicksand;

        span {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        &:visited {
          color: var(--white-color);
        }

        &:hover {
          color: var(--white-color);
        }

        @media (min-width: 768px) {
          font-size: 2rem;
        }
      `}
      {...props}
    />
  );
};

export const Duration = (props) => {
  return (
    <span
      css={css`
        position: absolute;
        top: 10px;
        right: 15px;
        color: var(--white-color);
        font-size: 10px;
        line-height: 13px;
        font-weight: 700;
      `}
      {...props}
    />
  );
};

export const DurationFeatured = (props) => {
  return (
    <span
      css={css`
        position: absolute;
        top: 15px;
        right: 20px;
        color: var(--white-color);
        font-size: 13px;
        line-height: 13px;
        font-weight: 700;
      `}
      {...props}
    />
  );
};

export const PlayButton = (props) => {
  return (
    <div
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        svg {
          min-height: 2rem;
          max-width: 2rem;
        }
      `}
      {...props}
    />
  );
};

export const PlayButtonFeatured = (props) => {
  return (
    <div
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        svg {
          min-height: 4rem;
          max-width: 4rem;
        }

        @media (min-width: 768px) {
          position: static;
          transform: none;
        }
      `}
      {...props}
    />
  );
};

export const UploadImage = ({ image, ...props }) => {
  return (
    <a
      css={css`
        position: relative;
        height: 135px;
        width: 100%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: 8px;
        overflow: hidden;
        background-image: linear-gradient(
            rgba(51, 34, 18, 0.5) 0%,
            rgba(51, 34, 18, 0.2) 100%
          ),
          url(${image});

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}
      {...props}
    />
  );
};

export const Upload = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.5rem;
        height: 100%;
        position: relative;

        p {
          width: 100%;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          font-family: Quicksand;
        }

        a {
          text-decoration: none;
          color: var(--black-color);
          font-family: Quicksand;

          span {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-weight: 700;
            line-height: 18px;
            font-size: 14px;
          }

          &:visited {
            color: var(--black-color);
          }

          &:hover {
            color: var(--black-color);
            text-decoration: underline;
          }
        }
      `}
      {...props}
    />
  );
};
