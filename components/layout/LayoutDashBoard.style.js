import { css } from '@emotion/core'

export const layoutDashBoardStyle = css`
  &.main_grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 74px;
    grid-template-areas:
      'header'
      'content';
  }
  .sidebar {
    display: none;
  }

  .header {
    grid-area: header;
    background-color: var(--bg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    height: 74px;
    width: 100%;
    position: fixed;
  }

  .main {
    grid-area: content;
    padding: 30px;
  }

  .main .container {
    padding: 0;
  }

  @media (min-width: 992px) {
    &.main_grid {
      display: grid;
      grid-template-columns: 265px 1fr;
      grid-template-rows: 74px 1fr;
      grid-template-areas:
        'sidebar header'
        'sidebar content';
    }
    .sidebar {
      display: block;
      grid-area: sidebar;
      position: fixed;
      width: 265px;
    }

    .header {
      grid-area: header;
      padding-left: 265px;
    }

    .main {
      grid-area: content;
    }
  }
`
