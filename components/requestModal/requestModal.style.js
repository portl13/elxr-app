import { css } from '@emotion/core';

export const uploadModal = css`
margin: 0;
background: rgba(0, 0, 0, 0.8);
width: 100%;
max-width: 100%;
&.modal-sm{
  .modal-content{
    max-width: 400px;
    .modal-body{
      padding: 30px 15%;
    }
  }
}
.modal-content{
  background: #000000;
  margin: 40px auto;
  max-width: 600px;
  border-radius: 4px;
  border: 1px solid #d2d4d6;
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
     .message-notfication-box {
          width: 100%;
          display: flex;
          flex-direction: row;
          padding: 10px 20px 10px 15px;
          align-items: center;
          position: relative;
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
        .thread-content {
          flex: 1;
          line-height: 1;
          min-width: 0;
          .thread-to {
            font-size: 14px;
            margin-bottom: 5px;
            opacity: .85;
            color: #A3A5A9;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            text-transform: capitalize;
            &:hover {
              color: #ffffff;
            }
          }
        }
      }
  }
}
`
