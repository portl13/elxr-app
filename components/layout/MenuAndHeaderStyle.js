import { css } from '@emotion/core'

export const MenuAndHeaderStyle = css`
  .rc-time-picker-input {
    height: 50px;
    color: red;
  }

  .main {
    /* moderation */
    position: relative;
    padding: 0 1rem;
    transition: 0.5s;
  }

  .bb-ul-tag {
    display: flex;
    list-style: none;
    flex-flow: row wrap;
    width: 100%;
    padding: 0;
    .bb-li-tag {
      flex: 0 0 100%;
      margin-bottom: 20px;
      padding-left: 10px;
      padding-right: 10px;
      min-width: 1px;
      list-style: none;
    }
    @media (min-width: 768px) {
      .bb-li-tag {
        flex: 0 0 calc(100% / 2);
      }
    }
    @media (min-width: 992px) {
      .bb-li-tag {
        flex: 0 0 calc(100% / 3);
      }
    }
  }
  .bb-course-paid {
    padding-bottom: 45px;
    background-color: var(--dark-color);
    border-color: var(--white-color);
    transition: 0.2s box-shadow;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 425px;
    .inner-panel {
      display: flex;
      padding: 16px 20px 0;
      flex-direction: column;
      width: 100%;
      h2 {
        font-size: 22px;
        font-weight: 600;
        line-height: 1.24;
        margin: 0 0 10px;
        word-break: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        &:hover {
          color: var(--primary-color);
          cursor: pointer;
        }
      }
      .dollar-tag {
        width: auto;
        display: flex;
        font-weight: 500;
        font-size: 20px;
        line-height: 1;
        position: absolute;
        bottom: 0;
        right: 0;
        justify-content: flex-end;
      }
      .description-tag {
        font-size: 13px;
        color: #a3a5a9;
        line-height: 1.384;
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-word;
      }

      .progress-bar-section {
        font-size: 12px;
        font-weight: 500;
        line-height: 1;
        letter-spacing: -0.24px;
        color: #a3a5a9;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 0 0 10px 0;
        span {
          margin: 5px 0 0 0;
        }
        .grey-bar {
          width: 100%;
          display: flex;
          background: var(--bg);
          height: 4px;
          position: relative;
          margin: 0 0 10px 0;
          .w3-grey {
            background: var(--primary-color);
          }
        }
      }
      .name-tag {
        width: 100%;
        display: flex;
        font-size: 13px;
        font-weight: 300;
        color: #ffffff;
        letter-spacing: -0.24px;
        line-height: 1;
        margin-bottom: 10px;
        align-items: center;
        cursor: pointer;
        img {
          width: 28px;
          height: 28px;
          margin-right: 10px;
          border-radius: 100px;
          cursor: pointer;
        }
        span {
          width: calc(100% - 28px);
          display: flex;
          word-break: break-word;
          &:hover {
            color: var(--primary-color);
            cursor: pointer;
          }
        }
      }
      .lessom-tag {
        font-size: 13px;
        color: #a3a5a9;
        line-height: 1;
        margin-bottom: 8px;
        font-weight: 300;
        width: 100%;
        display: flex;
      }
    }
    .bb-cover-wrap {
      border-radius: 3px 3px 0 0;
      background: #607387;
      position: relative;
      overflow: hidden;
      display: block;
      height: 172px;
      .start-course {
        background-color: #f21d4c;
        position: absolute;
        z-index: 9;
        top: 15px;
        border-radius: 0 15px 15px 0;
        color: #fff;
        text-align: center;
        padding: 5px 12px;
        text-transform: uppercase;
        font-size: 11px;
        line-height: 1;
        letter-spacing: 0.23px;
      }
      .course-complete {
        background-color: #1cd991;
        position: absolute;
        z-index: 9;
        top: 15px;
        border-radius: 0 15px 15px 0;
        color: #fff;
        text-align: center;
        padding: 5px 12px;
        text-transform: uppercase;
        font-size: 11px;
        line-height: 1;
        letter-spacing: 0.23px;
      }
      .progress-div {
        background-color: #f21d4c;
        position: absolute;
        z-index: 9;
        top: 15px;
        border-radius: 0 15px 15px 0;
        color: #fff;
        text-align: center;
        padding: 5px 12px;
        text-transform: uppercase;
        font-size: 11px;
        line-height: 1;
        letter-spacing: 0.23px;
      }
      .entitled-div {
        background-color: #dbbe1a;
        position: absolute;
        z-index: 9;
        top: 15px;
        border-radius: 0 15px 15px 0;
        color: #fff;
        text-align: center;
        padding: 5px 12px;
        text-transform: uppercase;
        font-size: 11px;
        line-height: 1;
        letter-spacing: 0.23px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
  .lesson-section {
    width: 100%;
    display: flex;
    position: relative;
    margin: 10px 0 0 0;

    .back-btn {
      cursor: pointer;
    }
  }
  .payment-method-screen {
    width: 100%;
    display: flex;
    border: 1px solid #ebe9eb;
    border-radius: 5px;
    padding: 20px 20px;
    flex-direction: column;
    .card-access-tag {
      width: 100%;
      display: flex;
      margin-bottom: 0.25rem;
      font-size: 17px;
      color: #ffffff;
      align-items: center;
      input {
        margin: 0 15px 0 0;
      }
    }
    .btn-tag {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .payment-button {
        width: 190px;
        height: 40px;
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
    .payment-mode-wrapper {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      padding: 1em;
      margin: 1em 0;
      font-size: 0.92em;
      border-radius: 2px;
      line-height: 1.5;
      background-color: #dfdcde;
      color: #515151;
      flex-direction: column;
      &::before {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #dfdcde;
        position: absolute;
        top: -10px;
        left: 28px;
        content: '';
      }
      p {
        margin: 0 0 1.6875rem;
        padding: 0;
        width: 100%;
        display: flex;
        font-size: 0.92em;
        line-height: 1.5;
        color: #515151 !important;
        margin-bottom: 20px !important;
      }
      .credit-card-text {
        width: 100%;
        display: flex;
        margin-bottom: 0.25rem;
        font-size: 17px;
        color: #515151;
      }
      .card-input {
        border: 1px solid #ddd;
        width: 100%;
        display: flex;
        margin: 5px 0;
        padding: 5px;
        background-color: #fff;
        outline: 0;
        height: 30px;
      }
    }
  }
  .courses-lower-div {
    padding: 35px 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 110px 0 0 0;
    .progress-bar-section {
      font-size: 12px;
      font-weight: 500;
      line-height: 1;
      letter-spacing: -0.24px;
      color: #a3a5a9;
      width: 100%;
      display: flex;
      background-color: var(--bg);
      border-radius: 6px;
      padding: 15px 1em;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .completed-panel {
        width: 30%;
        display: flex;
        flex-direction: column;
        span {
          margin: 15px 0 0 0;
        }
      }
      .grey-bar {
        width: 70%;
        display: flex;
        background: var(--bg);
        height: 4px;
        position: relative;
        margin: 0 0 10px 0;
        .w3-grey {
          background: var(--primary-color);
        }
      }
    }
    p {
      margin: 0 0 1.6875rem;
      font-size: 16px;
      color: var(--typo);
    }
    .ld-item-list {
      margin: 30px 0 50px 0;
      display: flex;
      width: 100%;
      flex-direction: column;
      h2 {
        font-size: 16px !important;
        font-weight: 600;
        letter-spacing: 0.6px;
        color: var(--typo);
        text-transform: uppercase;
        margin-bottom: 20px;
      }
      .publish-tag {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin: 20px 0 0 0;
        button {
          color: var(--white-color);
          background-color: var(--primary-color);
          border: 1px solid var(--primary-color);
          outline: 0;
          width: 135px;
          font-weight: normal;
          font-size: 14px;
          height: 34px;
          display: flex;
          align-items: center;
          border-radius: 100px;
          justify-content: center;
        }
      }
      .response-textarea {
        width: 100%;
        display: flex;
        background-color: var(--white-color);
        border: 1px solid var(--typo);
        font-size: 14px;
        color: var(--typo);
        resize: none;
        outline: 0;
        padding: 10px 15px;
        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 1px var(--primary-color);
          outline: 2px solid transparent;
        }
      }
      .comment-section {
        width: 100%;
        display: flex;
        padding: 25px 20px;
        justify-content: space-between;
        a {
          width: 70%;
          display: flex;
          align-items: center;
        }
        .message-button {
          color: #eee;
          background-color: var(--primary-color);
          border: 1px solid var(--primary-color);
          outline: 0;
          width: 135px;
          font-weight: normal;
          font-size: 14px;
          height: 34px;
          display: flex;
          align-items: center;
          border-radius: 100px;
          justify-content: center;
          svg {
            width: 13px;
            margin: 0 6px 0 0;
            color: #ffffff;
          }
        }
        img {
          width: 52px;
          height: 52px;
          border-radius: 100%;
          margin: 0 10px 0 0;
        }
        .name-tag {
          width: calc(100% - 52px);
          display: flex;
          flex-direction: column;
          color: var(--typo);
          font-size: 14px;
          font-weight: 600;
          span {
            color: #a3a5a9;
            font-size: 14px;
          }
        }
      }
      .courses-lessons-panel {
        background: rgba(146, 164, 183, 0.05);
        padding: 16px 55px 16px 15px;
        border-radius: 6px;
        display: flex;
        margin-bottom: 15px;
        color: var(--typo);
        font-size: 15px;
        flex-direction: column;
        cursor: pointer;
        line-height: 24px;
        font-weight: 500;
        position: relative;
        a {
          color: var(--typo);
        }
        &.active {
          text-decoration: line-through;
          .status-div {
            background: var(--primary-color);
          }
          &::before {
            display: none;
          }
        }
        &:hover {
          a {
            color: var(--primary-color);
          }
        }
        .status-div {
          border: 2px solid #dedfe2;
          height: 22px;
          width: 22px;
          border-radius: 100%;
          display: inline-block;
          position: absolute;
          top: 18px;
          right: 15px;
          background: transparent;
        }
      }
      .course-status-text {
        background-color: #f0f3f6;
        border-radius: 6px;
        padding: 20px 1em;
        display: flex;
        margin-bottom: 40px;
        color: #a3a5a9;
        font-size: 15px;
        flex-direction: column;
        cursor: pointer;
        line-height: 24px;
        font-weight: 500;
        &:hover {
          color: var(--primary-color);
        }
      }
    }

    .complete-btn {
      background-color: #1cd991;
      border-radius: 100px;
      // border: 1px solid #ffffff;
      outline: 0;
      height: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
      margin: 0 0 10px 10px;
      padding: 12px 12px;
    }
    .course-status-enrolled {
      background-color: #f0f3f6;
      border-radius: 6px;
      padding: 20px 1em;
      display: flex;
      margin-bottom: 30px;
      color: #a3a5a9;
      font-size: 12px;
      flex-direction: column;
      line-height: 24px;
      font-weight: 600;
      span {
        font-weight: normal;
      }
    }
  }
  .courses-detail-wrapper {
    width: 100%;
    display: flex;
    position: relative;
    padding: 0 10px;
    flex-direction: column;
    .banner-img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 0;
      min-height: 459px;
      max-height: 460px;
      width: auto;
      min-width: 100%;
      object-fit: cover;
      background-color: #9f9f9f;
    }
    .wrapper-div {
      width: 100%;
      display: flex;
      z-index: 1;
      .single-course-sidebar {
        max-width: 380px;
        margin: 143px 0 0 0;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 42%;
        flex: 0 0 42%;
        margin-left: auto;
        position: relative;
        z-index: 2;
        flex-direction: column;
        .bb-certificate-wrap {
          background-color: #000000;
          padding: 30px 30px 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          button {
            background-color: var(--primary-color);
            border: 1px solid var(--primary-color);
            border-radius: 100px;
            outline: 0;
            color: #ffffff;
            font-size: 14px;
            display: inline-block;
            padding: 10px 19px;
            line-height: 1.471;
            margin-bottom: 20px;
          }
          .course-price {
            margin-top: 1rem;
            font-size: 22px;
            text-align: center;
            color: var(--white-color);
          }
          .course-btn {
            background-color: var(--primary-color);
            border-radius: 100px;
            // border: 1px solid #ffffff;
            outline: 0;
            height: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #ffffff;
            cursor: pointer;
            margin: 0 0 10px 0;
          }
          .complete-btn {
            background-color: #1cd991;
            border-radius: 100px;
            // border: 1px solid #ffffff;
            outline: 0;
            height: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #ffffff;
            cursor: pointer;
            margin: 0 0 10px 0;
            // cursor: text;
          }
          .progress-btn {
            background-color: #ffffff;
            border-radius: 100px;
            border: 1px solid #ffffff;
            outline: 0;
            height: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: var(--primary-color);
            cursor: pointer;
            margin: 0 0 10px 0;
            // cursor: text;
          }

          .enroll-btn {
            background-color: #ffffff;
            border-radius: 100px;
            border: 1px solid #ffffff;
            outline: 0;
            height: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: var(--primary-color);
            margin: 0 0 10px 0;
          }

          .continue-btn {
            background-color: var(--primary-color);
            border-radius: 100px;
            border: 1px solid var(--primary-color);
            outline: 0;
            height: 42px;
            display: flex;
            cursor: pointer;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #ffffff;
            margin: 0 0 30px 0;
          }
          .courses-included {
            color: #ffffff;
            font-size: 13px;
            width: 100%;
            display: flex;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin: 0;
            padding-bottom: 12px;
            text-transform: uppercase;
          }
          .lesson-included {
            color: #ffffff;
            font-size: 13px;
            width: 100%;
            display: flex;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin: 0;
            padding-bottom: 20px;
            align-items: center;
            svg {
              width: 12px;
              color: #ffffff;
              margin: 0 10px 0 0;
            }
          }
        }
        img {
          width: 100%;
          height: 200px;
          border-radius: 10px 10px 0 0;
        }
      }
      .left-panel {
        width: calc(100% - 480px);
        padding-top: 70px;
        display: flex;
        flex-direction: column;
        .bb-course-category {
          font-size: 14px;
          color: inherit;
          letter-spacing: 0.61px;
          text-transform: uppercase;
          margin-bottom: 5px;
          display: flex;
          cursor: pointer;
          &:hover {
            color: var(--primary-color);
          }
        }
        h1 {
          font-size: 48px;
          font-weight: 600;
          color: var(--white-color);
          line-height: 1.25;
          margin-bottom: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bb-course-excerpt {
          margin-bottom: 20px;
          opacity: 0.8;
          font-size: 16px;
          letter-spacing: -0.24px;
          line-height: 27px;
          word-break: break-word !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden;
          display: flex;
          width: 100%;
          color: var(--white-color);
        }
        .bb-course-points {
          margin-bottom: 35px;
          color: var(--white-color);
          a {
            color: var(--white-color);
            font-size: 15px;
            font-weight: 500;
          }
          svg {
            width: 12px;
            color: var(--white-color);
            margin: 0 0 0 10px;
          }
        }
        .bb-course-single-meta {
          margin-bottom: 40px;
          display: flex;
          width: 100%;
          align-items: center;
          .meta-saperator {
            color: var(--white-color);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 15px 0 15px;
            display: inline-block;
          }
          .course-date {
            font-size: 13px;
            color: var(--white-color);
            letter-spacing: -0.19px;
            display: flex;
          }
          a {
            color: var(--white-color);
            font-size: 14px;
            letter-spacing: -0.24px;
            img {
              border-radius: 50%;
              margin-right: 12px;
              max-width: 38px;
              width: 38px;
              height: 38px;
            }
          }
        }
      }
    }
  }
  .courses-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    .course-card-ui {
      width: 100%;
      ul {
        padding-left: 0;
        .list-view {
          flex: 0 0 100%;
          .bb-cover-wrap {
            width: 288px;
          }
          .inner-panel {
            width: calc(100% - 288px) !important;
          }
          .bb-course-paid {
            flex-direction: inherit;
            height: auto;
            .dollar-tag {
              top: 10px;
              bottom: auto;
            }
          }
        }
        li {
          margin-bottom: 20px;
          padding-left: 10px;
          padding-right: 10px;
          min-width: 1px;
          list-style: none;
          .bb-course-title {
            color: var(--typo);
          }
          .bb-course-paid {
            padding-bottom: 45px;
            background-color: var(--dark-color);
            border-color: var(--white-color);
            transition: 0.2s box-shadow;
            position: relative;
            display: flex;
            flex-direction: column;
            height: 425px;
            .inner-panel {
              display: flex;
              padding: 16px 20px 0;
              flex-direction: column;
              width: 100%;
              h2 {
                font-size: 22px;
                font-weight: 600;
                line-height: 1.24;
                margin: 0 0 10px;
                word-break: break-word;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                &:hover {
                  color: var(--primary-color);
                  cursor: pointer;
                }
              }
              .dollar-tag {
                width: auto;
                display: flex;
                font-weight: 500;
                font-size: 20px;
                line-height: 1;
                position: absolute;
                bottom: 0;
                right: 0;
                justify-content: flex-end;
              }
              .description-tag {
                font-size: 13px;
                color: #a3a5a9;
                line-height: 1.384;
                width: 100%;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                word-break: break-word;
              }

              .progress-bar-section {
                font-size: 12px;
                font-weight: 500;
                line-height: 1;
                letter-spacing: -0.24px;
                color: #a3a5a9;
                width: 100%;
                display: flex;
                flex-direction: column;
                margin: 0 0 10px 0;
                span {
                  margin: 5px 0 0 0;
                }
                .grey-bar {
                  width: 100%;
                  display: flex;
                  background: var(--bg);
                  height: 4px;
                  position: relative;
                  margin: 0 0 10px 0;
                  .w3-grey {
                    background: var(--primary-color);
                  }
                }
              }
              .name-tag {
                width: 100%;
                display: flex;
                font-size: 13px;
                font-weight: 300;
                color: var(--typo);
                letter-spacing: -0.24px;
                line-height: 1;
                margin-bottom: 10px;
                align-items: center;
                cursor: pointer;
                img {
                  width: 28px;
                  height: 28px;
                  margin-right: 10px;
                  border-radius: 100px;
                  cursor: pointer;
                }
                span {
                  width: calc(100% - 28px);
                  display: flex;
                  word-break: break-word;
                  &:hover {
                    color: var(--primary-color);
                    cursor: pointer;
                  }
                }
              }
              .lessom-tag {
                font-size: 13px;
                color: #a3a5a9;
                line-height: 1;
                margin-bottom: 8px;
                font-weight: 300;
                width: 100%;
                display: flex;
              }
            }
            .bb-cover-wrap {
              border-radius: 3px 3px 0 0;
              background: #607387;
              position: relative;
              overflow: hidden;
              display: block;
              height: 172px;
              .entitled-div {
                background-color: #dbbe1a;
                position: absolute;
                z-index: 9;
                top: 15px;
                border-radius: 0 15px 15px 0;
                color: #fff;
                text-align: center;
                padding: 5px 12px;
                text-transform: uppercase;
                font-size: 11px;
                line-height: 1;
                letter-spacing: 0.23px;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    h1 {
      font-size: 28px;
      padding: 0;
      color: var(--typo);
      margin: 15px 0 20px 0;
      width: 100%;
    }
    .search-tag {
      width: auto;
      display: flex;
      position: relative;
      width: 100%;
      @media (min-width: 768px) {
        width: 25%;
      }
      .icon-tag {
        position: absolute;
        left: 12px;
        top: 4px;
        svg {
          width: 15px;
          color: #636465;
        }
      }
      input {
        background-color: var(--dark-color);
        border: 1px solid var(--white-color);
        color: var(--white-color);
        border-radius: 100px;
        height: 34px;
        font-size: 14px;
        letter-spacing: -0.24px;
        padding: 0 30px 0 35px;
        font-size: 14px;
        outline: 0;
        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 1px var(--primary-color);
          outline: 2px solid transparent;
        }
      }
    }
    .start-course {
      background-color: #f21d4c;
      position: absolute;
      z-index: 9;
      top: 15px;
      border-radius: 0 15px 15px 0;
      color: #fff;
      text-align: center;
      padding: 5px 12px;
      text-transform: uppercase;
      font-size: 11px;
      line-height: 1;
      letter-spacing: 0.23px;
    }
    .course-complete {
      background-color: #1cd991;
      position: absolute;
      z-index: 9;
      top: 15px;
      border-radius: 0 15px 15px 0;
      color: #fff;
      text-align: center;
      padding: 5px 12px;
      text-transform: uppercase;
      font-size: 11px;
      line-height: 1;
      letter-spacing: 0.23px;
    }
    .progress-div {
      background-color: #f21d4c;
      position: absolute;
      z-index: 9;
      top: 15px;
      border-radius: 0 15px 15px 0;
      color: #fff;
      text-align: center;
      padding: 5px 12px;
      text-transform: uppercase;
      font-size: 11px;
      line-height: 1;
      letter-spacing: 0.23px;
    }
    .filter-section {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin: 0 0 20px 0;
      .grid-filters {
        background: var(--dark-color);
        border: 1px solid var(--white-color);
        border-radius: 3px;
        display: flex;
        align-items: center;
        font-size: 21px;
        height: 36px;
        width: 63px;
        position: relative;
        padding: 4px 0;
        a {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 1px solid #3d3d3c;
          cursor: pointer;
          padding: 2px 0;
          margin: 7px 0 0 0;
          &.list-view {
            position: absolute;
            transition: 0.03s;
            top: 0;
            right: 0;
            &:hover {
              .tooltip-panel {
                display: block;
              }
            }
            .tooltip-panel {
              min-width: 80px;
              display: none;
              height: 28px;
              background: var(--primary-color);
              bottom: 100%;
              border-radius: 5px;
              font-size: 12px;
              color: #ffffff;
              left: -35px;
              margin-bottom: 11px;
              transform: translate(0, 10px);
              transform-origin: top;
              position: absolute;
              padding: 5px 5px;
              text-align: center;
              top: -52px;
              z-index: 9;
              transition: 0.03s;
              em {
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid var(--primary-color);
                position: absolute;
                top: 28px;
                left: 44px;
              }
            }
          }
          &.grid-view {
            position: absolute;
            transition: 0.03s;
            top: 0;
            left: 0;
            &:hover {
              .tooltip-panel {
                display: block;
              }
            }
            .tooltip-panel {
              transition: 0.03s;
              min-width: 80px;
              display: none;
              height: 28px;
              background: var(--primary-color);
              bottom: 100%;
              border-radius: 5px;
              font-size: 12px;
              color: #ffffff;
              left: -25px;
              margin-bottom: 11px;
              transform: translate(0, 10px);
              transform-origin: top;
              position: absolute;
              padding: 5px 5px;
              text-align: center;
              top: -52px;
              z-index: 9;
              em {
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid var(--primary-color);
                position: absolute;
                top: 28px;
                left: 33px;
              }
            }
          }
          &:hover {
            svg {
              color: #3d3d3c;
            }
          }
          &:last-child {
            border-right: 1px solid transparent;
          }
          &.active {
            svg {
              color: #3d3d3c;
            }
          }
          svg {
            color: #b1b1b1;
            width: 15px;
          }
        }
      }
      select {
        background-color: var(--dark-color);
        border: 1px solid var(--white-color);
        width: auto;
        border-radius: 4px;
        outline: 0;
        font-size: 14px;
        height: 36px;
        padding: 0 12px;
        margin-right: 12px;
        color: var(--white-color);
        outline: 0;
        &:focus {
          border: 1px solid var(--primary-color);
        }
      }
    }
  }
  .main-header {
    justify-content: space-between;
    display: flex !important;
    .logo-container {
      padding: 0 10px;
    }
  }

  .spinner-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    .spinner-image {
      width: 50px;
      height: 50px;
      display: flex;
    }
  }
  .checkout-details-panel {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .billing-panel {
      width: 49%;
      display: flex;
      border-radius: 5px;
      background-color: #1b1b1b;
      border: 1px solid #e7e9ec;
      padding: 15px 20px;
      flex-direction: column;
      .button-tag {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin: 40px 0 0 0;
        button {
          width: 131px;
          height: 40px;
          display: flex;
          background-color: var(--primary-color);
          border-radius: 100px;
          border: 1px solid var(--primary-color);
          outline: 0;
          font-size: 14px;
          color: #ffffff;
          align-items: center;
          justify-content: center;
          font-weight: 400;
          margin: 0 0 0 15px;
        }
      }
      .subtotal-ui {
        width: 100%;
        display: flex;
        justify-content: end;
        flex-direction: column;
        align-items: flex-end;
        .main-panel {
          width: 50%;
          display: flex;
          justify-content: space-between;
          text-transform: uppercase;
          font-weight: 400;
          color: #a3a5a9;
          font-size: 14px;
          margin: 20px 0 0 0;
          .pink-color {
            color: var(--primary-color);
          }
          .left-panel {
            width: 40%;
            display: flex;
          }
          .right-panel {
            text-transform: none;
            width: 60%;
            display: block;
            text-align: right;
          }
        }
      }
      .datatable-ui {
        width: 100%;
        display: flex;
        flex-direction: column;
        .row-head {
          width: 100%;
          display: flex;
          border-bottom: 1px solid #e7e9ec;
          text-transform: uppercase;
          font-weight: 400;
          color: #a3a5a9;
          font-size: 14px;
          padding: 9px 12px;
          line-height: 1.5em;
        }
        .col-head {
          width: 100%;
          display: flex;
          border-bottom: 1px solid #e7e9ec;
          text-transform: uppercase;
          font-weight: 400;
          color: var(--primary-color);
          font-size: 14px;
          padding: 9px 12px;
          line-height: 1.5em;
          align-items: center;
        }
        .column-tag-1 {
          width: 70%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          img {
            width: 65px;
            height: 65px;
            margin: 0 20px 0 15px;
          }
          .cross-icon {
            width: 25px;
            height: 25px;
            display: flex;
            color: #939597;
            line-height: 0.9;
            font-size: 1.8em;
            transform: rotate(45deg);
            cursor: pointer;
            background: transparent;
            border-radius: 100px;
            align-items: center;
            justify-content: center;
            &:hover {
              background: var(--primary-color);
              color: #ffffff;
            }
          }
          .check-name {
            width: 70%;
            display: flex;
            font-size: 14px;
            font-weight: 500;
            line-height: 1.4;
            flex-direction: column;
            word-break: break-word;
            span {
              color: #a3a5a9;
              em {
                font-style: normal;
                color: var(--primary-color);
              }
            }
          }
        }
        .column-tag-2 {
          width: 30%;
          display: flex;
          justify-content: flex-end;
        }
      }
      h3 {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 700;
        margin: 1rem 0;
        color: #ffffff;
        line-height: 28px;
      }
      .col-12-panel {
        width: 100%;
        display: flex;
        margin: 0 0 1.2rem 0;
        .col-6-left {
          width: 50%;
          display: flex;
          padding: 0 5px 0 0;
          flex-direction: column;
        }
        .col-6-right {
          width: 50%;
          display: flex;
          padding: 0 0 0 5px;
          flex-direction: column;
        }
      }
      .col-div-12 {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 0 0 1.2rem 0;
      }
      input {
        background-color: var(--white-color);
        border: 1px solid var(--white-color);
        width: 100%;
        border-radius: 3px;
        outline: 0;
        font-size: 15px;
        height: 40px;
        padding: 0 12px;
        color: var(--typo);
        outline: 0;
        margin: 0 0 10px 0;
        &:focus {
          border: 1px solid var(--primary-color);
        }
      }
      textarea {
        background-color: var(--white-color);
        border: 1px solid var(--white-color);
        width: 100%;
        border-radius: 3px;
        outline: 0;
        font-size: 15px;
        height: 100px;
        padding: 10px 12px;
        color: var(--typo);
        resize: none;
        outline: 0;
        &:focus {
          border: 1px solid var(--primary-color);
        }
      }
      select {
        background-color: var(--white-color);
        border: 1px solid var(--white-color);
        width: 100%;
        border-radius: 3px;
        outline: 0;
        font-size: 15px;
        height: 40px;
        padding: 0 12px;
        color: var(--typo);
        outline: 0;
        &:focus {
          border: 1px solid var(--primary-color);
        }
      }
      label {
        font-size: 16px;
        line-height: 1.1;
        margin-bottom: 10px;
        color: var(--typo);
        display: block;
        span {
          color: #e65454;
          margin-left: 3px;
        }
      }
    }
  }
  .checkout-coupon {
    background-color: #1b1b1b;
    width: 100%;
    display: flex;
    border: 1px solid #e7e9ec;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 1em;
    font-size: 14px;
    flex-direction: column;
    p {
      margin: 0 0 1.6875rem;
      font-size: 14px;
      width: 100%;
      font-weight: 500;
    }
    .coupon-panel {
      width: 100%;
      display: flex;
      margin: 0 0 20px 0;
      input {
        background-color: #000000;
        color: #a3a5a9;
        width: calc(100% - 160px);
        border: 1px solid #000000;
        display: flex;
        border-radius: 3px;
        font-size: 15px;
        height: 40px;
        padding: 0 12px;
      }
      .apply-button {
        width: 150px;
        height: 40px;
        display: flex;
        background-color: var(--primary-color);
        border-radius: 100px;
        border: 1px solid var(--primary-color);
        outline: 0;
        font-size: 14px;
        color: #ffffff;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        margin: 0 0 0 15px;
      }
    }
  }
  .coupon-tag {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #4d5c6d;
    padding: 0 25px;
    margin: 0 0 20px 0;
    a {
      color: #ffffff;
      cursor: pointer;
      margin: 0 0 0 5px;
      &:hover {
        color: var(--primary-color);
      }
    }
  }
  .checkout-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 100px 0;
  }
  .view-cart-container {
    background-color: #1b1b1b;
    width: 100%;
    display: flex;
    border-radius: 4px;
    border: 1px solid #e7e9ec;
    margin: 100px 0;
    padding: 15px 20px;
    .proceed-button {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      button {
        background-color: var(--primary-color);
        border: 1px solid var(--primary-color);
        font-size: 14px;
        font-weight: 400;
        justify-content: center;
        align-items: center;
        display: flex;
        height: 40px;
        padding: 9px 2em;
        line-height: 1.4;
        border-radius: 30px;
        color: #fff;
        margin: 20px 0 0 0;
        outline: 0;
      }
    }
    .subtotal-container {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      align-items: flex-end;
      .inner-panel {
        width: 50%;
        display: flex;
        font-size: 14px;
        padding: 9px 12px;
        color: var(--primary-color);
        align-items: center;
        .left-tag {
          width: 10%;
          display: flex;
          text-transform: uppercase;
        }
        .right-tag {
          width: 90%;
          font-size: 13px;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
    .apply-coupon-container {
      width: 100%;
      display: flex;
      border-bottom: 1px solid #e7e9ec;
      padding: 10px 20px;
      justify-content: space-between;
      .apply-coupon-tag {
        width: auto;
        display: flex;
        input {
          width: 150px;
          border: 1px solid #d3ced2;
          padding: 6px 6px 5px;
          margin: 0 4px 0 0;
          outline: 0;
          font-size: 14px;
          background-color: #1b1b1b;
          color: #ffffff;
          border-radius: 3px;
          height: 40px;
          box-shadow: none;
        }
        .apply-button {
          background: #dedfe2;
          border: 1px solid #dedfe2;
          border-radius: 3px;
          border-left: 0;
          font-size: 14px;
          display: inline-block;
          padding-left: 2em;
          padding-right: 2em;
          height: 40px;
          color: #fff;
          font-weight: 400;
        }
      }
      .update-cart {
        color: var(--primary-color);
        border: 1px solid var(--primary-color);
        font-size: 14px;
        font-weight: 500;
        min-height: 34px;
        padding: 6px 20px;
        line-height: 1.4;
        margin-top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
      }
    }
    .grey-color {
      color: #a3a5a9 !important;
    }
    .pink-color {
      color: var(--primary-color) !important;
    }
    .view-cart-div-1 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      .cross-icon {
        color: #939597;
        font-weight: 100;
        line-height: 0.9;
        font-size: 1.8em;
        transform: rotate(45deg);
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        cursor: pointer;
        &:hover {
          background: var(--primary-color);
          color: #ffffff;
        }
      }
    }
    .view-cart-div-2 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .view-cart-div-3 {
      width: 30%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      cursor: pointer;
    }
    .view-cart-div-4 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .view-cart-div-5 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      .quantity-tag {
        width: auto;
        display: inline-block;
        position: relative;
        padding: 0 15px;
        .left-arrow {
          border: solid #ffffff;
          border-width: 0 2px 2px 0;
          display: inline-block;
          padding: 3px;
          transform: rotate(135deg);
          -webkit-transform: rotate(135deg);
          cursor: pointer;
          position: absolute;
          left: 0;
          top: 16px;
        }
        .right-arrow {
          border: solid #ffffff;
          border-width: 0 2px 2px 0;
          display: inline-block;
          padding: 3px;
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          cursor: pointer;
          position: absolute;
          right: 0;
          top: 16px;
        }
        input {
          font-size: 14px;
          color: #ffffff;
          text-align: center;
          background-color: #1b1b1b;
          border: 1px solid #cccccc;
          min-width: 42px;
          max-width: 42px;
          height: 40px;
          line-height: 40px;
          display: block;
          padding: 0 5px;
        }
      }
    }
    .view-cart-div-6 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
  }
  .status-title {
    background-color: #4dbd74;
    padding: 4px 4px;
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    line-height: 10px;
    margin-left: 10px;
    display: inline-block;
    font-weight: 400;
    font-style: normal;
    text-transform: capitalize;
  }
  .pending-status {
    background-color: #f8cb00;
    padding: 4px 4px;
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    line-height: 10px;
    margin-left: 10px;
    display: inline-block;
    font-weight: 400;
    font-style: normal;
    text-transform: capitalize;
  }
  .hold-status {
    background-color: #6d6d6d;
    padding: 4px 4px;
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    line-height: 10px;
    margin-left: 10px;
    display: inline-block;
    font-weight: 400;
    font-style: normal;
    text-transform: capitalize;
  }

  .friend-meet-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    .button-panel {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 30px 0 0 0;
      .send-invite {
        background: var(--primary-color);
        width: 110px;
        text-transform: capitalize;
        padding: 8px 10px;
        margin: 10px 0 0 0;
        outline: 0;
        border: 1px solid var(--primary-color);
      }
    }
    .data-panel {
      width: 100%;
      display: flex;
      align-items: center;
      margin: 0 0 20px 0;
      justify-content: space-between;
      .data-image {
        width: calc(100% - 110px);
        display: flex;
        align-items: center;
        label {
          font-size: 15px;
          padding: 5px 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          color: var(--typo);
          span {
            color: var(--typo);
          }
        }
      }
      .remove-invite {
        width: 125px;
        background: transparent;
        color: var(--primary-color);
        border: 0;
        font-size: 15px;
        outline: 0;
        padding: 0;
        text-align: left;
      }
      img {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        margin: 0 15px 0 0;
      }
    }
    .main-content {
      width: 100%;
      display: flex;
      align-items: center;
      margin: 0 0 30px 0;
      position: relative;
      .alert {
        position: absolute;
        left: 596px;
        padding: 5px 10px;
        font-size: 13px;
        background: #d56464;
        top: 42px;
      }
      label {
        margin: 0;
        font-size: 14px;
        color: var(--typo);
      }
      input {
        background-color: var(--white-color);
        border: 1px solid var(--typo);
        width: 192px;
        height: 40px;
        color: var(--typo);
        font-size: 14px;
        outline: 0;
        border-radius: 3px;
        padding: 0 12px;
        margin: 0 10px;
        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 1px var(--primary-color);
          outline: 2px solid transparent;
        }
      }
    }
  }



  .video-streaming-container {
    width: 100%;
    display: flex;
    margin: 25px 0 60px 0;
    .video-streaming-panel {
      width: 66.66%;
      display: flex;
      height: 410px;
      background: #333333;
      color: #ffffff;
      font-size: 20px;
      justify-content: center;
      align-items: center;
    }
    .chat-panel {
      width: 33.33%;
      display: flex;
      flex-direction: column;
      padding: 0 0 0 15px;
      .chat-section {
        width: 100%;
        display: flex;
        color: #ffffff;
        font-size: 18px;
        justify-content: center;
        align-items: center;
        height: 378px;
      }
      .follow-panel {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .follow-button {
          background: #1b1b1b;
          border: 1px solid #1b1b1b;
          min-width: 50px;
          width: auto;
          padding: 0 15px;
          height: 30px;
          display: flex;
          color: #ffffff;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          border-radius: 2px;
          cursor: pointer;
          svg {
            color: #ffffff;
            width: 17px;
            margin: 0 6px 0 0;
          }
        }
        .subscribe-button {
          background: var(--primary-color);
          border: 1px solid var(--primary-color);
          min-width: 50px;
          width: auto;
          padding: 0 15px;
          height: 30px;
          display: flex;
          color: #ffffff;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  }
  .connection-detail-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 20px 0 0 0;
    .social-icons {
      width: auto;
      display: flex;
      align-items: center;
      .give-tip-tag {
        width: auto;
        display: flex;
        padding: 10px 20px;
        border-radius: 10px;
        background: var(--white-color);
        position: relative;
        align-items: center;
        margin: 0 15px 0 0;
        .text-tag {
          font-size: 14px;
          color: var(--typo);
          font-weight: 500;
          padding: 0 15px 0 0;
        }
        .up-icon {
          width: auto;
          margin: 0 0 0 15px;
          svg {
            color: #8785ac;
            width: 20px;
          }
        }
        em {
          font-size: 15px;
          color: #999999;
          font-style: normal;
          position: absolute;
          left: 0;
          top: 0;
          left: 95px;
          top: 14px;
        }
        input {
          border: 1px solid #5b5a5b;
          width: 70px;
          height: 30px;
          background: transparent;
          font-size: 12px;
          color: #999999;
          padding: 0 5px 0 18px;
        }
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        li {
          margin: 0 4px;
          padding: 0;
          display: inline-block;
          width: 30px;
          height: 30px;
          background: #fff;
          border-radius: 50%;
          text-align: center;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
          &:hover {
            background: var(--primary-color);
            svg {
              color: #ffffff;
            }
          }
          svg {
            color: var(--primary-color);
            width: 15px;
            margin: 5px 0 0 0;
          }
        }
      }
    }
  }
  .item-header-cover-image {
    display: flex;
    position: relative;
    flex-direction: column;
    @media (min-width: 992px) {
      flex-direction: row;
      padding-left: 30px;
    }
  }
  .item-header-avatar {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: -90px;
    z-index: 2;
    margin-bottom: 20px;
    min-width: 180px;
    min-height: 180px;
    max-height: 180px;
    max-width: 180px;
    background-color: #555;
    border-radius: 4px;
    border: 5px solid #fff;
    box-shadow: 0 2px 5px 0 rgb(18 43 70 / 12%), 0 0 0 1px #e7e9ec;
    img {
      width: 100%;
      height: 100%;
    }
    @media (min-width: 992px) {
      margin: -40px 30px 5px 0;
    }
    &:hover {
      .edit-avatar-icon {
        display: block;
      }
    }
    .edit-avatar-icon {
      width: 30px;
      height: 30px;
      display: none;
      position: absolute;
      top: 10px;
      left: 10px;
      background: #ffffff;
      text-align: center;
      border-radius: 50%;
      cursor: pointer;
      top: 69px;
      left: 69px;
      svg {
        color: var(--primary-color);
        width: 19px;
        top: 2px;
        position: relative;
        left: 2px;
      }
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 150px;
        display: none;
        height: 28px;
        background: #ffffff;
        bottom: 100%;
        border-radius: 5px;
        font-size: 12px;
        color: var(--primary-color);
        left: -58px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 5px 10px;
        text-align: center;
        top: 30px;
        em {
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid #ffffff;
          position: absolute;
          top: -4px;
          left: 68px;
        }
      }
    }
  }
  .item-body-content {
    width: 100%;
    margin: 40px 0 0 0;
    display: flex;
    flex-direction: column;
    .card_main_tag {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .card_follower {
        width: calc(100% / 3);
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .card_follower_text {
          font-size: 16px;
          line-height: 28px;
          color: #ffffff;
          width: 100%;
          display: flex;
          word-wrap: break-word;
          justify-content: center;
          align-items: center;
        }
        .card_follower_img {
          margin-bottom: 1rem;
          img {
            width: 150px;
            height: 150px;
            border-radius: 100%;
          }
        }
      }
    }
    .about-content {
      margin: 20px 0;
      display: inline-block;
      width: 100%;
      box-shadow: 0 0 4px 0 #ccc;
      padding: 30px;
      background: #1b1b1b;
      .wcfm_policies_heading {
        text-transform: uppercase;
        font-size: 17px;
        line-height: 11px;
        color: var(--primary-color);
        border-bottom: 1px solid #ededed;
        padding-bottom: 14px;
        font-weight: 600;
        margin-bottom: 25px;
      }
      p {
        padding: 0 0 20px 0;
        line-height: 22px;
        margin: 0;
        font-size: 14px;
        img {
          float: left;
          width: 300px;
          height: 300px;
          margin: 0 10px 10px 0;
        }
      }
    }
    .show-results {
      width: 100%;
      font-size: 14px;
      color: var(--primary-color);
      display: flex;
      margin: 0 0 15px 0;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        margin: 0 5px 0 0;
      }
    }
    .latest-activity-panel {
      width: 100%;
      display: flex;
      flex-direction: column;
      .main-tag {
        width: 100%;
        display: flex;
        font-size: 1.25rem;
        line-height: 28px;
        color: var(--typo);
        margin: 15px 0 30px 0;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          margin: 0 7px 0 0;
        }
      }
      .activity-tag {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
    }
    .products-panel {
      width: 100%;
      flex-wrap: wrap;
      display: flex;
      ul {
        margin: 0;
        padding: 0;
        display: flex;
        width: 100%;
        list-style: none;
        flex-wrap: wrap;
        li {
          padding: 10px;
          margin-bottom: 15px;
          margin: 0 10px 20px;
          position: relative;
          background-color: #1b1b1b;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          width: calc(25% - 20px);
          max-width: calc(25% - 20px);
          .sale-tag {
            background-color: #fe6f4b;
            width: 55px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 14px;
            position: absolute;
            right: 0;
            top: 0;
            border-radius: 0 3px 0 3px;
          }
          .icon-tag {
            background-color: #1b1b1b;
            width: auto;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #555555;
            padding: 3px;
            border-radius: 3px 0 3px 0;
            position: absolute;
            left: 0;
            top: 0;
            span {
              font-size: 18px;
              color: #ffffff;
            }
            a {
              transition: all 0.2s linear;
              outline: none;
              text-decoration: none;
              color: #ffffff;
              padding: 0 7px;
              cursor: pointer;
              svg {
                width: 15px;
                color: #ffffff;
              }
            }
          }
          .text-tag {
            margin: 0;
            font-size: 14px;
            font-weight: 400;
            width: 100%;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: var(--typo);
            margin: 10px 0 0 0;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 45px;
          }
          .dollar-cut-tag {
            margin: 0;
            width: 100%;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: var(--primary-color);
            margin: 10px 0 0 0;
            justify-content: center;
            align-items: center;
            height: 66px;
            text-align: center;
            word-break: break-all;
            .cut-tag {
              color: #333;
              font-size: 14px;
              font-weight: 400;
              margin: 0 5px 0 0;
              text-decoration: line-through;
            }
            .highlighted-text {
              background: #fff9c0;
              color: #000;
              text-decoration: none;
              font-size: 14px;
              font-weight: 500;
            }
          }
          .button-panel {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .button-tag {
              width: 100%;
              display: flex;
              height: 45px;
              align-items: center;
              justify-content: center;
              color: var(--primary-color);
              border-top: 1px solid #e7e9ec;
              border-right: 1px solid #e7e9ec;
              background-color: #2e2e2e;
              text-transform: uppercase;
              font-weight: 400;
              font-size: 13px;
              line-height: 2.5;
              text-align: center;
              min-height: auto;
              white-space: nowrap;
              overflow: hidden;
              outline: 0;
              transition: all 0.2s;
              &:last-child {
                border-right: 0;
              }
              &:hover {
                background-color: var(--primary-color);
                color: #ffffff;
              }
            }
          }
          .dollar-tag {
            margin: 0;
            font-size: 14px;
            font-weight: 400;
            width: 100%;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: var(--primary-color);
            margin: 10px 0 0 0;
            justify-content: center;
            align-items: center;
            height: 66px;
            text-align: center;
            word-break: break-all;
          }
          .image-tag {
            width: 100%;
            display: flex;
            height: 200px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .itemBody {
    padding: 20px 0;
    width: 100%;
  }
  .video-panel {
    width: 100%;
    display: flex;
    video {
      width: 100%;
      height: 350px;
    }
  }
  .meeting-panel {
    width: 470px;
    display: flex;
    flex-direction: column;
    padding: 25px 38px 32px 38px;
    background: #292929;
    border-radius: 2px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    h1 {
      font-size: 25px;
      color: #ffffff;
      font-weight: 500;
    }
    input {
      width: 300px;
      height: 35px;
      outline: 0;
      background: #ffffff;
      border-radius: 5px;
      padding: 5px 10px;
      color: #000000;
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      margin: 0 0 15px 0;
    }
    button {
      width: 300px;
      height: 35px;
      background: #5000e5;
      border: 1px solid #4443df;
      font-size: 13px;
      color: #ffffff;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: 0;

      &:after {
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
        content: '';
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        position: absolute;
        right: 16px;
        top: 10px;
      }
    }
  }
  #react-jitsi-container {
    width: 100% !important;
  }
  .subnav-panel {
    display: flex;
    align-items: center;
    margin: 20px 0;
    font-size: 14px;
    justify-content: space-between;
    padding: 0 15px 0 0;
    ul {
      display: flex;
      padding: 0;
      margin: 0;
      li {
        float: left;
        list-style-type: none;
        margin: 0;
        &:not(:last-child) {
          padding-right: 20px;
        }
        &:hover {
          a,
          button {
            color: var(--primary-color);
            border-bottom-color: #ffffff;
            background: transparent;
          }
        }
        &.active {
          a,
          button {
            color: var(--primary-color);
            border-bottom-color: #ffffff;
          }
        }
        a,
        button {
          padding: 0 0 10px;
          color: var(--typo);
          border: 0;
          border-bottom: 1px solid transparent;
          display: inline-block;
          border-radius: 0 !important;
          background: transparent;
          text-transform: capitalize;
          font-weight: 400;
          &:hover,
          &:active {
            background: transparent !important;
            color: var(--primary-color) !important;
            border-bottom-color: #ffffff !important;
          }
        }
      }
    }
  }
  .SubNav {
    display: flex;
    align-items: center;
    margin: 20px 0;
    font-size: 14px;
    justify-content: space-between;
    padding: 0 15px 0 0;
    ul {
      display: flex;
      padding: 0;
      margin: 0;
      li {
        float: left;
        list-style-type: none;
        margin: 0;
        &:not(:last-child) {
          padding-right: 20px;
        }
        &:hover {
          a,
          button {
            color: var(--primary-color);
            border-bottom-color: #ffffff;
            background: transparent;
          }
        }
        &.active {
          a,
          button {
            color: var(--primary-color);
            border-bottom-color: #ffffff;
          }
        }
        a,
        button {
          padding: 0 0 10px;
          color: var(--typo);
          border: 0;
          border-bottom: 1px solid transparent;
          display: inline-block;
          border-radius: 0 !important;
          background: transparent;
          font-size: 13px;
          font-weight: 600;
          &:hover,
          &:active {
            background: transparent !important;
            color: var(--primary-color) !important;
            border-bottom-color: #ffffff !important;
            &::after {
              background-color: none;
            }
          }
        }
      }
    }
  }
  .header-cover-image {
    height: 300px;
    width: 100%;
    background-position: center center;
    background-color: #555;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    padding: 0;
    z-index: 1;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .follow-button {
      position: absolute;
      background: var(--primary-color);
      min-width: 50px;
      width: auto;
      padding: 0 15px;
      height: 30px;
      display: flex;
      color: #ffffff;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      border-radius: 5px;
      cursor: pointer;
      right: 20px;
      bottom: 10px;
      transition: all 0.2s;
      &:hover {
        background: #000000;
      }
      svg {
        color: #ffffff;
        width: 17px;
        margin: 0 6px 0 0;
      }
    }
    .cancel-button {
      position: absolute;
      right: 162px;
      top: 0;
      background: #000000;
      border: 0;
      border-radius: 3px;
      font-size: 12px;
      color: #ffffff;
      padding: 4px 10px;
    }
    .save-changes-button {
      position: absolute;
      right: 235px;
      top: 0;
      background: #000000;
      border: 0;
      border-radius: 3px;
      font-size: 12px;
      color: #ffffff;
      padding: 4px 10px;
    }
    .drag-button {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 119;
      top: 50%;
      color: #fff;
      background-color: rgba(134, 132, 132, 0.6);
      padding: 10px 15px;
      border-radius: 5px;
      pointer-events: none;
      border: 0;
      svg {
        font-size: 10px;
        width: 17px;
        margin: 0 10px 0 0;
      }
    }
    &:hover {
      .edit-avatar-icon {
        display: block;
        transition: all 0.15s ease;
      }
      .reposition-avatar-icon {
        display: block;
        transition: all 0.15s ease;
      }
    }
    .reposition-avatar-icon {
      width: 30px;
      height: 30px;
      display: none;
      position: absolute;
      background: #ffffff;
      text-align: center;
      border-radius: 50%;
      cursor: pointer;
      top: 55px;
      left: 175px;
      transition: all 0.15s ease;
      svg {
        color: var(--primary-color);
        width: 19px;
        top: 2px;
        position: relative;
        left: 1px;
      }
      &:hover {
        .tooltip-panel {
          display: block;
          transition: all 0.15s ease;
        }
      }
      .tooltip-panel {
        min-width: 170px;
        display: none;
        height: 28px;
        background: #ffffff;
        bottom: 100%;
        border-radius: 5px;
        font-size: 12px;
        color: var(--primary-color);
        left: 42px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 5px 10px;
        text-align: center;
        top: -10px;
        transition: all 0.15s ease;
        em {
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-right: 5px solid #ffffff;
          position: absolute;
          top: 10px;
          left: -5px;
        }
      }
    }
    .edit-avatar-icon {
      width: 30px;
      height: 30px;
      display: none;
      position: absolute;
      top: 10px;
      left: 175px;
      background: #ffffff;
      text-align: center;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.15s ease;
      svg {
        color: var(--primary-color);
        width: 19px;
        top: 2px;
        position: relative;
        left: 2px;
      }
      &:hover {
        .tooltip-panel {
          display: block;
          transition: all 0.15s ease;
        }
      }
      .tooltip-panel {
        min-width: 150px;
        display: none;
        height: 28px;
        background: #ffffff;
        bottom: 100%;
        border-radius: 5px;
        font-size: 12px;
        color: var(--primary-color);
        left: 42px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 5px 10px;
        text-align: center;
        top: -10px;
        transition: all 0.15s ease;
        em {
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-right: 5px solid #ffffff;
          position: absolute;
          top: 10px;
          left: -5px;
        }
      }
    }
  }

  .product-detail-panel {
    width: 100%;
    display: flex;
    padding: 80px 0 0 0;
    flex-direction: column;
    .review-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 25px 0 0 0;
      h2 {
        font-size: 1.5rem;
        line-height: 32px;
        margin: 0 0 20px 0;
      }
      .review-comment {
        width: 100%;
        display: flex;
        font-size: 15px;
        word-wrap: break-word;
        margin: 0 0 20px 0;
      }
      .review-subscription {
        width: 100%;
        display: flex;
        font-size: 17px;
        margin: 0 0 10px 0;
      }
      .star-tag {
        width: 100%;
        display: flex;
        margin: 0 0 25px 0;
        svg {
          width: 16px;
          margin: 0 3px 0 0;
        }
      }
      .button-tag {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        button {
          background-color: var(--primary-color);
          border: 1px solid var(--primary-color);
          width: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px 10px;
          font-size: 14px;
          color: #ffffff;
        }
      }
      .capcha-panel {
        border: 1px solid #525252;
        background: #222;
        color: #fff;
        border-radius: 3px;
        display: flex;
        height: 75px;
        width: 300px;
      }
      .review-textarea {
        width: 100%;
        display: flex;
        margin: 0 0 15px 0;
        textarea {
          height: 75px;
          background-color: #1b1b1b;
          border: 1px solid #000000;
          outline: 0;
          width: 100%;
          font-size: 14px;
          color: #ffffff;
          resize: none;
        }
      }
      .review-ratings {
        width: 100%;
        display: flex;
        font-size: 15px;
        margin: 0 0 10px 0;
        span {
          color: red;
          margin: 0 0 0 5px;
        }
      }
    }
    h1 {
      font-size: 2rem;
      line-height: 1.2;
      margin-bottom: 20px;
      letter-spacing: -0.03rem;
    }
    img {
      height: 380px;
      object-fit: cover;
      margin: 0 0 25px 0;
    }
    h5 {
      font-size: 16px;
      word-wrap: word-break;
    }
  }
  .css-ej923u-menu {
    z-index: 9;
  }
  .css-15vq5-control {
    background: var(--dark-color) !important;
    width: 100%;
    border-radius: 3px;
    margin-right: 0;
    font-size: 13px;
    outline: 0;
    border: 1px solid #ccc;
    color: var(--typo);
    box-shadow: 1px 1px 5px 0 #e9e9e9;
  }
  .css-xb97g8 {
    svg {
      color: #000000;
    }
  }
  .css-ac74xk-control {
    background: var(--dark-color) !important;
    width: 100%;
    border-radius: 3px;
    margin-right: 0;
    font-size: 13px;
    outline: 0;
    border: 1px solid #ccc;
    color: var(--typo);
    box-shadow: 1px 1px 5px 0 #e9e9e9;
  }

  .wfcm-download-panel {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    width: 100%;
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
    .multi_input_block {
      border: 1px solid var(--typo);
      border-radius: 3px;
      padding: 10px;
      margin-bottom: 10px;
      display: flex;
      width: 100%;
    }
    .file-tag {
      width: 100%;
      display: flex;
      font-style: italic;
      margin: 0 0 20px 0;
      font-size: 13px;
      color: var(--typo);
    }
    .col-file-12 {
      width: 100%;
      display: flex;
      .label-tag {
        width: 40%;
        display: flex;
        font-size: 13px;
        color: var(--typo);
        font-style: italic;
        span {
          color: #da0a0f;
        }
      }
      .input-tag {
        width: 60%;
        display: flex;
        font-size: 12px;
        color: var(--typo);
        align-items: center;
        .upload-icon {
          width: auto;
          height: 75px;
          display: flex;
          margin: 0 10px 0 0;
          align-items: center;
          img {
            width: 75px;
            height: 75px;
            margin: 0 10px 0 0;
          }
        }
        .remove-tag {
          display: inline-block;
          font-size: 12px;
          color: var(--typo);
          cursor: pointer;
        }
        button {
          background: var(--primary-color);
          width: auto;
          margin: 0 10px 0 0;
          padding: 6px 12px;
          text-transform: uppercase;
          color: var(--white-color);
          border: 1px solid var(--primary-color);
          border-radius: 3px;
          font-size: 13px;
          font-weight: 500;
          outline: 0;
        }
        .upload-input {
          width: 60%;
          margin: 0 15px 0 0;
        }
        input {
          padding: 8px 10px;
          width: 100%;
          margin-bottom: 15px;
          outline: 0;
          margin-right: 0;
          font-size: 15px;
          display: inline-block;
          line-height: 18px;
          min-height: 35px;
          max-width: 100%;
          color: var(--typo);
          background: transparent;
          border: 1px solid var(--typo);
          border-radius: 2px;
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
      }
    }
  }
  .justify-end {
    justify-content: end;
  }
  .button-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0 0 30px 0;
    border-top: 1px solid #111111;
    padding: 10px 0 0 0;
    button {
      background: var(--primary-color);
      width: auto;
      margin: 0 10px 0 0;
      padding: 10px 20px;
      text-transform: uppercase;
      color: #ffffff;
      border: 1px solid var(--primary-color);
      border-radius: 3px;
      font-size: 14px;
      font-weight: 500;
      outline: 0;
    }
  }
 

  .create-stream-session {
    background: var(--dark-color);
    width: 100%;
    display: flex;
    flex-direction: column;
    h1 {
      margin: 0;
      padding: 15px 20px;
      border-bottom: 1px solid var(--primary-color);
      font-size: 18px;
      color: var(--typo);
      position: relative;
      span {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
  .wcfm-button-panel {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 30px 0 0 0;
    button {
      background: var(--primary-color);
      width: auto;
      margin: 0 10px 0 0;
      padding: 10px 20px;
      text-transform: uppercase;
      color: #ffffff;
      border: 1px solid var(--primary-color);
      border-radius: 3px;
      font-size: 14px;
      font-weight: 500;
      outline: 0;
    }
  }

  .wcfm-descp-panel {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0 30px;
    @media (min-width: 992px) {
      padding: 0 20px 30px 20px;
    }
    .content-panel {
      height: auto;
      width: 100%;
      display: flex;
      margin: 5px 0 0 0;
      .rdw-editor-wrapper {
        background-color: #ffffff;
        overflow: inherit;
        width: 100%;
        height: auto;
        margin: 0 0 42px 0;
        .rdw-editor-main {
          background-color: #ffffff;
        }
      }
    }
    .head-tag {
      width: 100%;
      display: flex;
      font-size: 13px;
      color: #ffffff;
      font-style: italic;
      padding: 0 0 15px 0;
    }
    .button-tag {
      width: 106px;
      display: flex;
      height: 40px;
      align-items: center;
      justify-content: center;
      background-color: var(--primary-color);
      font-size: 13px;
      color: #2271b1;
      border: 1px solid #2271b1;
      border-radius: 3px;
      font-weight: 500;
      svg {
        width: 14px;
        margin: 0 4px 0 0;
      }
    }
  }


  .wcfm_products_menus {
    list-style: none;
    margin-left: 0px;
    padding: 0;
    font-size: 13px;
    color: var(--typo);
    display: none;
    float: left;
    margin-bottom: 5px;
    margin-top: 5px;
    @media (min-width: 992px) { 
      display: table-cell;
    }
    li {
      display: inline-block;
      margin: 0;
      padding: 0;
      white-space: nowrap;
      &.active {
        button {
          color: var(--primary-color);
        }
      }
      button {
        background: transparent;
        border: 0;
        font-size: 12px;
        text-transform: capitalize;
        padding: 0 10px;
        color: var(--typo);
        outline: 0;
        font-weight: 200;
      }
      a {
        font-size: 13px !important;
        color: var(--typo) !important;
        font-weight: 500 !important;
        box-shadow: none !important;
        padding: 0 8px 0 0 !important;
        &.active {
          color: #666;
        }
      }
    }
  }
  .e-range-header {
    padding: 5px 16px 0 16px;
    .e-day-span {
      margin: 0 0 10px 0;
    }
    .e-start-end {
      height: 25px;
      .e-start-label {
        font-size: 16px;
      }
    }
  }
  .limit-button {
    padding: 3px 10px 2px 10px;
    font-size: 14px;
    color: #e85656;
    border: 1px solid #e85656;
    border-radius: 3px;
    display: inline-block;
    float: none;
  }
  .add-tag-panel {
    width: auto;
    display: flex;
    padding: 0 0 10px 0;
    border-bottom: 1px solid #ffffff;
    justify-content: end;
    button {
      background: transparent;
      border: 0;
      border-bottom: 1px solid #ccc;
      padding: 5px 10px;
      text-transform: capitalize;
      font-size: 14px;
      font-weight: 300;
      color: #858585;
      svg {
        width: 18px;
        margin: 0 8px 0 0;
      }
    }
  }
  // input,
  // button {
  //   padding: 7px;
  //   display: block;
  //   border-radius: 4px;
  //   border: 1px solid #999;
  //   width: 300px;
  // }

  button {
    width: auto;
  }

  .err {
    margin: 4px 0 0 0;
    font-size: 13px;
    color: #e64646;
  }
  .new-tag-panel {
    width: auto;
    display: flex;
    justify-content: flex-end;
    @media (min-width: 992px) { 
      justify-content: unset;
    }
    button {
      background: transparent;
      border: 0;
      border-bottom: 1px solid #ccc;
      text-transform: capitalize;
      font-size: 14px;
      font-weight: 300;
      color: #858585;
      outline: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 8px;
      svg {
        width: 15px;
        margin: 0 7px 0 0;
      }
    }
  }

  .mtop30 {
    margin: 10px 0 0 0;
    flex-direction: column;
  }

  .datepicker-ui {
    position: absolute;
    top: 49px;
    z-index: 9;
    .cross-icon {
      width: 34px;
      height: 30px;
      border: 1px solid #eff2f7;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 0;
      top: -29px;
      position: absolute;
      background: #eff2f7;
      span {
        font-size: 28px;
        color: #000000;
        transform: rotate(45deg);
      }
    }
  }

 
  .events-div-private {
    width: 15%;
    display: flex;
    padding: 10px 5px;

    svg {
      width: 15px;
      color: #ffffff;
      margin: 0 5px 0 0;
    }
  }
  .billing-subtotal-panel {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 25px;
    margin: 0 0 25px 0;
    .billing-subtotal-ui {
      width: 100%;
      display: flex;
      justify-content: space-between;
      @media (min-width: 992px) { 
        justify-content: flex-end;
      }
      .amount-tag {
        width: 21%;
        display: flex;
        background-color: #1b1b1b;
        color: #43454b;
        align-items: flex-end;
        font-weight: 500;
        font-size: 17px;
        line-height: 36px;
        justify-content: end;
        padding: 0 10px 0 0;
        @media (min-width: 992px) { 
          width: 15%; 
        }
      }
      .subtotal-tag {
        width: 100%;
        display: flex;
        color: #43454b;
        text-align: left;
        font-weight: 500;
        font-size: 17px;
        line-height: 36px;
        justify-content: space-between;
        padding: 0 10px;
        @media (min-width: 992px) { 
          width: 16%;
          justify-content: flex-end;
        }
      }
    }
  }
  .no-match-found {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px 0;
  }


  .column-head:first-of-type {
    background: var(--bg);
  }
  .column-head:nth-of-type(2n + 2) {
    background: var(--grey-color);
  }

  .subscription-col-1 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    @media (min-width: 992px) { 
      width: 3%;
      justify-content: unset;
    }

    .cancel-tag {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 60px;
        display: none;
        height: 22px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 11px;
        left: -19px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 3px 10px;
        text-align: center;
        top: 15px;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 25px;
        }
      }
      svg {
        width: 20px;
        color: #f86c6b;
      }
    }
    .tick-tag {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      background: #4096ee;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 60px;
        display: none;
        height: 22px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 11px;
        left: -19px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 3px 10px;
        text-align: center;
        top: 15px;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 25px;
        }
      }
      svg {
        width: 12px;
        color: #000000;
      }
    }
    .expired-tag {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 60px;
        display: none;
        height: 22px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 11px;
        left: -19px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 3px 10px;
        text-align: center;
        top: 15px;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 25px;
        }
      }
      svg {
        width: 19px;
        color: #d0c21f;
      }
    }
    .onhold-tag {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 65px;
        display: none;
        height: 22px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 11px;
        left: -19px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 3px 10px;
        text-align: center;
        top: 15px;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 25px;
        }
      }
      svg {
        width: 20px;
        color: #6d6d6d;
      }
    }
    .subscription-tag {
      width: 15px;
      height: 15px;
      border-radius: 100%;
      background: #20c997;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 60px;
        display: none;
        height: 22px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 11px;
        left: -21px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 3px 10px;
        text-align: center;
        top: 12px;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 25px;
        }
      }
      svg {
        width: 11px;
        color: #000;
      }
    }
  }
  .next-btn {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: end;
    margin: 0 0 30px 0;
    border-top: 1px solid #111111;
    padding: 10px 0 0 0;
  }
  .next-btn button {
    background: var(--primary-color);
    width: auto;
    margin: 0 10px 0 0;
    padding: 10px 20px;
    text-transform: uppercase;
    color: #ffffff;
    border: 1px solid var(--primary-color);
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    outline: 0;
  }

  .edit-thumbnail-icon {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 111px;
    left: 72px;
    background: #ffffff;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    svg {
      color: var(--primary-color);
      width: 19px;
      top: 2px;
      position: relative;
      left: 2px;
    }
    &:hover {
      .tooltip-panel {
        display: block;
      }
    }
    .tooltip-panel {
      min-width: 150px;
      display: none;
      height: 28px;
      background: #ffffff;
      bottom: 100%;
      border-radius: 5px;
      font-size: 12px;
      color: var(--primary-color);
      left: -58px;
      margin-bottom: 11px;
      transform: translate(0, 10px);
      transform-origin: top;
      position: absolute;
      padding: 5px 10px;
      text-align: center;
      top: 30px;
      em {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #ffffff;
        position: absolute;
        top: -4px;
        left: 68px;
      }
    }
  }

  .subscription-col-2-container{
      display: flex;
      flex-direction: column;
    @media (max-width: 991px) { 
      .subscription-col-2-container{
      display: flex;
      flex-direction: column;
      }
    }
  }
  .subscription-col-2 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    word-break: break-word;
    @media (min-width: 992px) { 
      width: 12%;
      display: inline-block;
      justify-content: unset;
    }
    @media (max-width: 991px) { 
      &::before{
        content: attr(data-label);
    }
    }
    
    a {
      color: #ffffff;
      margin: 0 3px 0 0;
    }
  }
  .subscription-col-3 {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 5px;
    align-items: center;
    text-align: center;
    @media (min-width: 992px) { 
      width: 10%;
      flex-direction: column;
      justify-content: center;
    }
    @media (max-width: 991px) { 
      &::before{
        content: attr(data-label);
    }
    }
    span {
      padding: 6px 4px;
      color: #fff;
      border-radius: 2px;
      font-size: 12px;
      line-height: 10px;
      width: 80px;
      display: block;
      background-color: #4096ee;
      margin: 0 auto;
      text-align: center;
    }
  }
  .subscription-col-4 {
    width: 100%;
    display: flex;
    padding: 10px 5px;
    align-items: center; 
    text-align: center;
    justify-content: space-between;
    @media (min-width: 992px) { 
      width: 10%;
      justify-content: center;
    }
    @media (max-width: 991px) { 
      &::before{
        content: attr(data-label);
    }
    }
  }
  .subscription-col-5 {
    width: 100%;
    display: flex;
    padding: 10px 5px;
    flex-direction: row ;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    @media (min-width: 992px) { 
      width: 10%;
      flex-direction: column;
      justify-content: center;
    }
    @media (max-width: 991px) { 
      &::before{
        content: attr(data-label);
    }
    }
    span {
      font-size: 12px;
    }
  }
  .subscription-col-6 {
    width: 100%;
    display: flex;
    padding: 10px 5px;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    @media (min-width: 992px) { 
      width: 10%;
      justify-content: center;
    }
    @media (max-width: 991px) { 
      &::before{
        content: attr(data-label);
    }
    }
  }
  .subscription-col-7 {
    width: 100%;
    display: flex;
    padding: 10px 5px;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    @media (min-width: 992px) { 
      width: 10%;
      justify-content: center;
    }
    @media (max-width: 991px) { 
      &::before{
        content: attr(data-label);
    }
    }
  }
  .subscription-col-8 {
    width: 100%;
    display: flex;
    padding: 10px 5px;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    @media (min-width: 992px) { 
      width: 10%;
      justify-content: center;
    }
    @media (max-width: 991px) { 
      &::before{
        content: attr(data-label);
    }
    }
  }
  .subscription-col-9 {
    width: 100%;
    display: flex;
    padding: 10px 5px;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    @media (min-width: 992px) { 
      width: 10%;
      justify-content: center;
    }
    @media (max-width: 991px) { 
      &::before{
        content: attr(data-label);
    }
    }
  }
  .subscription-col-10 {
    width: 100%;
    display: flex;
    padding: 10px 5px;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    @media (min-width: 992px) { 
      width: 10%;
      justify-content: center;
    }
    @media (max-width: 991px) { 
      &::before{
        content: attr(data-label);
    }
    }
  }
  .subscription-col-11 {
    width: 100%;
    display: flex;
    padding: 10px 5px;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    position: relative;
    @media (min-width: 992px) { 
      width: 5%;
      justify-content: center;
    }
    @media (max-width: 991px) { 
      &::before{
        content: attr(data-label);
    }
    }
    &:hover {
      .tooltip-panel {
        display: block;
      }
    }
    .tooltip-panel {
      min-width: 89px;
      display: none;
      height: 22px;
      background: rgba(255, 255, 255, 0.95);
      box-shadow: none;
      color: #000;
      bottom: 100%;
      border-radius: 5px;
      font-size: 11px;
      left: -20px;
      margin-bottom: 11px;
      transform: translate(0, 10px);
      transform-origin: top;
      position: absolute;
      padding: 3px 10px;
      text-align: center;
      top: 20px;
      em {
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #fff;
        position: absolute;
        top: -4px;
        left: 40px;
      }
    }
    svg {
      width: 14px;
    }
  }
  .custom-icon {
    width: 20px;
    height: 20px;
  }
  .header {
    width: 100%;
    height: calc(var(--header-height) + 1rem);
    position: fixed;
    top: 0;
    left: 0;
    padding: 0.5rem 1rem;
    background-color: var(--bg);
    z-index: var(--z-fixed);
    transition: all 0.5s;

    &__toggle {
      color: var(--white-color);
      font-size: 1.5rem;
      cursor: pointer;
    }
    &__img {
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;

      & img {
        width: 40px;
      }
    }
  }

  /*===== NAV =====*/
  .l-navbar {
    position: fixed;
    top: 0;
    left: -30%;
    width: var(--nav-width);
    height: 100vh;
    background-color: var(--first-color);
    padding: 0.5rem 1rem 0 0;
    transition: 0.5s;
    z-index: var(--z-fixed);
  }

  .nav__list {
    list-style: none;
    padding: 0;
  }

  .sidenav-list {
    li {
      position: relative;
      .nav__notification {
        position: absolute;
        right: 0;
        top: 6px;
        padding: 2px 9px;
        width: auto;
        font-style: normal;
      }
    }
  }

  .nav__icon {
    &:hover {
      .tooltip-panel {
        display: block;
      }
    }
    .tooltip-panel {
      min-width: 89px;
      display: none;
      height: 28px;
      background: rgba(255, 255, 255, 0.95);
      box-shadow: none;
      color: #000;
      bottom: 100%;
      border-radius: 5px;
      font-size: 13px;
      left: -56px;
      margin-bottom: 11px;
      transform: translate(0, 10px);
      transform-origin: top;
      position: absolute;
      padding: 7px 10px;
      text-align: center;
      top: -44px;
      em {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--primary-color);
        position: absolute;
        top: 28px;
        left: 57px;
      }
    }
    svg {
      width: 17px;
      margin: -7px 0 0 0;
    }
  }
  .header-toggle,
  .header__toggle svg {
    width: 20px;
    opacity: 1;
    cursor: pointer;
    transition: opacity ease-out 0.5s;
  }

  .header-toggle.hide {
    opacity: 0;
  }
  .overflow-inherit {
    overflow: inherit !important;
  }
  .nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    &__logo,
    &__link {
      display: grid;
      grid-template-columns: max-content max-content;
      align-items: center;
      column-gap: 1rem;
      padding: 0 0 0.5rem 1.5rem;
    }
    &__logo {
      margin-bottom: 1rem;
      margin-top: 6px;
      &-icon {
        font-size: 1.25rem;
        color: var(--white-color);
      }
      &-name {
        color: var(--white-color);
        font-weight: 700;
      }
    }
    &__notification {
      color: var(--white-color);
      background-color: var(--primary-color);
      text-align: center;
      min-width: 1.5vw;
      height: 2vh;
      padding: 0px 5px;
      font-size: 11px;
      justify-content: center;
      align-items: center;
      display: flex;
      margin-left: 10px;
      border-radius: 10px;
      min-height: 16px;
      position: absolute;
      top: 0;
    }

    &__link {
      position: relative;
      color: var(--first-color-light);
      margin-bottom: 7px;
      transition: 0.3s;
      font-size: 14px;

      &:hover {
        color: var(--primary-color) !important;
        cursor: pointer;
      }
    }

    &__icon {
      font-size: 1.25rem;
    }
  }

  /*Show navbar movil*/
  .show {
    left: 0;
  }

  /*Active links*/
  .active {
    color: var(--white-color);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 0;
      height: 32px;
      background-color: var(--white-color);
    }
  }

  .transform-180 {
    transform: rotate(180deg);
  }
  .nav-head {
    width: auto;
    input {
      width: 320px;
      margin: 0 10px 0 0;
    }
    svg {
      cursor: pointer;
      &:hover {
        color: #f61b60;
      }
    }
  }
  .nav-profile {
    display: none;
    display: flex;
    justify-content: end;
    align-items: end;
    li {
      list-style: none;
      align-items: center;
      justify-content: center;
      display: flex;
    }
  }
  .notification-click-event {
    width: 100%;
    display: flex;
    position: fixed;
    height: 100%;
    background: transparent;
    top: 0;
    left: 0;
  }
  .notification-bell {
    position: relative;
    margin: 0 5px 0 10px;
    svg {
      width: 15px;
      margin: 0 15px 0 0;
      cursor: pointer;
    }
    .count {
      line-height: 1.6;
      font-size: 9px;
      background-color: #c92c04;
      right: 3px;
      border-radius: 100%;
      padding: 1px 7px;
      position: absolute;
      color: #ffffff;
      top: -6px;
      font-size: 11px;
    }
    .notification-wrapper {
      border: 1px solid;
      margin: 0;
      width: 430px;
      overflow: hidden;
      background-color: var(--bg);
      box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%),
        0 6px 32px 0 rgb(18 43 70 / 10%);
      border-radius: 4px;
      list-style: none;
      position: absolute;
      right: -120px;
      z-index: 1001;
      top: 33px;
      .notification-list {
        width: 100%;
        max-height: 52vh;
        overflow: auto;
        padding: 0;
        overflow-x: hidden;
        margin: 0;
        line-height: 1;
        li {
          display: flex;
          -webkit-box-align: start;
          -ms-flex-align: start;
          align-items: flex-start;
          padding: 15px 20px;
          border-bottom: 1px solid #e7e9ec;
          position: relative;
          border-bottom: 1px solid #000000;
          cursor: pointer;
          .icon-tag {
            width: auto;
            display: flex;
            margin: 15px 0 0 10px;
            position: relative;
            svg {
              width: 16px;
              margin: 0;
              cursor: pointer;
              color: var(--typo);
            }
            &:hover {
              .tooltip-panel {
                display: block;
              }
              svg {
                color: var(--primary-color);
              }
            }
            .tooltip-panel {
              min-width: 89px;
              display: none;
              height: 28px;
              background: var(--primary-color);
              bottom: 100%;
              border-radius: 5px;
              font-size: 13px;
              color: var(--typo);
              left: -56px;
              margin-bottom: 11px;
              transform: translate(0, 10px);
              transform-origin: top;
              position: absolute;
              padding: 7px 10px;
              text-align: center;
              top: -44px;
              em {
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid var(--primary-color);
                position: absolute;
                top: 28px;
                left: 57px;
              }
            }
          }
          .bb-full-link {
            font-size: 14px;
            color: var(--typo);
            letter-spacing: -0.24px;
            line-height: 1.3;
            width: calc(100% - 50px);
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            a {
              color: var(--primary-color);
              white-space: nowrap;
              overflow: hidden;
              cursor: pointer;
              text-overflow: ellipsis;
            }
            span {
              margin-top: 6px;
              color: #a3a5a9;
              display: block;
              font-size: 12px;
            }
          }
          .notification-avatar {
            margin-right: 22px;
            min-width: 36px;
            max-height: 36px;
            img {
              display: block;
              max-width: 36px;
              border-radius: 50%;
            }
          }
          .notification-content {
            color: var(--typo);
            font-size: 16px;
            letter-spacing: -0.24px;
            line-height: 1.3;
          }
          &:hover {
            background: var(--bg) !important;
          }
        }
      }
      .notification-header {
        color: #000000;
        border-bottom: 1px solid #000000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 20px;
        h2 {
          font-size: 1rem;
          line-height: 1;
          margin: 0;
          font-weight: 400;
          padding: 0;
        }
        .mark-tag {
          cursor: pointer;
          color: #ffffff;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: -0.24px;
          line-height: 1;
          margin: 0 0 0 22px;
          padding: 0;
          cursor: pointer;
          &:hover {
            color: var(--primary-color);
          }
        }
      }
    }
  }

  @media screen and (min-width: 576px) {
    .nav-profile {
      display: flex;
    }
  }

  /*Show navbar desktop*/
  .l-navbar.show {
    width: calc(var(--nav-width) + 156px);
  }

  .main {
    margin: calc(var(--header-height) + 1rem) 0 0 0;
  }

  @media screen and (min-width: 768px) {
    /*Add padding body movil*/
    .body-pd {
      padding-left: calc(var(--nav-width) + 1rem);
    }
    .header {
      height: calc(var(--header-height) + 1rem);
    }

    .header-toggle.desktop {
      display: none;
    }

    .l-navbar {
      left: 0;
      padding: 1rem 14px 0 0;
    }

    .body-pd {
      padding-left: calc(var(--nav-width) + 188px);
    }
  }
`
