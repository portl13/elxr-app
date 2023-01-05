import { css } from '@emotion/core'

export const layoutDashBoardStyle = css`
  &.main_grid {
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-template-rows: 74px;
    grid-template-areas:
        'header header'
        'content content';
    transition: all 0.3s ease-in-out;
  }
  .sidebar {
    position: fixed;
    width: 0;
    grid-area: sidebar;
    transition: all 0.3s ease-in-out;
  }

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
    background-color: #0E0F11;
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
      width: 320px;
      transition: all 0.3s ease-in-out;
    }
  }

  @media (min-width: 992px) {
    .menu-container{
      
    }
    .header{
      background-color: transparent;
    }
    &.main_grid {
      display: grid;
      grid-template-columns: 265px 1fr;
      grid-template-rows: 74px 1fr;
      grid-template-areas:
        'header header'
        'content content';
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
      // padding-left: 265px;
      transition: all 0.3s ease-in-out;
    }

    .main {
      grid-area: content;
      padding: 30px;
      transition: all 0.3s ease-in-out;
    }
  }
`
