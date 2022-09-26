import { css } from "@emotion/core";

export const sidebarDashStyle = css`
  &.sidebar_container {
    padding: 0;
    transition: all 0.3s ease-in-out;
  }

  &.sidebar_container.active {
    .sidebar_link {
      width: 150px;
      transition: all 0.3s ease-in-out;
    }
    .sidebar_title {
      transition: all 0.3s ease-in-out;
    }
    .sidebar_item {
      padding-left: 15px;
      padding-right: 15px;
      transition: all 0.3s ease-in-out;
    }
    .sidebar_header {
      padding-left: 15px;
      padding-right: 15px;
      transition: all 0.3s ease-in-out;
    }
    .tooltip-custom:hover .tooltiptext {
      visibility: visible;
      transition: all 0.28s ease-out 0.28s;
      opacity: 1;
      transform: translate(0, -50%);
    }
    @media (min-width: 992px) {
      .sidebar_link {
        width: 50px;
        transition: all 0.3s ease-in-out;
      }
    }
  }

  .separador-menu {
    border-top: 0 !important;
    margin: 0;
    @media (min-width: 768px) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      margin: 2.5rem 30px;
    }
  }

  .icon-menu {
    width: 22px;
  }

  .btn-menu {
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--typo);
  }

  .sidebar_header {
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: center;
    height: 74px;
    padding: 0 10px;
    transition: all 0.3s ease-in-out;
    .logo {
      width: 140px;
    }
    @media (min-width: 992px) {
      grid-template-columns: 50px 1fr;
      padding: 0 15px;
      background-color: #0e0f11;
    }
    @media(min-width: 400px){
      .logo {
        width: 180px;
      }
    }
  }

  .sidebar_menu {
    background-color: #0e0f11;
    list-style: none;
    padding: 0;
    height: calc(100vh - 74px);
    @media (min-width: 992px) {
      display: block;
    }
  }

  .sidebar_item {
    font-size: 16px;
    padding: 0 10px;
    transition: all 0.3s ease-in-out;
    &:last-child {
      margin-bottom: 100px !important;
    }
    @media (min-width: 992px) {
      padding: 0 15px;
      &:last-child {
        margin-bottom: 10px !important;
      }
    }
  }

  .sidebar_link {
    width: 100%;
    display: grid;
    grid-template-columns: 40px 1fr;
    min-height: 40px;
    color: var(--typo);
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    @media (min-width: 992px) {
      grid-template-columns: 50px 1fr;
      min-height: 50px;
    }
  }

  .sidebar_icon_container {
    display: flex;
    padding: 3px;
    position: relative;
    border-radius: 50%;
    &.discover {
      background: linear-gradient(to right, #3a378e, #611960);
    }
    &.creators {
      background: linear-gradient(to right, #8e3771, #532097);
    }
    &.channels {
      background: linear-gradient(to right, #3a378e, #209785);
    }
    &.events {
      background: linear-gradient(to right, #48238a, #97208b);
    }
    &.videos {
      background: linear-gradient(to right, #631f8e, #5b55db);
    }
    &.podcasts {
      background: linear-gradient(to right, #3a378e, #209785);
    }
    &.blogs {
      background: linear-gradient(to right, #67172c, #742097);
    }
    &.courses {
      background: linear-gradient(to right, #3a378e, #972089);
    }
    &.communities {
      background: linear-gradient(to right, #3a378e, #209785);
    }
    &.saved {
      background: linear-gradient(to right, #8e3750, #662097);
    }
  }

  .sidebar_link.active .sidebar_icon {
    //background: linear-gradient(
    //  90deg,
    //  rgba(58, 33, 243, 1) 0%,
    //  rgba(243, 33, 94, 1) 100%
    //);
    //border-radius: 10px;
    background-color: transparent;
  }

  .sidebar_icon {
    background-color: var(--sidebar-bg);
    display: grid;
    place-items: center;
    width: 100%;
    border-radius: 50%;
  }

  .sidebar_title {
    display: flex;
    align-items: center;
    line-height: 1.8;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    width: 100%;
    margin-left: 22px;
  }

  .sidebar_title h5 {
    font-size: 16px;
    margin: 0;
    transition: all 0.3s ease-in-out;
  }

  .tooltip-custom {
    position: relative;
  }

  .tooltip-custom .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    border: #fff solid 1px;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 86%;
    transition: all 0.28s ease-out 0.28s;
    transform: translate(-20%, -50%);
    opacity: 0;
  }

  .tooltip-custom .tooltiptext::after {
    content: " ";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
  }
`;
