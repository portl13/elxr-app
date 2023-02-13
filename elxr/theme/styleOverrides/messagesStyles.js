import { css } from "@emotion/core";

export const messagesCSS = css`
  .searchInput-Chat {
    color: var(--typo) !important;
  }

  .MuiDialog-paperFullScreen {
    background: linear-gradient(
      160deg,
      var(--bg-page-top-left) 0%,
      var(--bg-page-bottom-right) 60%
    ) !important;
  }

  .MuiInput-formControl input {
    color: initial !important;
  }

  .activity {
    color: var(--typo) !important;
  }

  .item-title a {
    color: initial !important;
  }

  .form-group input {
    background-color: #fff !important;
    color: var(--typo) !important;
    background-color: var(--bg-main-categories) !important;
    border: 2px solid var(--bg-main-categories) !important;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%) !important;
  }

  .chatCircle {
    border-color: var(--primary-color) !important;
    color: var(--primary-color) !important;
  }

  .single-message-thread-header {
    z-index: 1;
  }
`;
