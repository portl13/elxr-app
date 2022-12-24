import React, { useContext } from "react";
import Head from "next/head";
import { css, Global } from "@emotion/core";
import { ThemeContext } from "@context/ThemeContext";
import { themes } from "../../themes/Themes";

const Meta = () => {
  const { theme: currentTheme } = useContext(ThemeContext);
  return (
    <>
      <Global
        styles={css`
          :root {
            --primary-color: #e0116d;
            --primary-hover: #f52b67;
            --primary-active: #d34167;
            --secondary-color: #000;
            --dark-color: #000;
            --bg-channel: #161c32;
            --bg-dashboard: #1d0438;
            --bg: #000;
            --sidebar-bg: #0d0d0d;
            --danger: #ef3e46;
            --color-icon: #99a4df;

            --header-height: 3rem;
            --nav-width: 68px;
            --typo: #fff;

            --first-color: #000;
            --first-color-light: #fff;
            --white-color: #fff;
            --grey-color: #2e2e2e;
            --z-fixed: 100;
            --text-grey: rgba(255, 255, 255, 0.6);
            --font-comfortaa: "Poppins", sans-serif;
            --color-white: #e4f0f4;
            --color-gris: #313133;
            --color-card-negro: #0b0b0b;
            --color-negro-claro: #1c1c1c;
            --tags-color: #272727;
            --bg-input: #1d335b;
            --grey-color-light: #c1bebe;

            //variables themes
            --bg-page-top-left: ${themes[currentTheme].pageBackGroundGradientTopLeft};
            --bg-page-bottom-right: ${themes[currentTheme].pageBackGroundGradientBottomRight};
            --bg-menu-top-left: ${themes[currentTheme].menuBackGroundGradientTopLeft};
            --bg-menu-bottom-right: ${themes[currentTheme].menuBackGroundGradientBottomRight};
            --bg-buttons: ${themes[currentTheme].buttons};
            --bg-hot-links: ${themes[currentTheme].hotLinks};
            --bg-buttons-bar: ${themes[currentTheme].buttonBarBackground};
            --studio-and-me-menu-buttons: ${themes[currentTheme].studioAndMeMenuButtons};
            --input-fields: ${themes[currentTheme].inputFields};
            --bg-activity-feed-boxes-top-left: ${themes[currentTheme].activityFeedBoxesGradientTopLeft};
            --bg-activity-feed-boxes-bottom-right: ${themes[currentTheme].activityFeedBoxesGradientBottomRight};
            --bg-font: ${themes[currentTheme].colorFont};
            --bg-font-grey: ${themes[currentTheme].colorFontGrey};
            --bg-card: ${themes[currentTheme].creatorCard};
            --invert-icon: ${themes[currentTheme].invert};
          }
        `}
      />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;600&family=Poppins:wght@300;400;600;700&display=swap" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    </>
  );
};

export default Meta;
