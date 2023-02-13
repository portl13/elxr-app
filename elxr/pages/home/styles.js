import { css } from "@emotion/core";

// TODO Organize elxr project wide breakpoints

const _breakpoints = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1200px",
  widescreen: "1920px",
};

export const Layout = (props) => {
  return (
    <section
      css={css`
        min-height: 100%;
        padding-bottom: 6rem;
        display: grid;
        justify-content: center;
        row-gap: 8px;
        grid-template-columns: 1;
        grid-template-areas:
          "area-1"
          "area-2"
          "area-3"
          "area-4"
          "area-5"
          "area-6"
          "area-7"
          "area-8"
          "area-9";

        @media (min-width: ${_breakpoints.tablet}) {
          row-gap: 20px;
          column-gap: 30px;
          grid-template-columns: repeat(2, minmax(auto, 400px));
          grid-template-rows: repeat(8);
          grid-template-areas:
            "area-1 area-1"
            "area-2 area-4"
            "area-3 area-4"
            "area-5 area-4"
            "area-6 area-4"
            "area-7 area-4"
            "area-8 area-4"
            "area-9 area-4";
        }

        @media (min-width: ${_breakpoints.desktop}) {
          row-gap: 20px;
          column-gap: 30px;
          grid-template-columns: repeat(3, minmax(auto, 400px));
          grid-template-rows: repeat(6);
          grid-template-areas:
            "area-1 area-1 area-4"
            "area-2 area-3 area-4"
            "area-5 area-6 area-4"
            "area-7 area-7 empty"
            "area-8 area-9 empty";
        }

        @media (min-width: ${_breakpoints.widescreen}) {
          row-gap: 20px;
          column-gap: 30px;
          padding-bottom: 1rem;
          grid-template-columns: repeat(5, minmax(auto, 400px));
          grid-template-areas:
            "area-1 area-1 area-1 area-1 area-4"
            "area-2 area-3 area-7 area-7 area-4"
            "area-2 area-3 area-7 area-7 area-4"
            "area-5 area-6 area-7 area-7 area-4"
            " area-8 area-9 area-7 area-7 area-4";
        }
      `}
      {...props}
    />
  );
};

export const Section = ({ area, ...props }) => {
  return (
    <section
      css={css`
        grid-area: ${area && `area-${area}`};
      `}
      {...props}
    />
  );
};
