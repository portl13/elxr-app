import React from "react";
import styled from "@emotion/styled";

import Logo from "./Logo";
import Meta from "./Meta";

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 100vw;
  .form-section {
    width: 100%;
    max-width: 566px;
    min-height: 695px;
    display: flex;
    //background: #161C32;
    border-radius: 20px;
    //padding: 17px 27px 30px 27px;
    justify-content: flex-start;
    position: relative;
    flex-direction: column;
    align-items: center;
    margin-top: 75px;
    .back {
      font-size: 18px;
      line-height: 24px;
      color: var(--typo);
      font-weight: 100;
      text-transform: capitalize;
      position: absolute;
      left: 27px;
      cursor: pointer;
      &:before {
        border: solid var(--typo);
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 4px;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        content: '';
      }
    }
    .skip-button {
      font-size: 18px;
      line-height: 24px;
      color: var(--typo);
      font-weight: 100;
      text-transform: capitalize;
      position: absolute;
      right: 27px;
      cursor: pointer;
      &:after {
        border: solid var(--typo);
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 4px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        content: '';
      }
    }
    form {
      margin-top: 0;
      width: 100%;
      flex-direction: column;
      display: flex;
      justify-content: center;
    }
    .inner-form {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 40px 0 0 0;
      .member-image-panel {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: -35px 0 25px 0;
        .text-panel {
          font-size: 12px;
          line-height: 16px;
          text-align: center;
          color: var(--primary-color);
          cursor: pointer;
          margin: 12px 0 0 0;
        }
        .image-tag {
          width: 132px;
          height: 136px;
          display: flex;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
      .verification-text {
        font-weight: 500;
        font-size: 17px;
        line-height: 24px;
        text-align: center;
        color: var(--typo);
        margin: 0 0 50px 0;
      }
      .resend-text {
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
        text-align: center;
        color: var(--primary-color);
        cursor: pointer;
      }
      .bottom-text {
        width: 100%;
        display: block;
        text-align: center;
        font-size: 16px;
        line-height: 22px;
        font-weight: 100;
        color: var(--typo)!important;
        text-align: left;
        padding: 0 0 20px 10px;
        a {
          color: var(--primary-color);
          cursor: pointer;
        }
      }
      .signin-button {
        width: 370px;
        height: 52px;
        background: var(--primary-color);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 25px;
        font-weight: 600;
        font-size: 23px;
        line-height: 24px;
        margin: 50px 0 0 0;
        text-transform: capitalize;
      }
      .submit-button {
        width: 370px;
        height: 52px;
        color: var(--white-color);
        background: var(--primary-color);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 25px;
        font-weight: 500;
        font-size: 22px;
        line-height: 24px;
      }
      label {
        font-weight: 100;
        font-size: 16px;
        line-height: 16px;
        color: var(--typo);
        text-align: left;
        width: 100%;
      }
      .channel-tag {
        font-size: 12px;
        line-height: 24px;
        font-weight: normal;
        color: var(--typo);
        width: 100%;
        display: flex;
        justify-content: flex-start;
      }
      .form-control {
        height: 53px;
        background: var(--dark-color);
        border-radius: 7px;
        color: var(--typo);
        border:1px solid var(--typo);
        
      }
      input {
        height: 53px;
        background: var(--white-color);
        border-radius: 7px;
        color: var(--typo);
        border: 0;
      }
      textarea {
        height: 178px;
        background: var(--white-color);
        border-radius: 7px;
        color: var(--typo);
        border: 0;
        width: 100%;
        resize: none;
      }
      h1 {
        font-weight: 600;
        font-size: 30px;
        line-height: 24px;
        color: var(--typo);
        display: flex;
        flex-direction: column;
        margin: 0 0 50px 0;
        span {
          color: var(--typo);
          font-size: 18px;
          line-height: 24px;
          font-weight: 100;
          margin: 0 0 25px 0;
        }
      }
    }
  }
  .signup-process {
    width: 825px;
    display: flex;
    flex-direction: column;
    h1 {
      font-weight: 600;
      font-size: 30px;
      line-height: 24px;
      color: var(--typo);
      display: flex;
      flex-direction: column;
      margin: 0 0 45px 0;
      span {
        color: var(--typo);
        font-size: 18px;
        line-height: 24px;
        font-weight: normal;
        margin: 0 0 25px 0;
      }
    }
    .option-panel {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin: 0 0 20px 0;
      .button-tag {
        width: 380px;
        height: 200px;
        background: var(--dark-color);
        border: 0;
        position: relative;
        margin: 0 15px;
        .text-section {
          position: absolute;
          width: 100%;
          bottom: -59px;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: var(--typo);
          padding: 0 56px;
        }
        .button-panel {
          background: #CB56EB;
          background: -webkit-linear-gradient(to bottom right, #CB56EB 0%, #f15b79 50%, #FFC251 100%);
          background: -moz-linear-gradient(to bottom right, #CB56EB 0%, #f15b79 50%, #FFC251 100%);
          background: linear-gradient(to bottom right, #CB56EB 0%, #f15b79 50%, #FFC251 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          width: 100%;
          height: 100%;
          border: 0;
          font-size: 45px;
          text-transform: capitalize;
          outline: 0;
        }
      }
    }
  }
`;

const AuthRow = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    //max-width: 480px;
    padding: 15px;
    text-align: center;
    .link-login{
      font-size: 14px;
      &:nth-of-type(1){
        margin-right: .4rem;
      }
      &:nth-of-type(2){
        margin-left: .4rem;
      }
    }
    &.account-type-panel {
      justify-content: center;
      align-items: center;
    }
    form{
        margin-top: 25px;
        .btn-primary{
          border-radius: 100px;
          min-height: 40px;
          padding: 10px 20px;
          font-weight: 500;
          text-transform: initial;
        }
    }
    .navbar-brand{
        margin: 76px auto 0;
        img{
          width: 227px;
        }
    }
    select{
      -webkit-appearance: none;
      -moz-appearance:    none;
      appearance:         none;
    }
    .form-control{
        border: none;
        color: var(--typo);
        height: auto;
        background: var(--dark-color);
        font-size: 15px;
        height: 40px;
        outline: 0;
        vertical-align: middle;
        border: 1px solid  var(--typo);
        border-radius: 3px;
        box-shadow: none;
        padding: 0 12px;
        margin-bottom: 12px;
        &:focus{
          color: #4D5C6D;
        }
    }
    textarea.form-control{
      height: 100px !important;
    }

`;

const LayoutAuth = ({ children, image}) => {
  return (
    <>
      <Meta />
      <AuthContainer>
        <AuthRow className="account-type-panel">
          {image ? null : <Logo
            logo="/img/brand/logo.png" alt="weshare" /> }
          {children}
        </AuthRow>
      </AuthContainer>
    </>
  );
};

export default LayoutAuth;
