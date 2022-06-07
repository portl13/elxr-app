import { css } from "@emotion/core";

export const MySettingsStyle = css`
.block-container {
  display: flex;
  flex-flow: row wrap;
  margin-top: 10px;
  width: 100%;
  .left-panel {
    flex: 0 0 230px;
  }
  .right-panel {
    flex: 1;
    min-width: 1px;
    margin: 0;
    width: 100%;
    flex-wrap: wrap;
    position: relative;
    .right-panel h2 {
      margin-top: 30px;
    }
    .lower-alert-panel {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .save-button {
        background-color: var(--primary-color);
        min-width: 144px;
        height: 40px;
        margin: 15px auto 20px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        outline: 0;
        padding: 0 20px;
        text-transform: initial;
        font-size: 13px;
        font-weight: 600;
      }
    }
    .view-button {
      position: absolute;
      right: 20px;
      top: -20px;
      width: 170px;
      display: flex;
      height: 34px;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      min-height: 34px;
      padding: 6px 20px;
      color: var(--white-color);
      background: var(--dark-color);
      border: 1px solid var(--white-color);
      border-radius: 25px;
      svg {
        width: 12px;
        margin: 0 10px 0 0;
      }
    }
    .inner-container {
      border-radius: 4px;
      width: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 0 1px #e7eaec;
      padding: 12px 50px 12px 20px;
      margin: 80px 0 0 0;
      .main-text {
        font-size: 16px;
        font-weight: 600;
        color: var(--typo);
        h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--typo);
        }
      }
      .main-panel {
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-size: 14px;
        color: #ffffff;
        align-items: center;
        margin: 36px 0 10px 0;
        .user-name {
          width: 40%;
          display: block;
          word-break: break-all;
          padding: 0 20px 0 0;
        }
        .time-tag {
          width: 50%;
          display: flex;
          padding: 0 15px 0 0;
        }
        .unblock-tag {
          cursor: pointer;
          width: 10%;
          display: flex;
        }
      }
    }
  }
}

.emailPanel h2 {
    font-weight: 500;
    font-size: 22px;
    line-height: 1.1;
    margin-top: 30px;
}
.activityOptions {
    width: 90%;
    align-items: center;
    display: flex;
    color: var(--typo);
    font-size: 14px;
    padding-right: 10px;
    @media (min-width: 992px) { 
      font-size: 16px;
      padding-right: 0;
    }
    
}
.activityChoose {
    width: 22px;
    margin-right: 20px;
    text-transform: uppercase;
    margin-left: -4px;
    @media (min-width: 992px) { 
      margin-right: 40px;
    }
}

.margin-zero {
    margin-right: 15px;
    @media (min-width: 992px) { 
      margin-right: 10px;
    }
}

.marginRatio{
  margin-right: 28px;
  @media (min-width: 992px) { 
    margin-right: 45px;
  }
}

`