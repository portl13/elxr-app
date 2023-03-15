import { css } from "@emotion/core";

export const MainStyle = css`
  height: 100%;
  .content {
    .description-wrappper {
      padding: 1.25rem 1.25rem;
      display: flex;
      background-color: #1c1c1c;
      border-radius: 4px;
      border: 1px solid #e7e9ec;
      color: #ffffff;
      width: 100%;
      flex-direction: column;
      margin: 0 0 40px 0;
      .review-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        .comment-reply-title {
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .btn-tag {
          width: 100%;
          display: flex;
          justify-content: end;
          margin: 15px 0 5px 0;
          button {
            width: 102px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #ffffff;
            outline: 0;
            background: var(--primary-color);
            border: 1px solid var(--primary-color);
            border-radius: 100px;
          }
        }
        .comment-box {
          width: 100%;
          diaply: flex;
          flex-direction: column;
          textarea {
            background: #000000;
            border: 1px solid #000000;
            resize: none;
            font-size: 14px;
            color: #ffffff;
            width: 100%;
            display: flex;
            height: 80px;
            padding: 10px;
            outline: 0;
            &:focus {
              border: 1px solid var(--primary-color);
            }
          }
        }
        .stars-tag {
          width: auto;
          display: flex;
          margin: 0 0 20px 0;
          svg {
            width: 14px;
            margin: 0 5px 0 0;
            cursor: pointer;
          }
          &.active {
            svg {
              color: var(--primary-color);
            }
          }
        }
        label {
          font-size: 16px;
          line-height: 1.1;
          margin-bottom: 12px;
          color: #ffffff;
          span {
            color: red;
            margin-left: 2px;
            font-weight: 500;
          }
        }
      }
      h2 {
        font-size: 1.5rem;
        line-height: 32px;
        padding: 0;
        margin: 0 0 20px 0;
      }
      p {
        font-size: 16px;
        margin: 0 0 20px;
        padding: 0;
        wrod-break: break-word;
      }
    }
    .subscription-detail-wrapper {
      display: flex;
      width: 100%;
      flex-direction: column;
      .woocommerce-tabs {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 30px 0 0 0;
        .item-body-content {
          margin: 0;
        }
        ul {
          margin: 0 0 1.618em;
          padding: 0;
          display: flex;
          list-style: none;
          border-bottom: 1px solid #d3ced2;
          li {
            margin: 0 0 -1px 0;
            padding: 10px 15px;
            button {
              padding: 0;
              font-weight: normal;
              font-size: 14px;
              color: #939597;
              border: 0;
              outline: 0;
              background: transparent;
              text-transform: capitalize;
            }
            &:hover {
              button {
                color: var(--primary-color);
              }
            }
            &.active {
              border-bottom: 1px solid var(--primary-color);
              button {
                color: var(--primary-color);
              }
            }
          }
        }
      }
      .woocommerce-breadcrumb {
        font-size: 14px;
        color: #ffffff;
        width: 100%;
        display: flex;
        margin: 0 0 1em;
        a {
          padding: 0 5px;
          color: #ffffff;
          cursor: auto;
        }
      }
      .bsAccount-details-wrapper {
        width: 100%;
        display: flex;
        background-color: #1b1b1b;
        border-radius: 4px;
        border: 1px solid #e7e9ec;
        font-size: 14px;
        .left-section {
          width: 50%;
          display: flex;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            border-radius: 4px 0 0 4px;
          }
          .wffc-icons {
            width: auto;
            display: flex;
            position: absolute;
            left: 10px;
            font-size: 15px;
            color: #ffffff;
            top: 10px;
            background: #1b1b1b;
            padding: 6px 8px;
            border-radius: 3px;
            align-items: center;
            svg {
              width: 15px;
              color: #ffffff;
              cursor: pointer;
            }
            span {
              padding: 0 7px;
            }
          }
        }
        .right-section {
          width: 50%;
          display: flex;
          padding: 30px 20px;
          flex-direction: column;
          h1 {
            line-height: 2rem;
            color: #ffffff;
            font-size: 2rem;
            margin-bottom: 20px;
            letter-spacing: -0.03rem;
            padding: 0;
          }
          .price-tag {
            font-weight: 500;
            margin-bottom: 1.2em;
            width: 100%;
            display: flex;
            color: var(--primary-color);
            font-size: 1.25em;
          }
          .description-tag {
            font-weight: 500;
            margin-bottom: 1.2em;
            width: 100%;
            display: flex;
            color: #ffffff;
            word-break: break-word;
            font-size: 16px;
          }
          .spec-conatiner {
            width: 100%;
            display: flex;
            flex-direction: column;
            .posted-tag {
              width: 100%;
              display: flex;
              margin: 0 0 15px 0;
              .pr-atts-title {
                width: 30%;
                display: flex;
                font-size: 14px;
                color: #a3a5a9;
                padding-right: 5px;
              }
              .pr-atts-data {
                width: 70%;
                display: flex;
                font-size: 14px;
                color: #ffffff;
                padding-right: 5px;
                a {
                  color: #ffffff;
                  &:hover {
                    color: var(--primary-color);
                  }
                }
              }
            }
            h4 {
              text-transform: uppercase;
              font-size: 0.75rem;
              font-weight: 600;
              margin-bottom: 10px;
              border-bottom: 1px solid #e7e9ec;
            }
          }
          .quantity-tag {
            width: 100%;
            display: flex;
            margin: 0 0 30px 0;
            .signup-button {
              background-color: var(--primary-color);
              font-size: 14px;
              border: 1px solid var(--primary-color);
              font-weight: 400;
              padding: 0 3em;
              height: 40px;
              color: #ffffff;
              display: flex;
              justify-content: center;
              align-items: center;
              outline: 0;
              border-radius: 100px;
              margin: 0 0 0 15px;
            }
            .quantity-panel {
              display: flex;
              align-items: center;
              border: 1px solid #dedfe2;
              border-radius: 100px;
              background: #1b1b1b;
              justify-content: center;
              font-size: 14px;
              color: #ffffff;
              width: 94px;
              height: 42px;
              padding: 0 10px 0 10px;
              position: relative;
              .minus-tag {
                position: absolute;
                left: 10px;
                top: 10px;
                font-size: 16px;
              }
              .plus-tag {
                position: absolute;
                right: 10px;
                font-size: 16px;
                top: 10px;
              }
            }
          }
        }
      }
    }
    .notification-panel-ui {
      width: 100%;
      display: flex;
      flex-direction: column;
      .viewing-ui {
        color: #a3a5a9;
        font-size: 13px;
        padding: 35px 0 0 0;
      }
      .notification-header {
        width: 100%;
        display: flex;
        align-items: center;
        margin: 0 0 45px 0;
        .form-control {
          width: 280px;
          height: 34px;
          padding: 0 10px;
          background: var(--white-color);
          border: 0;
          color: var(--typo);
        }
        ul {
          margin: 0;
          padding: 0;
          width: auto;
          display: flex;
          flex-direction: row;
          list-style: none;
          li {
            padding-right: 30px;
            font-size: 13px;
            color: var(--typo);
            &.active {
              button {
                color: var(--primary-color);
                border-bottom: 1px solid var(--primary-color);
              }
            }
            button {
              color: var(--typo);
              padding-bottom: 12px;
              font-size: 13px;
              cursor: pointer;
              background: transparent;
              border: 0;
              padding: 8px 0 12px 0;
              text-transform: capitalize;
              border-radius: 0;
            }
          }
        }
      }
      .notification-data-panel {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 13px;
        cursor: pointer;
        &:hover {
          background: var(--primary-hover);
          border-radius: 2px;
        }
        .notification-icons {
          width: auto;
          display: flex;
          align-items: center;
          .tooltip-panel {
            min-width: 103px;
            display: none;
            height: 26px;
            background: var(--primary-color);
            bottom: 100%;
            border-radius: 5px;
            font-size: 13px;
            color: #ffffff;
            left: -29px;
            margin-bottom: 11px;
            transform: translate(0, 10px);
            transform-origin: top;
            position: absolute;
            padding: 4px 10px;
            text-align: center;
            top: -39px;
            em {
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 5px solid var(--primary-color);
              position: absolute;
              top: 26px;
              left: 44px;
            }
          }
          .delete-panel {
            min-width: 67px;
            display: none;
            height: 26px;
            background: var(--primary-color);
            bottom: 100%;
            border-radius: 5px;
            font-size: 13px;
            color: #ffffff;
            left: -29px;
            margin-bottom: 11px;
            transform: translate(0, 10px);
            transform-origin: top;
            position: absolute;
            padding: 4px 10px;
            text-align: center;
            top: -39px;
            text-transform: capitalize;
            em {
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 5px solid var(--primary-color);
              position: absolute;
              top: 26px;
              left: 44px;
            }
          }
          .svg-tag {
            position: relative;
            &:hover {
              svg {
                color: var(--primary-color);
              }
              .tooltip-panel {
                display: block;
              }
              .delete-panel {
                display: block;
              }
            }
            svg {
              color: #ffffff;
              width: 12px;
              margin: 0 0 0 15px;
              position: relative;
            }
          }
        }
        .notification-options {
          width: 80%;
          display: flex;
          align-items: center;
          .notification-content {
            width: 100%;
            display: block;
            color: var(--typo);
            flex-direction: column;
            font-size: 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            span {
              color: #a3a5a9;
              font-size: 13px;
              padding: 5px 0 0 0;
              display: inherit;
              a {
                font-size: 16px;
                color: #ffffff;
                letter-spacing: -0.24px;
                line-height: 1.3;
                &:hover {
                  color: var(--primary-color);
                }
              }
            }
          }
          .notification-avatar {
            margin-right: 20px;
            position: relative;
            padding: 0 0 0 15px;
            img {
              margin: 0;
              max-width: 52px;
              display: block;
              border-radius: 50%;
            }
          }
        }
      }
      .notification-data-panel:hover .notification-content{
        color: var(--white-color);
      }
      .custom-checkbox {
        transition: 0.3s all;
        color: #fff;
        width: 22px;
        height: 22px;
        font-size: 15px;
        text-align: center;
        line-height: 1;
        z-index: 2;
        position: relative;
        input {
          position: absolute;
          left: 0;
          width: 20px;
          height: 20px;
          z-index: 9999;
          cursor: pointer;
        }
        .custom-control-label {
          &::before {
            border-radius: 3px;
            height: 20px;
            width: 20px;
            background-color: transparent;
          }
          &:after {
            height: 20px;
            width: 20px;
          }
        }
        .custom-control-input:checked ~ .custom-control-label::before {
          border-color: #c9cbca;
          background-color: var(--primary-color);
        }
        .custom-control-input:focus:not(:checked)
          ~ .custom-control-label::before {
          border-color: #c9cbca;
        }
        .custom-control-input:checked ~ .custom-control-label::after {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23FFFFFF' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
        }
      }
      .notification-sub-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 13px;
        cursor: pointer;
        .bulk-panel {
          width: auto;
          display: flex;
          align-items: center;
          .form-control {
            color: var(--typo);
            width: 147px;
            height: 36px;
            background: transparent;
            padding: 0 10px;
            border: 0;
          }
        }
        .apply-button {
          width: 78px;
          height: 34px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          color: #ffffff;
          background: var(--primary-color);
          padding: 0;
          border: 0;
          margin-right: auto;
          margin-left: 30px;
        }
        .sort-button {
          width: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          color: #a3a5a9;
          align-items: center;
          .notifications-order-actions {
            box-shadow: 0 0 0 1px #dedfe2;
            margin-left: 5px;
            padding-top: 1px;
            position: relative;
            width: 20px;
            height: 19px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            &:hover {
              .tooltip-panel {
                display: block;
              }
              .up-arrow {
                border: solid var(--primary-color);
                border-width: 0 2px 2px 0;
                display: inline-block;
                padding: 2px;
              }
              .down-arrow {
                border: solid var(--primary-color);
                border-width: 0 2px 2px 0;
                display: inline-block;
                padding: 2px;
              }
            }
            .tooltip-panel {
              min-width: 98px;
              display: none;
              height: 30px;
              background: var(--primary-color);
              bottom: 100%;
              border-radius: 5px;
              font-size: 13px;
              color: #ffffff;
              left: -41px;
              margin-bottom: 11px;
              transform: translate(0, 10px);
              transform-origin: top;
              position: absolute;
              padding: 6px 10px;
              text-align: center;
              top: -52px;
              em {
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid var(--primary-color);
                position: absolute;
                top: 30px;
                left: 44px;
              }
            }
            .up-arrow {
              border: solid #dedfe2;
              border-width: 0 2px 2px 0;
              display: inline-block;
              padding: 2px;
              transform: rotate(-135deg);
              -webkit-transform: rotate(-135deg);
            }
            .down-arrow {
              border: solid #dedfe2;
              border-width: 0 2px 2px 0;
              display: inline-block;
              padding: 2px;
              transform: rotate(45deg);
              -webkit-transform: rotate(45deg);
            }
          }
        }
      }
    }
    .event-caroual-section {
      padding-bottom: 10px;
    }
    .online-event-tab {
      padding: 0 50px;
    }
    .online-event-tab-section {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .main-event-header {
      h2 {
        margin-bottom: 25px;
        color: #999;
        font-size: 1.5rem;
        line-height: 32px;
      }
      .show-tag {
        a {
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
        }
      }
    }

    .req {
      color: #da0a0f;
    }
    .upload-icon {
      width: 75px;
      height: 75px;
      margin: 0 10px 0 55px;
      cursor: pointer;
    }
    .messages-container {
      width: 100%;
      display: flex;
      padding: 20px 10px;
      flex-flow: row wrap;
      height: 84vh;
      .bp-messages-nav-panel {
        display: block;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 360px;
        flex: 0 0 360px;
        min-width: 0;
        border-right: 1px solid var(--primary-color);
        .main-tag {
          border-bottom: 1px solid var(--primary-color);
          padding: 20px;
          font-size: 17px;
          color: var(--typo);
          align-items: center;
          justify-content: space-between;
          display: flex;
          svg {
            cursor: pointer;
            color: var(--primary-color);
            width: 20px;
          }
        }
        .subnav-filters {
          margin: 15px 20px;
          position: relative;
          .input-group-append {
            position: absolute;
            right: 0;
            border: 0;
            top: -5px;
            outline: 0;
            button {
              background: transparent;
              border: 0;
              svg {
                width: 12px;
                color: #ffffff;
              }
            }
          }
          input {
            background-color: transparent;
            border: 1px solid #dedfe2;
            box-shadow: none;
            border-radius: 100px;
            margin: 0;
            position: relative;
            width: 100%;
            padding: 5px 20px;
            font-size: 14px;
            color: #ffffff;
          }
        }
        .message-left-panel {
          width: 100%;
          display: flex;
          flex-direction: column;
          max-height: 66vh;
          overflow-y: scroll;
          .message-notfication-box {
            cursor: pointer;
            width: 100%;
            display: flex;
            flex-direction: row;
            padding: 10px 20px 10px 15px;
            align-items: center;
            position: relative;
            &:hover {
              .cross-icon {
                display: block;
              }
            }
            .cross-icon {
              position: absolute;
              right: 11px;
              bottom: -1px;
              display: none;
              color: #a3a5a9;
              font-size: 24px;
              transform: rotate(45deg);
            }
            .thread-date {
              flex: 0 0 20%;
              padding: 7px 9px 0 5px;
              margin-bottom: auto;
              color: #a3a5a9;
              letter-spacing: -0.19px;
              min-width: 0;
              line-height: 1;
              font-size: 11px;
              text-align: right;
              position: relative;
              .dots-tag {
                height: 8px;
                width: 8px;
                border-radius: 100%;
                position: absolute;
                background-color: #ffffff;
                top: 8px;
                right: -5px;
              }
            }
            .thread-content {
              flex: 1;
              line-height: 1;
              min-width: 0;
              .thread-to {
                font-size: 14px;
                margin-bottom: 5px;
                opacity: 0.85;
                color: #a3a5a9;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
                text-transform: capitalize;
                &:hover {
                  color: #ffffff;
                }
              }
              .thread-subject {
                color: #939597;
                font-size: 12px;
                letter-spacing: -0.21px;
                line-height: 1.5;
                max-width: 100%;
                display: flex;
                align-items: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                span {
                  padding: 0 0 0 5px;
                }
              }
            }
            .multi-image-tag {
              flex: 0 0 45px;
              margin-right: 15px;
              max-width: 60px;
              position: relative;
              height: 45px;
              .img-tag {
                border: 2px solid #fff;
                max-width: 34px;
                position: absolute;
                left: 0;
                top: 0;
                width: 34px;
                height: 34px;
                border-radius: 100%;
              }
              .img-avtar {
                top: auto;
                right: 0;
                bottom: 0;
                left: auto;
                border: 2px solid #fff;
                max-width: 34px;
                position: absolute;
                width: 34px;
                height: 34px;
                border-radius: 100%;
              }
            }
            .image-tag {
              flex: 0 0 45px;
              margin-right: 15px;
              max-width: 60px;
              img {
                width: 45px;
                height: 45px;
                border-radius: 100%;
              }
            }
          }
          .message-left-empty {
            text-align: center;
            padding: 35px;
            span {
              color: #939597;
              font-size: 15px;
            }
          }
        }
      }
      .bp-messages-content {
        flex: 1;
        min-width: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        .message-thread-list {
          &.new-message {
            border-top: 1px solid white !important;
            .css-1s2u09g-control {
              background: #000;
              border: 0;
            }
            .css-1s2u09g-control {
              .css-1rhbuit-multiValue {
                font-size: 14px;
                letter-spacing: -0.24px;
                display: flex;
                padding: 3px 5px;
                align-items: center;
                margin-right: 10px;
                margin-bottom: 5px;
                background-color: #4d5c6d !important;
                border-color: #4d5c6d !important;
                color: #ffffff;
                .css-xb97g8 {
                  &:hover {
                    background-color: transparent;
                    color: #ffffff;
                  }
                }
                .css-12jo7m5 {
                  font-size: 14px;
                  color: #ffffff;
                }
              }
            }
            .css-1pahdxg-control {
              background: #000;
              border: 0;
              outline: 0;
              .css-1rhbuit-multiValue {
                font-size: 14px;
                letter-spacing: -0.24px;
                display: flex;
                padding: 3px 5px;
                align-items: center;
                margin-right: 10px;
                margin-bottom: 5px;
                background-color: #4d5c6d !important;
                border-color: #4d5c6d !important;
                color: #ffffff;
                .css-xb97g8 {
                  &:hover {
                    background-color: transparent;
                    color: #ffffff;
                  }
                }
                .css-12jo7m5 {
                  font-size: 14px;
                  color: #ffffff;
                }
              }
              .css-14el2xx-placeholder {
                font-size: 15px;
                color: #ffffff;
              }
            }
          }
          background: 0 0;
          border: 0;
          padding: 10px 20px;
          -webkit-box-flex: 1;
          -ms-flex: auto;
          flex: auto;
          height: auto;
          max-height: calc(69vh - 125px);
          overflow: auto;
          min-height: calc(69vh - 125px);
          .main-box-panel {
            display: flex;
            padding: 10px 0;
            .bp-avatar-wrap {
              margin-right: 18px;
              max-width: 38px;
              flex: 1;
              min-width: 0;
              img {
                width: 38px;
                height: 38px;
                border-radius: 100%;
              }
            }
            .single-message-content {
              flex: 1;
              min-width: 0;
              .message-metadata {
                line-height: 1;
                margin-bottom: 5px;
                font-size: 12px;
                letter-spacing: -0.2px;
                line-height: 1.21;
                color: #a3a5a9;
                span {
                  font-weight: bolder;
                  color: #ffffff;
                  font-size: 14px;
                  margin: 0 7px 0 0;
                }
              }
              .bb-activity-media-wrap {
                width: 100%;
                align-items: flex-start;
                position: relative;
                flex-flow: row wrap;
                margin: 0 -3px;
                display: flex;
                .bb-activity-media-elem {
                  min-width: 20%;
                  padding: 3px;
                  a {
                    position: relative;
                    overflow: hidden;
                    padding-top: 100%;
                    display: block;
                    border-radius: 3px;
                    img {
                      position: absolute;
                      top: 0;
                      bottom: 0;
                      left: 0;
                      right: 0;
                      margin: auto;
                      z-index: 0;
                      min-height: 100%;
                      width: auto;
                      border: 0;
                      font-style: italic;
                      height: auto;
                      max-width: 100%;
                      object-fit: cover;
                    }
                  }
                }
              }
              .message-content-wrap {
                font-size: 14px;
                clear: both;
                overflow: hidden;
                margin: 0 auto;
                letter-spacing: -0.2px;
                line-height: 1.28;
                overflow: initial;
                color: #a3a5a9;
                font-size: 14px;
                word-break: break-all;
              }
            }
          }
        }
        .send-reply {
          margin: 0;
          width: 100%;
          -webkit-box-pack: end;
          -ms-flex-pack: end;
          justify-content: flex-end;
          -webkit-box-align: end;
          -ms-flex-align: end;
          align-items: flex-end;
          display: flex;
          .bp-message-content {
            padding: 10px;
            width: 100%;
            border-top: 1px solid #e7e9ec;
            .rdw-option-wrapper {
              &:hover {
                background-color: var(--bg);
              }
            }
            .post-element-panel {
              svg {
                color: #ffffff;
              }
            }
            .medium-editor-element {
              margin: 0 -20px;
              padding: 0 20px;
              overflow: auto;
              textarea {
                font-size: 16px;
                color: #ffffff;
                line-height: 1.28;
                background: transparent;
                border: 0;
                min-height: 60px;
                max-height: 120px;
                resize: none;
                width: 100%;
              }
            }
            .submit-wrapper {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .messages-toolbar {
                padding: 5px 15px 0 0;
                width: 100%;
                justify-content: flex-start;
                display: flex;
                align-items: center;
                .post-update-toolbar {
                  display: flex;
                  padding: 0 15px;
                  flex-direction: row;
                  .post-element-panel {
                    cursor: pointer;
                    margin-right: 15px;
                    position: relative;
                    svg {
                      height: 18px;
                      width: 18px;
                      color: #ffffff;
                      margin: 0 5px 0 0;
                    }
                    &:hover {
                      .tooltip-panel {
                        display: block;
                      }
                    }
                    .tooltip-panel {
                      min-width: 122px;
                      display: none;
                      height: 28px;
                      background: var(--primary-color);
                      bottom: 100%;
                      border-radius: 5px;
                      font-size: 12px;
                      color: #ffffff;
                      left: 0;
                      margin-bottom: 11px;
                      transform: translate(0, 10px);
                      transform-origin: top;
                      position: absolute;
                      padding: 5px 10px;
                      text-align: center;
                      top: -45px;
                      em {
                        width: 0;
                        height: 0;
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-top: 5px solid var(--primary-color);
                        position: absolute;
                        top: 28px;
                        left: 5px;
                      }
                    }
                  }
                }
              }
              .reply-submit-button {
                padding: 0;
                background-color: var(--primary-color);
                border-radius: 100px;
                font-size: 14px;
                font-weight: 500;
                min-height: 34px;
                padding: 4px 15px;
                line-height: 1.3;
                border: 1px solid transparent;
                outline: 0;
                -webkit-transition: 0.3s all;
                transition: 0.3s all;
                width: 132px;
                align-items: center;
                display: flex;
                justify-content: center;
                text-transform: capitalize;
              }
            }
          }
        }
        .single-message-thread-header {
          border-bottom: 0;
          display: flex;
          align-items: center;
          min-height: 65px;
          padding: 0 20px;
          position: relative;
          .actions-container {
            margin: 0;
            position: absolute;
            background: #fff;
            box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%),
              0 6px 32px 0 rgb(18 43 70 / 10%);
            border-radius: 4px;
            padding: 5px 0;
            right: -20px;
            top: 35px;
            z-index: 119;
            list-style: none;
            min-width: 200px;
            &::before {
              width: 0;
              content: '';
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              position: absolute;
              border-bottom: 8px solid #fff;
              top: -8px;
              right: 14px;
            }
            ul {
              list-style: none;
              width: 100%;
              padding: 0;
              margin: 0;
              li {
                margin: 0;
                list-style: none;
                font-size: 13px;
                font-weight: inherit;
                color: #939597;
                letter-spacing: -0.24px;
                line-height: 1;
                margin-bottom: 1px;
                display: block;
                padding: 10px 12px;
                cursor: pointer;
                &:hover {
                  color: var(--primary-color);
                  background-color: #f5f5f5;
                }
                svg {
                  width: 16px;
                  margin-right: 10px;
                }
              }
            }
          }
          .actions {
            position: absolute;
            right: 20px;
            svg {
              width: 5px;
              cursor: pointer;
            }
          }
          .thread-participants {
            margin: 0;
            width: auto;
            font-size: 16px;
            color: #122b46;
            letter-spacing: -0.27px;
            color: #ffffff;
            flex-flow: row wrap;
            padding: 10px 20px 10px 0;
            display: flex;
            align-items: center;
            flex-direction: column;
            .thread-date {
              color: #a3a5a9;
              font-size: 13px;
              font-weight: 400;
              padding: 3px 0 0 0;
              width: 100%;
            }
            .participants-name {
              line-height: 1.2em;
              width: 100%;
              a {
                color: #ffffff;
                &:hover {
                  color: var(--primary-color);
                }
              }
            }
          }
        }
      }
    }
    .item-wrapper-panel {
      width: 100%;
    }
    .pending-invite-wrapper {
      padding: 0;
      .member-wrapper {
        padding: 0;
        .infinite-scroll-component {
          overflow-x: hidden !important;
        }
        h2 {
          font-size: 24px;
          padding: 20px;
          line-height: 32px;
        }
        .list-wrap-inner {
          position: relative;
          .cross-icon {
            color: #939597;
            width: 22px;
            height: 22px;
            border-radius: 100%;
            border: 1px solid #939597;
            font-size: 22px;
            position: absolute;
            right: 0;
            transform: rotate(45deg);
            top: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          .item-avatar {
            img {
              width: 52px;
              height: 52px;
              border-radius: 100%;
            }
          }
          .list-title {
            flex-flow: row wrap;
            flex: 1;
            display: flex;
            color: #ffffff;
            margin-bottom: 5px;
            font-size: 20px;
            margin: 0 auto;
            width: 100%;
            flex-direction: column;
            span {
              color: #a3a5a9;
              letter-spacing: -0.24px;
              line-height: 1.3;
              font-size: 12px;
              font-weight: 300;
              a {
                width: 20px;
                height: 20px;
                border-radius: 100%;
                margin: 0 0 0 10px;
                img {
                  width: 20px;
                  height: 20px;
                  border-radius: 100%;
                }
              }
            }
          }
        }
      }
    }
    
    .tribe-events-pro-photo {
      border: 0;
      margin: 0;
      padding: 0;
      .listing-view {
        .tribe-common-g-col {
          width: 100% !important;
          display: flex;
          .featured-image-wrapper {
            order: 2;
            margin-bottom: 0;
            width: 37.5%;
          }
          .event-details-wrapper {
            order: 1;
            width: 62.5%;
            .tribe-common-h6 {
              font-size: 24px !important;
              line-height: 1.42 !important;
            }
          }
        }
      }
      .tribe-common-g-row {
        margin-left: -24px;
        margin-right: -24px;
        display: flex;
        flex-wrap: wrap;
        .tribe-common-g-col {
          padding-left: 24px;
          padding-right: 24px;
          margin-bottom: 48px;
          width: 33.333%;
          .featured-image-wrapper {
            flex: none;
            margin-bottom: 12px;
            position: relative;
            a {
              img {
                border-style: none;
                height: auto;
                max-width: 100%;
              }
            }
          }
          .event-details-wrapper {
            display: flex;
            align-items: center;
            .event-date-tag {
              flex: none;
              min-width: 0;
              width: 40px;
              margin-right: 12px;
              .event-date-tag-datetime {
                display: flex;
                flex-direction: column;
                text-align: center;
                .event-date-tag-month {
                  font-size: 11px;
                  font-weight: 400;
                  line-height: 1.5;
                  text-transform: uppercase;
                  color: #5d5d5d;
                }
                .event-date-tag-weekday {
                  color: #a3a5a9;
                  font-size: 24px;
                  line-height: 1.42;
                }
              }
            }
            .event-details {
              flex: auto;
              margin-top: -3px;
              .tribe-common-b2 {
                font-size: 13px;
                line-height: 1.62;
                color: #ffffff;
                font-weight: 100;
              }
              .tribe-common-h6 {
                font-size: 16px;
                line-height: 1.62;
                a {
                  color: var(--primary-color);
                }
              }
            }
          }
        }
      }
    }
    .tribe-events-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin: 30px 0;
      padding: 0 25px 0 0;
      justify-content: space-between;
      .custom-arrow-panel {
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .view-panel {
          color: #f6f6f6;
          font-size: 14px;
          padding: 0 0 0 20px;
          a {
            color: #f6f6f6;
            &:hover {
              color: #ffffff;
            }
          }
        }
        .arrow-panel {
          width: auto;
          display: flex;
          align-items: center;
          .back-arrow {
            border: solid #bababa;
            border-width: 0 2px 2px 0;
            display: inline-block;
            padding: 6px;
            transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
            cursor: pointer;
          }
          .right-arrow {
            border: solid #bababa;
            border-width: 0 2px 2px 0;
            display: inline-block;
            padding: 6px;
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            cursor: pointer;
          }
        }
      }
      .tribe-container {
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .button-tag {
          color: var(--primary-color);
          font-size: 12px;
          line-height: 1.38;
          font-weight: 400;
          background-color: #fff;
          border: 1px solid #d5d5d5;
          border-radius: 4px;
          text-align: center;
          padding: 6px 15px;
          width: auto;
          height: 30px;
          margin-right: 15px;
        }
        .date-panel {
          font-size: 16px;
          font-weight: 300;
          line-height: 1;
        }
      }
    }
    .member-wrapper {
      margin: 0;
      padding: 0 35px 0 20px;
      display: flex;
      width: 100%;
      flex-direction: column;
      .main-container {
        display: flex;
        padding: 0;
        margin: 0;
        .main-inner-box {
          float: left;
          list-style-type: none;
          margin: 0;
          text-transform: capitalize;
          &:not(:last-child) {
            padding-right: 20px;
          }
          &:hover {
            a,
            button {
              color: var(--typo);
              border-bottom-color: #ffffff;
              background: transparent;
            }
          }
          &.active {
            a,
            button {
              color: var(--typo);
              border-bottom-color: #ffffff;
            }
          }
          a,
          button {
            padding: 0 0 10px;
            color: var(--typo);
            border: 0;
            text-transform: capitalize;
            font-weight: 300;
            border-bottom: 1px solid transparent;
            display: inline-block;
            border-radius: 0 !important;
            background: transparent;
            &:hover,
            &:active {
              background: transparent !important;
              color: var(--primary-color) !important;
              border-bottom-color: #ffffff !important;
            }
          }
        }
      }
      .member-justify-between {
        justify-content: space-between;
        .profile-container {
          width: 300px;
          position: relative;
          .input-group-append {
            position: absolute;
            top: 30px;
            right: 26px;
            button {
              background: transparent;
              width: 25px;
              height: 25px;
              border: 0;
              svg {
                position: relative;
                top: -8px;
                right: 12px;
                color: #666666;
              }
            }
          }
        }
        &.no-top {
          margin-top: -45px;
        }
      }
      .member-recent-activity-panel {
        width: auto;
        display: flex;
        flex-direction: row;
      }
      .profile-container {
        width: 35%;
        border-radius: 4px;
        font-size: 0.875rem;
        line-height: 1.35;
        background: var(--dark-color);
        margin: 25px 0;
        padding: 25px 20px;
        .title-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--typo);
          letter-spacing: 0.25px;
          margin: 5px 0 20px 0;
          line-height: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          text-transform: uppercase;
        }
        .submit-wrapper {
          width: 100%;
          color: var(--typo);
          font-size: 0.875rem;
          line-height: 1.35;
        }
      }
      .member-container-panel {
        .loader-container {
          margin-left: 50%;
        }
        .list-wrap {
          padding: 0;
          margin: 0 0;
          list-style: none;
        }
        .list-wrap-inner {
          display: flex;
          padding: 15px 20px;
          position: relative;
          -webkit-transition: box-shadow linear 0.2s;
          transition: box-shadow linear 0.2s;
        }
        .item-avatar {
          float: left;
          margin-right: 20px;
          a {
            display: inline-block;
            position: relative;
            img.avatar {
              max-width: 52px;
              border-radius: 50%;
              margin: 0;
            }
          }
        }
        .item {
          flex: 1;
          display: flex;
          flex-flow: row wrap;
          overflow: visible;
        }
        .item-block {
          width: auto;
          flex: 0 0 28%;
          margin-right: 0;
        }
        .list-title {
          margin: 0 0 6px;
          word-break: break-word;
          font-size: 14px;
          line-height: 1.35;
          a {
            color: var(--typo);
            font-size: 20px;
            font-weight: 500;
            line-height: 1.2;
          }
        }
        .item-meta {
          line-height: 1.3;
          font-size: 12px;
          font-weight: 300;
          color: #a3a5a9;
          margin: 0;
        }
        .member-button-wrap {
          display: flex;
          align-items: center;
          flex-flow: row wrap;
          flex: 1;
          justify-content: flex-end;
        }
        .followers-wrap {
          display: flex;
          align-items: center;
          flex: 1;
          font-size: 14px;
          color: #939597;
          line-height: 1;
          margin: 5px 0;
          padding: 0 10px;
          b {
            color: #4d5c6d;
            font-weight: 400;
            margin-right: 3px;
          }
        }
        .following-wrap {
          display: flex;
          align-items: center;
          flex: 1;
          font-size: 14px;
          color: #939597;
          line-height: 1;
          margin-bottom: 5px;
          margin-top: 5px;
        }
        .generic-button {
          margin: 0 0 0 20px;
          display: block;
          a {
            color: #939597;
            line-height: 1;
            min-height: 1px;
            position: relative;
            cursor: pointer;
            svg {
              height: 17px;
              width: 17px;
            }
            &:hover {
              .tooltip-panel {
                display: block;
              }
            }
            .connectivity-text {
              min-width: 195px !important;
              left: -85px !important;
              em {
                left: 85px !important;
              }
            }
            .tooltip-panel {
              min-width: 82px;
              display: none;
              height: 30px;
              background: #f2f2f2;
              bottom: 100%;
              border-radius: 5px;
              font-size: 12px;
              color: #000000;
              left: -34px;
              margin-bottom: 11px;
              transform: translate(0, 10px);
              transform-origin: top;
              position: absolute;
              padding: 9px 10px;
              text-align: center;
              top: 20px;
              em {
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid #f2f2f2;
                position: absolute;
                top: -5px;
                left: 35px;
              }
            }
          }
          .following-white-text {
            color: #ffffff !important;
          }
        }
        .follow-button {
          min-width: 140px;
          color: var(--white-color);
          background: var(--primary-color);
          overflow: hidden;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          min-height: 34px;
          padding: 6px 20px;
          outline: 0;
          border: none;
        }
        .footer-button-wrap {
          margin: 0 -20px 0;
          align-items: center;
          position: absolute;
          width: 100%;
          bottom: 0;
          display: flex;
          flex-flow: row wrap;
          flex: 1;
          justify-content: flex-end;
          & > .generic-button {
            flex: 1;
            margin: 0;
            display: flex;
            align-items: center;
            min-height: 35px;
            padding: 6px 10px 7px;
            justify-content: center;
          }
        }
        .connection-button {
          background: #000;
          border-color: #ffffff;
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          min-height: 32px;
          line-height: 32px;
          padding: 0 20px;
          margin: 5px 15px 5px 0;
          -webkit-font-smoothing: initial;
          -moz-font-smoothing: initial;
          box-shadow: none;
          border-radius: 100px;
          min-width: 140px;
        }
        .primary-button {
          background: #000;
          border-color: #ffffff;
          color: var(--primary-color);
          font-size: 13px;
          font-weight: 500;
          min-height: 32px;
          line-height: 32px;
          padding: 0 20px;
          margin: 5px 15px 5px 0;
          -webkit-font-smoothing: initial;
          -moz-font-smoothing: initial;
          box-shadow: none;
          border-radius: 100px;
          min-width: 140px;
          &:last-child {
            min-width: 90px;
          }
          &:hover,
          &:active,
          &:focus {
            background-color: var(--primary-color);
            border-color: var(--primary-color);
            color: #fff;
          }
        }
        .pagination {
          padding: 10px 0;
          position: relative;
          width: 100%;
          margin: 0;
          .page-count {
            float: left;
          }
          .page-data {
            color: #a3a5a9;
            font-size: 14px;
            margin: 0;
          }
        }
      }
      .action-panel {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 20px;
        .has-tooltip {
          padding: 4px 7px;
          position: relative;
          opacity: 0.4;
          color: #fff;
          &:last-child {
            border-left: 1px solid #fff;
          }
          .popover {
            display: none;
            transition: all 0.18s ease-out 0.18s;
            white-space: nowrap;
            .popover-body {
              font-weight: 500;
              font-size: 13px;
              line-height: 1.3;
              padding: 7px 15px;
            }
            &.bs-popover-top {
              margin-bottom: 0.5rem;
              .arrow {
                bottom: calc((0.5rem + 1px) * -1);
                margin: 0 1.5rem;
                &::before {
                  bottom: 0;
                  border-width: 0.5rem 0.5rem 0;
                  border-top-color: transparent;
                }
                &::after {
                  bottom: 1px;
                  border-width: 0.5rem 0.5rem 0;
                  border-top-color: #fff;
                }
              }
            }
          }
          &:hover {
            opacity: 1;
            color: #e0116d;
            .popover {
              display: block;
              transform: translate(-40%, -130%);
              &.bs-popover-top .arrow {
                margin: 0 2.3rem;
              }
            }
          }
        }
        svg {
          height: 18px;
          width: 18px;
        }
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-color: #1b1b1b;
          border: 1px solid #000000;
          color: #fff;
          width: auto;
          min-width: 140px;
          border-radius: 3px;
          margin-bottom: 0 !important;
          margin-right: 12px;
          &:hover,
          &:active,
          &:focus {
            background-color: #1b1b1b;
            border-color: #e0116d;
            color: #fff;
          }
        }
      }
      .members-list {
        padding: 0;
        margin: 0 0 20px;
        clear: both;
        list-style: none;
        width: 100%;
        &:not(.grid) .only-grid-view {
          display: none;
        }
        &.grid {
          display: flex;
          flex-flow: row wrap;
          margin-bottom: 20px;
          width: auto;
          .member-column-section {
            flex-direction: row;
          }
          .only-list-view {
            display: none;
          }
          .list-wrap {
            margin: 0 0 20px;
            padding: 0 10px;
            .list-wrap-inner {
              height: 100%;
              min-height: 40px;
              padding: 15px 20px 52px 20px;
              flex-direction: column;
            }
          }
          .item-avatar {
            margin: 10px 0 18px;
            text-align: center;
            width: auto;
            float: none;
            a {
              img.avatar {
                max-width: 126px;
                width: 100%;
                display: inline-block;
                height: auto;
              }
            }
          }
          .item {
            width: 100%;
            left: 0;
            margin: 0 auto;
            float: none;
            text-align: center;
            flex-flow: column;
          }
          .item-block {
            margin-bottom: 10px;
          }
          .follow-container {
            display: flex;
            align-items: center;
            width: 100%;
            flex-flow: row wrap;
            justify-content: space-between;
            & > div {
              flex: unset;
            }
          }
          .follow-button {
            button {
              color: var(--primary-color);
              border: 0;
              border-radius: 0;
              box-shadow: none;
              line-height: 1.3;
              min-height: 1px;
              padding: 0;
              outline: 0;
            }
          }
        }
        .members-list-header {
          font-size: 15px;
          color: var(--primary-color);
        }
        .member-column-section {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
      }
      .list-wrap {
        padding: 0;
        margin: 0 0;
        list-style: none;
      }
      .list-wrap-inner {
        display: flex;
        padding: 15px 20px;
        position: relative;
        -webkit-transition: box-shadow linear 0.2s;
        transition: box-shadow linear 0.2s;
      }
      .item-avatar {
        float: left;
        margin-right: 20px;
        a {
          display: inline-block;
          position: relative;
          img.avatar {
            max-width: 52px;
            border-radius: 50%;
            margin: 0;
          }
        }
      }
      .item {
        flex: 1;
        display: flex;
        flex-flow: row wrap;
        overflow: visible;
      }
      .item-block {
        width: auto;
        flex: 0 0 28%;
        margin-right: 0;
      }
      .list-title {
        margin: 0 0 6px;
        word-break: break-word;
        font-size: 14px;
        color: #122b46;
        line-height: 1.35;
        a {
          color: #fff;
          font-size: 20px;
          font-weight: 500;
          line-height: 1.2;
        }
      }
      .item-meta {
        line-height: 1.3;
        font-size: 12px;
        font-weight: 300;
        color: #a3a5a9;
        margin: 0;
      }
      .member-button-wrap {
        display: flex;
        align-items: center;
        flex-flow: row wrap;
        flex: 1;
        justify-content: flex-end;
      }
      .followers-wrap {
        display: flex;
        align-items: center;
        flex: 1;
        font-size: 14px;
        color: #939597;
        line-height: 1;
        margin: 5px 0;
        padding: 0 10px;
        b {
          color: #4d5c6d;
          font-weight: 400;
          margin-right: 3px;
        }
      }
      .following-wrap {
        display: flex;
        align-items: center;
        flex: 1;
        font-size: 14px;
        color: #939597;
        line-height: 1;
        margin-bottom: 5px;
        margin-top: 5px;
      }
      .generic-button {
        margin: 0 0 0 20px;
        display: block;
        a {
          color: #939597;
          line-height: 1;
          min-height: 1px;
          svg {
            height: 17px;
            width: 17px;
          }
        }
      }
      .follow-button {
        border-color: #ffffff;
        min-width: 140px;
        color: var(--primary-color);
        background: #000000;
        button {
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          min-height: 34px;
          padding: 6px 20px;
          outline: 0;
        }
      }
      .footer-button-wrap {
        margin: 0 -20px 0;
        align-items: center;
        position: absolute;
        width: 100%;
        bottom: 0;
        display: flex;
        flex-flow: row wrap;
        flex: 1;
        justify-content: flex-end;
        & > .generic-button {
          flex: 1;
          margin: 0;
          display: flex;
          align-items: center;
          min-height: 35px;
          padding: 6px 10px 7px;
          justify-content: center;
        }
      }
      .connection-button {
        background: #000;
        border-color: #ffffff;
        color: #ffffff;
        font-size: 13px;
        font-weight: 500;
        min-height: 32px;
        line-height: 32px;
        padding: 0 20px;
        margin: 5px 15px 5px 0;
        -webkit-font-smoothing: initial;
        -moz-font-smoothing: initial;
        box-shadow: none;
        border-radius: 100px;
        min-width: 140px;
      }
      .primary-button {
        background: #000;
        border-color: #ffffff;
        color: var(--primary-color);
        font-size: 13px;
        font-weight: 500;
        min-height: 32px;
        line-height: 32px;
        padding: 0 20px;
        margin: 5px 15px 5px 0;
        -webkit-font-smoothing: initial;
        -moz-font-smoothing: initial;
        box-shadow: none;
        border-radius: 100px;
        min-width: 140px;
        &:last-child {
          min-width: 90px;
        }
        &:hover,
        &:active,
        &:focus {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          color: #fff;
        }
      }
      .pagination {
        padding: 10px 0;
        position: relative;
        width: 100%;
        margin: 0;
        .page-count {
          float: left;
        }
        .page-data {
          color: #a3a5a9;
          font-size: 14px;
          margin: 0;
        }
      }
      &.no-top {
        margin: 0 !important;
      }
    }

    .manage-member-panel {
      margin: 0 auto !important;
      border: 0 !important;
      .members-list {
        margin: 0;
        padding: 0;
      }
      .members-manage-buttons {
        flex-flow: row wrap;
        margin: 0;
        display: flex;
        .button {
          &.group-avatar-btn {
            white-space: nowrap;
            padding: 0 12px;
            padding-top: 12px;
          }
          cursor: pointer;
          min-width: 20px;
          display: inline-block;
          font-size: 12px;
          min-height: 20px;
          color: #ffffff;
          border: 1px solid #ffffff;
          padding: 4px 12px;
          margin: 5px 10px 10px 0;
          border-radius: 100px;
        }
      }
      .list-wrap-inner {
        position: relative;
        display: flex;
        flex-direction: row;
        margin: 0 0 20px 0;
        .item-avatar {
          img {
            width: 52px;
            height: 52px;
            border-radius: 100%;
          }
        }
        .list-title {
          flex-flow: row wrap;
          flex: 1;
          display: flex;
          color: #ffffff;
          margin-bottom: 5px;
          font-size: 20px;
          margin: 0 auto;
          width: 100%;
          flex-direction: column;
          padding: 0 0 0 18px;
          .banned-text {
            color: red;
            letter-spacing: -0.24px;
            line-height: 1.3;
            font-size: 12px;
            font-weight: 300;
            a {
              width: 20px;
              height: 20px;
              border-radius: 100%;
              margin: 0 0 0 10px;
              img {
                width: 20px;
                height: 20px;
                border-radius: 100%;
              }
            }
          }
          span {
            color: #a3a5a9;
            letter-spacing: -0.24px;
            line-height: 1.3;
            font-size: 12px;
            font-weight: 300;
            a {
              width: 20px;
              height: 20px;
              border-radius: 100%;
              margin: 0 0 0 10px;
              img {
                width: 20px;
                height: 20px;
                border-radius: 100%;
              }
            }
          }
        }
      }
      .main-heading {
        color: var(--primary-color);
        font-weight: 500;
        font-size: 20px;
        line-height: 1.1;
        padding: 20px 0 15px 0;
        letter-spacing: 0;
      }
      .item-body {
        padding: 0 !important;
      }
    }
    .manage-select-panel {
      margin: 0 auto !important;
      border: 0 !important;
      .bbp-forum-buttons-wrap {
        width: 100%;
        display: flex;
        justify-content: end;
        margin: 0 0 20px 0;
        .subscription-toggle {
          margin: 0 15px;
          color: #ffffff;
          background: transparent;
          border: 1px solid #ffffff;
          border-radius: 100px;
          padding: 10px 20px;
          font-weight: 500;
          font-style: normal;
          text-decoration: none;
          text-align: center;
          cursor: pointer;
          display: inline-block;
          line-height: 1.3;
          outline: 0;
          display: flex;
          align-items: center;
        }
        .new-post {
          font-size: 15px;
          color: #fff;
          min-height: 40px;
          padding: 10px 20px;
          font-weight: 500;
          cursor: pointer;
          display: inline-block;
          line-height: 1.3;
          border: 1px solid transparent;
          outline: 0;
          display: flex;
          align-items: center;
          svg {
            width: 14px;
            margin: 0 8px 0 0;
          }
        }
      }
      .bb-grid {
        display: flex;
        margin-left: -10px;
        margin-right: -10px;
        flex-wrap: wrap;
        margin: 0 0 95px 0;
        .replies-content {
          flex: 1;
          min-width: 1px;
          list-style: none;
          padding-left: 10px;
          padding-right: 10px;
          ul {
            margin: 0 0 30px 0;
            clear: both;
            list-style: none;
            padding: 0;
            .bs-item-wrap {
              padding: 15px 0;
              margin: 0 0 -1px;
              position: relative;
              display: flex;
              flex-flow: row wrap;
              .item {
                flex: 1;
                .item-title {
                  display: flex;
                  margin-bottom: 10px;
                  position: relative;
                  h1 {
                    font-family: inherit;
                    font-size: 20px;
                    font-weight: 500;
                    line-height: 1.2;
                    letter-spacing: -0.24px;
                    margin: 0;
                    color: #ffffff;
                    flex: 1;
                    padding: 0;
                  }
                }
                .item-meta {
                  font-size: 14px;
                  color: #a3a5a9;
                  display: flex;
                  line-height: 1.3;
                  letter-spacing: -0.24px;
                  svg {
                    width: 12px;
                    margin: 0 3px 0 0;
                  }
                  a {
                    color: #ffffff;
                    padding: 0 5px 0 0;
                  }
                  .bs-voices-wrap {
                    display: inline-block;
                    color: #a3a5a9;
                    font-size: 14px;
                    .bs-separator {
                      margin: 0 5px;
                    }
                  }
                  .bg-tag {
                    background: rgba(155, 184, 92, 0.6);
                    border-radius: 100px;
                    font-size: 11px;
                    color: #fff;
                    letter-spacing: -0.19px;
                    display: inline-block;
                    line-height: 1;
                    margin-left: 7px;
                    text-align: center;
                    max-width: 100%;
                    padding: 4px 8px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
        .bs-single-topic-sidebar {
          flex: 0 0 200px;
          max-width: 200px;
          padding-top: 0.9375rem;
          .reply-button {
            font-size: 15px;
            color: #fff;
            background: transparent;
            border-radius: 100px;
            padding: 10px 20px;
            font-weight: 500;
            font-style: normal;
            text-decoration: none;
            text-align: center;
            cursor: pointer;
            display: inline-block;
            line-height: 1.3;
            border: 1px solid transparent;
            outline: 0;
            vertical-align: middle;
            width: 100%;
            outline: 0;
            margin: -24px 0 12px 0;
          }
          .subscription-button {
            font-size: 15px;
            border: 1px solid #ffffff;
            color: #fff;
            background: transparent;
            border-radius: 100px;
            padding: 10px 20px;
            font-weight: 500;
            font-style: normal;
            text-decoration: none;
            text-align: center;
            cursor: pointer;
            display: inline-block;
            line-height: 1.3;
            outline: 0;
            vertical-align: middle;
            width: 100%;
            outline: 0;
            margin: 0;
          }
        }
      }
      .discussion-panel {
        width: 100%;
        display: flex;
        flex-direction: column;
        .discuuion-header {
          display: flex;
          justify-content: space-between;
          padding: 0 3px;
          .bb-topic-states {
            margin-left: auto;
            .icon-opacity {
              opacity: 1 !important;
            }
            .icon-tag {
              position: relative;
              display: inline-block;
              vertical-align: middle;
              line-height: 1;
              height: 28px;
              margin: 0 0 -5px;
              width: 28px;
              right: 0;
              top: 0;
              opacity: 0.4;
              svg {
                width: 6px;
                margin: 5px 0 0 15px;
                cursor: pointer;
              }
              &:hover {
                .tooltip-panel {
                  display: block;
                }
                .tooltip-panel1 {
                  display: block;
                }
              }
              .more-action-list {
                position: absolute;
                top: 31px;
                right: -15px;
                background: #000;
                box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%),
                  0 6px 32px 0 rgb(18 43 70 / 10%);
                border-radius: 4px;
                width: 171px;
                z-index: 1;
                &:hover {
                  .tooltip-panel {
                    display: none;
                  }
                }
                &::after {
                  content: ' ';
                  position: absolute;
                  width: 0;
                  height: 0;
                  top: 0;
                  margin: 0 auto;
                  right: 8px;
                  box-sizing: border-box;
                  border: 6px solid #000;
                  border-color: #000 #000 transparent transparent;
                  transform-origin: 0 0;
                  transform: rotate(-45deg);
                  box-shadow: 2px -3px 3px 0 rgb(0 0 0 / 2%);
                  z-index: 101;
                  opacity: 1;
                  visibility: visible;
                  pointer-events: none;
                }
                .inner-tag {
                  list-style: none;
                  margin: 5px;
                  padding: 0;
                  .main-tag {
                    margin: 0;
                    padding: 0;
                    list-style-type: none;
                  }
                }
                .item-link {
                  padding: 6px 5px;
                  display: block;
                  font-size: 13px;
                  line-height: 1;
                  color: #7f868f;
                  text-align: left;
                  svg {
                    height: 12px;
                    display: inline-block;
                    margin: 0 10px 0 0;
                    width: 14px;
                  }
                  &:hover {
                    color: var(--primary-color);
                    svg {
                      color: var(--primary-color);
                    }
                  }
                }
              }
              .tooltip-panel1 {
                min-width: 108px;
                display: none;
                height: 30px;
                background: #ffffff;
                bottom: 100%;
                border-radius: 5px;
                font-size: 13px;
                color: #000000;
                left: -38px;
                margin-bottom: 11px;
                transform: translate(0, 10px);
                transform-origin: top;
                position: absolute;
                padding: 9px 10px;
                text-align: center;
                top: -48px;
                em {
                  width: 0;
                  height: 0;
                  border-left: 5px solid transparent;
                  border-right: 5px solid transparent;
                  border-top: 5px solid #ffffff;
                  position: absolute;
                  top: 30px;
                  left: 50px;
                }
              }
              .tooltip-panel {
                min-width: 72px;
                display: none;
                height: 30px;
                background: #ffffff;
                bottom: 100%;
                border-radius: 5px;
                font-size: 13px;
                color: #000000;
                left: -23px;
                margin-bottom: 11px;
                transform: translate(0, 10px);
                transform-origin: top;
                position: absolute;
                padding: 9px 10px;
                text-align: center;
                top: -48px;
                em {
                  width: 0;
                  height: 0;
                  border-left: 5px solid transparent;
                  border-right: 5px solid transparent;
                  border-top: 5px solid #ffffff;
                  position: absolute;
                  top: 30px;
                  left: 32px;
                }
              }
            }
          }
          .discuuion-header-button {
            width: 5.33%;
            display: flex;
            justify-content: space-between;
            svg {
              padding-left: 2px;
              cursor: pointer;
              &.active {
                background-color: red;
              }
            }
          }
        }
        .discussion-details {
          padding: 0 10px 10px 10px;
          &:hover {
            background-color: #3f3f3f;
          }
          .image-tag {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            img {
              width: 100%;
              height: 100%;
              margin: 5px 0 5px 0;
            }
          }
        }
        .inner-wrap-item {
          padding: 15px 0 !important;
        }
        .inner-wrap {
          padding-left: 0 !important;
          .item-meta {
            a {
              padding: 0;
            }
          }
        }
        .bs-item-wrap {
          width: 100%;
          display: flex;
          margin: 0 0 -1px;
          padding: 15px 10px;
          position: relative;
          transition: all linear 0.2s;
          align-items: center;
          justify-content: space-between;
          .bs-forums-reply {
            cursor: pointer;
            display: flex;
            justify-content: flex-end;
            min-width: 0;
            width: 20px;
            height: 30px;
            div {
              padding: 0 5px;
              cursor: pointer;
              &:hover {
                color: #e0116d;
              }
            }
          }
          .bs-forums-meta {
            display: flex;
            justify-content: flex-end;
            min-width: 0;
            .bg-tag {
              background: rgba(155, 184, 92, 0.6);
              border-radius: 100px;
              font-size: 11px;
              color: #fff;
              letter-spacing: -0.19px;
              display: inline-block;
              line-height: 1;
              margin-left: 3px;
              text-align: center;
              max-width: 100%;
              padding: 2px 5px;
              vertical-align: middle;
            }
          }
          .flex-1 {
            display: flex;
            flex-direction: initial;
          }
          .item-icon-tag {
            width: 79px;
            height: 35px;
            display: flex;
            flex-direction: row;
            background: #ffffff;
            border: 1px solid #e7e9ec;
            .dropdown-toogle {
              box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%),
                0 6px 32px 0 rgb(18 43 70 / 10%);
              border-radius: 4px;
              list-style: none;
              padding: 10px 0;
              position: absolute;
              -webkit-transition: all linear 0.2s;
              transition: all linear 0.2s;
              right: -35px;
              top: 38px;
              margin: 0;
              min-width: 168px;
              background: #fff;
              z-index: 1;
              ul {
                margin: 0;
                padding: 0;
                li {
                  font-size: 13px;
                  font-weight: inherit;
                  color: #4d5c6d;
                  letter-spacing: -0.24px;
                  line-height: 1;
                  cursor: pointer;
                  width: 100%;
                  padding: 10px 14px;
                  color: #7f868f;
                  line-height: 1.1;
                  svg {
                    color: #a3a3a3;
                    width: 11px !important;
                    margin: 0 10px 0 0;
                  }
                  a {
                    color: #4d5c6d;
                  }
                }
              }
            }
            .tooltip-panel {
              min-width: 106px;
              display: none;
              height: 30px;
              background: #ffffff;
              bottom: 100%;
              border-radius: 5px;
              font-size: 13px;
              color: #000000;
              left: -29px;
              margin-bottom: 11px;
              transform: translate(0, 10px);
              transform-origin: top;
              position: absolute;
              padding: 4px 7px;
              text-align: center;
              top: -50px;
              em {
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid #ffffff;
                position: absolute;
                top: 30px;
                left: 44px;
              }
            }
            .reply-tag {
              width: 35px;
              height: 35px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-right: 1px solid #e7e9ec;
              cursor: pointer;
              position: relative;
              &:hover {
                .tooltip-panel {
                  display: block;
                }
              }
              svg {
                color: #a3a3a3;
                width: 14px;
              }
            }
            .ellipsis-tag {
              width: 35px;
              height: 35px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              position: relative;
              &:hover {
                .tooltip-panel {
                  display: block;
                }
              }
              svg {
                color: #a3a3a3;
                width: 6px !important;
              }
            }
          }
          .item {
            display: block;
            .item-title {
              margin-bottom: 4px;
              color: #ffffff;
              font-size: 14px;
              cursor: pointer;
              &:hover {
                color: #e0116d;
              }
            }
            .item-meta {
              font-size: 13px;
              color: #a3a5a9;
              display: flex;
              line-height: 1.3;
              letter-spacing: -0.24px;
              svg {
                width: 12px;
                margin: 0 3px 0 0;
              }
              a {
                color: #ffffff;
                padding: 0 5px;
              }
              .bs-voices-wrap {
                display: inline-block;
                color: #a3a5a9;
                font-size: 14px;
                .bs-separator {
                  margin: 0 5px;
                }
              }
            }
          }
          .item-avatar {
            margin-right: 20px;
            position: relative;
            .pin-icons {
              position: absolute;
              width: 8px;
              right: 8px;
              top: -3px;
              z-index: 1;
              display: flex;
              flex-direction: column;
              a:nth-of-type(2) {
                margin: -8px 0 0 0;
              }
              img {
                width: 22px;
              }
            }
            svgp:nth-of-type(2) {
              position: absolute;
              width: 8px;
              right: -2px;
              top: 19px;
              z-index: 1;
            }
            img {
              border-radius: 50%;
              margin-top: 0;
              max-width: 48px;
              height: auto;
            }
            a {
              min-width: 48px;
              display: inline-block;
              margin: 0;
              position: relative;
            }
          }
        }
      }
      .item-body {
        padding: 0 !important;
      }
      button {
        background-color: var(--primary-color);
        width: 154px;
        outline: 0;
        height: 40px;
        margin: 50px auto 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        text-transform: capitalize;
        font-weight: 400;
      }
    }
    .manage-photos-panel {
      margin: 90px 0 0 0 !important;
      border: 0 !important;
      .item-upload-section {
        padding: 0 !important;
        .message-text {
          display: block;
          font-size: 85%;
          margin: 1em 0;
          color: #856404;
          background-color: #fff3cd;
          border-color: #ffeeba;
          position: relative;
          padding: 10px 15px;
          margin-bottom: 1rem;
          border: 1px solid transparent;
          border-radius: 4px;
        }
      }
    }
    .main-wrapper {
      width: 100%;
      display: flex;
      border: 1px solid #e7e9ec;
      border-radius: 4px;
      max-width: 1100px;
      margin: 50px auto;
      flex-direction: column;
      p {
        color: var(--typo);
      }
      h2.bp-subhead {
        font-size: 28px;
        width: 100%;
        line-height: 1;
        margin-bottom: 30px;
        text-align: center;
        padding: 50px 100px 0 100px;
      }
      .item-upload-section {
        width: 100%;
        display: flex;
        padding: 0 100px 0 100px;
        flex-direction: column;
        margin: -65px 0 0 0;
        .button-section {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin: 40px 0 0 0;
          button {
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            font-size: 14px;
            color: #fff;
            background-color: var(--primary-color);
            border-radius: 100px;
            min-height: 40px;
            padding: 10px 20px;
            font-weight: 500;
            text-decoration: none;
            cursor: pointer;
            display: flex;
            line-height: 1.3;
            border: 1px solid transparent;
            outline: 0;
            vertical-align: middle;
            -webkit-appearance: none;
            -webkit-transition: 0.3s all;
            transition: 0.3s all;
          }
        }
      }
      .question-panel {
        color: var(--typo);
      }
      .item-body {
        width: 100%;
        display: flex;
        padding: 25px 100px 70px 100px;
        flex-direction: column;
        .invite-section {
          width: 100%;
          display: flex;
          border: 1px solid var(--typo);
          border-radius: 4px;
          flex-direction: row;
          margin-bottom: 40px;
          .inner-section {
            border-right: 1px solid var(--typo);
            width: 50%;
            display: column;
            position: relative;
            .inner-button-panel {
              position: absolute;
              bottom: 20px;
              right: 10px;
              button {
                min-width: 75px;
                height: 34px;
                background: var(--primary-color);
                border-radius: 20px;
                color: var(--white-color);
                font-size: 12px;
                outline: 0;
                margin: 0 10px 0 0;
                border: 1px solid var(--primary-color);
                padding: 0;
              }
            }
            .panel-tag {
              position: relative;
              border-bottom: 1px solid var(--typo);
              padding: 15px 20px;
              line-height: 1.4;
              font-size: 18px;
              font-weight: 500;
              .checkbox-panel {
                position: absolute;
                top: 15px;
                right: 20px;
              }
            }
            .customize-panel {
              width: 100%;
              display: flex;
              padding: 20px;
              flex-direction: column;
              .alert {
                margin: 0 0 60px 0;
              }
              textarea {
                font-size: 14px;
                color: var(--bg-font);
                width: 100%;
                display: flex;
                height: 260px;
                border: 0;
                resize: none;
                background: transparent;
              }
            }
            .select-invite-container {
              width: 100%;
              display: flex;
              flex-direction: column;
              padding: 20px;
              border-bottom: 1px solid #e7e9ec;
              .invite-name-panel {
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                span {
                  background-color: #4d5c6d;
                  width: auto;
                  display: flex;
                  height: 28px;
                  padding: 0 35px 0 10px;
                  color: #ffffff;
                  font-size: 12px;
                  align-items: center;
                  border-radius: 5px;
                  position: relative;
                  margin: 0 10px 10px 0;
                  em {
                    position: absolute;
                    top: 6px;
                    right: 8px;
                    width: 15px;
                    height: 15px;
                    border-radius: 100%;
                    background-color: #ffffff;
                    color: #4d5c6d;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 19px;
                    font-style: normal;
                    transform: rotate(45deg);
                  }
                }
              }
            }
            .select-members-panel {
              width: 100%;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              margin: 0 0 15px 0;
              .info-tag {
                margin-right: 10px;
                background-color: var(--primary-color);
                width: 40px;
                height: 42px;
                display: flex;
                align-items: center;
                justify-content: center;
                span {
                  width: 21px;
                  height: 21px;
                  border-radius: 100%;
                  background: #ffffff;
                  font-size: 12px;
                  color: var(--primary-color);
                  align-items: center;
                  justify-content: center;
                  text-align: center;
                  display: flex;
                }
              }
              .text-tag {
                width: calc(100% - 50px);
                display: flex;
                font-size: 14px;
                line-height: 1.5;
              }
            }
            .invite-search {
              padding: 20px;
              input {
                color: #ffffff;
                font-size: 13px;
                height: 40px;
                outline: 0;
                vertical-align: middle;
                background-color: transparent;
                border: 1px solid #dedfe2;
                border-radius: 30px;
                box-shadow: none;
                outline: none;
                padding: 0 12px;
                width: 100%;
              }
            }
            .members-outer-panel {
              width: 100%;
              display: flex;
              max-height: 500px;
              min-height: auto;
              overflow-y: auto;
              flex-direction: column;
            }
            .members-list-panel {
              width: 100%;
              display: flex;
              flex-direction: column;
              ul {
                padding: 0 0 15px 0;
                margin: 0;
                li {
                  padding: 8px 20px;
                  width: 100%;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  position: relative;
                  .item-avatar {
                    width: 45px;
                    height: 45px;
                    display: flex;
                    border-radius: 100%;
                    margin-right: 15px;
                    background: #333365;
                    img {
                      border-radius: 100%;
                      width: 45px;
                      height: 45px;
                      border: 1px solid #dedfe2;
                    }
                  }
                  .list-title {
                    font-size: 15px;
                    font-weight: 400;
                    margin: 0 auto;
                    width: calc(100% - 60px);
                    display: flex;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding: 0 80px 0 0;
                    position: relative;
                    cursor: pointer;
                    height: 36px;
                    align-items: center;
                    span {
                      width: 96%;
                      display: block;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    }
                    &:hover {
                      color: var(--primary-color);
                    }
                    button {
                      color: var(--primary-color);
                      border: 1px solid #eee;
                      width: auto;
                      font-size: 13px;
                      padding: 0 0.8rem;
                      height: 26px;
                      border-radius: 100px;
                      background: transparent;
                      position: absolute;
                      right: 0;
                      top: 6px;
                      text-transform: capitalize;
                    }
                    .plus-icon {
                      position: absolute;
                      right: 3px;
                      bottom: -7px;
                      font-size: 24px;
                      color: #ffffff;
                    }
                  }
                }
              }
            }
          }
        }
        .item-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          p {
            font-size: 14px;
            color: var(--typo);
          }
        }
        .image-tag {
          max-width: 160px;
          margin: 0 auto 30px;
          img {
            width: 160px;
            height: 160px;
          }
        }
        .m-b35 {
          margin-bottom: 35px;
        }
        .main-description {
          font-size: 14px;
          line-height: 20px;
          font-weight: 500;
          color: var(--typo);
          padding-bottom: 20px;
          display: flex;
          width: 100%;
          line-height: 24px;
          margin: -15px 0 10px 0;
        }
        .main-heading {
          font-size: 18px;
          font-weight: 500;
          color: var(--primary-color);
          padding-bottom: 20px;
          display: flex;
          width: 100%;
          line-height: 1;
          margin-bottom: 22px;
          &.group-header {
            color: var(--primary-color) !important;
            margin-bottom: 20px;
            margin-top: 20px;
          }
        }
        .custom-select-panel {
          margin: 15px 0 0 0;
          width: 260px;
          padding: 0 10px;
          background-color: var(--dark-color);
        }
        .checkbox-panel {
          margin: 0 0 30px 28px;
          position: relative;
          input {
            position: absolute;
            left: -29px;
            width: 22px;
            top: -8px;
            z-index: 9;
            cursor: pointer;
          }
          .custom-control-label {
            line-height: 26px;
          }
        }
        .bp-radio-wrap {
          display: flex;
          width: 100%;
          flex-direction: column;
          padding: 0 25px;
          color: var(--typo);
          .question-panel {
            font-size: 16px;
            line-height: 1.6875rem;
            margin: 0 0 12px -22px;
          }
          .question-radio {
            margin: 0 0 6px 2px !important;
            .custom-control-label {
              font-size: 15px !important;
            }
          }
          .custom-radio {
            margin: 0 0 15px 0;
            position: relative;
            input {
              position: absolute;
              cursor: pointer;
              width: 21px;
              left: -29px;
              top: -8px;
              z-index: 9;
            }
          }
          .custom-control-label {
            line-height: 25px;
            font-size: 16px;
          }
          ul {
            font-size: 14px;
            margin: 0 0 40px -21px;
            line-height: 1.6;
            letter-spacing: -0.24px;
          }
        }
        .col-div-12 {
          width: 100%;
          display: flex;
          padding: 0 0 20px 0;
          flex-direction: column;
        }
        label {
          font-size: 15px;
          font-weight: 400;
          color: var(--primary-color);
          letter-spacing: -0.24px;
          line-height: 1;
          cursor: pointer;
        }
        input {
          display: inline-block;
          font-size: 14px;
          height: 40px;
          color: var(--typo);
          outline: 0;
          vertical-align: middle;
          background-color: var(--dark-color);
          border: 1px solid var(--typo);
          border-radius: 3px;
          box-shadow: none;
          padding: 0 12px;
          width: 100%;
        }
        .button-section {
          width: 100%;
          display: flex;
          justify-content: space-between;
          button {
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            font-size: 14px;
            color: #fff;
            background-color: var(--primary-color);
            border-radius: 100px;
            min-height: 40px;
            padding: 10px 20px;
            font-weight: 500;
            text-decoration: none;
            cursor: pointer;
            display: flex;
            line-height: 1.3;
            border: 1px solid transparent;
            outline: 0;
            vertical-align: middle;
            -webkit-appearance: none;
            -webkit-transition: 0.3s all;
            transition: 0.3s all;
          }
        }
        textarea {
          display: inline-block;
          font-size: 15px;
          height: 120px;
          color: var(--typo);
          outline: 0;
          vertical-align: middle;
          border: 1px solid var(--typo);
          border-radius: 3px;
          background: var(--dark-color);
          box-shadow: none;
          padding: 0 12px;
          width: 100%;
        }
      }
      .group-error-tag {
        width: 100%;
        display: flex;
        padding: 0 100px;
        background: transparent;
        align-items: center;
        flex-direction: row;
        p {
          padding-left: 20px;
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
          padding: 10px 16px;
          color: var(--typo);
        }
        span {
          background-color: #ef3e46;
          width: 40px;
          height: 41px;
          display: flex;
          justify-content: center;
          align-items: center;
          em {
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #ffffff;
            font-size: 13px;
            color: #ef3e46;
            border-radius: 100%;
          }
        }
      }
      .meet-conatiner {
        width: 100%;
        padding: 30px 90px;
        display: flex;
        flex-direction: column;
        h4 {
          margin: 0 0 25px 0;
          padding: 0;
          font-weight: 500;
          font-size: 1.125rem;
          line-height: 24px;
          color: var(--typo);
        }
        .button-group {
          width: 100%;
          display: flex;
          margin: 50px 0 30px 0;
          justify-content: space-between;
          .previous {
            font-size: 15px;
            color: var(--typo);
            background: transparent;
            border: 0;
            outline: 0;
          }
          .finish {
            background: var(--primary-color);
            line-height: 1.3;
            border: 1px solid transparent;
            outline: 0;
            min-height: 40px;
            padding: 10px 20px;
            font-weight: 500;
            text-decoration: none;
            cursor: pointer;
            font-size: 15px;
            color: #fff;
            border-radius: 100px;
            width: 85px;
          }
        }
        .form-group {
          width: 100%;
          display: flex;
          flex-direction: column;
          label {
            color: var(--primary-color);
            font-size: 14px;
            font-weight: 400;
            letter-spacing: -0.24px;
            line-height: 1;
            margin: 0 0 8px;
            cursor: pointer;
          }
          .textarea-tag {
            background-color: var(--dark-color);
            display: inline-block;
            font-size: 15px;
            height: 50px;
            outline: 0;
            vertical-align: middle;
            border: 1px solid var(--typo);
            border-radius: 3px;
            box-shadow: none;
            padding: 0 12px;
            resize: none;
            margin: 0 0 25px;
            width: 100%;
            color: var(--typo) !important;
          }
          .input-tag {
            background-color: var(--dark-color);
            display: inline-block;
            font-size: 15px;
            height: 40px;
            outline: 0;
            vertical-align: middle;
            border: 1px solid var(--typo);
            border-radius: 3px;
            box-shadow: none;
            padding: 0 12px;
            margin: 0 0 25px;
            width: 100%;
            color: var(--typo) !important;
          }
          .description {
            color: #737373;
            margin: 5px 0;
            font-size: 15px;
            a {
              color: #ffffff;
            }
          }
          span {
            margin: 0 0 0 10px;
            font-size: 14px;
            font-weight: 400;
            color: var(--primary-color);
          }
          .custom-control {
            padding-left: 0 !important;
          }
        }
        .allow-text {
          margin: 0 0 25px 0;
          padding: 0;
          display: flex;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          color: var(--typo);
          width: 100%;
        }
      }
      .nav-bar-section {
        width: 100%;
        display: flex;
        border: 1px solid #e7e9ec;
        align-items: center;
        min-height: 49px;
        ol {
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: row;
          width: 100%;
          padding: 0 100px;
          align-items: center;
          justify-content: center;
          li {
            margin: 0 70px 0 0;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: -0.24px;
            color: var(--typo);
            position: relative;
            &:last-child {
              margin: 0;
              &:after {
                display: none;
              }
            }
            &:after {
              content: '';
              display: inline-block;
              width: 24px;
              height: 1px;
              background: #a3a5a9;
              margin: 0 15px;
              position: absolute;
              top: 11px;
            }
            a {
              color: #fafafa;
            }
            &.current {
              color: var(--primary-color);
              a {
                color: var(--primary-color);
              }
            }
          }
        }
      }
    }
  }
  .rigth-container {
    width: 100%;
  }

  @media (min-width: 768px) {
    .left-container {
      width: 100px;
    }
    .rigth-container {
      width: calc(100% - 100px);
    }
  }
  @media (min-width: 1200px) {
    .left-container {
      width: 200px;
    }
    .rigth-container {
      width: calc(100% - 200px);
    }
    .react-multi-carousel-dot-list {
      display: none;
    }
  }
  @media (min-width: 1440px) {
    .left-container {
      width: 250px;
    }
    .rigth-container {
      width: calc(100% - 250px);
    }
  }
`