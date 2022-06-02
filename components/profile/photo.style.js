import styled from "@emotion/styled"
import { css } from '@emotion/core';

export const PhotoAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
  .has-tooltip{
    margin-left: 10px;
    position: relative;
    .popover{
      display: none;
      transition: all .18s ease-out .18s;
      white-space: nowrap;
      .popover-body{
        font-weight: 500;
        font-size: 13px;
        line-height: 1.3;
        padding: 7px 15px;
      }
      &.bs-popover-top{
        margin-bottom: 0.5rem;
        .arrow{
          bottom: calc((0.5rem + 1px) * -1);
          margin: 0 1.5rem;
          &::before{
            bottom: 0;
            border-width: 0.5rem 0.5rem 0;
            border-top-color: transparent;
          }
          &::after{
            bottom: 1px;
            border-width: 0.5rem 0.5rem 0;
            border-top-color: #fff;
          }
        }
      }
    }
    &.delete{
      color: #fff;
      &:hover{
        .popover{
          display: block;
          transform: translate(-30%,-130%);
        }
      }
    }
    &.select{
      &:hover{
        .popover{
          display: block;
          transform: translate(-40%,-130%);
          &.bs-popover-top .arrow{
            margin: 0 2.3rem;
          }
        }
      }
    }
  }
  svg{
    height: 20px;
    width: 20px;
  }
  .custom-checkbox{
    transition: .3s all;
    color: #fff;
    width: 22px;
    height: 22px;
    font-size: 15px;
    text-align: center;
    line-height: 1;
    z-index: 2;
    .custom-control-label{
      &::before{
        border-radius: 100%;
        height: 22px;
        width: 22px;
        background-color: transparent;
      }
      &:after{
        height: 22px;
        width: 22px;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23FFFFFF' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
      }
    }
    .custom-control-input:checked ~ .custom-control-label::before{
      border-color: #FFFFFF;
      background-color: #eb1e79;
    }
    .custom-control-input:focus:not(:checked) ~ .custom-control-label::before{
      border-color: #FFFFFF;
    }
    .custom-control-input:checked ~ .custom-control-label::after{
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23FFFFFF' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
    }
  }
`

export const Media = styled.div`
  box-shadow: 0 3px 12px -1px rgb(7 10 25 / 20%), 0 22px 27px -20px rgb(7 10 25 / 20%);
  transition: all .3s ease;
  position: relative;
  &:hover,
  &.show{
    box-shadow: 0 15px 45px -5px rgb(7 10 25 / 25%);
    filter: brightness(1.07);
    transform: translate(0,-2px);
    .media-wrap::after{
      visibility: visible;
      opacity: 1;
    }
    .custom-checkbox,
    .media-action{
      opacity: 1;
      visibility: visible;
    }
  }
  .media-action{
    position: absolute;
    right: 15px;
    top: 21px;
    z-index: 9;
    margin: 0;
    opacity: 0;
    visibility: hidden;
    &:hover{
      .more{
        .popover{
          display: block;
          transform: translate(-35%,-130%);
          &.bs-popover-top .arrow{
            margin: 0 2.6rem;
          }
        }
      }
    }
    .has-tooltip{
      margin: 0;
    }
    .circle{
      height: 24px;
      width: 24px;
      padding: 4px;
      border: 1px solid #fff;
      background-color: transparent;
      color: #fff;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      svg{
        height: 14px;
        width: 14px;
      }
    }
  }
  .more-action-list{
    position: absolute;
    top: 26px;
    right: 1px;
    background: #fff;
    box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%), 0 6px 32px 0 rgb(18 43 70 / 10%);
    border-radius: 4px;
    width: 198px;
    z-index: 1;
    &::after{
      content: " ";
      position: absolute;
      width: 0;
      height: 0;
      top: 0;
      margin: 0 auto;
      right: 8px;
      box-sizing: border-box;
      border: 6px solid #000;
      border-color: #fff #fff transparent transparent;
      transform-origin: 0 0;
      transform: rotate(-45deg);
      box-shadow: 2px -3px 3px 0 rgb(0 0 0 / 2%);
      z-index: 101;
      opacity: 1;
      visibility: visible;
      pointer-events: none;
    }
    ul{
      list-style: none;
      margin: 5px;
      padding: 0;
      li{
        margin: 0;
        padding: 0;
        list-style-type: none;
      }
    }
    .item-link{
      padding: 10px 14px;
      display: block;
      font-size: 14px;
      line-height: 1;
      color: #7f868f;
      text-align: left;
      svg{
        height: 15px;
        display: inline-block;
        margin-right: 10px;
        width: 20px;
      }
      &:hover{
        color: var(--primary-color);
      }
    }
  }
  .media-wrap{
    border-radius: 3px;
    position: relative;
    overflow: hidden;
    padding-top: 100%;
    display: block;
    cursor: pointer;
    &::after {
      content: " ";
      position: absolute;
      background: rgba(0,0,0,.35);
      border-radius: 3px;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      transition: .3s all;
      visibility: hidden;
      opacity: 0;
    }
    img{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 0;
      min-height: 100%;
      width: auto;
      min-width: 100%;
      object-fit: cover;
    }
    &.album-wrap{
      &::after{
        content: " ";
        position: absolute;
        background-image: linear-gradient(0deg,#000 0,rgba(0,0,0,.01) 60%,rgba(0,0,0,0) 100%);
        border-radius: 3px;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        visibility: visible;
        opacity: 1;
      }
    }
  }
  .custom-checkbox{
    position: absolute;
    transition: .3s all;
    top: 21px;
    left: 15px;
    color: #fff;
    width: 20px;
    height: 20px;
    font-size: 15px;
    text-align: center;
    line-height: 1;
    z-index: 2;
    visibility: hidden;
    opacity: 0;
    .custom-control-label{
      &::before{
        border-radius: 100%;
        height: 24px;
        width: 24px;
        background-color: transparent;
      }
      &:after{
        height: 24px;
        width: 24px;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23FFFFFF' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
      }
    }
    .custom-control-input:checked ~ .custom-control-label::before{
      border-color: #FFFFFF;
      background-color: #eb1e79;
    }
    .custom-control-input:focus:not(:checked) ~ .custom-control-label::before{
      border-color: #FFFFFF;
    }
    .custom-control-input:checked ~ .custom-control-label::after{
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23FFFFFF' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
    }
  }
`
export const uploadModal = css`
margin: 0;
background: rgba(0, 0, 0, 0.8);
width: 100%;
max-width: 100%;
&.upload-modal-dialog {
  .modal-content {
    max-width: 600px !important;
    .modal-body {
      padding: 0 !important;
      h4 {
        margin: 0 0 30px 0;
        background: var(--white-color);
        color: var(--typo);
        border-radius: 3px 3px 0 0;
        padding: 10px 10px;
        font-size: 16px;
        text-align: center;
      }
      .upload-input-tag {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 15px;
      }
      .alert {
        width: auto;
        margin: 0 auto;
        padding: 7px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #d03f3f;
      }
      input {
        margin: 0 0 30px 0;
        width: auto;
      }
      .btn-section {
        width: 100%;
        display: flex;
        padding: 0 15px 15px 15px;
        justify-content: space-between;
        border-top: 1px solid #d2d4d6;
        align-items: center;
        padding: 12px 15px;
        .cancel-btn {
          padding: 0;
        }
        .upload-btn {
          padding: 8px 15px;
          background: var(--primary-color);
          font-size: 14px;
        }
      }
    }
  }
}
&.quick-dialog {
  .modal-body {
    padding: 20px 25px !important;
    position: relative;
    .alert {
      position: absolute;
      width: 348px;
      bottom: 68px;
    }
    .button-tag {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 20px 0 0 0;
      .yes-btn {
        background-color: var(--primary-color);
        font-size: 15px;
      }
    }
    h4 {
      font-size: 20px;
      margin-bottom: 25px;
      position: relative;
      span {
        position: absolute;
        right: -34px;
        top: -30px;
        width: 24px;
        color: #ffffff;
        transform: rotate(45deg);
        height: 24px;
        background: var(--primary-color);
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        cursor: pointer;
      }
    }
    .col-12-tag {
      display: flex;
      width: 100%;
      flex-direction: column;
      position: relative;
    }
    .error-tag {
      .error-text {
        color: #ff0000;
        display: flex;
        width: 100%;
        justify-content: flex-end;
        font-size: 11px;
        position: absolute;
        right: 0;
        top: 5px;
      }
    }
    label {
      font-size: 14px !important;
      margin-bottom: 4px !important;
    }
    .alert {
      padding: 4px 10px;
      margin: 10px 0 0 0;
      font-size: 12px;
    }
    .select-box {
      width: 100%;
      display: flex;
      position: relative;
      select {
        font-size: 13px !important;
        width: 100% !important;
        position: relative;
      }
      &::after {
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 2px;
        content: '';
        position: absolute;
        top: 17px;
        right: 16px;
        content: '';
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }
    }
    input {
      font-size: 13px !important;
      width: 100% !important;
      margin-bottom: 15px !important;
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
&.discussion-modal {
  background: rgba(0,0,0,0) !important;
  .modal-content {
    position: absolute;
    bottom: -54px;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 748px;
  }
}
&.modal-sm{
  .modal-content{
    max-width: 400px;
    .modal-body{
      padding: 30px 15%;
    }
  }
}
.modal-content{
  background: var(--dark-color);
  margin: 40px auto;
  max-width: 600px;
  border-radius: 4px;
  border: 1px solid var(--typo);
  box-shadow: 0 6px 24px 0 rgb(18 43 70 / 10%);
  .modal-header{
    padding: 0;
    padding: 17px 30px 16px;
    .modal-title{
      font-weight: 500;
      font-size: 17px;
    }
    .close{
      padding: 0.75rem;
      position: absolute;
      right: 1.2rem;
      top: 1.2rem;
      z-index: 1038;
      & span:not(.sr-only){
        color: #A3A5A9;
        font-size: 1.8rem;
      }
    }
  }
  .edit-feed-panel {
    .css-1ljmi2w-CreateFeedAvatar {
      // flex-direction: column;
      // justify-content: flex-start;
      // align-items: flex-start;
      .reply-text-panel {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        font-size: 16px;
        font-weight: 400;
        p {
          margin: 0 -15px;
          padding: 5px 15px 0 15px;
          font-size: 13px;
          color: #999;
          font-weight: 500;
        }
      }
      .form-control {
        margin-bottom: 0;
      }
      p {
        margin-bottom: 0;
      }
    }
  }
  .edit-feed-modal {
    padding: 0 !important;
    .mt-4 {
      margin-top: 0 !important;
    }
    textarea {
      background-color: #000000;
    }
    .w-auto {
      .form-control {
        border: 1px solid #dedfe2;
        font-size: 13px;
        height: 34px;
        min-width: 113px;
      }
    }
  }
  .modal-body{
    padding: 30px;
    .form-control{
      background-color: #1b1b1b;
      border: 1px solid #000000;
      margin-bottom: 20px;
      color: #fff;
      font-size: 15px;
    }
    select{
      -webkit-appearance: none;
      -moz-appearance:    none;
      appearance:         none;
      background-color: #1b1b1b;
      border: 1px solid #000000;
      color: #fff;
      width: auto;
      min-width: 140px;
      border-radius: 3px;
      margin-bottom: 0 !important;
    }
    textarea{
      min-height: 80px;
      resize: none;
    }
    label{
      font-size: 16px;
      line-height: 1.5;
      display: block;
      margin-bottom: 7px;
    }
    .btn-text{
      margin-top: 20px;
      text-transform: initial;
      &:hover,
      &:active,
      &:focus{
        color: #fff;
      }
    }
  }
}
`
export const ContentWrap = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 11;
  left: 0;
  padding: 1.25rem;
  font-size: 13px;
  color: #fff;
  line-height: 1;
  width: 100%;
  border-radius: 3px;
  h4{
    font-size: 18px;
    margin-bottom: 12px;
    line-height: 1;
  }
  span{
    display: inline-block;
    &.dot{
      margin: 0 4px;
    }
  }
`
export const AlbumHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 25px;
  h2{
    font-size: 24px;
    font-weight: 500;
    line-height: 1;
    margin: 0;
  }
  .btn-text{
    text-transform: initial;
    font-weight: 500;
    &:hover,
    &:active,
    &:focus{
      color: #fff;
    }
  }
`
export const AlbumHeadingView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  .form-control{
    background-color: #1b1b1b;
    border: 1px solid #000000;
    margin-bottom: 0;
    color: #fff;
    font-size: 15px;
    max-width: 202px;
  }
`
export const AlbumButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  .btn-outline-primary{
    height: 26px;
    padding: 4px 15px;
    font-size: 12px;
    margin: 0 10px 0 0;
    font-weight: 500;
    &.red{
      color: #ef3e46;
      &:hover,
      &:active,
      &:focus{
        background: #ef3e46 !important;
        border-color: #ef3e46;
        color: #fff;
      }
    }
  }
  select{
    -webkit-appearance: none;
    -moz-appearance:    none;
    appearance:         none;
    background-color: #1b1b1b;
    border: 1px solid #000000;
    color: #fff;
    width: auto;
    min-width: 140px;
    border-radius: 3px;
    margin: 0 0 0 auto!important;
  }
`
