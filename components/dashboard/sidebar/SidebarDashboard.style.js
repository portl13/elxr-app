import { css } from '@emotion/core'

export const sidebarDashStyle = css`
  &.sidebar_container {
    padding: 0;
    background-color: var(--sidebar-bg);
    transition: all 0.3s ease-in-out;
  }

  &.sidebar_container.active {
    .sidebar_link {
      width: 50px;
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
  }

  .icon-menu{
    width: 22px;
  }

  .btn-menu{
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--typo);
  }

  .sidebar_header {
    display: grid;
    grid-template-columns: 50px 1fr;
    align-items: center;
    height: 74px;
    padding-left: 15px;
    padding-right: 15px;
    transition: all 0.3s ease-in-out;
    .logo{
      margin-left: 25px !important;
    }
  }
  .sidebar_menu {
    list-style: none;
    padding: 0;
    overflow: auto;
    height: calc(100vh - 74px);
  }
  .sidebar_item {
    font-size: 16px;
    padding-left: 15px;
    padding-right: 15px;
    transition: all 0.3s ease-in-out;
  }
  .sidebar_link {
    width: 100%;
    display: grid;
    grid-template-columns: 50px 1fr;
    min-height: 50px;
    color: var(--typo);
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
  .sidebar_link.active {
    background: linear-gradient(
      90deg,
      rgba(58, 33, 243, 1) 0%,
      rgba(243, 33, 94, 1) 100%
    );
    border-radius: 10px;
  }

  .sidebar_icon {
    //margin-right: 15px;
    display: grid;
    place-items: center;
  }
  .sidebar_title {
    display: flex;
    align-items: center;
    line-height: 1.8;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    width: 100%;
  }
  .sidebar_title h5 {
    font-size: 16px;
    margin: 0;
    transition: all 0.3s ease-in-out;
  }
`
