import { css } from "@emotion/core";

export const layoutDashBoardStyle = css`
  &.main_grid {
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-template-rows: 74px;
    grid-template-areas:
      "header header"
      "content content";
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
    background: linear-gradient( 160deg,var(--bg-menu-top-left)
   0%,var(--bg-menu-bottom-right) 60%);
    justify-content: space-between;
    padding: 0 10px;
    height: 74px;
    width: 100%;
    position: fixed;
    transition: all 0.3s ease-in-out;
  }

  .main {
    grid-area: content;
    transition: all 0.3s ease-in-out;
    height: 100%;
  
  }

  .section-main.home {
    padding: 0;
  }

  .section-dark {
     background: linear-gradient(
    160deg,
    var(--bg-section-home-top-left) 0%,
    var(--bg-section-home-bottom-right) 60%
  );
    padding: 15px;
  }
  .section-light {
    background-color: var(--bg-main-categories) !important;
    padding: 15px;
  }

  .section-main {
    padding: 15px;
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
    &.main_grid {
      display: grid;
      grid-template-columns: 265px 1fr;
      grid-template-rows: 74px 1fr;
      grid-template-areas:
        "header header"
        "content content";
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
      transition: all 0.3s ease-in-out;
    }

    .main {
      grid-area: content;
      transition: all 0.3s ease-in-out;
    }
    .section-main {
      padding: 45px;
    }

    .section-dark {
      padding: 60px 45px;
    }
    .section-light {
      padding: 60px 45px;
    }
  }
`;
