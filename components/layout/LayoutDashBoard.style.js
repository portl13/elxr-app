import { css } from '@emotion/core'

export const layoutDashBoardStyle = css`
  &.main_grid {
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-template-rows: 74px;
    grid-template-areas:
        'sidebar header'
        'content content';
    transition: all 0.3s ease-in-out;
  }
  .sidebar {
    position: fixed;
    width: 60px;
    grid-area: sidebar;
    transition: all 0.3s ease-in-out;
  }

  .header {
    grid-area: header;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 74px;
    width: 100%;
    position: fixed;
    transition: all 0.3s ease-in-out;
  }

  .main {
    grid-area: content;
    padding: 15px;
    transition: all 0.3s ease-in-out;
    height: 100%;
  }

  .main .container {
    padding: 0;
    transition: all 0.3s ease-in-out;
  }

  &.main_grid.active {
    .sidebar {
      width: 180px;
      transition: all 0.3s ease-in-out;
    }
  }

  @media (min-width: 992px) {
    &.main_grid {
      display: grid;
      grid-template-columns: 265px 1fr;
      grid-template-rows: 74px 1fr;
      grid-template-areas:
        'sidebar header'
        'sidebar content';
      transition: all 0.3s ease-in-out;
    }

    &.main_grid.active {
      grid-template-columns: 80px 1fr;
      transition: all 0.3s ease-in-out;
      .sidebar {
        width: 80px;
        transition: all 0.3s ease-in-out;
      }
      .header {
        padding-left: 80px;
        transition: all 0.3s ease-in-out;
      }
    }
    .sidebar {
      display: block;
      grid-area: sidebar;
      width: 265px;
      transition: all 0.3s ease-in-out;
    }

    .header {
      grid-area: header;
      padding: 0 30px;
      padding-left: 265px;
      transition: all 0.3s ease-in-out;
    }

    .main {
      grid-area: content;
      padding: 30px;
      transition: all 0.3s ease-in-out;
    }
  }
`
