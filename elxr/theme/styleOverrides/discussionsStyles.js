import { css } from "@emotion/core";

export const discussionStylesCSS = css`
  .main-wrapper {
    padding: 16px;
    max-width: unset;
    margin: 0 16px;
  }

  .new-post {
    border: 0;
    background-color: transparent;
    cursor: pointer;
    padding-bottom: 24px;
    width: 100%;
    text-align: left;

    svg {
      max-height: 18px;
    }
  }

  .discussion-panel {
    display: flex;
    flex-direction: column;
    gap: 24px;

    svg {
      max-height: 16px;
    }
  }

  .item-container {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 24px;
  }

  .item {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .item-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 18px;
  }

  .item-avatar {
    a {
      width: 100%;
      height: 100%;
    }
    img {
      max-height: 60px;
    }
  }

  .bs-voices-wrap {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .bb-grid > h5 {
    padding-bottom: 24px;
  }
`;
