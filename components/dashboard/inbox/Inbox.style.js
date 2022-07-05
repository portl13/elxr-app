import { css } from '@emotion/core'

export const inboxCss = css`
  .messages-container {
    display: grid;
    grid-template-columns: 360px 1fr;
  }

  .bp-messages-nav-panel {
  }

  .bp-messages-content {
  }

  .message-notfication-box {
    cursor: pointer;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 20px 10px 15px;
    align-items: center;
    position: relative;
  }

  .image-tag {
    flex: 0 0 45px;
    margin-right: 15px;
    max-width: 60px;
  }
  .main-tag svg {
    cursor: pointer;
    color: var(--primary-color);
    width: 20px;
  }
  .actions {
    position: absolute;
    right: 20px;
  }
  .actions svg {
    width: 5px;
    cursor: pointer;
  }
  .main-box-panel {
    display: flex;
    padding: 10px 0;
  }
  .bp-avatar-wrap {
    margin-right: 18px;
    max-width: 38px;
    flex: 1;
    min-width: 0;
  }
`
