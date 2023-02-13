import { css } from "@emotion/core";
import { smoothing } from "@/elxr/helpers/styles/fonts";

const commonHeaderCSS = css`
  font-family: "Oswald";
  font-weight: 700;
  text-transform: uppercase;
  color: #313131;
  margin: 0;
  ${smoothing}
`;

export const discoverStylesCSS = css`
  .section-main {
    padding: 0 !important;
  }

  .section-main-title {
    ${commonHeaderCSS}
    font-size: 48px;
    line-height: 71px;

    @media (max-width: 768px) {
      ${commonHeaderCSS}
      font-size: 22px;
      line-height: 32px;
      font-weight: 600;
      padding-right: 6px;
    }

    .text-brand {
      ${commonHeaderCSS}
      padding-bottom: 10px;
      color: #848484;
      font-size: 16px !important;
      line-height: 19px !important;
      letter-spacing: 4.6px;
    }
  }

  .section-more-btn {
    &:hover {
      color: #000000;
      border-color: #000000;
      box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px,
        rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
        rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px,
        rgba(0, 0, 0, 0.07) 0px 32px 64px;
    }
  }

  .section-black {
    background: #000000;
    padding: 15px;

    @media (min-width: 992px) {
      padding: 60px 45px;
    }

    .section-main-title,
    .text-brand,
    a {
      color: #ffffff !important;
    }

    .arrow-slide,
    .section-more-btn {
      background-color: transparent;
      color: #ffffff;
      border: 1px solid #ffffff;

      &:hover {
        color: #ffffff;
        border-color: #ffffff;
        box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px,
          rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
          rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px,
          rgba(0, 0, 0, 0.07) 0px 32px 64px;
      }
    }
  }
`;
