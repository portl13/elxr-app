import { css } from '@emotion/core'

export const myWalletStyle = css`
  .wallet-button {
    width: 20px;
    height: 20px;
    display: block;
    @media (min-width: 1200px) {
      display: none;
    }
  }
  .my-wallet-panel {
    width: 100%;
    display: flex;
    border: 1px solid #f2f2f2;
  }
  .woo-wallet-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .main-heading {
      display: flex;
      justify-content: space-between;
      color: var(--typo);
      margin: 0 0 45px 0;
      line-height: 1em;
      font-size: 18px;
      font-weight: 400;
    }
    .woo-wallet-add-amount {
      width: 100%;
      flex-direction: column;
      display: flex;
      .col-tag {
        width: 100%;
        flex-direction: column;
        display: flex;
        margin: 0 0 25px 0;
        position: relative;
        .alert {
          position: absolute;
          width: 100%;
          padding: 2px 15px;
          left: 0;
          bottom: -35px;
          font-size: 14px;
        }
      }
      label {
        color: var(--typo);
        margin-bottom: 0.25rem;
        font-size: 15px;
      }
      .btn-tag {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        button {
          background-color: var(--primary-color);
          border: 1px solid var(--primary-color);
          color: #ffffff;
          border-radius: 100px;
          padding: 6px 25px 5px 25px;
          font-size: 14px;
          display: flex;
          align-items: center;
          outline: 0;
          justify-content: center;
        }
      }
      textarea {
        background-color: var(--dark-color);
        color: #a3a5a9 !important;
        font-size: 14px;
        width: 100%;
        margin: 0;
        outline: 0;
        border-radius: 3px;
        display: inline-block;
        padding: 10px 10px;
        margin: 0 0 10px 0;
        resize: none;
        border: 1px solid var(--white-color);
        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 1px var(--primary-color);
          outline: 2px solid transparent;
        }
      }
      select {
        background-color: var(--dark-color);
        color: #a3a5a9 !important;
        font-size: 14px;
        width: 100%;
        margin: 0;
        outline: 0;
        border-radius: 3px;
        height: 40px;
        display: inline-block;
        padding: 0 10px;
        margin: 0 0 10px 0;
        border: 1px solid var(--white-color);
        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 1px var(--primary-color);
          outline: 2px solid transparent;
        }
      }
      input {
        background-color: var(--dark-color);
        color: #a3a5a9 !important;
        font-size: 14px;
        width: 100%;
        margin: 0;
        outline: 0;
        border-radius: 3px;
        height: 40px;
        display: inline-block;
        padding: 0 10px;
        margin: 0 0 10px 0;
        border: 1px solid var(--white-color);
        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 1px var(--primary-color);
          outline: 2px solid transparent;
        }
      }
    }
    .main-content {
      display: flex;
      justify-content: space-between;
      margin: 0 0 30px;
      line-height: 1em;
      font-size: 16px;
      font-weight: 400;
      .no-transaction {
        width: 100%;
        display: flex;
        font-size: 14px;
        color: #ffffff;
      }
      .right-content {
        width: 20%;
        display: flex;
        justify-content: end;
        &.red-text {
          color: #bf0003;
        }
        &.green-text {
          color: #197f36;
        }
      }
      .left-content {
        width: 80%;
        display: flex;
        flex-direction: column;
        color: #ffffff;
        span {
          font-size: 12px;
          padding: 5px 0 0 0;
        }
      }
    }
  }
  .woo-wallet-sidebar {
    width: 100%;
    display: none;
    padding: 20px 0 0 0;
    flex-direction: column;
    h4 {
      font-size: 1.25rem;
      line-height: 28px;
      color: #ffffff;
      margin: 0 0 10px 0;
      padding: 0;
      text-align: center;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      background: var(--white-color);
      border-radius: 2px;
      text-align: center;
      position: relative;
      max-width: 100%;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      cursor: pointer;
      list-style: none;
      margin: 20px;
      box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
      &:before {
        display: none;
      }
      &.active {
        box-shadow: 0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
        svg {
          color: var(--primary-color);
        }
        a {
          color: var(--primary-color);
          p {
            color: var(--primary-color);
          }
        }
      }
      &:hover {
        box-shadow: 0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
        svg {
          color: var(--primary-color);
        }
        a {
          color: var(--primary-color);
          p {
            color: var(--primary-color);
          }
        }
      }
      svg {
        width: 16px;
        color: var(--typo);
      }
    }
    .wallet-nav {
      padding: 20px;
      display: flex;
      width: 100%;
      color: var(--typo);
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: var(--dark-color);
      border: 1px solid var(--white-color);
      span {
        font-size: 13px;
        color: var(--typo);
      }
      p {
        margin: 0 auto;
        line-height: 1em;
        font-size: 16px;
        color: #ffffff;
      }
    }
    @media (min-width: 992px) {
      width: 30%;
      display: flex;
    }
  }

`
