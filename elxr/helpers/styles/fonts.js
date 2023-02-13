import { css } from "@emotion/core";

export const createFontFaceDefinition = ({
  family,
  weight,
  path,
  style = "normal",
}) => {
  return css`
    @font-face {
      font-family: "${family}";
      font-style: ${style};
      font-weight: ${weight};
      src: url("${path}.eot");
      src: local(""), url("${path}.eot?#iefix") format("embedded-opentype"),
        url("${path}.woff2") format("woff2"), url("${path}.woff") format("woff"),
        url("${path}.ttf") format("truetype"),
        url("${path}.svg#Quicksand") format("svg");
    }
  `;
};

const weights = ["300", "regular", "500", "600", "700"];

export const createFontFaceDefinitionByWeight = ({ family, style, path }) =>
  weights.map((weight) =>
    createFontFaceDefinition({
      family,
      style,
      weight,
      path: `${path}-${weight}`,
    })
  );

export const smoothing = css`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
`;
