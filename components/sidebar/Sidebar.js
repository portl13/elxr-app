import { css } from '@emotion/core'
import React from 'react'

const navStyle = css`
  width: 245px;
  position: fixed;

  .nav {
    height: auto !important;
  }
  .nav-item.active::before {
    background-color: transparent !important;
  }
  .sub-section-icon, .sub-section-title{
    display: flex;
    align-items: center;
    line-height: 1;
  }
  .nav-item.active .nav-link,
  .nav-item.active .nav-icon svg,
  .nav-item.active .st0 {
    color: var(--primary-color);
    fill: var(--primary-color);
  }
  .custom-icon {
    color: bisque;
  }
  .nav-link {
    color: var(--typo);
  }
  .nav-icon {
    display: flex;
    align-items: center;
    width: 18px;
    svg {
      color: var(--typo);
    }
  }
  .sidebar-title{
    line-height: 1;
    display: flex;
    align-items: center;
  }
  .sub-section {
    &-icon {
      margin-right: 8px;
      margin-left: 40px;
    }
    svg {
      width: 15px;
      color: var(--typo);
    }
  }
  .tab-section {
    display: flex;
    cursor: pointer;
    padding: 10px 0 10px 0;
    &.active,
    &.active svg {
      color: var(--primary-color);
      fill: var(--primary-color);
    }
  }
  .banner-menu {
    margin-top: 20px;
    .logo {
      padding-top: 20px;
      padding-bottom: 20px;
      margin: auto;
      max-width: 70px;
    }
    a {
      color: var(--typo);
    }
  }
  .go-live {
    background-color: #fe025c;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: var(--typo) !important;
      width: 14px;
    }
  }
`

function Sidebar({ children }) {
  return (
    <div css={navStyle} className="wcfm_menu banner-container">
      <ul className="nav flex-column bg-black bd-radius pt-3 px-1">
        {children}
      </ul>
    </div>
  )
}

export default Sidebar
