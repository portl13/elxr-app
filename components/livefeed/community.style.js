
import styled from "@emotion/styled"
import { css } from '@emotion/core';

export const GroupContainer = styled.div`
  .groups-list{
    margin-bottom: 20px;
    box-sizing: border-box;
    clear: both;
    list-style: none;
    padding: 0;
    width: 100%;
    &.grid{
      display: flex;
      flex-flow: row wrap;
      width: auto;
      &.small-list{
        li{
          flex: 0 0 100%;
          max-width: 100%;
          @media screen and (min-width: 768px){
            flex: 0 0 33.33%;
            max-width: 33.33%;
          }
          @media screen and (min-width: 1200px){
            flex: 0 0 25%;
            max-width: 25%;
          }
        }
      }
      .only-list-view {
        display: none!important;
      }
      .footer-button-wrap,
      .last-activity{
        display: none;
      }
      li{
        flex: 0 0 50%;
        max-width: 50%;
        margin: 0 0 20px;
        padding: 0 10px;
        min-width: 0;
        float: left;
        @media screen and (min-width: 962px){
          flex: 0 0 33.33%;
          max-width: 33.33%;
        }
        @media screen and (min-width: 1400px){
          flex: 0 0 25%;
          max-width: 25%;
        }
      }
      .list-wrap{
        height: 100%;
        flex-direction: column;
        padding: 15px 20px;
      }
      .item-avatar {
        margin-bottom: 20px;
        text-align: left;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        z-index: 1;
        margin: 0 0 20px;
        .group-avatar-wrap {
          margin-top: -47px;
        }
        img {
          max-width: 75px;
          width: 100%;
        }
      }
      .groups-loop-buttons {
        min-width: 1px;
        flex: 1;
        margin-left: 10px;
      }
      .generic-button {
        text-align: right;
      }
      .group-button {
        line-height: 1.3;
        padding: 0;
        border: 0;
        border-radius: 0;
        min-width: 1px;
        width: auto;
        background: 0 0;
        margin: 5px 0 5px auto;
        font-size: 14px;
        color: var(--primary-color);
        outline: 0;
        transition: all linear .2s;
      }
      .action{
        justify-content: flex-end;
      }
      .item{
        width: 100%;
        flex-flow: column;
        .item-block {
          margin-bottom: 10px;
        }
        .groups-title{
          cursor:pointer;
          margin-bottom: 10px;
          cursor:pointer;
        }
      }
    }
    &:not(.grid) .only-grid-view{
      display: none!important;
    }
    li{
      list-style-type: none;
      margin: 0;
      padding: 0;
      position: relative;
      &:before,
      &:after,{
        content: " ";
        display: table;
      }
      .list-wrap{
        display: flex;
        margin: 0 0 -1px;
        overflow: visible;
        padding: 15px 0;
        position: relative;
        transition: box-shadow linear .2s;
      }
      .bs-group-cover {
        overflow: hidden;
        margin: -15px -20px 5px;
        position: relative;

        a{
          border-radius: 3px 3px 0 0;
          position: relative;
          overflow: hidden;
          padding-top: 52.56%;
          display: block;
          background: #809ab4;
          &::before {
            background: rgba(0,0,0,.25);
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
          }
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
          vertical-align: bottom;
          height: auto;
          max-width: 100%;
        }
      }
    }
    .item-avatar{
      margin-right: 20px;
      width: auto;
      a{
        display: inline-block;
        background: #fff;
        border: 3px solid #fff;
        box-shadow: 0 2px 5px 0 rgb(18 43 70 / 12%), 0 0 0 1px #e7e9ec;
        border-radius: 3px;
      }
      img{
        max-width: 75px;
        height: auto;
        width: 100%;
      }
    }
    .avatar{
      border-radius: 3px;
    }
    .group-avatar-wrap{
      min-height: 81px;
      min-width: 81px;
    }
    .item{
      flex: 1;
      display: flex;
      flex-flow: row wrap;
      margin: 0;
      .item-block{
        flex: 0 0 28%;
        padding-right: 15px;
        margin-right: 0;
        width: auto;
      }
      .groups-title{
        cursor:pointer;
        font-size: 26px;
        font-weight: 400;
        line-height: 1.1;
        margin: 0 auto 5px;
        .education-platform-home-link{
          width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
          color: var(--typo);
          display: inline-block;
          font-size: 20px;
          font-weight: 500;
          letter-spacing: -.24px;
          line-height: 1.2;
          &:hover{
            color: var(--primary-color);
          }
        }
      }
      .group-details{
        color: #A3A5A9;
        font-size: 13px;
        font-weight: 400;
        line-height: 1.6;
        margin-bottom: 0;
      }
      .last-activity{
        margin: 0;
        letter-spacing: -.24px;
        line-height: 1.3;
      }
    }
    .group-item-desc{
      align-self: center;
      flex: 1;
      font-size: 14px;
      line-height: 1.4;
      padding-right: 20px;
    }
    .more-link{
      font-size: 14px;
      line-height: 1.4;
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      margin-left: 5px;
      transition: all .15s ease;
      &:hover{
        color: var(--primary-color);
        svg{
          margin-left: 10px;
          color: var(--primary-color);
        }
      }
      svg{
        width: 7px;
        display: inline-block;
        margin-left: 5px;
        
      }
    }
    .groups-loop-buttons{
      align-self: center;
      min-width: 140px;
    }
    .action{
      display: flex;
      align-items: center;
      flex-flow: row wrap;
      margin: 0;
    }
    .generic-button{
      margin-bottom: 5px;
    }
    .group-button{
      min-width: 170px;
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      min-height: 32px;
      line-height: 32px;
      padding: 0 20px;
      border: 1px solid #ffffff;
      margin: 5px 0;
      box-shadow: none;
      background: #000;
      border-radius: 100px;
      outline: 0;
      letter-spacing: -.24px;
    }
    .group-members-wrap{
      &.only-grid-view{
        font-size: 12px;
        color: #A3A5A9;
        letter-spacing: -.24px;
        margin-bottom: 2px;
        text-align: left;
        .bs-group-members{
          display: inline-block;
          margin-right: 12px;
          img {
            border: 1px solid #fff;
            max-width: 24px;
            display: inline-block;
            margin-right: -8px;
            position: relative;
            z-index: 3;
            border-radius: 50%;
            &:nth-of-type(2) {
              z-index: 2;
            }
            &:nth-of-type(3) {
              z-index: 1;
            }
          }
        }
      }
    }
  }
`
