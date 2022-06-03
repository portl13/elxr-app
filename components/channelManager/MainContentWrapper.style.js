const { css } = require('@emotion/core')

export const mainContentWrapperStyle = css`
  &.main-content-wrapper {
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
                transform: translate(0, 10px);
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
     
      width: 100%;
      display: flex;
      @media (min-width:992px) { 
        padding: 0 30px;
      }
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
        visibility: visible !important;
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
          padding: 0;
          @media (min-width: 992px) { 
            padding: 0 15px 0 0;
          }
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
                  background-color: #4096ee;
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
            padding: 30px 5px 5px;
            @media (min-width: 992px) { 
              padding: 30px 25px 5px 10px;
              
            }
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
                background-color: #4096ee;
              }
              .onhold-state {
                background-color: #c79810;
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
              transition: all 0.5s;
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
                transform: translate(0, 10px);
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
              transition: all 0.5s;
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
                background-color: #060202 !important;
                border: 1px solid #ccc !important;
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
                  min-width: 10px !important;
                  border-radius: 4px;
                  text-transform: uppercase;
                  transition: all 0.5s;
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
              padding: 0;
              @media (min-width: 992px) { 
                padding: 0 0 0 15px;
              }
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
              .public-DraftStyleDefault-block {
                span {
                  color: #000;
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
                      transform: translate(0, 10px);
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
                input,
                select {
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
                  option {
                    background: #63c2de;
                    color: white;
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
`
