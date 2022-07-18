import { css } from '@emotion/core'

export const sidebarDashStyle = css`
  &.sidebar_container {
    padding: 0;
  }
  .sidebar_header {
    height: 74px;
    padding-left: 30px;
    padding-right: 30px;
  }
  .sidebar_menu {
    list-style: none;
    padding: 0;
    overflow: auto;
    height: calc(100vh - 74px);
  }
  .sidebar_item {
    font-size: 16px;
    padding-left: 30px;
    padding-right: 30px;
  }
  .sidebar_link {
    display: flex;
    padding: 13px 25px;
    color: var(--typo);
    padding-left: 25px;
  }
  .sidebar_link.active {
    background-color: var(--primary-color);
    border-radius: 10px;
  }
  .sidebar_icon {
    margin-right: 15px;
  }
  .sidebar_title {
    line-height: 1.8;
  }
`
