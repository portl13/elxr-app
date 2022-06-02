import { css } from '@emotion/core'

export const myAccountWrapper = css`
  &.my-account-wrapper {
    background-color: #1b1b1b;
    width: 100%;
    display: flex;
    border-radius: 4px;
    margin-bottom: 30px;
  }
  .main-container-tag {
    width: 100%;
    display: flex;
  }
  .wallet-data-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .bsdatasection {
    padding: 15px;
    width: calc(100% - 230px);
    display: flex;
    flex-direction: column;
    .address-sub-head {
      font-size: 14px;
      color: #a3a5a9;
      margin-bottom: 0;
      font-weight: 400;
      border-bottom: 1px solid #ffffff;
      padding: 0 0 10px 0;
    }
    .inner-sub-heading {
      border-bottom: 1px solid #e7e9ec;
      padding-top: 10px;
      padding: 30px 0 5px;
      color: #ffffff;
      font-size: 14px;
      text-transform: uppercase;
      line-height: 1.6875rem;
    }

    .fx-d {
      flex-direction: column;
    }

    .image-file {
      background: transparent;
      border: 0px solid var(--dark-color);
      color: var(--typo);
      width: 166px;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .wc-subscription-info {
      background-color: var(--dark-color);
      border-radius: 4px;
      border: 1px solid var(--white);
      font-size: 16px;
      margin-bottom: 1em;
      padding: 1em 2em 1em 3.5em;
      margin: 0 0 2em;
      position: relative;
      width: 100%;
      display: flex;
      word-wrap: break-word;
      justify-content: space-between;
      align-items: center;
      svg {
        color: #1e85be;
        width: 15px;
        position: absolute;
        left: 20px;
        top: 21px;
      }
      .browser-tag {
        width: auto;
        height: 32px;
        display: flex;
        background-color: var(--primary-color);
        border: 1px solid var(--primary-color);
        color: #fff;
        justify-content: center;
        align-items: center;
        line-height: 1.3;
        font-size: 14px;
        border-radius: 100px;
        outline: 0;
        padding: 0 15px;
      }
    }
    .payment-btn {
      width: 190px;
      height: 32px;
      display: flex;
      background-color: var(--primary-color);
      border: 1px solid var(--primary-color);
      color: var(--typo);
      justify-content: center;
      align-items: center;
      line-height: 1.3;
      font-size: 14px;
      border-radius: 100px;
      outline: 0;
      padding: 0 15px;
    }
    h2 {
      font-size: 1.5rem;
      line-height: 32px;
      margin: 0 0 10px 0;
    }
    h3 {
      padding: 0 0 10px;
      border-bottom: 1px solid #e7e9ec;
      color: var(--typo);
      margin: 0 0 10px 0;
      font-weight: 400;
      font-size: 1.5rem;
      line-height: 32px;
      flex-direction: column;
      display: flex;
      span {
        font-size: 14px;
        color: #a3a5a9;
        em {
          font-style: normal;
          background-color: #fafbfd;
          color: #4d5c6d;
        }
      }
    }
    p {
      font-size: 14px;
      color: #a3a5a9;
      margin-bottom: 0;
      font-weight: 400;
      a {
        cursor: pointer;
        color: #ffffff;
        &:hover {
          color: var(--primary-color);
        }
      }
    }
    .wc-myaddress-content {
      padding: 20px 0 20px 0;
      width: 100%;
      display: flex;
      .left-content {
        width: 50%;
        display: flex;
        padding: 0 10px 0 0;
        flex-direction: column;
      }
      .wc-Address-title {
        padding: 10px 0 5px;
        display: flex;
        align-items: center;
        position: relative;
        font-size: 14px;
        color: var(--typo);
        text-transform: uppercase;
      }

      .edit-text {
        background: transparent;
        border: 0;
        width: 35px;
        display: flex;
        font-size: 14px;
        color: var(--typo);
        padding: 0;
        margin: 15px 0 0 0;
        outline: 0;
        &:hover {
          color: var(--primary-color) !important;
        }
      }
      .left-content {
        width: 50%;
        display: flex;
        padding: 0 10px 0 0;
        flex-direction: column;
      }
      .right-content {
        width: 50%;
        display: flex;
        padding: 0 0 0 10px;
        flex-direction: column;
      }
    }
    .fl-d {
      flex-direction: column;
    }
  }
  .wc-MyAccount-inner-content {
    padding: 40px 0 20px 0;
    width: 100%;
    display: flex;
  }
  .wc-address-details {
    width: 100%;
    display: flex;
    padding: 5px 0;
    line-height: 21px;
    font-size: 14px;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    word-break: break-wrod;
    color: var(--typo);
    position: relative;
  }
  .wc-Address-title {
    border-bottom: 1px solid #eef0f3;
    padding: 10px 20px 5px;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 14px;
    color: var(--typo);
    text-transform: uppercase;
    .edit-text {
      position: absolute;
      right: 20px;
      top: 10px;
      font-size: 14px;
      color: var(--typo);
      text-transform: capitalize;
      cursor: pointer;
      &:hover {
        color: var(--primary-color);
      }
    }
  }
  .wc-MyAccount-fix-center {
    width: 60%;
    margin: 2em auto;
    text-align: center;
    .icon-tag {
      width: 100%;
      display: flex;
      margin-bottom: 25px;
      justify-content: center;
    }
    .wc-tagline {
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 20px;
      margin-bottom: 25px;
    }
    .button-tag {
      width: 185px;
      height: 48px;
      display: flex;
      background-color: var(--primary-color);
      border: 1px solid var(--primary-color);
      color: #fff;
      justify-content: center;
      align-items: center;
      line-height: 1.3;
      font-size: 14px;
      margin: 0 auto;
      border-radius: 100px;
      outline: 0;
    }
  }
  .datatable-ui {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .row-head {
    display: none;
    width: 100%;
    color: #a3a5a9;
    font-size: 14px;
    text-transform: uppercase;
    align-items: center;
    font-weight: 600;
    border-bottom: 1px solid #cccccc;
    @media (min-width: 992px) {
      display: flex;
    }
  }
  .column-head {
    width: 100%;
    display: flex;
    color: #a3a5a9;
    font-size: 13px;
    border-bottom: 1px solid #cccccc;
    align-items: center;
    flex-direction: column;
    @media (min-width: 992px) {
      flex-direction: row;
    }
  }
  .download-list {
    padding: 10px 15px;
    @media (min-width: 992px) {
      flex: 0 0 20%;
      &.product {
        flex: 0 0 40%;
      }
    }
  }
  .row-download {
    display: flex;
    padding: 10px 15px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: var(--white-color);
    span {
      cursor: pointer;
      &:hover {
        color: var(--primary-color);
      }
    }
    svg {
      width: 11px;
      color: var(--primary-color);
    }
    a {
      background-color: var(--primary-color);
      border: 1px solid var(--primary-color);
      min-height: auto;
      padding: 9px 1.5em;
      margin: 0 0 5px 5px;
      font-size: 13px;
      line-height: 1;
      color: var(--white-color);
      outline: 0;
      border-radius: 100px;
      width: auto;
    }
    @media (min-width: 992px) {
        flex: 0 0 20%;
        &.product {
          flex: 0 0 40%;
        }
    }
  }
  @media (max-width: 991px) {
    .row-download::before {
      content: attr(data-label);
    }
  }
  .wcfm_menu {
    width: 100%;
    display: flex;
    flex-direction: column;
    ul {
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      margin: 0;
      padding: 12px 15px;
      cursor: pointer;
      &:hover {
        color: var(--primary-color);
        background: #202124;
        button {
          color: var(--primary-color);
        }
      }
      &.active {
        background: #202124;
        color: var(--primary-color);
        button {
          color: var(--primary-color);
        }
      }
    }
    svg {
      width: 16px;
      margin: 0 15px 0 0;
    }
    button {
      background: transparent;
      border: 0;
      width: 100%;
      font-size: 14px;
      padding: 0;
      color: #939597;
      text-transform: capitalize;
      font-weight: 400;
      box-shadow: none;
      display: flex;
      align-items: center;
      justify-content: start;
    }
  }
`
