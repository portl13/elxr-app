import { css, Global } from "@emotion/core";

import { createFontFaceDefinitionByWeight } from "@/elxr/helpers/styles/fonts";

const fontsPath = "/elxr/assets/fonts";

const quicksandPath = `${fontsPath}/quicksand/quicksand-v30-latin`;
const oswaldPath = `${fontsPath}/oswald/oswald-v49-latin`;

const oswaldFontFaceDefinitions = createFontFaceDefinitionByWeight({
  family: "Oswald",
  path: oswaldPath,
});

const quicksandFontFaceDefinitions = createFontFaceDefinitionByWeight({
  family: "Quicksand",
  path: quicksandPath,
});

const ElxrFonts = () => {
  return (
    <Global
      styles={css`
        ${oswaldFontFaceDefinitions}
        ${quicksandFontFaceDefinitions}
      `}
    ></Global>
  );
};

export default ElxrFonts;
