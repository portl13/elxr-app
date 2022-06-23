import { css } from '@emotion/core'

export const sidebarMyPortalStyle = css`
  &.sidebar_container {
    padding: 0 30px;
  }
  .sidebar_header{
    min-height: 74px;
  }
  .sidebar_menu {
    list-style: none;
    padding: 0;
  }
  .sidebar_item {
    font-size: 16px;
  }
  .sidebar_link {
    display: flex;
    padding: 13px 0;
    color: var(--typo);
    padding-left: 25px;
  }
  .sidebar_link.active {
    background-color: var(--primary-color);
    border-radius: 10px;
  }
  .sidebar_icon{
    margin-right: 15px;
  }
  .sidebar_title{
    line-height: 1.8;
  }
`
