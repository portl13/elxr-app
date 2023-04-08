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
    display: grid;
    grid-template-columns: 40px 0px 1fr 0px 150px;
    gap: 5px;
    align-items: center;
    background: #fff;
    justify-content: space-between;
    padding: 0 10px;
    height: 74px;
    width: 100%;
    position: fixed;
    transition: all 0.3s ease-in-out;
  }
  
  .header.auth{
    grid-template-columns: 40px 35px 1fr 0 80px;
  }

  @media (min-width: 426px) {
    .header.auth{
      grid-template-columns: 47px 40px 1fr 0 95px;
    }
  }

  @media (min-width: 768px) {
    .header.auth, .header {
      grid-template-columns: 47px 0 120px 1fr 295px;
    }

  }
  @media (min-width: 992px) {
    .header.auth, .header  {
      grid-template-columns: 40px 1fr 390px 295px;
    }
  }
  @media (min-width: 1025px) {
    .header.auth, .header {
      grid-template-columns: 40px 161px 1fr 295px;
    }
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
    background-color: #FFFFFF !important;
    padding: 15px;
  }

  .section-light {
    background: var(--bg-main-categories) !important;
    padding: 15px;
  }
  .menu-categories{
    background: var(--bg-menu-categories-home);
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
