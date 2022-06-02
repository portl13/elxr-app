import { css } from "@emotion/core";


export const MenuAndHeaderStyle = css`
  .rc-time-picker-input {
    height: 50px;
    color:red;
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
    transition: .2s box-shadow;
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
        letter-spacing: -.24px;
        color: #A3A5A9;
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
        letter-spacing: -.24px;
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
        letter-spacing: .23px;
      }
      .course-complete {
        background-color:#1cd991;
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
        letter-spacing: .23px;
      }
      .progress-div{
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
        letter-spacing: .23px;
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
        letter-spacing: .23px;
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

    .back-btn{
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
      font-size: .92em;
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
        font-size: .92em;
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
      letter-spacing: -.24px;
      color: #A3A5A9;
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
        font-size: 16px!important;
        font-weight: 600;
        letter-spacing: .6px;
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
            color: #A3A5A9;
            font-size: 14px;
          }
        }
      }
      .courses-lessons-panel {
        background: rgba(146,164,183,.05);
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
        color: #A3A5A9;
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
      color: #A3A5A9;
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
          .course-price{
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

          .enroll-btn{
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
            letter-spacing: .5px;
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
            letter-spacing: .5px;
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
          letter-spacing: .61px;
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
          opacity: .8;
          font-size: 16px;
          letter-spacing: -.24px;
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
            letter-spacing: -.19px;
            display: flex;
          }
          a {
            color: var(--white-color);
            font-size: 14px;
            letter-spacing: -.24px;
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
          .bb-course-title{
            color: var(--typo);
          }
          .bb-course-paid {
            padding-bottom: 45px;
            background-color: var(--dark-color);
            border-color: var(--white-color);
            transition: .2s box-shadow;
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
                letter-spacing: -.24px;
                color: #A3A5A9;
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
                letter-spacing: -.24px;
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
                letter-spacing: .23px;
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
        letter-spacing: -.24px;
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
      letter-spacing: .23px;
    }
    .course-complete {
      background-color:#1cd991;
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
      letter-spacing: .23px;
    }
    .progress-div{
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
      letter-spacing: .23px;
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
              transform: translate(0,10px);
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
              transform: translate(0,10px);
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
  .withdraw-wrapper-div {
    width: 100%;
    display: flex;
    border-radius: 4px;
    flex-direction: column;
    .view-wrapper-panel {
      width: 100%;
      display: flex;
      border: 1px solid #e7e9ec;
      border-radius: 0 3px 3px 3px;
      padding: 20px 20px;
      flex-direction: column;
      .col-panel {
        width: 80%;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        .col-12-tag {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin: 0 0 15px 0;
          button {
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
          }
          label {
            font-size: 14px;
            color:var(--typo);
          }
          input {
            background-color: var(--dark-color);
            border: 1px solid var(--white-color);
            width: 100%;
            height: 40px;
            color: var(--typo);
            font-size: 14px;
            outline: 0;
            border-radius: 3px;
            padding: 0 12px;
            &:focus {
              border-color: var(--primary-color);
              box-shadow: 0 0 0 1px var(--primary-color);
              outline: 2px solid transparent;
            }
          }
        }
      }
      .woocommerce-error {
        background: #ef3e46;
        padding: 10px 15px;
        color: var(--white-color);
        border: 0;
        border-radius: 4px;
        border: 1px solid #ef3e46;
        font-size: 16px;
        width: 100%;
        display: flex;
        margin: 0 0 20px 0;
        a {
          color: var(--white-color);
        }
      }
    }
    ul {
      width: 100%;
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        padding: 7px 10px;
        width: auto;
        display: flex;
        border: 1px solid var(--white-color);
        background: var(--dark-color);
        color: var(--typo);
        border-radius: 4px 4px 0 0;
        margin: 0 5px -1px 0;
        cursor: pointer;
        &:hover {
          border: 1px solid var(--primary-color);
          background: var(--dark-color);
          color: var(--primary-color);
        }
        &.active {
          border: 1px solid var(--primary-color);
          background: var(--dark-color);
          color: var(--primary-color);
        }
      }
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
            width:25px;
            height: 25px;
            display: flex;
            color: #939597;
            line-height: .9;
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
              color: #A3A5A9;
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
        color: #A3A5A9;
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
        line-height: .9;
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
  .status-title{
    background-color:#4dbd74;
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
    background-color:#f8cb00;
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
  background-color:#6d6d6d;
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
  .my-wallet-panel {
    width: 100%;
    display: flex;
    border: 1px solid #f2f2f2;
    .woo-wallet-content {
      width: 70%;
      display: flex;
      padding: 20px;
      flex-direction: column;
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
          color: #A3A5A9 !important;
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
          color: #A3A5A9 !important;
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
          color: #A3A5A9 !important;
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
      width: 30%;
      display: flex;
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
        li {
          background: var(--white-color);
          border-radius: 2px;
          text-align: center;
          position: relative;
          max-width: 100%;
          transition: all .3s cubic-bezier(.25,.8,.25,1);
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
          a {
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
              color: var(--typo)
            }
            p {
              margin: 0 auto;
              line-height: 1em;
              font-size: 16px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }

  .transactions-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    .current-balance-panel {
      width: 100%;
      display: flex;
      font-size: 16px;
      line-height: 1.6875rem;
      color: #ffffff;
      svg {
        width: 15px;
        color: #ffffff;
        margin: 0 0 0 10px;
        cursor: pointer;
        &:hover {
          color: var(--primary-color);
        }
      }
    }
    .wcfm-datatable {
      padding: 0;
    }
    .search-panel {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .search-tag {
        width: auto;
        display: flex;
        align-items: center;
        color: var(--white-color);
        font-size: 16px;
        position: relative;
        svg {
          color: #9ca8b4;
          width: 12px;
          position: absolute;
          left: 142px;
          top: 23px;
          z-index: 9;
        }
        button {
          position: absolute;
          right: 4px;
          background: transparent;
          border: 0;
          color: #ffffff;
          transform: rotate(45deg);
          font-size: 22px;
          color: var(--primary-color);
          outline: 0;
        }
        input {
          background-color: var(--dark-color);
          border: 1px solid var(--white-color);
          width: 212px;
          margin: 0 0 0 8px;
          border-radius: 3px;
          outline: 0;
          font-size: 15px;
          height: 40px;
          padding: 0 30px;
          color: var(--typo);
          outline: 0;
          &:focus {
            border: 1px solid var(--primary-color);
          }
        }
      }
      .entries-panel {
        width: auto;
        display: flex;
        align-items: center;
        color: var(--typo);
        font-size: 16px;
        margin: 30px 0 0 0;
        select {
          background-color: var(--dark-color);
          border: 1px solid var(--white-color);
          width: 62px;
          margin: 0 8px;
          border-radius: 3px;
          outline: 0;
          font-size: 15px;
          height: 40px;
          padding: 0 8px;
          color: var(--typo);
          outline: 0;
          &:focus {
            border: 1px solid var(--primary-color);
          }
        }
      }
    }
  }
  .my-account-wrapper {
    background-color: #1b1b1b;
    width: 100%;
    display: flex;
    border-radius: 4px;
    margin-bottom: 30px;
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
        color: #A3A5A9;
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
        border: 0px solid #000000;
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
        color: #fff;
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
        color: #A3A5A9;
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
        .wc-address-details {
          display: flex;
          align-items: center;
          position: relative;
          font-size: 14px;
          color: var(--typo);
          width: 100%;
          word-break: break-wrod;
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
      .wc-MyAccount-inner-content {
        padding: 40px 0 20px 0;
        width: 100%;
        display: flex;
        .datatable-ui {
          width: 100%;
          display: flex;
          flex-direction: column;
          .row-head {
            width: 100%;
            display: flex;
            color: #A3A5A9;
            font-size: 14px;
            text-transform: uppercase;
            align-items: center;
            font-weight: 600;
            border-bottom: 1px solid #cccccc;
          }
          .column-head {
            width: 100%;
            display: flex;
            color: #A3A5A9;
            font-size: 13px;
            border-bottom: 1px solid #cccccc;
            align-items: center;
          }
          .white-color {
            color: #ffffff;
          }
          .download-list-1 {
            width: 40%;
            display: flex;
            padding: 10px 5px;
            span {
              cursor: pointer;
              &:hover {
                color: var(--primary-color);
              }
            }
          }
          .download-list-2 {
            width: 20%;
            display: flex;
            padding: 10px 5px;
            svg {
              width: 11px;
              color: #ffffff;
            }
          }
          .download-list-3 {
            width: 20%;
            display: flex;
            padding: 10px 5px;
          }
          .download-list-4 {
            width: 20%;
            display: flex;
            padding: 10px 5px;
            a {
              background-color: var(--primary-color);
              border: 1px solid var(--primary-color);
              min-height: auto;
              padding: 9px 1.5em;
              margin: 0 0 5px 5px;
              font-size: 13px;
              line-height: 1;
              color: #ffffff;
              outline: 0;
              border-radius: 100px;
              width: auto;
            }
          }
          .order-list-1 {
            width: 20%;
            display: flex;
            padding: 10px 5px;
          }
          .order-list-2 {
            width: 20%;
            display: flex;
            padding: 10px 5px;
          }
          .order-list-3 {
            width: 20%;
            display: flex;
            padding: 10px 5px;
          }
          .order-list-4 {
            width: 20%;
            display: flex;
            padding: 10px 5px;
          }
          .order-list-5 {
            width: 20%;
            display: flex;
            padding: 10px 5px;
            justify-content: end;
            button {
              background-color: var(--primary-color);
              border: 1px solid var(--primary-color);
              min-height: auto;
              padding: 5px 1.2em;
              margin: 0 0 5px 5px;
              font-size: 13px;
              line-height: 1;
              color: #ffffff;
              outline: 0;
              border-radius: 100px;
              max-width: 75px;
              width: 100%;
            }
          }
        }
        .wc-address-details {
          width: 100%;
          display: flex;
          padding: 20px;
          line-height: 21px;
          font-size: 14px;
          flex-direction: column;
          justify-content: start;
          align-items: flex-start;
          word-break: break-wrod;
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
      }
    }
    .bsMyAccount {
      background-color: #1b1b1b;
      min-width: 230px;
      width: 230px;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #e7e9ec;
      h1 {
        font-size: 14px;
        line-height: 1.6875rem;
        padding: 15px 15px;
        text-transform: uppercase;
        margin: 0;
        font-weight: 600;
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
  .item-header-cover-image{
    display: flex;
    position: relative;
    flex-direction:column;
    @media(min-width:992px){
        flex-direction: row;
        padding-left: 30px;
    }
  }
  .item-header-avatar{
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
    background-color:#555;
    border-radius: 4px;
    border: 5px solid #fff;
    box-shadow: 0 2px 5px 0 rgb(18 43 70 / 12%), 0 0 0 1px #e7e9ec;
    img {
      width: 100%;
      height: 100%;
    }
    @media(min-width:992px){
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
            transform: translate(0,10px);
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
      flex-wrap: wrap;.card_follower {
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
            background-color: #FE6F4B;
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
  .itemBody{
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
    ul{
      display: flex;
      padding: 0;
      margin: 0;
      li{
        float: left;
        list-style-type: none;
        margin: 0;
        &:not(:last-child){
          padding-right: 20px;
        }
        &:hover{
          a, button{
            color: var(--primary-color);
            border-bottom-color: #ffffff;
            background: transparent;
          }
        }
        &.active{
          a, button{
            color: var(--primary-color);
            border-bottom-color: #ffffff;
          }
        }
        a, button{
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
          &:active{
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
    ul{
      display: flex;
      padding: 0;
      margin: 0;
      li{
        float: left;
        list-style-type: none;
        margin: 0;
        &:not(:last-child){
          padding-right: 20px;
        }
        &:hover{
          a, button{
            color: var(--primary-color);
            border-bottom-color: #ffffff;
            background: transparent;
          }
        }
        &.active{
          a, button{
            color: var(--primary-color);
            border-bottom-color: #ffffff;
          }
        }
        a, button{
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
          &:active{
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
  .header-cover-image{
    height: 300px;
    width: 100%;
    background-position: center center;
    background-color:#555;
    background-repeat:no-repeat;
    background-size:cover;
    display:block;
    padding:0;
    z-index:1;
    overflow:hidden;
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
        transform: translate(-50%,-50%);
        z-index: 119;
        top: 50%;
        color: #fff;
        background-color: rgba(134,132,132,.6);
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
            transform: translate(0,10px);
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
            transform: translate(0,10px);
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
      letter-spacing: -.03rem;
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
  .main-content-wrapper {
    padding: 0;
    max-width: 1600px;
    margin: 0px auto;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    .main-head-conatiner {
      width: 100%;
      display: flex;
      .left-panel {
        width: 28%;
        display: flex;
        .wcfm-menu-logo {
          height: 66px;
          width: 100%;
          min-height: 55px;
          display: flex;
          color: #ffffff;
          h4 {
            font-size: 18px;
            line-height: 60px;
            padding: 0 10px 0 15px;
            color: var(--typo);
            .avatar-icon {
              width: 35px;
              height: 35px;
              border-radius: 100%;
              margin: 0 10px 0 0;
              img {
                width: 35px;
                height: 35px;
                border-radius: 100%;
                margin: 0 10px 0 0;
              }
              span {
                cursor: pointer;
                color: var(--typo);
                &:hover {
                  color: var(--primary-color);
                }
              }
            }
          }
        }
      }
      .right-panel {
        width: 72%;
        display: flex;
        .wcfm-page-headig {
          padding-left: 5px;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          span {
            font-size: 16px;
            color: var(--primary-color);
            svg {
              color: #ffffff;
              width: 14px;
              margin-right: 8px;
            }
          }
          .right-section {
            width: auto;
            display: flex;
            padding: 0 35px 0 0;
            .notification-ring {
              position: relative;
              width: auto;
              display: flex;
              cursor: pointer;
              margin: 0 20px 0 0;
              .count {
                line-height: 1.6;
                font-size: 9px;
                background-color: #c92c04;
                right: -11px;
                border-radius: 100%;
                padding: 0px 5px;
                position: absolute;
                color: #ffffff;
                top: 14px;
                font-size: 10px;
              }
              svg {
                color: #ffffff;
                width: 16px;
              }
            }
            .horn-ring {
              position: relative;
              width: auto;
              display: flex;
              margin: 0 25px;
              cursor: pointer;
              .count {
                line-height: 1.6;
                font-size: 9px;
                background-color: #4096ee;
                right: -13px;
                border-radius: 100%;
                padding: 0px 5px;
                position: absolute;
                color: #ffffff;
                top: 5px;
                font-size: 10px;
              }
              svg {
                color: #ffffff;
                width: 16px;
              }
            }
            .avatar-image {
              width: 45px;
              height: 45px;
              display: flex;
              flex-direction: column;
              position: relative;
              cursor: pointer;
              &:hover {
                .tooltip-panel {
                  display: block;
                }
              }
              .tooltip-panel {
                min-width: 64px;
                display: none;
                height: 28px;
                background: var(--typo);
                bottom: 100%;
                border-radius: 5px;
                font-size: 12px;
                color: var(--typo);
                left: -8px;
                margin-bottom: 11px;
                transform: translate(0,10px);
                transform-origin: top;
                position: absolute;
                padding: 5px 5px;
                text-align: center;
                top: 43px;
                z-index: 9;
                em {
                    width: 0; 
                    height: 0; 
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-bottom: 5px solid #ffffff;
                    position: absolute;
                    top: -4px;
                    left: 26px;
                }
              }
              .text-tag {
                width: 100%;
                display: flex;
                font-size: 9px;
                margin: 5px 0 0 0;
                color: var(--typo);
              }
              img {
                width: 45px;
                height: 45px;
                border-radius: 100%;
              }
            }
          }
        }
      }
    }


    .main-container-tag {
      padding: 0 30px;
      width: 100%;
      display: flex;
      .wcfm_menu {
        width: 19%;
        display: flex;
        flex-direction: column;
        ul {
          width: 100%;
          margin: 0;
          padding: 0;
          list-style: none;
          li {
            margin: 0;
            padding: 13px 0;
            text-align: center;
            cursor: pointer;
            &:hover {
              color: #ffffff;
              background: var(--primary-color);
              button {
                color: #ffffff;
              }
            }
            &.active {
              background: var(--primary-color);
            }
            svg {
              width: 14px;
            }
            button {
              background: transparent;
              border: 0;
              width: 100%;
              padding: 0 10px;
              color: #ffffff;
              text-transform: capitalize;
              font-weight: 300;
              font-size: 15px;
              box-shadow: none;
            }
          }
        }
      }
      .cancel-btn {
        position: absolute;
        left: 146px;
        top: 90px;
        background: #000000;
        border: 0;
        padding: 0px 7px;
        border-radius: 100%;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        font-size: 18px;
        z-index: 9;
      }
      .wcfm-collapse {
        overflow: hidden;
        width: 81%;
        flex: 5 auto;
        vertical-align: top;
        visibility: visible!important;
        -moz-border-radius: 0 3px 3px 0;
        -webkit-border-radius: 0 3px 3px 0;
        border-radius: 0 3px 3px 0;
        margin-left: auto;
        margin-right: auto;
        //padding-bottom: 207px;
        position: relative;
        .alert-tag {
          left: 31% !important;
          bottom: 192px !important;
          padding: 9px 10px;
        }
        .alert-tags {
          left: 55% !important;
          padding: 9px 10px;
          top: 20%;
          bottom: 382px !important;
        }
        .alert {
          position: absolute;
          left: 0;
          bottom: 45px;
        }
        .wcfm-collapse-content {
          padding: 0 15px 0 0;
          .stream-upper-tag {
            width: 100%;
            display: flex;
          }
          .stream-setting-section {
            width: 100%;
            flex-direction: column;
            display: flex;
            border-top: 2px solid #151515;
            position: relative;
            padding: 30px 0 20px 0;
            h3 {
              font-size: 18px;
              color: #ffffff;
              margin: 0;
              padding: 0 20px 10px 20px;
              text-transform: uppercase;
              border-bottom: 1px solid #ffffff;
              width: 198px;
              margin: 0 0 20px 0;
            }
            h4 {
              font-size: 18px;
              color: #979797;
              margin: 0;
              padding: 0 20px 10px 20px;
              width: 100%;
              margin: 0 0 20px 0;
            }
            .col-12-div {
              width: 100%;
              flex-direction: column;
              display: flex;
              margin: 0 0 20px 0;
            }
            .col-panel {
              width: 100%;
              display: flex;
              margin: 0 0 20px 0;
              .col-1-tag {
                width: auto;
                display: flex;
                flex-direction: column;
                margin: 0 30px 0 0;
              }
            }
            label {
              color: #434343;
              font-size: 16px;
              width: 100%;
              display: flex;
              margin: 0;
              padding: 0 0 10px 0;
            }
            .url-icon {
              svg {
                left: 0 !important;
                width: 16px !important;
              }
            }
            .stream-panel {
              width: auto;
              display: flex;
              position: relative;
              svg {
                width: 18px;
                position: absolute;
                left: 56%;
                top: 8px;
              }
            }
            .stream-key {
              font-size: 16px;
              color: #ffffff;
              border-bottom: 1px solid #4f4f4f;
              border-top: 0;
              border-left: 0;
              border-right: 0;
              width: 60%;
              display: flex;
              background: transparent;
              color: #ffffff;
              padding: 0 30px;
            }
            .stream-url {
              font-size: 16px;
              color: #ffffff;
              border-bottom: 1px solid #4f4f4f;
              border-top: 0;
              border-left: 0;
              border-right: 0;
              width: 76%;
              display: flex;
              background: transparent;
              color: #ffffff;
              padding: 0 30px;
            }
            .reset-button {
              width: auto;
              display: flex;
              height: 36px;
              border-radius: 3px;
              border: 1px solid #ffffff;
              background: #000000;
              margin: 0 0 0 20px;
              font-size: 16px;
              color: #ffffff;
              justify-content: center;
              align-items: center;
              padding: 0 15px;
              cursor: pointer;
            }
            .text-tag {
              width: 100%;
              display: flex;
              color: var(--typo);
              font-size: 18px;
            }
          }
          .stream-category-section {
            width: 100%;
            flex-direction: column;
            display: flex;
            border-top: 2px solid #151515;
            position: relative;
            padding: 30px 0 20px 0;
            .edit-button {
              width: auto;
              display: flex;
              height: 36px;
              border-radius: 3px;
              border: 1px solid #ffffff;
              background: #000000;
              margin: 0 0 0 20px;
              font-size: 16px;
              color: #e91e63;
              text-transform: uppercase;
              justify-content: center;
              align-items: center;
              padding: 0 15px;
              position: absolute;
              right: 0;
              cursor: pointer;
            }
            .col-12-div {
              width: 100%;
              flex-direction: column;
              display: flex;
              margin: 0 0 20px 0;
            }
            .col-panel {
              width: 100%;
              display: flex;
              margin: 0 0 20px 0;
              .col-1-tag {
                width: auto;
                display: flex;
                flex-direction: column;
                margin: 0 30px 0 0;
              }
            }
            label {
              color: #8c8c8c;
              font-size: 15px;
              width: 100%;
              display: flex;
              margin: 0;
              padding: 0;
            }
            .text-tag {
              width: 100%;
              display: flex;
              color: var(--typo);
              font-size: 18px;
            }
          }
          .stream-container {
            width: 100%;
            height: 380px;
            display: flex;
            border: 1px solid #313131;
            border-radius: 2px;
            justify-content: center;
            align-items: center;
            margin: 0 0 50px 0;
          }
          .coming-soon-text {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            color: #ffffff;
            padding: 98px 0;
          }
          h4 {
            font-size: 20px;
            line-height: 20px;
            margin-top: 6px;
            margin-bottom: 15px;
            width: auto;
            padding: 0;
            clear: none;
            width: 100%;
            display: flex;
            padding: 15px 0 0 0;
            margin: 0;
            svg {
              width: 14px;
              margin: 0 5px 0 0;
            }
          }
          h5 {
            font-size: 20px;
            line-height: 20px;
            display: table-cell;
            color: #ffffff;
            margin-top: 6px;
            margin-bottom: 15px;
          }
          .billing-panel {
            width: 100%;
            display: flex;
            padding: 20px 20px;
            flex-direction: column;
            .billing-head {
              width: 100%;
              display: flex;
              color: var(--primary-color);
              border-bottom: 1px solid #ccc;
              font-size: 17px;
              padding: 0 0 10px 0;
              .left-panel {
                width: 50%;
                display: flex;
              }
              .right-panel {
                width: 50%;
                display: flex;
              }
            }
            .billing-section {
              width: 100%;
              display: flex;
              padding: 15px 15px;
              background: #1b1b1b;
              .left-panel {
                width: 50%;
                display: flex;
                align-items: center;
                align-items: flex-start;
                flex-direction: column;
                p {
                  color: var(--typo);
                  font-size: 14px;
                  margin: 0 0 3px 0;
                  span {
                    font-weight: 500;
                    font-size: 16px;
                    margin: 0 3px 0 0;
                  }
                  a {
                    color: #2ea2cc;
                  }
                }
              }
              .right-panel {
                width: 50%;
                display: flex;
                color: #ffffff;
                font-size: 14px;
                align-items: center;
                p {
                  color: #ffffff;
                  font-size: 14px;
                  margin: 0 0 3px 0;
                  span {
                    font-weight: 500;
                    font-size: 16px;
                    margin: 0 3px 0 0;
                  }
                }
              }
            }
          }

          .overview-section {
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 0 20px;
            margin: 0 0 40px 0;
            .btn-group {
              width: 100%;
              display: flex;
              justify-content: end;
              button {
                background: var(--primary-color);
                border: 1px solid var(--primary-color);
                border-radius: 4px;
                color: #ffffff;
                font-size: 16px;
                height: 38px;
                padding: 0 12px;
                margin: 0 0 0 10px;
                outline: none;
              }
            }
            .overview-panel {
              width: 100%;
              display: flex;
              margin: 20px 0 0 0;
              align-items: center;
              .left-panel {
                width: 50%;
                display: flex;
                color: var(--typo);
                font-size: 16px;
                align-items: center;
              }
              .right-panel {
                width: 50%;
                display: flex;
                color: var(--typo);
                font-size: 14px;
                align-items: center;
                position: relative;
                .input-section {
                  width: 100%;
                  display: flex;
                  padding: 8px 10px;
                  margin-right: 0;
                  font-size: 15px;
                  display: inline-block;
                  line-height: 18px;
                  min-height: 35px;
                  max-width: 100%;
                  box-shadow: 1px 1px 5px 0 #e9e9e9;
                }
                .alert {
                  position: absolute;
                  left: 0;
                  bottom: -55px;
                  padding: 5px 10px;
                }
                .active-state {
                  background-color: #4096EE;
                  padding: 4px 4px;
                  color: #fff;
                  border-radius: 2px;
                  font-size: 12px;
                  line-height: 10px;
                  margin: 0 5px 0 0;
                  display: inline-block;
                }
                button {
                  background: var(--primary-color);
                  border: 1px solid var(--primary-color);
                  border-radius: 4px;
                  color: #ffffff;
                  font-size: 16px;
                  height: 38px;
                  padding: 0 12px;
                  margin: 0 0 0 10px;
                  outline: none;
                }
                .date-range {
                  background-color: #060202;
                  box-shadow: 1px 1px 5px 0 #1b1b1b;
                  border: 1px solid #ccc;
                  border-radius: 3px;
                  outline: 0;
                  padding: 8px 10px;
                  color: #ffffff;
                  display: flex;
                  font-size: 14px;
                  max-width: 190px;
                  min-width: 190px;
                  height: 38px;
                  margin: 0 10px 0 0;
                }
                .time-range {
                  background-color: #060202;
                  box-shadow: 1px 1px 5px 0 #1b1b1b;
                  border: 1px solid #ccc;
                  border-radius: 3px;
                  outline: 0;
                  display: flex;
                  padding: 8px 10px;
                  color: #ffffff;
                  font-size: 14px;
                  max-width: 50px;
                  min-width: 50px;
                  height: 38px;
                  margin: 0 10px;
                }
                input {
                  background-color: #060202;
                  box-shadow: 1px 1px 5px 0 #1b1b1b;
                  border: 1px solid #ccc;
                  border-radius: 3px;
                  outline: 0;
                  padding: 8px 10px;
                  color: #ffffff;
                  font-size: 14px;
                  max-width: 150px;
                  min-width: 150px;
                  height: 38px;
                  margin: 0 10px 0 0;
                }
                select {
                  background-color: #060202;
                  box-shadow: 1px 1px 5px 0 #1b1b1b;
                  border: 1px solid #ccc;
                  border-radius: 3px;
                  outline: 0;
                  padding: 7px 10px;
                  color: #ffffff;
                  font-size: 14px;
                  max-width: 150px;
                  min-width: 150px;
                  height: 38px;
                  margin: 0 10px 0 0;
                }
              }
            }
          }
          .wcfm-top-element-container {
            display: flex;
            padding: 30px 25px 5px 10px;
            margin: 0 0 20px 0;
            text-align: center;
            border-bottom: 0;
            max-height: 60px;
            width: 100%;
            border-radius: 0px 0px 3px 3px;
            justify-content: space-between;
            .right-container {
              width: auto;
              display: flex;
              .money-bill {
                margin-bottom: 0;
              }
            }
            .select-tag {
              width: 250px;
              display: flex;
              select {
                width: 100%;
                height: 38px;
                background: var(--white-color);
                border: 1px solid #ffffff;
                padding: 0 5px;
                color: var(--typo);
                font-size: 13px;
                margin: 0 10px;
              }
            }
            h3 {
              font-size: 18px;
              line-height: 20px;
              margin-top: 6px;
              margin-bottom: 15px;
              width: auto;
              padding: 0;
              clear: none;
              font-style: italic;
              font-weight: bold;
              align-items: center;
              .state-tag {
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
              .completed-state {
                background-color: #4dbd74;
              }
              .active-state {
                background-color: #4096EE;
              }
              .onhold-state {
                background-color: #C79810;
              }
              .expired-state {
                background-color: #d0c21f;
              }
              .cancelled-state {
                background-color: #a00;
              }
            }
            h5 {
              font-size: 20px;
            }
            h2 {
              font-size: 20px;
              line-height: 20px;
              margin-top: 6px;
              margin-bottom: 15px;
              width: auto;
              padding: 0;
              clear: none;
            }
            .money-bill {
              box-shadow: 0 1px 0 #ccc;
              transition: all .5s;
              font-size: 14px;
              font-weight: 200;
              color: #b0bec5;
              margin-bottom: 8px;
              margin-left: 10px;
              border-radius: 3px;
              padding: 0 5px;
              width: auto;
              display: flex;
              justify-content: center;
              align-items: center;
              line-height: 14px;
              position: relative;
              cursor: pointer;
              &:hover {
                .tooltip-panel {
                  display: block;
                }
              }
              svg {
                width: 18px;
                color: #b0bec5;
              }
              .tooltip-panel {
                min-width: 106px;
                display: none;
                height: 24px;
                background: #ffffff;
                bottom: 100%;
                border-radius: 5px;
                font-size: 11px;
                color: #000000;
                left: -45px;
                margin-bottom: 11px;
                transform: translate(0,10px);
                transform-origin: top;
                position: absolute;
                padding: 5px 5px;
                text-align: center;
                top: 20px;
                z-index: 9;
                em {
                    width: 0; 
                    height: 0; 
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-bottom: 5px solid #ffffff;
                    position: absolute;
                    top: -4px;
                    left: 54px;
                }
              }
            }
            a {
              box-shadow: 0 1px 0 #ccc;
              transition: all .5s;
              font-size: 14px;
              font-weight: 200;
              color: #b0bec5;
              margin-bottom: 8px;
              margin-left: 10px;
              border-radius: 3px;
              padding: 0 5px;
              svg {
                width: 13px;
                color: #b0bec5;
                margin: 0 5px 0 0;
              }
            }
          }
          .progress-panel {
            width: 100%;
            display: flex;
            margin: 25px 0 0 0;
            flex-direction: column;
            .progress-bar {
              width: 100%;
              display: flex;
              border: 1px solid #aaa;
              height: 35px;
              border-radius: 10px;
            }
            p {
              font-size: 12px;
              font-style: italic;
              font-weight: normal;
              display: inline-block;
            }
          }
          .order-amount-panel {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 40px 0 20px 0;
            .box-panel {
              box-shadow: 0px 3px 2px #1b1b1b;
              background: #000000;
              width: 23%;
              max-height: 75px;
              overflow: hidden;
              display: inline-block;
              text-align: center;
              border-radius: 5px;
              margin: 5px;
              cursor: pointer;
              .wcfmfa {
                display: table-cell;
                font-size: 25px;
                width: 65px;
                height: 75px;
                color: #fff;
                vertical-align: middle;
                background: #20a8d8;
                svg {
                  width: 22px;
                  color: #ffffff;
                }
              }
              .div-section {
                display: table-cell;
                padding: 5px 2px;
                vertical-align: middle;
                font-size: 12px;
                width: 160px;
                span {
                  font-weight: 500;
                  font-size: 18px;
                  color: #21759b;
                  display: block;
                }
                em {
                  color: #ffffff;
                  font-style: normal;
                  &:hover {
                    color: var(--primary-color);
                  }
                }
              }
            }
          }
          .order-notes-panel {
            position: relative;
            width: 100%;
            display: flex;
            box-shadow: 0 3px 2px #ccc;
            border-left: 1px solid #cccccc;
            flex-direction: column;
            margin: 0 0 30px 0;
            flex-direction: column;
            padding: 30px 30px 0 30px;
            .notes-description {
              width: 100%;
              display: flex;
              background: #1b1b1b;
              margin: 25px 0;
              padding: 15px 10px;
              flex-direction: column;
              .col-full-panel {
                width: 100%;
                display: inline-block;
                font-size: 16px;
                color: #ffffff;
                margin: 0 0 20px 0;
                .left-col {
                  width: 60%;
                  display: inline-block;
                  padding: 0 10px 0 0;
                  a {
                    color: #ffffff;
                    cursor: pointer;
                    &:hover {
                      color: var(--primary-color);
                    }
                  }
                }
                .right-col {
                  width: 40%;
                  display: inline-block;
                  padding: 0 0 0 10px;
                }
              }
            }
            .upload-text {
              width: 100%;
              display: flex;
              font-size: 11px;
              font-style: italic;
              color: #ffffff;
              margin: -10px 0 15px 0;
              span {
                color: #f86c6b;
                margin: 0 0 0 5px;
              }
            }
            .bottom-section {
              width: 100%;
              display: flex;
              justify-content: end;
              flex-direction: column;
              align-items: end;
              margin: 0 0 50px 0;
              select {
                width: 150px;
                padding: 8px 10px;
                margin-bottom: 15px;
                margin-right: 0;
                font-size: 12px;
                display: inline-block;
                line-height: 18px;
                min-height: 35px;
                box-shadow: 1px 1px 5px 0 #e9e9e9;
                background-color: #060202!important;
                border: 1px solid #ccc!important;
                border-radius: 3px;
                color: #ffffff;
              }
              .add-button {
                background: var(--primary-color);
                width: auto;
                margin: 0;
                padding: 6px 12px;
                text-transform: uppercase;
                color: #ffffff;
                border: 1px solid var(--primary-color);
                border-radius: 3px;
                font-size: 15px;
                font-weight: 500;
                outline: 0;
                width: 78px;
              }
            }
            .main-tag {
              width: 100%;
              display: flex;
              font-size: 15px;
              font-style: italic;
              font-weight: 600;
              line-height: 1.5em;
              color: #ffffff;
              margin: 0 0 10px 0;
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
            .name-panel {
              width: 100%;
              display: flex;
              flex-direction: column;
              border-radius: 3px;
              border: 1px solid var(--typo);
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
                  border: 1px solid var(--typo);
                  border-radius: 26px;
                  padding: 0;
                  height: 22px;
                  color: var(--typo);
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
                  border: 1px solid var(--typo);
                  border-radius: 26px;
                  padding: 0;
                  height: 22px;
                  color: var(--typo);
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
            .col-md-div {
              width: 100%;
              display: flex;
              flex-direction: column;
              margin: 0 0 30px 0;
              textarea {
                height: 40px;
                outline: 0;
                vertical-align: middle;
                color: var(--typo);
                border: 1px solid #ccc;
                border-radius: 3px;
                background-color: var(--white-color);
                resize: none;
              }
              label {
                font-size: 15px;
                font-style: italic;
                font-weight: 600;
                line-height: 1.5em;
                color: var(--typo);
              }
            }
          }
          .billing-wrapper {
            position: relative;
            width: 100%;
            display: flex;
            box-shadow: 0 3px 2px #ccc;
            border-left: 1px solid #cccccc;
            flex-direction: column;
            margin: 0 0 30px 0;
            .tabbing-section {
              width: 100%;
              display: flex;
              padding: 15px 20px 5px 20px;
              ul {
                width: 100%;
                display: flex;
                margin: 0;
                padding: 0;
                list-style: none;
                li {
                  color: #b0bec5;
                  padding: 4px 8px !important;
                  margin-top: 7px;
                  margin-left: 0;
                  margin-right: 10px;
                  margin-bottom: 5px;
                  background: #000000;
                  width: auto;
                  min-width: 10px!important;
                  border-radius: 4px;
                  text-transform: uppercase;
                  transition: all .5s;
                  font-size: 15px;
                  font-weight: 600;
                  border: 1px solid #ccc;
                  letter-spacing: 2px;
                  border-bottom: 0;
                  cursor: pointer;
                  &:hover {
                    background: var(--primary-color);
                    color: #ffffff;
                  }
                }
              }
            }
            .wcfm-datatable {
              margin: 0 0 30px 0;
            }
          }
          .wcfm-tabWrap {
            position: relative;
            width: 100%;
            display: flex;
            padding-top: 30px;
            .left-section {
              width: 25%;
              display: block;
              overflow: hidden;
              margin-top: 0px;
              .tab-section {
                padding: 14px 10px;
                min-height: 20px;
                color: var(--typo);
                font-size: 13px;
                width: 100%;
                display: flex;
                cursor: pointer;
                &:hover {
                  color: var(--primary-color);
                }
                &.active {
                  color: var(--primary-color);
                }
                svg {
                  width: 14px;
                  color: #ffffff;
                  margin: 0 5px 0 0;
                }
              }
            }
            .right-container {
              width: 75%;
              display: flex;
              flex-direction: column;
              padding: 0 0 0 15px;
              h2 {
                color: var(--typo);
                font-size: 18px;
                line-height: 20px;
                font-weight: 600;
                margin-top: 6px;
                margin-bottom: 15px;
                font-style: italic;
                width: auto;
                padding: 20px 0 0 0;
                clear: none;
              }
              .public-DraftStyleDefault-block{
                span{
                  color:#000
                }
              }
              .wcfm-descp-panel{
                width: 100%;
                display: flex;
                flex-direction: column;
                padding: 0 20px 30px 20px;
                .content-panel {
                  height: auto;
                  width: 100%;
                  display: flex;
                  margin: 5px 0 0 0;
                  .rdw-editor-wrapper{
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
                label {
                  font-size: 15px;
                  font-style: italic;
                  color: var(--typo);
                  .img_tip {
                    font-size: 8px;
                    border: 1px solid #63c2de;
                    background: #63c2de;
                    color: var(--typo);
                    border-radius: 50%;
                    padding: 1px 6px;
                    margin: 0 0 0 5px;
                  }
                }
              }
              .store-panel {
                width: 100%;
                display: flex;
                align-items: center;
                position: relative;
                .email-icon-tag {
                  position: absolute;
                  right: 24px;
                  top: 9px;
                  &:hover {
                    .tooltip-panel {
                      display: block;
                    }
                  }
                  .tooltip-panel {
                    min-width: 84px;
                    display: none;
                    height: 28px;
                    background: var(--primary-color);
                    bottom: 100%;
                    border-radius: 5px;
                    font-size: 11px;
                    color: #ffffff;
                    left: -3px;
                    margin-bottom: 11px;
                    transform: translate(0,10px);
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
                        left: 6px;
                    }
                  }
                  svg {
                    width: 15px;
                    color: #4caf50;
                    cursor: pointer;
                  }
                }
                .email-cross-tag {
                  position: absolute;
                  right: 24px;
                  top: 9px;
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
                    transform: translate(0,10px);
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
                    width: 18px;
                    color: #f44336;
                    cursor: pointer;
                  }
                }
                .content-panel {
                  height: 200px;
                  width: 100%;
                  display: flex;
                  margin: 5px 0 20px 0;
                  .rdw-editor-wrapper{
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
                label {
                  font-size: 15px;
                  font-style: italic;
                  color: var(--typo);
                  padding-left: 3%;
                  width: 32%;
                  span {
                    color: #ff0000;
                  }
                  .img_tip {
                    font-size: 8px;
                    border: 1px solid #63c2de;
                    background: #63c2de;
                    color: #fff;
                    border-radius: 50%;
                    padding: 1px 6px;
                    margin: 0 0 0 5px;
                  }
                }
                .logo-tag {
                  max-width: 100%;
                  height: auto;
                  display: flex;
                  position: relative;
                  margin: 0 0 15px 0;
                  &:hover {
                    .edit-avatar-icon {
                      display: block;
                    }
                  }
                  .upload-photo-icon {
                    width: 30px;
                    height: 30px;
                    display: block;
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: #ffffff;
                    text-align: center;
                    border-radius: 50%;
                    cursor: pointer;
                    top: 60px;
                    left: 60px;
                    svg {
                        color: var(--primary-color);
                        width: 16px;
                        top: 2px;
                        position: relative;
                        left: 1px;
                    }
                    .tooltip-panel {
                        min-width: 142px;
                        display: block;
                        height: 28px;
                        background: #ffffff;
                        bottom: 100%;
                        border-radius: 5px;
                        font-size: 12px;
                        color: var(--primary-color);
                        left: -56px;
                        margin-bottom: 11px;
                        transform: translate(0,10px);
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
                  .spinner {
                    position: absolute;
                    top: 60px;
                    left: 60px;
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
                    top: 60px;
                    left: 60px;
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
                        left: -60px;
                        margin-bottom: 11px;
                        transform: translate(0,10px);
                        transform-origin: top;
                        position: absolute;
                        padding: 5px 10px;
                        text-align: center;
                        top: 27px;
                        em {
                            width: 0; 
                            height: 0; 
                            border-left: 5px solid transparent;
                            border-right: 5px solid transparent;
                            border-bottom: 5px solid #ffffff;
                            position: absolute;
                            top: -5px;
                            left: 70px;
                        }
                    }
                  }
                  img {
                    border-radius: 5px;
                    border: 2px solid #dfdfdf;
                  }
                  .cross-icon {
                    position: absolute;
                    left: 6px;
                    top: 6px;
                    width: 20px;
                    height: 20px;
                    background: #000000;
                    font-size: 18px;
                    color: #ffffff;
                    cursor: pointer;
                    font-weight: 500;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    border-radius: 100%;
                    em {
                      font-style: normal;
                      transform: rotate(45deg);
                    }
                  }
                }
                input, select {
                  padding: 8px 10px;
                  height: auto;
                  width: 60%;
                  margin-bottom: 15px;
                  outline: 0;
                  margin-right: 0;
                  font-size: 15px;
                  display: inline-block;
                  line-height: 18px;
                  min-height: 35px;
                  max-width: 100%;
                  background: transparent;
                  border: 1px solid var(--white-color);
                  border-radius: 2px;
                  color: var(--typo);
                  option{
                    background: #63c2de;                    
                    color:white;
                  }
                }
              }
            }
          }
          .button-tab {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            button {
              color: #ffffff;
              background: var(--primary-color);
              border: 0;
              margin: 20px 10px;
              font-size: 15px;
              font-weight: 600;
              outline: 0;
              padding: 8px 20px;
              border-radius: 5px;
            }
          }
        }
      }
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
    box-shadow: 1px 1px 5px 0 #e9e9e9
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
    box-shadow: 1px 1px 5px 0 #e9e9e9
  }

  .wfcm-download-panel {
    width: 845px;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
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
  .details-data-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 35px;
    .live-chat-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      font-size: 18px;
      color: #ffffff;
      margin: 0 0 15px 0;
      .live-chat-tag {
        width: 100%;
        color: var(--typo);
        display: flex;
        em {
          font-style: normal;
        }
      }
      span {
        font-size: 14px;
        padding: 10px 0 0 0;
        color: #8b8b8b;
      }
    }
    .custom-checkbox {
      width: 100%;
      display: flex;
      margin: 0 0 15px 0;
      padding: 0 30px;
      align-items: center;
      padding: 0 0 0 30px;
      position: relative;
      input {
        position: absolute;
        cursor: pointer;
        width: 21px;
        left: 0;
        top: 3px;
        z-index: 9;
        height: 20px;
      }
    }
    .option-panel {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      margin: 0 0 20px 0;
    }
    .custom-radio {
      margin: 0 0 15px 0;
      position: relative;
      padding: 0 0 0 30px;
      input {
        position: absolute;
        cursor: pointer;
        width: 21px;
        left: 0;
        top: 6px;
        height: 20px;
        z-index: 9;
      }
    }
    h2 {
      color: #ffffff;
      margin: 0 0 25px 0 !important;
      padding: 0;
      font-size: 24px !important;
      font-style: normal !important;
      font-weight: 500 !important;
      display: flex;
      flex-direction: column;
      span {
        font-size: 14px;
        padding: 10px 0 0 0;
        color: #8b8b8b;
      }
    }
    .schedule-tag {
      width: 100%;
      display: flex;
      margin: 0 0 30px 0;
      position: relative;
      .rc-time-picker-clear {
        right: 13px !important;
        top: 11px !important;
      }
      select {
        width: 185px;
        height: 45px;
        background: var(--dark-color);
        color: var(--typo);
        padding: 0 15px;
        font-size: 16px;
        border-radius: 5px;
      }
      .dropdown {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #fff;
        position: absolute;
        right: 10px;
        top: 21px;
        cursor: pointer;
      }
      input {
        width: 160px;
        height: 45px;
        background: var(--dark-color);
        color: var(--typo);
        padding: 0 15px;
        font-size: 13px;
        border-radius: 5px;
        margin: 0 10px 0 0;
        border: 1px solid var(--white-color);
        padding: 0 10px;
        position: relative;
      }
    }
    .privacy-panel {
      width: 100%;
      display: flex;
      border-radius: 5px;
      border: 1px solid #ffffff;
      padding: 20px;
      flex-direction: column;
      margin: 0 0 30px 0;
      .custom-control-label {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        font-size: 16px;
        span {
          font-size: 14px;
          color: #8b8b8b;
        }
      }
    }
    .category-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 5px 0;
      margin: 0 0 30px 0;
      label {
        color: var(--typo);
        font-size: 14px;
        width: 100%;
        display: inline-block;
        a {
          color: var(--primary-color);
          text-decoration: none;
          background-color: transparent;
          cursor: pointer;
          margin: 0 0 0 3px;
        }
      }
      .number-view {
        width: 180px;
        height: 70px;
        display: flex;
        align-items: start;
        justify-content: justify-content;
        font-size: 14px;
        color: #8a8a8a;
        flex-direction: column;
        border: 1px solid #222;
        padding: 10px 15px;
        input {
          background: transparent;
          border: 0;
          font-size: 14px;
          color: var(--typo);
          outline: 0;
        }
        span {
          color: #4e4e4e;
        }
      }
      .number-text {
        width: 100%;
        display: flex;
        font-size: 14px;
        color: #8b8b8b;
        margin-bottom: 30px;
      }
      .thumbnail-view {
        width: 180px;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #747474;
        flex-direction: column;
        border: 1px solid #222;
        position: relative;
        height: 90px;
        .cancel-btn {
          position: absolute;
          left: 0;
          top: 0;
          background: #000000;
          border: 0;
          padding: 0px 7px;
          border-radius: 100%;
          transform: rotate(45deg);
          font-size: 18px;
          z-index: 9;
        }
        img {
          width: 100%;
          position: absolute;
          height: 90px;
          left: 0;
          right: 0;
        }
        svg {
          width: 24px;
          margin: 0 0 10px 0;
          color: #979797;
        }
        span {
          font-size: 12px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px 0 0 0;
          cursor: pointer;
        }
      }
      select {
        width: 400px;
        height: 56px;
        background: var(--dark-color);
        color: var(--typo);
        padding: 0 15px;
        font-size: 16px;
        border-radius: 5px;
      }
      span {
        color: var(--typo);
        font-size: 16px;
        padding: 0 0 5px 0;
        width: 100%;
        display: flex;
        a {
          color: var(--primary-color);
        }
      }
    }
    .req{
      color:red !important;
      padding: 0 !important;
    }
    .label-text {
      color: #6b6b6b;
      font-size: 14px;
      width: 100%;
      display: inline-block;
      margin: -25px 0 25px 0;
    }
    .description-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      margin: 0 0 30px 0;
      span {
        color: #8a8a8a;
        font-size: 14px;
        padding: 0 0 5px 0;
      }
      textarea {
        width: 100%;
        display: flex;
        font-size: 16px;
        color: var(--typo);
        background: var(--dark-color);
        padding: 5px 14px;
        border: 1px solid var(--typo) !important;
        border: 0;
        resize: none;
      }
    }
  }
  .create-stream-process {
    width: 100%;
    display: flex;
    padding: 20px 70px 35px 70px;
    ul {
      margin: 0;
      padding: 0;
      width: 535px;
      display: flex;
      position: relative;
      margin: 0 auto;
      &:before {
        content: '';
        background: var(--typo);
        height: 2px;
        width: 345px;
        position: absolute;
        left: 98px;
        top: 31px;
      }
      li {
        width: 33.33%;
        flex-direction: column;
        color: var(--typo);
        font-size: 14px;
        display: flex;
        align-items: center;
        &::before {
          display: none;
        }
        &.filled {
          span {
            border: 4px solid var(--primary-color);
            background: var(--primary-color);
            svg {
              width: 13px;
              color: var(--white-color);
              margin: -10px 0 0 0; 
            }
          }
        }
        &.active {
          color: var(--primary-color);
          span {
            border: 4px solid var(--primary-color);
          }
        }
        span {
          width: 20px;
          height: 20px;
          display: flex;
          border-radius: 100%;
          border: 4px solid var(--typo);
          background: var(--white-color);
          z-index: 9;
        }
      }
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
    padding: 0 20px 30px 20px;
    .content-panel {
      height: auto;
      width: 100%;
      display: flex;
      margin: 5px 0 0 0;
      .rdw-editor-wrapper{
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
  .wcfm_add_panel {
    margin: 0 auto;
    padding: 20px;
    width: 100%;
    display: flex;
    .wcfm_general_fields {
      display: flex;
      width: 70%;
      padding: 0 15px 0 0;
      flex-direction: column;
      .wcfm-col-12 {
        display: flex;
        width: 100%;
        margin-bottom: 20px;        
        .date-tag{
          text-decoration: underline;
          cursor:pointer;
          color: var(--primary-color);  
          font-style: italic;            
        }
        .wcfm-col-full {
          width: 100%;
          display: flex;
          padding: 0 10px 0 0;
          .text-tag {
            width: 40%;
            display: flex;
            font-size: 14px;
            color: var(--typo);
            font-style: italic;
          }
          .full-input-tag {
            width: 100% !important;
          }
          .input-row {
            flex-direction: row !important;
            input {
              width: 33.33%;
            }
            .select-box {
              width: 33.33%;
            }
          }
          .checkbox-wrapper {
            width: 60%;
            display: flex;
            .custom-checkbox {
              width: 100px;
              justify-content: center;
              align-items: center;
              display: flex;
              margin: 0;
              padding: 0;
              flex-direction: column;
              position: relative;
              em {
                margin: 28px 0 0 -43px;
                font-size: 13px;
              }
              input {
                position: absolute;
                cursor: pointer;
                width: 21px;
                left: 21px;
                top: 3px;
                z-index: 9;
                height: 20px;
              }
            }
          }
          .input-tag {
            width: 60%;
            display: flex;
            flex-direction: column;
            span {
              font-size: 11px;
              font-style: italic;
              width: 100%;
              display: flex;
              padding-top:2px;
              justify-content: flex-end;
              text-decoration: underline;
              cursor:pointer;
              color: var(--primary-color);  
              font-style: italic;            
            }
          }
        }
        .wcfm-col-6 {
          width: 50%;
          display: flex;
          padding: 0 10px 0 0;
          .text-tag {
            width: 40%;
            display: flex;
            font-size: 14px;
            color: var(--typo);
            font-style: italic;
          }
          .input-tag {
            width: 60%;
            display: flex;
          }
        }
        input {
          padding: 8px 10px;
          background: var(--dark-color);
          width: 100%;
          border-radius: 3px;
          margin-right: 0;
          font-size: 13px;
          display: inline-block;
          line-height: 18px;
          height: 40px;
          outline: 0;
          border: 1px solid var(--white-color);
          color: var(--typo);
        }
        select {
          padding: 8px 10px;
          background: var(--white-color);
          width: 100%;
          border-radius: 3px;
          margin-right: 0;
          font-size: 13px;
          display: inline-block;
          line-height: 18px;
          height: 40px;
          outline: 0;
          border: 1px solid #ccc;
          color: var(--typo);
          box-shadow: 1px 1px 5px 0 #e9e9e9;
        }
      }
    }
    .wcfm_gallery_fields {
      width: 30%;
      display: flex;
      padding: 0 0 0 15px;
      flex-direction: column;
      .product-feature-upload {
        vertical-align: top;
        width: 200px;
        text-align: center;
        border-radius: 3px;
        display: block;
        position: relative;
        margin: 0 auto;
        &:hover {
          .edit-avatar-icon {
            display: block;
          }
          .edit-photo-icon {
            display: block;
          }
        }
        .upload-photo-icon {
          width: 30px;
          height: 30px;
          display: block;
          position: absolute;
          top: 10px;
          left: 10px;
          background: #ffffff;
          text-align: center;
          border-radius: 50%;
          cursor: pointer;
          top: 85px;
          left: 85px;
          svg {
              color: var(--primary-color);
              width: 16px;
              top: 2px;
              position: relative;
              left: 1px;
          }
          .tooltip-panel {
              min-width: 155px;
              display: block;
              height: 28px;
              background: #ffffff;
              bottom: 100%;
              border-radius: 5px;
              font-size: 12px;
              color: var(--primary-color);
              left: -56px;
              margin-bottom: 11px;
              transform: translate(0,10px);
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
        .edit-photo-icon {
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
          top: 85px;
          left: 85px;
          svg {
              color: var(--primary-color);
              width: 16px;
              top: 2px;
              position: relative;
              left: 1px;
          }
          &:hover {
              .tooltip-panel {
                  display: block;
              }
          }
          .tooltip-panel {
              min-width: 155px;
              display: none;
              height: 28px;
              background: #ffffff;
              bottom: 100%;
              border-radius: 5px;
              font-size: 12px;
              color: var(--primary-color);
              left: -56px;
              margin-bottom: 11px;
              transform: translate(0,10px);
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
          top: 85px;
          left: 85px;
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
              min-width: 160px;
              display: none;
              height: 28px;
              background: #ffffff;
              bottom: 100%;
              border-radius: 5px;
              font-size: 12px;
              color: var(--primary-color);
              left: -60px;
              margin-bottom: 11px;
              transform: translate(0,10px);
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
        .spinner {
          position: absolute;
          top: 95px;
          left: 90px;
        }
        .cancel-btn {
          position: absolute;
          left: 4px;
          top: 3px;
          padding: 0;
          border-radius: 100%;
          font-size: 20px;
          font-weight: 400;
          width: 25px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transform: rotate(45deg);
        }
        img {
          width: 200px;
          min-height: 200px;
          border: 1px solid #ccc;
          border-radius: 3px;
          margin-right: 0px;
          cursor: pointer;
        }
      }
    }
  }

  .wcfm_products_menus {
    list-style: none;
    margin-left: 0px;
    padding: 0;
    font-size: 13px;
    color: var(--typo);
    display: table-cell;
    float: left;
    margin-bottom: 5px;
    margin-top: 5px;
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
    margin: 30px 0 0 0;
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
  .tabWrap-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    .dataTables_length {
      width: auto;
      display: flex;
      font-size: 12px;
      color: var(--typo);
      align-items: center;
      .filter-button {
        background: var(--dark-color);
        text-transform: capitalize;
        font-weight: 400;
        border: 1px solid var(--typo);
        padding: 8px 7px;
        font-size: 13px;
        border: 1px solid var(--typo);
        color: var(--typo);
        margin: 0 15px 0 0;
      }
      .e-valid-input {
        .e-clear-icon {
          color: var(--typo);
          margin: 0 5px;
        }
      }
      .e-input-group {
        width: 220px !important;
        display: flex;
        padding: 3px 6px;
        font-size: 13px;
        margin: 0 10px 0 0;
        border-radius: 0;
        background: var(--white-color);
        color: var(--typo);
        border: 1px solid var(--typo) !important;
        &::before {
          background: transparent !important;
        }
        &::after {
          background: transparent !important;
        }
        .e-icons {
          color: var(--typo);
          &:hover {
            color: var(--primary-color);
          }
        }
      }
      label {
        font-size: 12px;
        color: #4D5C6D;
        margin: 0 5px 0 0;
      }
      input {
        width: 105px;
        padding: 7px 6px;
        font-size: 13px;
        margin: 0 10px 0 0;
        border-radius: 0;
        background: var(--dark-color);
        color: var(--typo);
        border: 1px solid var(--typo);
        &:last-child {
          margin: 0;
        }
      }
      .range-button {
        background: var(--dark-color);
        text-transform: capitalize;
        font-weight: 400;
        padding: 10px 12px;
        border: 1px solid var(--typo);
        padding: 8px 7px;
        font-size: 13px;
        color: var(--typo);
      }
      .btn-tag {
        color: #b0bec5;
        background: #000000;
        padding: 0.5em;
        margin: 7px 10px 5px 0;
        width: auto;
        border-bottom: 0 solid #17a2b8 !important;
        border-radius: 4px;
        color: #fff;
        border: 1px solid #999;
        display: inline-block;
        text-shadow: 0 1px 0 rgb(0 0 0 / 25%);
        box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
        text-transform: uppercase;
        transition: all .5s;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: .046875em;
        line-height: 1;
      }
      select {
        width: auto;
        height: 38px;
        background: var(--dark-color);
        border: 1px solid var(--typo);
        padding: 0 5px;
        color: var(--typo);
        font-size: 13px;
        margin: 0 10px;
      }
      .bulk-button {
        color: var(--primary-color);
        padding: 10px;
        margin: 0 0 0 10px;
        background: var(--dark-color);
        border-radius: 4px;
        font-size: 15px;
        font-weight: 700;
        border: 0;
        outline: none;
        text-transform: uppercase;
        letter-spacing: .046875em;
        cursor: pointer;
        width: 107px;
        transition: all .5s;
        &:hover {
          background: var(--dark-color);
          color: var(--white-color);
        }
      }
      .delete-button {
        color: var(--primary-color);
        padding: 10px;
        background: var(--dark-color);
        border-radius: 4px;
        border: 0;
        outline: none;
        cursor: pointer;
        width: 34px;
        transition: all .5s;
        position: relative;
        &:hover {
          background: var(--dark-color);
          color: var(--white-color);
          .tooltip-panel {
            display: block;
          }
        }
        .tooltip-panel {
          min-width: 60px;
          display: none;
          height: 22px;
          background: rgba(255,255,255,.95);
          box-shadow: none;
          color: var(--dark-color);
          bottom: 100%;
          border-radius: 5px;
          font-size: 11px;
          left: -11px;
          margin-bottom: 11px;
          transform: translate(0, 10px);
          transform-origin: top;
          position: absolute;
          padding: 3px 10px;
          text-align: center;
          top: 24px;
          em {
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #fff;
            position: absolute;
            top: -4px;
            left: 24px;
          }
        }
      }
    }
    .search-tag {
      width: auto;
      display: flex;
      align-items: center;
      position: relative;
      label {
        color: var(--typo);
        font-size: 17px;
        margin: 0;
        padding: 0;
      }
      .cross-icon {
        position: absolute;
        right: 7px;
        top: -2px;
        font-size: 27px;
        color: var(--typo);
        cursor: pointer;
        transform: rotate(45deg);
      }
      input {
        background-color: var(--dark-color);
        border: 1px solid var(--white-color);
        width: 140px;
        height: 35px;
        border-radius: 3px;
        color: var(--typo);
        margin-left: 0.5em;
        display: inherit;
        padding: 8px 10px 8px 30px;
        background-repeat: no-repeat;
        background-position: 10px 50%;
        background-size: 16px;
        background-image: url(https://data.portl.live/wp-content/themes/buddyboss-theme/assets/images/svg/search.svg);
        background-position: left 10px center;
      }
    }
  }
  .golive-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    .row-head {
      width: 100%;
      display: flex;
      color: var(--typo);
      font-size: 14px;
      align-items: center;
      border-bottom: 1px solid var(--typo);
      svg {
        width: 15px;
      }
    }
    .main-head {
      width: 100%;
      display: flex;
      color: var(--typo);
      font-size: 16px;
      border-bottom: 1px solid var(--typo);
      align-items: flex-start;
      padding: 10px 8px;
    }
    .columns-head {
      width: 100%;
      display: flex;
      color: var(--typo);
      font-size: 14px;
      border-bottom: 1px solid var(--typo);
      align-items: flex-start;
    }
    .events-div-1 {
      width: 6%;
      display: flex;
      padding: 10px 5px;
      input {
        width: 20px;
        height: 20px;
      }
    }
    .events-div-2 {
      width: 39%;
      display: flex;
      padding: 10px 5px;
      img {
        height: 85px;
        width: 150px;
        border-radius: 3px;
        margin: 0 15px 0 0;
      }
      .events-text-tag {
        width: calc(100% - 160px);
        display: flex;
        flex-direction: column;
        word-break: break-word;
        span {
          color: #929292;
          font-size: 12px;
        }
      }
    }
    .events-div-3 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .events-div-4 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      flex-direction: column;
      span {
        color: #929292;
        font-size: 12px;
      }
    }
    .events-div-5 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      &.active {
        svg {
          color: #ffffff;
        }
      }
      svg {
        width: 15px;
        color: #41953a;
        margin: 0 5px 0 0;
      }
    }
    .events-div-6 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      justify-content: center;  
      svg {
        width: 15px;
        color: #ffffff;
        margin: 0 5px;
        cursor: pointer;
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
      justify-content: flex-end;
      .amount-tag {
        width: 15%;
        display: flex;
        background-color: #1b1b1b;
        color: #43454b;
        align-items: flex-end;
        font-weight: 500;
        font-size: 17px;
        line-height: 36px;
        justify-content: end;
        padding: 0 10px 0 0;
      }
      .subtotal-tag {
        width: 16%;
        display: flex;
        color: #43454b;
        text-align: left;
        font-weight: 500;
        font-size: 17px;
        line-height: 36px;
        justify-content: flex-end;
        padding: 0 10px;
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
  .wcfm-datatable {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 30px 0 0 0;
    padding: 0 20px;
    .no-vendor {
      font-size: 14px;
      padding: 10px;
      border-bottom: 1px solid #ffffff;
    }
    .row-head {
      width: 100%;
      display: flex;
      color: var(--primary-color);
      font-size: 14px;
      align-items: center;
      border-bottom: 1px solid #cccccc;
      svg {
        width: 15px;
      }
    }
    .credit-col-1 {
      width: 10%;
      display: inline-block;
      padding: 10px 5px;
    }
    .credit-col-2 {
      width: 10%;
      display: inline-block;
      padding: 10px 5px;
    }
    .credit-col-3 {
      width: 10%;
      display: inline-block;
      padding: 10px 5px;
    }
    .credit-col-4 {
      width: 50%;
      display: inline-block;
      padding: 10px 5px;
    }
    .credit-col-5 {
      width: 20%;
      display: inline-block;
      padding: 10px 5px;
    }
    .following-div-1 {
      width: 50%;
      display: inline-block;
      padding: 10px 5px;
    }
    .following-div-2 {
      width: 30%;
      display: inline-block;
      padding: 10px 5px;
    }
    .following-div-3 {
      width: 20%;
      display: inline-block;
      padding: 10px 5px;
      svg {
        width: 14px;
        color: #ffffff;
        cursor: pointer;
        &:hover {
          color: var(--primary-color);
        }
      }
    }
    .order-tag {
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
        background: rgba(255,255,255,.95);
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
    .status-processing-tag {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      background: #20c997;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 80px;
        display: none;
        height: 22px;
        background: rgba(255,255,255,.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 11px;
        left: -2px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 3px 10px;
        text-align: center;
        top: 18px;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 9px;
        }
      }
      svg {
        width: 11px;
        color: #000;
      }
    }
    .status-pending-tag {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 118px;
        display: none;
        height: 22px;
        background: rgba(255,255,255,.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 11px;
        left: -2px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 3px 10px;
        text-align: center;
        top: 18px;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 9px;
        }
      }
      svg {
        width: 20px;
        color: #f8cb00;
      }
    }
    .column-head {
      width: 100%;
      display: flex;
      color: var(--typo);
      font-size: 14px;
      border-bottom: 1px solid #cccccc;
      align-items: center;
    }
    .order-div-1 {
      width: 3%;
      display: flex;
      padding: 10px 5px;
    }
    .order-div-2 {
      width: 17%;
      display: inline-block;
      padding: 10px 5px;
      text-align: center;
      span {
        color: #f86c6b;
        display: block;
      }
    }
    .order-div-3 {
      width: 15%;
      display: inline-block;
      padding: 10px 5px;
      text-align: center;
      span {
        font-size: 16px;
        display: block;
      }
    }
    .order-div-4 {
      width: 15%;
      display: inline-block;
      padding: 10px 5px;
      span {
        display: block;
      }
    }
    .order-div-5 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .order-div-6 {
      width: 10%;
      display: inline-block;
      padding: 10px 5px;
      text-align: center;
      span {
        font-size: 12px;
        display: block;
      }
    }
    .order-div-7 {
      width: 10%;
      display: inline-block;
      padding: 10px 5px;
      text-align: center;
      .unpaid {
        background-color: #f86c6b;
        color: #ffffff;
        display: block;
        padding: 0 5px;
        font-size: 12px;
        text-transform: uppercase;
      }
      .requested {
        background-color: #63c2de;
        color: #ffffff;
        display: block;
        padding: 0 5px;
        font-size: 12px;
        text-transform: uppercase;
      }
    }
    .order-div-8 {
      width: 12%;
      display: inline-block;
      padding: 10px 5px;
      text-align: center;
    }
    .order-div-9 {
      width: 8%;
      display: flex;
      padding: 10px 5px;
      text-align: center;
      span {
        width: auto;
        display: flex;
        margin: 0 5px 5px 5px;
        position: relative;
        cursor: pointer;
        &:hover {
          .tooltip-panel {
            display: block;
          }
        }
        &:last-child {
          .tooltip-panel {
            min-width: 84px;
          }
        }
        .tooltip-panel {
          min-width: 112px;
          display: none;
          height: 22px;
          background: rgba(255,255,255,.95);
          box-shadow: none;
          color: #000;
          bottom: 100%;
          border-radius: 5px;
          font-size: 10px;
          left: -65px;
          margin-bottom: 11px;
          transform: translate(0, 10px);
          transform-origin: top;
          position: absolute;
          padding: 4px 10px;
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
            left: 64px;
          }
        }
        svg {
          color: #ffffff;
          width: 15px;
        }
      }
    }
    .img-avatar {
      width: 106px;
      height: 106px;
    }
    .instock {
      color: #4dbd74;
      font-weight: 600;
    }
    .category-tag {
      color: #5B9A68;
      padding: 0 0 0 5px;
    }
    .view_count {
      color: #e83e8c;
    }
    .draft-tag {
      background-color: #63c2de;
      min-width: 49px;
      text-align: center;
      padding: 4px 4px;
      color: #fff;
      border-radius: 2px;
      font-size: 12px;
      line-height: 10px;
      margin-top: 8px;
      margin-left: 10px;
      display: inline-block;
      float: left;
    }
    .publish-tag {
      background-color: #20c997;
      padding: 4px 4px;
      color: #fff;
      border-radius: 2px;
      font-size: 12px;
      line-height: 10px;
      margin-top: 8px;
      margin-left: 10px;
      display: inline-block;
      float: left;
    }
    .customer-detail-div-1 {
      width: 5%;
      display: flex;
      padding: 10px 5px;
      word-break: break-all;
      .tick-tag {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        background: #4dbd74;
        &:hover {
          .tooltip-panel {
            display: block;
          }
        }
        .tooltip-panel {
          min-width: 85px;
          display: none;
          height: 22px;
          background: rgba(255,255,255,.95);
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
          background: rgba(255,255,255,.95);
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
    .customer-detail-div-2 {
      width: 22%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-detail-div-3 {
      width: 30%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 16px;
      }
    }
    .customer-detail-div-4 {
      width: 13%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      justify-content: center;
      align-items: center;
    }
    .customer-detail-div-5 {
      width: 18%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      justify-content: center;
      align-items: center;
    }
    .customer-detail-div-6 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      justify-content: center;
      align-items: center;
    }
    .customer-div-6 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-div-1 {
      width: 12%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-div-2 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      word-break: break-all;
    }
    .customer-div-3 {
      width: 20%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-div-4 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-div-5 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-div-6 {
      width: 13%;
      display: flex;
      padding: 10px 5px;
      word-break: break-all;
    }
    .customer-div-7 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    svg.svg-inline--fa.fa-eye {
      width: 15px;
      cursor: pointer;
    }
    .customer-div-8 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      svg {
        width: 15px;
        cursor: pointer;
      }
    }
    .order-color-tag {
      color: #2ea2cc;
      cursor: pointer;
    }
    .order-item-1 {
      width: 20%;
      display: flex;
      padding: 10px 5px;
      img {
        width: 34px;
        height: 34px;
        border: 1px solid #ffffff;
      }
    }
    .order-item-2 {
      width: 40%;
      display: flex;
      padding: 10px 5px;
      a {
        color: #2ea2cc;
      }
    }
    .order-item-3 {
      width: 20%;
      display: flex;
      padding: 10px 5px;
    }
    .order-item-4 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .order-item-5 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      button {
        background: var(--primary-color);
        border: 1px solid var(--primary-color);
        border-radius: 20px;
        color: #ffffff;
        font-size: 14px;
        height: 30px;
        padding: 0 12px;
        margin: 0 0 0 10px;
        outline: none;
      }
    }
    .item-1 {
      width: 7%;
      display: flex;
      padding: 10px 5px;
      img {
        width: 34px;
        height: 34px;
        border: 1px solid #ffffff;
      }
    }
    .item-2 {
      width: 53%;
      display: flex;
      padding: 10px 5px;
      a {
        color: #2ea2cc;
        cursor: pointer;
      }
    }
    .item-3 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .item-4 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .item-5 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .item-6 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .sub-item-1 {
      width: 20%;
      display: flex;
      padding: 10px 5px;
      a {
        color: #2ea2cc;
      }
    }
    .sub-item-2 {
      width: 25%;
      display: flex;
      padding: 10px 5px;
    }
    .sub-item-3 {
      width: 25%;
      display: flex;
      padding: 10px 5px;
    }
    .sub-item-4 {
      width: 20%;
      display: flex;
      padding: 10px 5px;
      span {
        background-color: #ff0;
        color: #000;
      }
    }
    .sub-item-5 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .col-div-1 {
      width: 3%;
      display: flex;
      padding: 10px 5px;
    }
    .col-div-2 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      position: relative;
      align-items: center;
      justify-content: center;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 50px;
        display: none;
        height: 22px;
        background: rgba(255,255,255,.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 10px;
        left: 25px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 4px 10px;
        text-align: center;
        top: 23px;
        z-index: 2;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 23px;
        }
      }
      a {
        width: 106px;
        height: 106px;
      }
    }
    .col-div-3 {
      width: 12%;
      display: flex;
      padding: 10px 5px;
    }
    // .col-div-4 {
    //   width: 10%;
    //   display: flex;
    //   padding: 10px 5px;
    // }
    .col-div-5 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .col-div-6 {
      width: 11%;
      display: flex;
      padding: 10px 5px;
    }
    .col-div-7 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      .double-price-tag {
        width: 100%;
        display: flex;
        flex-direction: column;
        .red-price {
          display: flex;
          color: #CC0000;
          position: relative;
          width: 100%;
          text-decoration: line-through;
          .line-tag {
            position: absolute;
            height: 2px;
            background: #ffffff;
            top: 9px;
            left: 0;
            min-width: 45px;
            max-width: 100%;
          }
        }
        .green-price {
          color: #006E2E;
          position: relative;
          width: 100%;
          display: flex;
          text-decoration: underline;
          .line-tag {
            position: absolute;
            height: 2px;
            background: #ffffff;
            bottom: 0;
            left: 0;
            min-width: 45px;
            max-width: 100%;
          }
        }
      }
    }
    .col-div-8 {
      width: 15%;
      display: inline-block;
      padding: 10px 5px;
      word-break: break-word;
    }
    // .col-div-9 {
    //   width: 6%;
    //   display: flex;
    //   padding: 10px 5px;
    //   position: relative;
    //   svg {
    //     width: 15px;
    //   }
    //   &:hover {
    //     .tooltip-panel {
    //       display: block;
    //     }
    //   }
    //   .tooltip-panel {
    //     min-width: 50px;
    //     display: none;
    //     height: 22px;
    //     background: rgba(255,255,255,.95);
    //     box-shadow: none;
    //     color: #000;
    //     bottom: 100%;
    //     border-radius: 5px;
    //     font-size: 10px;
    //     left: -15px;
    //     margin-bottom: 11px;
    //     transform: translate(0, 10px);
    //     transform-origin: top;
    //     position: absolute;
    //     padding: 4px 10px;
    //     text-align: center;
    //     top: 23px;
    //     z-index: 2;
    //     em {
    //       width: 0;
    //       height: 0;
    //       border-left: 4px solid transparent;
    //       border-right: 4px solid transparent;
    //       border-bottom: 4px solid #fff;
    //       position: absolute;
    //       top: -4px;
    //       left: 23px;
    //     }
    //   }
    // }
    .col-div-10 {
      width: 6%;
      display: flex;
      padding: 10px 5px;
      position: relative;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 50px;
        display: none;
        height: 22px;
        background: rgba(255,255,255,.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 10px;
        left: -15px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 4px 10px;
        text-align: center;
        top: 23px;
        z-index: 2;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 23px;
        }
      }
    }
    .col-div-11 {
      width: 7%;
      display: flex;
      padding: 10px 5px;
    }
    .col-div-12 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        width: 26px;
        display: flex;
        margin: 0 4px 4px 0;
        cursor: pointer;
        position: relative;
        height: 26px;
        background: var(--white-color);
        border: 1px solid var(--primary-color);
        box-shadow: none;
        text-align: center;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all .5s;
        border-radius: 3px;
        .spinner-border {
          position: absolute;
          right: -22px;
          top: 6px;
          width: 15px;
          height: 15px;
          .sr-only{
            display: none;
          }
        }
        &:hover {
          background: var(--primary-color);
          .tooltip-panel {
            display: block;
          }
        }
        .tooltip-panel {
          min-width: 92px;
          display: none;
          height: 22px;
          background: rgba(255,255,255,.95);
          box-shadow: none;
          color: #000;
          bottom: 100%;
          border-radius: 5px;
          font-size: 10px;
          left: -30px;
          margin-bottom: 11px;
          transform: translate(0, 10px);
          transform-origin: top;
          position: absolute;
          padding: 4px 10px;
          text-align: center;
          top: 24px;
          z-index: 2;
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
          color: var(--typo);
          width: 11px;
        }
        &:hover svg{
          color: var(--white-color);
        }
      }
    }
  }
  .column-head:first-of-type {background: var(--bg)}
  .column-head:nth-of-type(2n+2) {background: var(--grey-color)}
  .subscription-col-1 {
    width: 3%;
    display: flex;
    padding: 10px 5px;
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
        background: rgba(255,255,255,.95);
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
        background: rgba(255,255,255,.95);
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
        background: rgba(255,255,255,.95);
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
        background: rgba(255,255,255,.95);
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
        background: rgba(255,255,255,.95);
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
  .next-btn{
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
    transform: translate(0,10px);
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
  .subscription-col-2 {
    width: 12%;
    display: inline-block;
    padding: 10px 5px;
    word-break: break-word;
    a {
      color: #ffffff;
      margin: 0 3px 0 0;
    }
  }
  .subscription-col-3 {
    width: 10%;
    display: flex;
    flex-direction: column;
    padding: 10px 5px;
    justify-content: center;
    align-items: center;
    text-align: center;
    span {
      padding: 6px 4px;
      color: #fff;
      border-radius: 2px;
      font-size: 12px;
      line-height: 10px;
      width: 80px;
      display: block;
      background-color: #4096EE;
      margin: 0 auto;
      text-align: center;
    }
  }
  .subscription-col-4 {
    width: 10%;
    display: flex;
    padding: 10px 5px;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .subscription-col-5 {
    width: 10%;
    display: flex;
    padding: 10px 5px;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    span {
      font-size: 12px;
    }
  }
  .subscription-col-6 {
    width: 10%;
    display: flex;
    padding: 10px 5px;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .subscription-col-7 {
    width: 10%;
    display: flex;
    padding: 10px 5px;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .subscription-col-8 {
    width: 10%;
    display: flex;
    padding: 10px 5px;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .subscription-col-9 {
    width: 10%;
    display: flex;
    padding: 10px 5px;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .subscription-col-10 {
    width: 10%;
    display: flex;
    padding: 10px 5px;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  .subscription-col-11 {
    width: 5%;
    display: flex;
    padding: 10px 5px;
    align-items: center;
    text-align: center;
    justify-content: center;
    position: relative;
    &:hover {
      .tooltip-panel {
        display: block;
      }
    }
    .tooltip-panel {
      min-width: 89px;
      display: none;
      height: 22px;
      background: rgba(255,255,255,.95);
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
      background: rgba(255,255,255,.95);
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