import { css } from '@emotion/core'

export const metaStyle = css`
  :root {
    --primary-color: #e0116d;
    --primary-hover: #f52b67;
    --primary-active: #d34167;
    --secondary-color: #000;
    --dark-color: #000;
    --bg-channel: #161c32;
    --bg-dashboard : #1D0438;
    --bg: #000;
    --sidebar-bg: #0D0D0D;
    --danger: #ef3e46;
    --color-icon: #99A4DF;

    --header-height: 3rem;
    --nav-width: 68px;
    --typo: #fff;

    --first-color: #000;
    --first-color-light: #fff;
    --white-color: #fff;
    --grey-color: #2e2e2e;
    --z-fixed: 100;
    --text-grey: rgba(255, 255, 255, 0.6);
  }
  .date-selector::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
  .chat-column {
    min-width: 340px;
    max-width: 340px;
    height: calc(100vh - 74px);

    .banned-state {
      height: 100%;
      display: flex;
      align-items: center;
      text-align: center;
    }
  }

  @media screen and (max-width: 807px) {
    .chat-column {
      width: 100%;
      height: 500px;
      position: relative;
    }
  }

  body {
    position: relative;
    background: linear-gradient(160deg, rgba(0,0,0,1) 0%, rgba(20,23,57,1) 60%);
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: var(--typo);
    overflow-x: hidden;
    height: 100%;
  }
  
.main{
  min-height: 600px;
}

  .border-none {
    border: none !important;
  }
  .btn.btn-secondary {
    box-shadow: none;
  }
  .title-page {
    font-size: 15px;
    padding-top: 20px;
  }
  .pt-20 {
    padding-top: 20px;
  }
  //.bg-black {
  //  background-color: var(--dark-color);
  //}
  .bd-radius {
    border-radius: 5px;
  }
  .rc-time-picker-panel-inner {
    background-color: var(--white-color);
  }
  li.rc-time-picker-panel-select-option-selected {
    background: var(--primary-color);
    color: var(--white-color);
    font-weight: bold;
  }
  .rc-time-picker-panel-input {
    background: var(--white-color);
    border: 0;
    color: var(--typo);
  }
  .rc-time-picker-panel-select li:hover {
    background: var(--primary-color);
  }
  .success-toast {
    margin: 10px;
    pointer-events: all;
    background: #5c9c12;
    z-index: 999999;
    position: absolute;
    top: 88px;
    left: 35%;
    width: auto;
    height: 50px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: var(--white-color);
    button {
      background: transparent;
      border: 0;
      margin: 0 0 0 15px;
      color: var(--white-color);
      font-size: 28px;
      transform: rotate(45deg);
      font-weight: 100;
    }
  }
  .error-toast {
    margin: 10px;
    pointer-events: all;
    background: #c43131;
    z-index: 999999;
    position: absolute;
    top: 88px;
    width: auto;
    height: 50px;
    left: 35%;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: var(--white-color);
    button {
      background: transparent;
      border: 0;
      margin: 0 0 0 15px;
      color: var(--white-color);
      font-size: 28px;
      transform: rotate(45deg);
      font-weight: 100;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    color: var(--typo);
  }
  .container {
    max-width: 1440px;
  }
  svg.svg-inline--fa.fa-search.fa-w-16 {
    width: 2em;
    height: 1.5em;
  }

  .btn-primary.round {
    border-radius: 22px;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  b,
  strong {
    font-weight: bold;
  }

  .avatar {
    background-color: var(--dark-color);
  }
  @media (max-width: 767px) {
    .navbar-brand {
      margin: auto;
    }
  }
  .card {
    background-color: transparent;
  }
  .form-control {
    color: var(--typo);
    background-color: rgba(29,51,91,0.4);
    border: 1px solid rgba(29,51,91,0.4);
    border-radius: 27px;
    padding: 0 20px;
  }
  .form-control:focus {
    color: var(--white-color);
    background-color: rgba(29,51,91,.48);
    border: 2px solid rgba(29,51,91,.48);
  }
  .dzu-dropzone {
    overflow: hidden;
  }
  .ratio-16x9 {
    --aspect-ratio: calc(9 / 16 * 100%);
  }
  .ratio-4x3 {
    --aspect-ratio: calc(3 / 4 * 100%);
  }

  .ratio-1x1 {
    --aspect-ratio: 100%;
  }
  .ratio {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .ratio > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
  .ratio iframe{
    height: 100%;
  }
  .ratio::before {
    display: block;
    padding-top: var(--aspect-ratio);
    content: '';
  }
  .channel-br {
    border-radius: 20px;
    background-color: var(--bg-channel);
  }
  .b-radius {
    border-radius: 0.25rem;
  }
  .b-radius-top {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }
  .b-radius-bottom {
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }
  .react-multi-carousel-list {
    width: 100%;
    .react-multi-carousel-track {
      width: 100%;
      li {
        width: 33.33%;
      }
    }
  }

  .content {
    gap: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .left-content {
    display: none;
  }
  .right-content {
    grid-column: 1 / span 1;
  }

  @media (max-width: 1199px) {
    .main {
      padding-bottom: 65px !important;
    }
  }

  @media (min-width: 1200px) {
    .content {
      display: grid;
      grid-template-columns: 250px calc(100% - 260px);
    }
    .left-content {
      display: block;
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
    }
    .left-content.no-menu {
      display: none;
    }
    .right-content {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
    }
    .right-content.no-menu {
      grid-column: 1 / span 2;
    }
  }
  .col-padding {
    padding-left: 25px;
    padding-right: 25px;
  }
  .multi-photos-section {
    overflow-y: hidden;
  }
  .multi-photos-section .act-grid-1-1 {
    overflow: hidden !important;
  }
  .act-grid-1-1 {
    height: auto !important;
    margin: 0 5px;
    width: calc(50% - 10px);
    flex: 0 0 calc(50% - 10px) !important;
  }
  .act-grid-1-1 img {
    height: auto !important;
  }
  .act-grid-1-1::before {
    content: '';
    width: 1px;
    margin-left: -1px;
    float: left;
    height: 0;
    padding-top: calc(591.44 / 1127.34 * 100%);
  }
  .act-grid-1-1::after {
    /* to clear float */
    content: '';
    display: table;
    clear: both;
  }
  .act-grid-1-1 img {
    position: absolute;
    top: 0;
    left: 0;
  }
  .act-grid-1-1 .hover-effect {
    z-index: 1;
  }
  .act-grid-1-1 .popover {
    display: none !important;
  }
  .pointer {
    cursor: pointer;
  }
  .line-title {
    border: 2px solid var(--primary-color);
  }
  .sub-menu-button {
    svg {
      width: 20px;
    }
  }

  .modal.show .modal-dialog {
    height: 100%;
  }
  .react-jitsi-container {
    padding: 1rem;
  }
  .create-feed-panel span {
    color: var(--typo);
  }
  
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 1px solid var(--white-color);
    -webkit-text-fill-color: var(--primary-color);
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
    background-color: transparent;
  }
  
  
  .btn-secondary:not(:disabled):not(.disabled):active {
    color: inherit;
    background-color: transparent;
  }

  .white-border {
    border: 1px solid white !important;
  }

  .radius-25 {
    border-radius: 25px;
  }
`
