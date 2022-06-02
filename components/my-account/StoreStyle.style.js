import { css } from "@emotion/core";

export const storeStyle = css`
  .store-title {
    padding: 0 !important;
  }
  .store-panel {
    width: 100%;
    display: flex;
    flex-direction: row;

    @media (max-width: 991px) {
      flex-direction: column;
      align-items: flex-start !important;
    }
  }

  @media (max-width: 991px) {
    .store-panel-label {
      width: 100% !important;
    }

    .store-panel-input {
      width: 100% !important;
    }

    .store-panel-img-label {
      width: 100% !important;
    }

    .wcfm-descp-panel {
      padding: 0px 0px 30px 0px !important ;
    }

  }

  

  

`;