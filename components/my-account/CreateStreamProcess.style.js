import { css } from "@emotion/core";

export const createStreamProcess = css`
  .create-stream-process {
    width: 100%;
    display: flex;
    padding: 20px 0px 35px 0px;
    @media (min-width: 992px) {
      padding: 20px 70px 35px 70px;
    }
    ul {
      margin: 0;
      padding: 0;
      width: 535px;
      display: flex;
      position: relative;
      margin: 0 auto;
      @media (min-width: 992px) { 
        &:before {
        content: "";
        background: var(--typo);
        height: 2px;
        width: 345px;
        position: absolute;
        left: 98px;
        top: 31px;
      }
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

  .details-data-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 ;
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
      flex-direction: column;
      margin: 0 0 30px 0;
      position: relative;
      .rc-time-picker-clear {
        right: 13px !important;
        top: 11px !important;
      }
      @media (min-width: 992px) { 
        flex-direction: row !important;
        
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
        width: 100%; 
        height: 45px;
        
        background: var(--dark-color);
        color: var(--typo);
        padding: 0 15px;
        font-size: 13px;
        border-radius: 5px;
        margin: 0 10px 10px 0;
        border: 1px solid var(--white-color);
        padding: 0 10px;
        position: relative;
        @media (min-width: 992px) { 
          margin: 0 10px 0 0;
          min-width: 250px;
        }
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
        width: 100%;
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
    .req {
      color: red !important;
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

`;
