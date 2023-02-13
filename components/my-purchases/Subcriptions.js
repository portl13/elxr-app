import { css } from "@emotion/core";

export const subscriptionsStyle = css`
  .account-subscription-panel {
    width: 100%;
    display: flex;
  }
  svg{
    width: 30px;
  }
  .status-wrapper {
    flex-direction: column;
    width: 100%;
    display: flex;
    margin: 0 0 25px 0;

    ol {
      margin: 0 0 1.6875rem 18px;
      padding: 0;
      li {
        font-size: 16px;
        line-height: 1.6875rem;
        .main-tag {
          color: var(--typo);
          font-size: 16px;
          display: flex;
          flex-direction: column;
          letter-spacing: -0.24px;
          line-height: 24px;
          margin-top: 8px;
          margin-bottom: 8px;
          word-break: break-word;
          .meta {
            font-weight: 500;
            margin-bottom: 0;
            width: 100%;
            display: flex;
          }
          .description-text {
            font-size: 16px;
            color: #ffffff;
            width: 100%;
            display: flex;
            letter-spacing: -0.24px;
            line-height: 24px;
            word-break: break-word;
            margin: 5px 0 16px 0;
          }
          .attachment-tag {
            color: #ffffff;
            &:hover {
              color: var(--primary-color);
            }
          }
        }
      }
    }
    h2 {
      font-size: 22px;
      line-height: 42px;
      margin: 0 0 10px 0;
    }
  }
  .button-tag {
    width: 100%;
    display: flex;
    justify-content: end;
    margin: 15px 0;
    .order-button {
      background: var(--primary-color);
      border: 1px solid var(--primary-color);
      width: auto;
      display: flex;
      padding: 5px 30px;
      font-size: 14px;
      color: var(--typo);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100px;
      outline: 0;
    }
  }
  .subtotal-ui {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    text-align: right;
    margin: 25px 0 0 0;
  }
  .subtotal-tag {
    width: 100%;
    display: flex;
    color: #a3a5a9;
    font-size: 15px;
    text-transform: uppercase;
    justify-content: space-between;
    margin: 0 0 15px 0;
    span {
      color: #4d5c6d;
      display: inline-block;
      margin-left: 15px;
    }
    @media (min-width: 992px) {
      justify-content: flex-end;
    }
  }
  .upload-panel {
    width: 100%;
    display: flex;
    flex-direction: column;
    .data-panel-12 {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 0 20px 0;
    }
    .submit-button {
      background: var(--primary-color);
      border: 1px solid var(--primary-color);
      width: auto;
      display: flex;
      outline: 0;
      padding: 5px 30px;
      font-size: 14px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100px;
      // margin: 15px 0 0 480px;
      // position: absolute;
      // left: 18%;
      // top: 73%;
      margin-left: 36%;
    }
    .left-panel {
      width: 100%;
      display: flex;
      font-weight: 500;
      font-size: 16px;
    }
    .right-panel {
      width: 100%;
      display: flex;
      .upload-file {
        background: var(--primary-color);
        border: 1px solid var(--primary-color);
        width: auto;
        display: flex;
        padding: 5px 25px;
        font-size: 14px;
        outline: 0;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
      }
      textarea {
        width: 300px;
        height: 100px;
        padding: 10px;
        font-size: 14px;
        color: var(--white-color);
        resize: none;
      }
    }
  }
  .address-panel {
    font-size: 14px;
    color: var(--bg-font);
    width: 100%;
    display: flex;
    line-height: 26px;
    flex-wrap: wrap;
  }
  .address-tag {
    width: 100%;
    display: flex;
    flex-direction: column;
    word-break: break-word;
    @media (min-width: 992px) {
      width: 50%;
    }
  }
  .contact-tag {
    width: 100%;
    display: flex;
    flex-direction: column;
    word-break: break-word;
    svg {
      width: 13px;
      margin: 0 8px 0 0;
    }
    @media (min-width: 992px) {
      width: 50%;
    }
  }
  .related-head {
    display: none;
    width: 100%;
    font-weight: 600;
    padding: 9px 12px;
    line-height: 1.5em;
    text-transform: uppercase;
    align-items: center;
    font-size: 14px;
    @media (min-width: 992px) {
      display: flex;
    }
  }
  .related-coloun-tag {
    width: 100%;
    display: flex;
    font-weight: 500;
    padding: 9px 12px;
    line-height: 1.5em;
    align-items: center;
    font-size: 16px;
    flex-direction: column;
    &:nth-child(odd) {
      background-color: rgba(29, 51, 91, 0.4);
    }
    @media (min-width: 992px) {
      flex-direction: row;
    }
  }
  .view-button {
    background-color: var(--primary-color);
    width: auto;
    border: 1px solid var(--primary-color);
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
    color: var(--white-color);
    outline: 0;
    font-weight: 400;
    height: 25px;
    min-width: 79px;
    line-height: 1.5;
    cursor: pointer;
  }
  .product-name {
    cursor: pointer;
    color: var(--primary-color);
  }
  .col-product {
    padding: 5px 0;
    text-align: center;
  }

  .related-head-item {
    width: calc(100% / 5);
    &.img {
      flex: 0 0 120px;
      width: 120px;
    }
    &.product {
      flex: 1 0 auto;
    }
    &.qty {
      flex: 0 0 50px;
      width: 50px;
    }
    &.total {
      flex: 0 0 80px;
      text-align: right;
      width: 80px;
    }
  }
  .col-view-1 {
    display: flex;
    img {
      width: 100px;
      height: 100px;
    }
    @media (min-width: 992px) {
      flex: 0 0 120px;
    }
  }
  .col-view-2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media (min-width: 992px) {
      flex: 1 0 auto;
    }
  }
  .col-view-3 {
    display: flex;
    @media (min-width: 992px) {
      flex: 0 0 50px;
    }
  }
  .col-view-4 {
    display: flex;
    justify-content: end;
    @media (min-width: 992px) {
      flex: 0 0 80px;
      text-align: right;
    }
  }

  @media (max-width: 991px) {
    .col-view-3::before,
    .col-view-4::before {
      content: attr(data-label);
      margin-right: 10px;
    }
  }

  .related-head-subscription {
    display: none;
    @media (min-width: 992px) {
      display: flex;
    }
  }
  .related-head-subscription-item {
    @media (min-width: 992px) {
      width: calc(100% / 5);
    }
  }
  .col-related-subscription {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 5px 0;
    @media (min-width: 992px) {
      width: calc(100% / 5);
    }
  }

  @media (max-width: 991px) {
    .col-related-subscription::before {
      content: attr(data-label);
    }
  }

  .col-related-1 {
    width: 25%;
    display: flex;
    a {
      color: #a3a5a9;
      &:hover {
        color: var(--primary-color);
      }
    }
  }

  .col-head {
    width: 100%;
    display: flex;
    font-weight: 700;
    padding: 9px 12px;
    line-height: 1.5em;
    text-transform: uppercase;
    align-items: center;
    font-size: 14px;
    .col-card-1 {
      width: 70%;
      display: flex;
      a {
        color: var(--primary-color);
        cursor: pointer;
      }
    }
    .col-card-2 {
      width: 30%;
      display: flex;
    }
  }
  .col-tag {
    width: 100%;
    display: flex;
    font-weight: 500;
    padding: 9px 12px;
    line-height: 1.5em;
    align-items: center;
    font-size: 18px;
    &:nth-child(odd) {
      background-color: rgba(29, 51, 91, 0.4);
    }
    .col-card-1 {
      width: 70%;
      display: flex;
      a {
        color: var(--primary-color);
        cursor: pointer;
      }
      span {
        margin: 0 0 0 3px;
      }
    }
    .col-card-2 {
      width: 30%;
      display: flex;
    }
    .white-color {
      color: #ffffff;
    }
  }
  .account-subscription-wrapper {
    width: 100%;
    display: flex;
    border-radius: 4px;
    font-size: 18px;
    margin-bottom: 1em;
    align-items: center;
    justify-content: space-between;
    svg {
      width: 16px;
      color: #1e85be;
      margin: 0 15px 0 0;
    }
    button {
      color: var(--typo);
      font-size: 14px;
      font-weight: 400;
      margin-left: 30px;
      background-color: var(--primary-color);
      border: 1px solid var(--primary-color);
      border-radius: 100px;
      width: 165px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .col-full-12 {
    width: 100%;
    display: flex;
    font-size: 18px;
    color: var(--bg-font);
    :nth-child(even) {
      background-color: rgba(29, 51, 91, 0.4);
    }
    .main-panel {
      width: 50%;
      display: flex;
      padding: 9px 12px;
      button {
        background-color: var(--primary-color);
        width: auto;
        border: 1px solid var(--primary-color);
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #ffffff;
        outline: 0;
        font-weight: 400;
        height: 34px;
        min-width: 86px;
        line-height: 1.5;
      }
    }
  }
`;
