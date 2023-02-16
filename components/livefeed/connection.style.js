import styled from "@emotion/styled"

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
  .has-tooltip{
    padding: 4px 7px;
    position: relative;
    opacity: .4;
    color: var(--bg-font);
    &:last-child{
      border-left: 1px solid var(--typo);
    }
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
    &:hover{
      opacity: 1;
      color: var(--primary-color);
      .popover{
        display: block;
        transform: translate(-40%,-130%);
        &.bs-popover-top .arrow{
          margin: 0 2.3rem;
        }
      }
    }
  }
  svg{
    height: 18px;
    width: 18px;
  }
  select{
    -webkit-appearance: none;
    -moz-appearance:    none;
    appearance:         none;
    /* background-color: var(--bg);
    border: 1px solid var(--typo);
    color: var(--typo);
    min-width: 140px;
    border-radius: 3px; */
    width: auto;
    margin-bottom: 0 !important;
    margin-right: 12px;
    &:hover,
    &:active,
    &:focus{
      color: var(--white-color);
      background-color: rgba(29,51,91,.48);
      border: 2px solid rgba(29,51,91,.48);
    }
  }
`

export const MemberContainer = styled.div`
  .members-list{
    padding: 0;
    margin: 0 0 20px;
    clear: both;
    list-style: none;
    width: 100%;
    &:not(.grid) .only-grid-view{
      display: none;
    }
    &.grid {
      display: flex;
      flex-flow: row wrap;
      margin-bottom: 20px;
      width: auto;
      .only-list-view {
        display: none;
      }
      .list-wrap{
        margin: 0 0 20px;
        padding: 0 10px;
        .list-wrap-inner{
          height: 100%;
          min-height: 40px;
          padding: 15px 20px 52px 20px;
          flex-direction: column;
        }
      }
      .item-avatar{
        margin: 10px 0 18px;
        text-align: center;
        width: auto;
        float: none;
        a{
          img.avatar{
            max-width: 126px;
            width: 100%;
            display: inline-block;
            height: auto;
          }
        }
      }
      .item{
        width: 100%;
        left: 0;
        margin: 0 auto;
        float: none;
        text-align: center;
        flex-flow: column;
      }
      .item-block{
        margin-bottom: 10px;
      }
      .follow-container{
        display: flex;
        align-items: center;
        width: 100%;
        flex-flow: row wrap;
        justify-content: space-between;
        & > div{
          flex: unset;
        }
      }
      .follow-button{
        button{
          color: var(--primary-color);
          border: 0;
          border-radius: 0;
          box-shadow: none;
          line-height: 1.3;
          min-height: 1px;
          padding: 0;
          outline: 0;
        }
      }
    }
  }
  .list-wrap{
    padding: 0;
    margin: 0 0;
    list-style: none;
  }
  .list-wrap-inner{
    display: flex;
    padding: 15px 20px;
    position: relative;
    -webkit-transition: box-shadow linear .2s;
    transition: box-shadow linear .2s;
  }
  .item-avatar{
    float: left;
    margin-right: 20px;
    a{
      display: inline-block;
      position: relative;
      img.avatar{
        max-width: 52px;
        border-radius: 50%;
        margin: 0;
      }
    }
  }
  .item{
    flex: 1;
    display: flex;
    flex-flow: row wrap;
    overflow: visible;
  }
  .item-block{
    width: auto;
    flex: 0 0 28%;
    margin-right: 0;
  }
  .list-title{
    margin: 0 0 6px;
    word-break: break-word;
    font-size: 14px;
    line-height: 1.35;
    a{
      font-size: 20px;
      font-weight: 500;
      line-height: 1.2;
      color: var(--bg-font)
    }
  }
  .item-meta{
    line-height: 1.3;
    font-size: 12px;
    font-weight: 300;
    color: #A3A5A9;
    margin: 0;
  }
  .member-button-wrap{
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    flex: 1;
    justify-content: flex-end;
  }
  .followers-wrap{
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 14px;
    color: #939597;
    line-height: 1;
    margin: 5px 0;
    padding: 0 10px;
    b{
      color: #4d5c6d;
      font-weight: 400;
      margin-right: 3px;
    }
  }
  .following-wrap {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 14px;
    color: #939597;
    line-height: 1;
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .generic-button{
    margin: 0 0 0 20px;
    display: block;
    a{
      color: #939597;
      line-height: 1;
      min-height: 1px;
      position: relative;
      cursor: pointer;
      svg{
        height: 17px;
        width: 17px;
      }
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 82px;
        display: none;
        height: 30px;
        background: #f2f2f2;
        bottom: 100%;
        border-radius: 5px;
        font-size: 12px;
        color: #000000;
        left: -34px;
        margin-bottom: 11px;
        transform: translate(0,10px);
        transform-origin: top;
        position: absolute;
        padding: 9px 10px;
        text-align: center;
        top: 20px;
        em {
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid #f2f2f2;
          position: absolute;
          top: -5px;
          left: 35px;
        }
      }
    }
    .following-white-text {
      color: var(--typo);
    }
  }
  .follow-button{
    min-width: 140px;
    color: var(--white-color);
    background: var(--primary-color);
    border: none;
    border-radius: 100px;
    font-size: 16px;
    font-weight: 500;
    min-height: 34px;
    padding: 6px 20px;
    outline: 0;
    
  }
  .footer-button-wrap{
    margin: 0 -20px 0;
    align-items: center;
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    flex-flow: row wrap;
    flex: 1;
    justify-content: flex-end;
    & > .generic-button {
      flex: 1;
      margin: 0;
      display: flex;
      align-items: center;
      min-height: 35px;
      padding: 6px 10px 7px;
      justify-content: center;
    }
  }
  .connection-button{
    background: #000;
    border-color: #ffffff;
    color: #ffffff;
    font-size: 13px;
    font-weight: 500;
    min-height: 32px;
    line-height: 32px;
    padding: 0 20px;
    margin: 5px 15px 5px 0;
    -webkit-font-smoothing: initial;
    -moz-font-smoothing: initial;
    box-shadow: none;
    border-radius: 100px;
    min-width: 140px;

  }
  .primary-button{
    border-color: #ffffff;
    color: var(--primary-color);
    background-color: #FFFFFF;
    font-size: 13px;
    font-weight: 500;
    min-height: 32px;
    line-height: 32px;
    padding: 0 20px;
    margin: 5px 15px 5px 0;
    -webkit-font-smoothing: initial;
    -moz-font-smoothing: initial;
    box-shadow: none;
    border-radius: 100px;
    min-width: 140px;
    &:last-child{
      min-width: 90px;
    }
    &:hover,
    &:active,
    &:focus{
      background-color: var(--primary-color);
      border-color: var(--primary-color);
      color: #fff;
    }
  }
  .pagination{
    padding: 10px 0;
    position: relative;
    width: 100%;
    margin: 0;
    .page-count{
      float: left;
    }
    .page-data{
      color: #A3A5A9;
      font-size: 14px;
      margin: 0;
    }
  }
`
