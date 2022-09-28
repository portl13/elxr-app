import styled from "@emotion/styled"
import { css } from '@emotion/core';

export const BiographyFormHeading = styled.div`
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 30px;
`
export const biographyForm = css`
    position: relative;
    display: block;
    margin: 50px 0 0 0;
    &.privacy-form {
      width: 100%;
    }
    &.group-manage-form {
      .form-group{
            .group-checkbox-label{
                color:  var(--primary-color);
        }
    }
      textarea {
        height: 100px;
      }
      button {
        background-color: var(--primary-color);
        min-width: 144px;
        height: 40px;
        margin: 50px auto 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        outline: 0;
        padding: 0 20px;
        color: #ffffff !important;
        &.button-color{
          &:hover {
            color: #ffff !important;
          }
        }
      }
    }
    .select-text {
      font-size: 16px;
      color: #a3a5a9;
      letter-spacing: -.27px;
      line-height: 1.2;
      margin: 25px 0 25px 0;
    }
    .privacy-box-panel {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 4px;
      box-shadow: 0 0 0 1px #e7eaec;
      margin: 0 0 25px 0;
      .inner-tag {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 12px 20px;
        margin-bottom: 0;
        align-items: center;
        span {
          width: 50%;
          display: flex;
          font-size: 14px;
          color: var(--typo);
        }
        label {
          width: 50%;
          display: flex;
          font-size: 14px;
          color: var(--typo);
          margin: 0;
        }
        .form-control {
          width: 50%;
          display: flex;
          font-size: 14px;
          color: var(--typo);
          background-color: transparent;
        }
      }
      .main-tag {
        font-size: 16px;
        color: var(--typo);
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e7e9ec;
        padding: 12px 20px;
        align-items: center;
        span {
          width: 50%;
          display: flex;
        }
      }
    }
    h2 {
      font-weight: 500;
      font-size: 22px;
      line-height: 1.1;
      margin: 0 0 12px;
    }
    label, h4{
      font-weight: 400;
      font-size: 16px;
      margin: 0 0 12px;
      color: var(--typo);
    }
    .form-control{
      background-color: var(--dark-color);
      border: 1px solid var(--typo);
      border-radius: 3px;
      color: var(--typo);
      &:focus{
        background-color: var(--dark-color);
        color: var(--typo);
      }
    }
    .help-text-container{
      font-size: 12px;
      margin: 5px 0;
      .help-text{
        color: #A3A5A9;
      }
    }
    .btn{
      text-transform: initial;
      font-size: 13px;
      font-weight: 600;
      padding: 0;
      margin-left: 8px;
      &:hover,
      &:focus,
      &:active{
        color: var(--primary-color);
      }
      &.btn-close{
        padding: 5px 15px;
        &:hover,
        &:focus,
        &:active{
          color: #FFF;
        }
      }
      &.btn-primary{
        font-size: 15px;
        color: #fff;
        background-color: var(--primary-color);
        border-radius: 100px;
        min-height: 40px;
        padding: 10px 20px;
        font-weight: 500;
        display: inline-block;
        line-height: 1.3;
        border: 1px solid transparent;
        outline: 0;
        vertical-align: middle;
        transition: .3s all;
        margin: 0 auto;
      }
    }
    .custom-radio{
      label{
        font-size: 14px;
        font-weight: 400;
      }
    }
    select{
      margin-bottom: 0 !important;
      -webkit-appearance: none;
      -moz-appearance:    none;
      appearance:         none;
  }
`
export const inputLabelStyle = css`
    font-weight: 400;
    font-size: 16px;
    margin: 0 0 12px;
    width: 100%;
    text-align: left;
`
export const inputWithLabelStyle = css`
    display: flex;
    align-items: center;
    label{
        margin-bottom: 0 !important;
        margin-right: 0.5rem !important;
        font-size: 16px;
    }
`

export const ChangeContainer = styled.div`
`
