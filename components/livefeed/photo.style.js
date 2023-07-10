import styled from '@emotion/styled'
import { css } from '@emotion/core'

export const ErrroMsg = styled.div`
  color: red;
  font-size: 14px;
  text-align: end;
  margin-top: -16px;
`
export const PhotoAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
  .has-tooltip {
    margin-left: 10px;
    position: relative;
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
    &.delete {
      color: #fff;
      &:hover {
        .popover {
          display: block;
          transform: translate(-30%, -130%);
        }
      }
    }
    &.select {
      &:hover {
        .popover {
          display: block;
          transform: translate(-40%, -130%);
          &.bs-popover-top .arrow {
            margin: 0 2.3rem;
          }
        }
      }
    }
  }
  svg {
    height: 20px;
    width: 20px;
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
    .custom-control-label {
      &::before {
        border-radius: 100%;
        height: 22px;
        width: 22px;
        background-color: transparent;
      }
      &:after {
        height: 22px;
        width: 22px;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23FFFFFF' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
      }
    }
    .custom-control-input:checked ~ .custom-control-label::before {
      border-color: #ffffff;
      background-color: var(--primary-color);
    }
    .custom-control-input:focus:not(:checked) ~ .custom-control-label::before {
      border-color: #ffffff;
    }
    .custom-control-input:checked ~ .custom-control-label::after {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23FFFFFF' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
    }
  }
`

export const Media = styled.div`
  box-shadow: 0 3px 12px -1px rgb(7 10 25 / 20%),
    0 22px 27px -20px rgb(7 10 25 / 20%);
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 1rem;
  &:hover,
  &.show {
    box-shadow: 0 15px 45px -5px rgb(7 10 25 / 25%);
    filter: brightness(1.07);
    transform: translate(0, -2px);
    .media-wrap::after {
      visibility: visible;
      opacity: 1;
    }
    .custom-checkbox,
    .media-action {
      opacity: 1;
      visibility: visible;
    }
  }
  .media-action {
    position: absolute;
    right: 15px;
    top: 42px;
    z-index: 9;
    margin: 0;
    opacity: 0;
    visibility: hidden;
    &:hover {
      .more {
        .popover {
          display: block;
          transform: translate(-70px, -40px);
          &.bs-popover-top .arrow {
            margin: 0 0 0 4.7rem;
          }
        }
      }
    }
    .has-tooltip {
      margin: 0;
    }
    .circle {
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
      svg {
        height: 14px;
        width: 14px;
      }
    }
  }
  .more-action-list {
    position: absolute;
    top: 26px;
    right: 1px;
    background: #fff;
    box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%), 0 6px 32px 0 rgb(18 43 70 / 10%);
    border-radius: 4px;
    width: 130px;
    z-index: 1;
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
      border-color: #fff #fff transparent transparent;
      transform-origin: 0 0;
      transform: rotate(-45deg);
      box-shadow: 2px -3px 3px 0 rgb(0 0 0 / 2%);
      z-index: 101;
      opacity: 1;
      visibility: visible;
      pointer-events: none;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        margin: 0;
        padding: 0;
        list-style-type: none;
      }
    }
    .item-link {
      padding: 10px 5px;
      display: block;
      font-size: 13px;
      line-height: 1;
      color: #7f868f;
      text-align: left;
      cursor: pointer;
      svg {
        height: 15px;
        display: inline-block;
        margin-right: 8px;
        width: 20px;
      }
      &:hover {
        color: var(--primary-color);
        background-color: #e0dfdf;
      }
    }
  }
  .album-wrap-container {
    background-color: #809ab4;
  }
  .media-wrap {
    border-radius: 3px;
    position: relative;
    overflow: hidden;
    padding-top: 100%;
    display: block;
    cursor: pointer;
    &::after {
      content: ' ';
      position: absolute;
      background: rgba(0, 0, 0, 0.35);
      border-radius: 3px;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      transition: 0.3s all;
      visibility: hidden;
      opacity: 0;
    }
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
      min-width: 100%;
      object-fit: cover;
    }
    &.album-wrap {
      &::after {
        content: ' ';
        position: absolute;
        background-image: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.5) 0,
          rgba(0, 0, 0, 0.01) 60%,
          rgba(0, 0, 0, 0) 100%
        );
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
  .select-popover {
    .tooltip-panel {
      min-width: 70px;
      display: none;
      height: 28px;
      background: var(--primary-color);
      bottom: 100%;
      border-radius: 5px;
      font-size: 14px;
      color: #ffffff;
      left: -24px;
      margin-bottom: 11px;
      transform: translate(0, 10px);
      transform-origin: top;
      position: absolute;
      padding: 7px 10px;
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
        left: 28px;
      }
    }
    &:hover {
      .tooltip-panel {
        display: block;
      }
    }
  }
  .custom-checkbox {
    position: absolute;
    transition: 0.3s all;
    top: 42px;
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
    .custom-control-label {
      &::before {
        border-radius: 100%;
        height: 24px;
        width: 24px;
        background-color: transparent;
      }
      &:after {
        height: 24px;
        width: 24px;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23FFFFFF' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
      }
    }
    .custom-control-input:checked ~ .custom-control-label::before {
      border-color: #ffffff;
      background-color: var(--primary-color);
    }
    .custom-control-input:focus:not(:checked) ~ .custom-control-label::before {
      border-color: #ffffff;
    }
    .custom-control-input:checked ~ .custom-control-label::after {
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
&.album-modal-container {
  .modal-content {
    max-width: 95%;
    border: 0;
    .modal-header {
      padding: 0;
      border-bottom: 0;
      .close {
        right: -24px;
        top: -12px;
        span {
          color: #ffffff;
          font-size: 34px;
          font-weight: 100;
        }
      }
    }
    .modal-body {
      @media(max-width: 991px){
        padding-top: 35px;
      }
      .bb-media-model-inner {
        border-radius: 4px;
        display: grid;
        @media(max-width: 991px){
          grid-auto-rows: 1fr 1fr;
        }
        @media(min-width: 992px){
          grid-template-columns: 1fr 376px;
        }
        flex-flow: row wrap;
        position: relative;
        overflow: hidden;
        .bb-media-section {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          .next-icon {
            position: absolute;
            right: 0;
            border: 0;
            background: transparent;
            &:hover {
              border: 0;
              background: transparent;
              box-shadow: none;           
            }
            span {
              border: solid #ffffff;
              border-width: 0 2px 2px 0;
              display: inline-block;
              padding: 10px;
              transform: rotate(-45deg);
              -webkit-transform: rotate(-45deg);
            }
          }
          .prev-icon {
            position: absolute;
            left: 0;
            border: 0;
            background: transparent;
            &:hover {
              border: 0;
              background: transparent;
              box-shadow: none;           
            }
            span {
              border: solid #ffffff;
              border-width: 0 2px 2px 0;
              display: inline-block;
              padding: 10px;
              transform: rotate(135deg);
              -webkit-transform: rotate(135deg);
            }
          }
        }
        .bb-media-info-section {
          padding: 0 15px 0;
          ul {
            box-sizing: border-box;
            clear: both;
            list-style: none;
            width: 100%;
            position: relative;
            float: right;
            border: 0;
            margin: 0;
            padding: 0;
            li {
              padding-bottom: 50px;
              max-height: 90vh;
              @media(min-width: 992px){
                min-height: 90vh;
              }
              position: static;
              .bp-activity-head {
                display: flex;
                  margin-bottom: 15px;
                @media(min-width: 992px){
                margin-right: 25px;
                }
                position: relative;
                .dots-section {
                  position: absolute;
                  right: 0;
                  top: 0;
                  width: 15px;
                  cursor: pointer;
                  &:hover {
                    .tooltip-panel {
                      display: block;
                    }
                  }
                  svg {
                    color: #939597;
                  }
                  .tooltip-panel {
                    min-width: 100px;
                    display: none;
                    height: 24px;
                    background: #f2f2f2;
                    bottom: 100%;
                    border-radius: 5px;
                    font-size: 12px;
                    color: #000000;
                    left: -108px;
                    margin-bottom: 11px;
                    transform: translate(0,10px);
                    transform-origin: top;
                    position: absolute;
                    padding: 4px 10px;
                    text-align: center;
                    top: -11px;
                    z-index: 9;
                  }
                  .more-action-list{
                    position: absolute;
                    top: 31px;
                    right: -15px;
                    background: #000;
                    box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%), 0 6px 32px 0 rgb(18 43 70 / 10%);
                    border-radius: 4px;
                    width: 104px;
                    height: 36px;
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
                    .item-link{
                      padding: 6px 5px;
                      display: block;
                      font-size: 13px;
                      line-height: 1;
                      color: #7f868f;
                      text-align: left;
                      svg{
                        height: 12px;
                        display: inline-block;
                        margin-right: 10px;
                        width: 10px;
                      }
                      &:hover{
                        color: var(--primary-color);
                        svg {
                          color: var(--primary-color);
                        }
                      }
                    }
                  }
                }
                .activity-avatar {
                  margin: 0 15px 0 0;
                  width: auto;
                  -webkit-box-flex: 0;
                  -ms-flex: 0 0 36px;
                  flex: 0 0 48px;
                }
                .activity-header {
                  color: #7f868f;
                  font-size: 14px;
                  letter-spacing: -.24px;
                  margin: 0;
                  width: auto;
                  span {
                    color: var(--bg-font);
                    cursor: pointer;
                    &:hover {
                      color: var(--primary-color);
                    }
                  }
                  p {
                    font-size: 13px;
                    font-weight: 500;
                    margin: 0;
                  }
                  a {
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: -.24px;
                    color: var(--bg-font);
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                  }
                  .activity-date {
                    color: var(--bg-font);
                  }
                }
              }
              .profile-count-ui {
                display: flex;
                flex-direction: row;
                .like-profile-panel {
                  color: #555;
                  font-size: 12px;
                  margin: 18px 0 -12px 0;
                  display: flex;
                }
                em {
                  padding: 0 6px;
                  margin: 11px 0 -12px 0;
                }
              }
              .activity-media-description {
                margin-bottom: 10px;
                align-items: center;
                display: flex;
                .description-edit-panel {
                  padding: 0 15px 30px 0;
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  .button-tag {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .done-btn {
                      padding: 7px 20px;
                      height: 30px;
                      min-height: 10px;
                      line-height: 1;
                      background-color: var(--primary-color);
                      border-radius: 100px;
                      font-size: 14px;
                      font-weight: 500;
                      text-transform: initial;
                      letter-spacing: 0;
                    }
                    .cancel-btn {
                      background: transparent;
                      height: 30px;
                      border: 0;
                      font-size: 14px;
                      color: #a3a5a9;
                      font-weight: 500;
                      text-transform: initial;
                      padding: 0;
                    }
                  }
                  textarea {
                    background-color: #1b1b1b;
                    border: 1px solid #000000;
                    color: #ffffff;
                    font-size: 14px;
                    height: 40px;
                    outline: 0;
                    margin-bottom: 10px;
                    border-radius: 3px;
                    padding: 5px 12px;
                  }
                }
                .description-data-div {
                  margin-bottom: 10px;
                  font-size: 14px;
                  line-height: 1.5;
                }
                .edit-tag {
                  cursor: pointer;
                  &:hover {
                    color: var(--primary-color);
                  }
                }
                svg {
                  width: 13px;
                  margin: 0 5px 0 0;
                }
                .add {
                  font-size: 13px;
                  font-weight: 400;
                }
                a {
                  color: #ffffff;
                  font-size: 12px;
                  font-weight: 500;
                }
              }
              .activity-comments-container {
                width: auto;
                display: flex;
                flex-direction: column;
                .reply-section {
                  margin: 0 0 0 45px;
                }
                .main-comment-box {
                  padding: 15px 15px 0;
                  width: auto;
                  display: flex;
                  align-items: end;
                  flex-direction: row;
                  .ac-reply-avatar {
                    width: 36px;
                    display: flex;
                    margin: 0 15px 0 0;
                    .avatar {
                      width: 36px;
                      height: 36px;
                    }
                  }
                  .ac-comment-meta-section {
                    width: calc(100% - 36px);
                    display: flex;
                    flex-direction: column;
                    .author-name {
                      width: 100%;
                      display: flex;
                      font-size: 13px;
                      color: var(--primary-color);
                      justify-content: end;
                      align-items: center;
                      span {
                        color: #A3A5A9;
                        padding: 0 0 0 3px;
                        a {
                          color: #A3A5A9;
                        }
                      }
                    }
                    .comment-content {
                      font-size: 13px;
                      color: #ffffff;
                    }
                    .reply-content {
                      width: 100%;
                      display: flex;
                      flex-direction: row;
                      font-size: 12px;
                      color: #939597;
                      padding: 10px 0 0 0;
                      button {
                        background: transparent;
                        border: 0;
                        color: #939597;
                        border: 0;
                        font-size: 12px;
                        line-height: 1;
                        text-transform: capitalize;
                        padding: 0 10px 0 0;
                      }
                      a {
                        margin: 3px 15px 0 0;
                        color: #939597;
                      }
                    }
                  }
                }
              }
              .pleft-15 {
                padding-left: 30px !important;
              }
              .pleft-30 {
                padding-left: 48px !important;
              }
              .pleft-45 {
                padding-left: 62px !important;
              }
              .activity-inner-comments-panel {
                padding: 0 0 0 5%;
                .ac-reply-avatar {
                  width: 28px !important;
                  .avatar {
                    width: 28px !important;
                    height: 28px !important;
                  }
                }
              }
              .activity-comments-panel {
                width: 100%;
                display: flex;
                flex-direction: column;
                .form-ac {
                  padding-top: 15px;
                  flex-direction: row;
                  width: 100%;
                  display: flex;
                  .ac-reply-avatar {
                    width: 36px;
                    display: flex;
                      .avatar {
                        width: 36px;
                        height: 36px;
                      }
                  }
                  .ac-reply-content {
                    width: calc(100% - 36px);
                    display: flex;
                    padding: 0 0 0 15px;
                    position: relative;
                    flex-direction: column;
                    font-size: 13px;
                    .comment-content {
                      width: 100%;
                      display: flex;
                      word-break: break-all;
                      padding: 0 20px 0 0;
                      p {
                        margin-bottom: 0;
                        font-size: 13px;
                      }
                    }
                    .inner-content {
                      display: flex;
                      flex-direction: row;
                      position: relative;
                      padding: 0 50px 0 0;
                      span {
                        font-size: 12px;
                        cursor: pointer;
                        &:first-of-type {
                          color: var(--primary-color);
                        }
                        a {
                          &:hover {
                            color: var(--primary-color);
                          }
                        }
                      }
                      .dots-section {
                        position: absolute;
                        right: 26px;
                        top: 0;
                        width: 15px;
                        cursor: pointer;
                        &:hover {
                          .tooltip-panel {
                            display: block;
                          }
                        }
                        svg {
                          color: #939597;
                        }
                        .tooltip-panel {
                          min-width: 100px;
                          display: none;
                          height: 24px;
                          background: #f2f2f2;
                          bottom: 100%;
                          border-radius: 5px;
                          font-size: 12px;
                          color: #000000;
                          left: -85px;
                          margin-bottom: 11px;
                          transform: translate(0,10px);
                          transform-origin: top;
                          position: absolute;
                          padding: 4px 10px;
                          text-align: center;
                          top: -36px;
                          z-index: 9;
                        }
                        .more-action-list{
                          position: absolute;
                          top: 31px;
                          right: -15px;
                          background: #000;
                          box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%), 0 6px 32px 0 rgb(18 43 70 / 10%);
                          border-radius: 4px;
                          width: 104px;
                          height: 36px;
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
                              overflow
                            }
                          }
                          .item-link{
                            padding: 6px 5px;
                            display: block;
                            font-size: 13px;
                            line-height: 1;
                            color: #7f868f;
                            text-align: left;
                            svg{
                              height: 12px;
                              display: inline-block;
                              margin-right: 10px;
                              width: 10px;
                            }
                            &:hover{
                              color: var(--primary-color);
                              svg {
                                color: var(--primary-color);
                              }
                            }
                          }
                        }
                      }
                      span {
                        a {
                          color: #A3A5A9;
                          padding: 0 0 0 5px;
                        }
                      }
                      .comment-content {
                        padding: 0 10px 0 0;
                      }
                    }
                    textarea {
                      box-shadow: none;
                      color: var(--typo);
                      height: 37px;
                      min-height: 37px;
                      font-size: 100%;
                      margin: 0;
                      outline: 0;
                      padding: .5em;
                      background: transparent;
                      resize: none;
                      width: calc(100% - 36px);
                      border-radius: 3px;
                      border: 1px solid #ccc;
                    }
                    .lower-emoji {
                      width: 100%;
                      display: flex;
                      padding: 10px 0 10px 0;
                      svg {
                        height: 18px;
                        width: 18px;
                        color: #ffffff;
                      }
                    }
                    .save-button-panel {
                      width: 100%;
                      display: flex;
                      padding: 5px 0 0 0;
                      .ac-reply-cancel {
                        background: 0 0;
                        box-shadow: none;
                        border: 0;
                        font-size: 12px;
                        color: #a3a5a9;
                        font-weight: 500;
                        margin: 0;
                        padding: 0 20px 0 0;
                        width: auto;
                        text-transform: capitalize;
                      }
                      .post-button {
                        padding: 7px 8px;
                        height: auto;
                        min-height: 10px;
                        line-height: 1;
                        font-size: 14px;
                        font-weight: 500;
                        width: 75px;
                        background-color: var(--primary-color);
                        border-radius: 25px;
                        text-transform: capitalize;
                      }
                    }
                  }
                }
              }
              .activity-buttons-action{
                margin-top: 15px;
                padding-bottom: 15px;
              }
              .social-panel {
                .share-link{        
                  margin-left: 20px;
                  margin-top: 5px;
                }
                width: 100%;
                display: flex;
                flex-direction: row;
              }
              .activity-buttons-action .btn{
                font-size: 13px;
                font-weight: 400;
                color: #7f868f;
                letter-spacing: -.24px;
                line-height: 1;
                background: transparent;
                border: 0;
                padding: 0 10px 0 0;
                text-transform: capitalize;
                &:hover{
                  color: var(--primary-color);
                }
                &.hover-none{
                  &:hover{
                    color: #fff;
                  }
                }
                svg{
                  height: 18px;
                  width: 18px;
                  color: var(--primary-color);
                  margin: 0 10px 0 0;
                }
              }
            }
          }
        }
      }
    }
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
  .profile-footer-panel {
    flex-direction: column;
    .form-group {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      min-height: 45px;
      .upload-button{
        position: absolute;
        right: 0;
        .spinner-border {
          margin: 0 10px 0 0;
        }
      }
      button{
        position: relative;
        text-transform: none;
        .spinner-border {
          margin: 0 0 0 10px;
        }
      }
      .select-album {
        background: #ffffff;
        color: #000000;
        padding: 0 28px 0 10px;
      }
      span{
        position: absolute;
        right: 11px;
        top: 16px;
        border: solid black;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }
    }
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
  }
  .profile-footer-button {
    justify-content: space-between;
    button {
      text-transform: none;
    }
  }
  .profile-move-panel {
    flex-direction: column;
    .form-group {
      width: 100%;
      display: flex;
      align-items: flex-start;
      position: relative;
      flex-direction: column;
      .upload-button{
        .spinner-border {
          margin: 0 10px 0 0;
        }
      }
      button{
        position: relative;
        .spinner-border {
          margin: 0 0 0 10px;
        }
      }
      .select-album {
        background: #ffffff;
        color: #000000;
        padding: 0 32px 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        width: 175px;
      }
      span{
        position: absolute;
        left: 150px;
        top: 48px;
        border: solid black;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }
    }
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
  }
  .modal-body{
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
.description-text:empty, h4:empty{
  display: none;
}
`
export const ContentWrap = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 11;
  left: 0;
  padding: 20px;
  font-size: 13px;
  color: #fff;
  line-height: 1;
  width: 100%;
  border-radius: 3px;
  h4 {
    font-size: 18px;
    margin-bottom: 8px;
    line-height: 1;
  }
  .photos-section {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      width: 18px;
      margin: 0 10px 0 0;
    }
  }
  span {
    display: inline-block;
    margin-bottom: 9px;
    &.dot {
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
  h2 {
    font-size: 24px;
    font-weight: 500;
    line-height: 1;
    margin: 0;
  }
  .btn-text {
    text-transform: initial;
    font-weight: 500;
    &:hover,
    &:active,
    &:focus {
      color: #fff;
    }
  }
`
export const AlbumHeadingView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  .form-control {
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
  .btn-outline-primary {
    height: 26px;
    padding: 4px 15px;
    font-size: 12px;
    margin: 0 10px 0 0;
    font-weight: 500;
    &.red {
      color: #ef3e46;
      &:hover,
      &:active,
      &:focus {
        background: #ef3e46 !important;
        border-color: #ef3e46;
        color: #fff;
      }
    }
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
    margin: 0 0 0 auto !important;
  }
`
