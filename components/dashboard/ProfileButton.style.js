import { css } from '@emotion/core'

export const profileButtonStyle = css`
  .profile-button-container {
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
  }
  .profile-button-avatar {
    width: 45px;
    height: 45px;
    display: block;
    border-radius: 50%;
    overflow: hidden;
  }
  .profile-button-dropdown-menu {
    margin-top: 45px;
    background-color: var(--bg);
    padding: 0;
  }
  .profile-button-dropdown-item {
    color: var(--typo);
  }
  .profile-button-dropdown-item:hover {
    background-color: var(--text-grey);
  }
`
