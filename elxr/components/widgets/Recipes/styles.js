import { css } from "@emotion/core";

export const cardCSS = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  max-height: 164px;
  min-height: 164px;
  padding: 0;
  overflow: hidden;
  z-index: 2; // This is necessary for Safari to render the border-radius correctly

  @media (min-width: 768px) {
    padding: 0;
  }
`;

export const carouselCSS = css`
  width: 100%;
  height: 100%;

  .control-dots {
    padding: 0 20px;
    text-align: left;
  }

  .dot {
    margin: 0 3px !important;
    width: 6px !important;
    height: 6px !important;
  }
`;

export const RecipeContainer = (props) => {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 100%;
        max-width: 100vw;

        @media (min-width: 768px) {
          max-width: calc(100vw - 30px);
        }
      `}
      {...props}
    />
  );
};

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

export const RecipeItem = ({ image, ...props }) => {
  return (
    <article
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        min-height: 164px;
        padding: 16px 33% 20px 20px;
        color: white;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: linear-gradient(
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.5) 100%
          ),
          url(${image});
      `}
      {...props}
    />
  );
};

export const Title = (props) => {
  return (
    <span
      css={css`
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        text-align: left;
      `}
      {...props}
    />
  );
};

export const RecipeDetails = (props) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        width: 100%;
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        text-align: left;
      `}
      {...props}
    />
  );
};

export const RecipeTitle = (props) => {
  return (
    <a
      css={css`
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 23px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-align: left;
        padding-top: 8px;
        text-decoration: none;
        color: white;

        &:hover {
          cursor: pointer;
          color: white;
        }
      `}
      {...props}
    />
  );
};
