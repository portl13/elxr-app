import { css } from '@emotion/core'

export const SideBarMenuStyle = css`
  position: relative;
  .sidebar-menu-container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 12;
    opacity: 0;
    transition: all .5s ease-in-out;
    display: none;
  }
  .sidebar-menu-container.active {
    display: block;
    opacity: 1;
  }
  .sidebar-menu.active {
    transform: translateX(0);
  }
  .sidebar-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 350px;
    height: 100%;
    background-color: var(--bg);
    transition: all .7s ease-in-out;
    transform: translateX(100%);
    padding: 0 25px;
    z-index: 13;
  }
  .sidebar-icon {
    width: 15px;
    color: var(--typo);
    fill: var(--typo);
  }
  .sidebar-menu-avatar img {
    border-radius: 20px;
  }
  .list-sidebar {
    list-style: none;
    padding-left: 0;
  }
  .list-sidebar-item {
    margin-bottom: 5px;
    font-size: 13px;
  }
  .btn-sign-out:hover {
    color: var(--white-color) !important;
  }
`
