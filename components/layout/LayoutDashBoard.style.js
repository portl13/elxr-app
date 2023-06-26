import { css } from "@emotion/core";

export const layoutDashBoardStyle = css`
  &.main_grid {
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-template-rows: 74px;
    grid-template-areas:
      "header header"
      "content content"
      "footer footer";
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
    grid-template-columns: 40px 0 1fr 0 150px;
    gap: 5px;
    align-items: center;
    background: var(--white-color);
    justify-content: space-between;
    padding: 0 10px;
    height: 74px;
    width: 100%;
    position: fixed;
    transition: all 0.3s ease-in-out;
  }
  
  .footer-main{
    grid-area: footer;
    transition: all 0.3s ease-in-out;
    padding: 20px 15px 70px 15px;
    background: transparent;
    @media(min-width: 992px){
      padding: 40px 15px 30px 15px;
    }
  }

  .footer-site{
    display: flex;
    justify-content: space-evenly;
    list-style: none;
    padding-left: 0;
    margin: 0;
    width: 100%;
    max-width: 500px;
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
    background-color: transparent !important;
    padding: 15px;
  }
  .section-dark, .section-light{
    position: relative;
  }

  .section-dark::after, .section-light::after{
      content: '';
      right: 5%;
      position: absolute;
      width: 90%;
      border-bottom: 1px solid  #312D4E;
  }

  .section-dark.no-border::after, .section-light.no-border::after{
      border-bottom: none;
  }
  
  .section-light {
    background-color: transparent  !important;
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
        "content content"
        "footer footer";
      transition: all 0.3s ease-in-out;
      min-height: 100%;
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
      padding: 50px 45px 0px 45px;
    }
    .section-light {
      padding: 50px 45px 0px 45px;
    }
  }
`;
