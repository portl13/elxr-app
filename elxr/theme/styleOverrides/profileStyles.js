import { css } from "@emotion/core";

export const profileCSS = css`
  .btn-outline-primary {
    border-color: initial;
  }

  .form-control {
    background-color: #fff;
    color: var(--typo);
    border: none;
  }

  .file-info {
    color: initial;
  }

  .connection-detail-section {
    width: 100%;
    flex-direction: column-reverse;
    gap: 20px;

    div {
      width: 100%;
    }

    @media (min-width: 992px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
  }

  .message-tag {
    align-items: center;
  }

  .generic-meta {
    @media (min-width: 1440px) {
      position: static !important;
    }
  }
`;
