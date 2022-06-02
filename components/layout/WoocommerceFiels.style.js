import { css } from '@emotion/core'

export const woocommerceFieldsStyle = css`
  .woocommerce-account-fields {
    width: 100%;
    margin: 2em auto;
    padding: 20px 0;    
    @media (max-width:991px) {
      div[class^="col-"]{
        padding: 0;
      }
    }
    .name-panel {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 3px;
      border: 1px solid #ffffff;
      padding: 10px 15px 10px 15px;
      margin: 0 0 15px 0;
      position: relative;
      .btn-box {
        position: absolute;
        bottom: 20px;
        right: 15px;
        width: auto;
        display: flex;
        .plus-icon {
          background: transparent;
          border: 1px solid #ffffff;
          border-radius: 26px;
          padding: 0;
          height: 22px;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 22px;
          font-size: 16px;
          outline: 0;
          &:hover {
            background: var(--primary-color);
          }
        }
        .cross-icon {
          background: transparent;
          border: 1px solid #ffffff;
          border-radius: 26px;
          padding: 0;
          height: 22px;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 22px;
          font-size: 20px;
          margin: 0 0 0 10px;
          outline: 0;
          transform: rotate(45deg);
          &:hover {
            background: var(--primary-color);
          }
        }
      }
    }
    .change-password {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    .bb-course-points {
      .course-details {
        cursor: pointer !important;
        color: var(--white-color);
        svg {
          width: 12px;
          color: var(--white-color);
        }
      }
    }
    .password-change-ui {
      color: var(--primary-color);
      width: 100%;
      display: flex;
      font-size: 16px;
      padding: 20px 10px 15px 10px;
      font-weight: 500;
    }

    .email-icon-tag {
      position: absolute;
      right: -15px;
      top: 33px;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 94px;
        display: none;
        height: 28px;
        background: var(--primary-color);
        bottom: 100%;
        border-radius: 5px;
        font-size: 11px;
        color: #ffffff;
        left: -3px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 5px 5px;
        text-align: center;
        top: 18px;
        z-index: 9;
        em {
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid var(--primary-color);
          position: absolute;
          top: -4px;
          left: 7px;
        }
      }
      svg {
        width: 16px;
        color: #59bf04;
      }
    }
    .email-cross-tag {
      position: absolute;
      right: -15px;
      top: 33px;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 94px;
        display: none;
        height: 28px;
        background: var(--primary-color);
        bottom: 100%;
        border-radius: 5px;
        font-size: 11px;
        color: #ffffff;
        left: -3px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 5px 5px;
        text-align: center;
        top: 18px;
        z-index: 9;
        em {
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid var(--primary-color);
          position: absolute;
          top: -4px;
          left: 7px;
        }
      }
      svg {
        width: 16px;
        color: #e83f3f;
      }
    }
    .eye-icon {
      position: absolute;
      right: 22px;
      top: 32px;
      svg {
        width: 18px;
        color: #ffffff;
        cursor: pointer;
      }
    }

    .col-checkbox-ui {
      width: 100%;
      display: flex;
      padding: 0 10px;
      align-items: center;
      input {
        width: 16px;
        display: flex;
        margin: 0;
        &:focus {
          border-color: none;
          box-shadow: 0;
          outline: 0 solid transparent;
        }
      }
      span {
        width: calc(100% - 16px);
        display: flex;
        font-size: 13px;
        padding: 0 15px;
        &:focus {
          border-color: none !important;
          box-shadow: 0 !important;
          outline: 0 solid transparent !important;
        }
      }
    }
    .text-tag {
      color: var(--typo);
      font-size: 14px;
      padding: 10px 0;
    }
    button {
      background-color: var(--primary-color);
      border-radius: 100px;
      color: #fff;
      font-size: 14px;
      font-weight: 400;
      outline: 0;
      height: 40px;
      border: 1px solid var(--primary-color);
      width: 147px;
      margin: 0 0 0 auto;
    }
    select {
      background-color: var(--dark-color);
      color: var(--typo) !important;
      border: solid 1px var(--white-color) !important;
      font-size: 14px;
      width: 100%;
      margin: 0;
      outline: 0;
      border-radius: 3px;
      height: 40px;
      display: inline-block;
      padding: 0 10px;
      border: none;
      &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 1px var(--primary-color);
        outline: 2px solid transparent;
      }
    }
    input {
      background-color: var(--dark-color);
      color: var(--typo) !important;
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
    label {
      font-size: 14px;
      line-height: 1.1;
      margin-bottom: 10px;
      color: var(--typo);
      .required {
        display: inline-block;
        color: red;
        margin-left: 2px;
        font-weight: 500;
      }
    }
  }
`
