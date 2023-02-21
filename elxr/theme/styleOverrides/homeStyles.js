import { css } from "@emotion/core";

export const layoutMetaGlobalCSS = css`
  --sidebar-bg: linear-gradient(97deg, #ccf8fe -33%, #ffe3fd 59%, #fdf5f0 108%);
  --bg-page-top-left: #f0f2f5;
  --bg-page-bottom-right: #f0f2f5;
  --bg-menu-top-left: #fff;
  --bg-menu-bottom-right: #fff;
  --bg-buttons: #f3215e;
  --bg-hot-links: #f3215e;
  --bg-buttons-bar: #0e0f11;
  --studio-and-me-menu-buttons: #ffffff;
  --input-fields: #ffffff;
  --bg-activity-feed-boxes-top-left: #ffffff;
  --bg-activity-feed-boxes-bottom-right: #ffffff;
  --bg-font: #000000;
  --bg-font-grey: #8898aa;
  --bg-card-left: #fff;
  --bg-card-right: #fff;
  --invert-icon: 0;
  --typo: #313131;
  --bg-main-categories: #ffffff;
  --bg: #ffffff;
  --bg-search: #6a6767;
`;

export const categoriesStyleCSS = css`
  .category-btn.active,
  .category-btn:hover {
    color: var(--typo);
    border: 1px solid #6a6767;
  }
`;

export const inputStyleCSS = css`
  background-color: #ffffff;
  color: var(--typo);
`;

export const homeStylesCSS = css`
  > section:first-of-type {
    background: linear-gradient(
      85deg,
      rgba(255, 227, 253, 0.8) 0%,
      rgba(244, 231, 253, 1) 16%,
      rgba(204, 248, 254, 0.4) 57%,
      rgba(253, 245, 240, 0.6) 200%
    );
    padding: 15px 0;

    @media screen and (min-width: 768px) {
      padding: 45px 0;
    }
  }
`;
