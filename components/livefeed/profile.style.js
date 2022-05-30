import styled from "@emotion/styled"
import { css } from '@emotion/core';

export const ProfileAvatarWrapper = styled.div`
    .profile-avatar{
        height: 95px;
        width: 95px;
    }
    .profile-title{
        font-size: 1.6rem;
        font-weight: 500;
    }
    .profile-bio{
        font-size: .95rem;
    }
`

export const ProfileDataCounter = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: .5rem;
    .count{
        font-size: 1.3rem;
    }
    .title{
        font-size: .8rem;
    }
`

export const ProfileButtonAction = styled.button`
    color:#eee;
    border: 1px solid #eee;
    padding: 0.2rem .8rem;
    &:hover{
        color: #eee;
    }
    display: block;
    width: 50%;
`

export const ProfileCardStyle = css`
padding: 0;
overflow: hidden;
.item-header-cover-image{
    display: flex;
    position: relative;
    flex-direction:column;
    @media(min-width:992px){
        flex-direction: row;
        padding-left: 30px;
    }
}
.item-header-content{
    @media(min-width:992px){
        margin-top: 25px;
    }
}
.item-header-avatar{
    margin-left: auto;
    margin-right: auto;
    margin-top: -90px;
    z-index: 2;
    margin-bottom: 20px;
    min-width: 180px;
    min-height: 180px;
    max-height: 180px;
    max-width: 180px;
    background-color:#555;
    border-radius: 4px;
    border: 5px solid #fff;
    box-shadow: 0 2px 5px 0 rgb(18 43 70 / 12%), 0 0 0 1px #e7e9ec;
    @media(min-width:992px){
        margin: -40px 30px 5px 0;
    }
}
.avatar.squared{
    max-width:180px;
    width:100%;
    display:block;
    height: auto;
    border-radius: 0;
}
.group-title-wrap{
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
    @media(min-width:992px){
        justify-content:flex-start;
    }
}
.group-title{
    flex:0 0 100%;
    text-align:center;
    line-height: 1.2;

   @media(min-width:768px){
        margin-right: 15px;
        margin-bottom: 5px;
   }
   @media(min-width:992px){
        text-align:left;
   }
}
.bp-title{
    font-size:13px;
    font-weight:500;
    margin:0 0 5px;
    text-align: center;
    @media(min-width:992px){
        text-align:left;
    }
}
.moderators-list{
    list-style:none;
    padding-left:0;
    display:flex;
    justify-content:center;
    img{
        width:30px;
        height:30px;
    }
    @media(min-width:992px){
        justify-content: flex-start;
    }
}
.avatar{
    background-color:#000;
}
.generic-meta{
    display:flex;
    justify-content:center;
    @media(min-width:992px){
        justify-content:flex-start;
    }
    @media(min-width:1440px){
        position:absolute;
        right:0;
        top:15px;
    }
}
.badge{
    padding: .5rem .8rem;
}
.badge-status{
    margin-right: 10px;
}
.badge-info{
    color:rgba(77, 92, 109, .8);
    background-color: #eef0f3;
}
.badge-icon{
    color:#0dd081;
    margin-right: 5px;
}
.header-cover-image{
    height: 300px;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    background-position: center center;
    background-color:#555;
    background-repeat:no-repeat;
    background-size:cover;
    display:block;
    padding:0;
    z-index:1;
    overflow:hidden;
}
.header-cover-img{
    max-width: 100%;
    min-width: 100%;
    object-fit: cover;
    min-height: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: none;
}
`

export const MentionStyle = css`
    color: rgb(179 179 179);
    font-size: 14px;
    margin: 0 0 10px;
`
export const followerWrap = css`
    font-size: 14px;
    color: #939597;
    line-height: 1;
    margin-bottom: 5px;
    margin-top: 5px;
    margin-right: 20px;
    display: inline-flex;
    align-items: center;
    b{
        color: #4d5c6d;
        font-weight: 500;
    }
`
export const ProfileContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    .btn-outline-primary{
        background: transparent !important;
        display: inline-block;
        text-transform: initial;
        padding: 6px 20px;
        border-radius: 100px;
        font-size: 14px;
        line-height: 1;
        height: 34px;
        color: var(--primary-color);
        border-color: #fff;
        &:hover,
        &:focus,
        &:active{
            background: var(--primary-color) !important;
            color: #fff;
            border-color: var(--primary-color);
        }
        svg{
            height: 16px;
            width: 16px;
            margin-right: 5px;
        }
    }
`
export const ProfileLeft = styled.div`
    width: 100%;
    float: left;
    margin: 0;
    padding: 20px 0;
    .sidenav-list {
        li {
          position: relative;
          .badge-circle {
            position: absolute;
            right: 0;
            top: 15px;
            padding: 2px 9px;
            width: auto;
            font-style: normal;
            border-radius: 15px;
          }
        }
      }
    .button-link{
        border: 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0;
        padding: 10px 15px;
        color: var(--typo);
        font-size: 14px;
        line-height: 2;
        border-radius: 0;
        width: 100%;
        background: transparent;
        box-shadow: none;
        font-weight: 400;
        letter-spacing: 0;
        text-transform: capitalize;
        &.selected{
            background: rgba(77,92,109,.1);
            color: var(--primary-color);
        }
        &:hover{
            background: rgba(77,92,109,.1);
            color: var(--primary-color);
        }
        &:focus{
            outline: 0;
        }
        svg{
            height: 16px;
            width: 16px;
            margin-right: 10px;
        }
    }
    @media(min-width:992px){
        flex: 0 0 230px;
    }
    .nav{
        @media(min-width:992px){
            flex-direction: column;
        }
        .nav-item{
            transition: .3s all;
            padding: 0;
            width: 100%;
            &.selected,
            &:focus,
            &:hover{
                .nav-link{
                    background: rgba(77,92,109,.1);
                    color: var(--primary-color);
                }
            }
        }
        .nav-link{
            border: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0;
            padding: 10px 15px;
            color: var(--typo);
            font-size: 14px;
            line-height: 2;
            border-radius: 0;
            width: 100%;
            background: transparent;
            box-shadow: none;
            justify-content: flex-start;
            &.selected{
                background: rgba(77,92,109,.1);
                color: var(--primary-color);
            }
            &:focus{
                outline: 0;
            }
            svg{
                height: 16px;
                width: 16px;
                margin-right: 10px;
            }
        }
        .badge-circle{
            height: 20px;
            width: 20px;
            font-size: 11px;
            font-weight: 600;
        }
    }
`
export const ProfileRight = styled.div`
    flex: 1;
    min-width: 1px;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    .meet-conatiner {
        width: 100%;
        padding: 30px 0;
        display: flex;
        flex-direction: column;
        .save-button {
            background-color: var(--primary-color);
            outline: 0;
            text-decoration: none;
            color: #fff;
            border-radius: 100px;
            min-height: 40px;
            padding: 10px 20px;
            font-weight: 500;
            font-size: 15px;
            text-transform: capitalize;
            width: 80px;
            margin: 0 auto;
        }
        .button-group {
          width: 100%;
          display: flex;
          margin: 50px 0 30px 0;
          justify-content: space-between;
          .previous {
            font-size: 15px;
            color: #fff;
            background: transparent;
            border: 0;
            outline: 0;
          }
          .finish {
            background: var(--primary-color);
            line-height: 1.3;
            border: 1px solid transparent;
            outline: 0;
            min-height: 40px;
            padding: 10px 20px;
            font-weight: 500;
            text-decoration: none;
            cursor: pointer;
            font-size: 15px;
            color: #fff;
            border-radius: 100px;
            width: 85px;
          }
        }
        .form-group {
          width: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          .alert {
            padding: 2px 10px;
            position: absolute;
            bottom: 9px;
            left: 0;
            font-size: 13px;
          }
          label {
            color: var(--primary-color);
            font-size: 14px;
            font-weight: 400;
            letter-spacing: -0.24px;
            line-height: 1;
            margin: 0 0 8px;
            cursor: pointer;
          }
          .textarea-tag {
            background-color: var(--white-color);
            display: inline-block;
            font-size: 15px;
            height: 50px;
            outline: 0;
            resize: none;
            vertical-align: middle;
            border: 1px solid var(--typo);
            border-radius: 3px;
            box-shadow: none;
            padding: 0 12px;
            margin: 0 0 25px;
            width: 100%;
            color: var(--typo) !important;
          }
          .input-tag {
            background-color: var(--white-color);
            display: inline-block;
            font-size: 15px;
            height: 40px;
            outline: 0;
            vertical-align: middle;
            border: 1px solid var(--typo);
            border-radius: 3px;
            box-shadow: none;
            padding: 0 12px;
            margin: 0 0 25px;
            width: 100%;
            color: var(--typo) !important;
          }
          .description {
            color: var(--typo);
            margin: 5px 0;
            font-size: 13px;
            a {
              color: var(--white-color);
            }
          }
          span {
            margin: 0 0 0 10px;
            font-size: 14px;
            font-weight: 400;
            color: var(--primary-color);
          }
          .custom-control {
            padding-left: 0 !important;
          }
        }
        h4 {
          margin: 0 0 25px 0;
          padding: 0;
          font-weight: 500;
          font-size: 1.125rem;
          line-height: 24px;
          color: var(--typo);
        }
        .allow-text {
          margin: 0 0 25px 0;
          padding: 0;
          display: flex;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          color: var(--typo);
          width: 100%;
        }
    }
    .formcheck-tag {
        margin: 10px 0 0 0;
        label {
            color: var(--primary-color);
        }
    }
    .custom-button-panel {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .delete-button {
            margin: 30px 0 30px 15px !important;
        }
    }
    .delete-button {
        background-color: var(--primary-color);
        width: 154px;
        outline: 0;
        height: 40px;
        margin: 50px auto 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        text-transform: capitalize;
        font-weight: 400;
        color: #ffffff;
    }
    .delete-section {
        width: 100%;
        display: flex;
        flex-direction: row;
        p {
            width: calc(100% - 40px);
            padding: 0 0 0 10px;
            font-size: 14px;
            color: var(--typo);
        }
        span {
            background-color: #EF3E46;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            em {
                width: 20px;
                height: 20px;
                border-radius: 100%;
                background: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-style: normal;
                color: #EF3E46;
            }
        }
    }
    .discussion-input-group {
        input {
            background-color: #1b1b1b;
            border: 1px solid #000000;
            color: #ffffff;
        }
        select {
            background-color: #1b1b1b;
            border: 1px solid #000000;
            color: #ffffff;
        }
    }
    .warning-section {
        width: 100%;
        display: flex;
        flex-direction: row;
        p {
            width: calc(100% - 40px);
            padding: 0 0 0 10px;
            font-size: 14px;
            color: var(--typo);
        }
        span {
            background-color: var(--primary-color);
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            em {
                width: 20px;
                height: 20px;
                border-radius: 100%;
                background: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-style: normal;
                color: var(--primary-color);
            }
        }
    }
    .form-group{
        .group-checkbox{
            margin-top:20px;
            .group-checkbox-label{
                color:  var(--primary-color);
                }
        }
    }
    .button-color{
        &:hover {
            color: #ffff;
          }
    }
    .itemBody{
        padding: 20px;
        width: 100%;
        .optional-form-panel {
            input {
                background-color: #1b1b1b;
                border: 1px solid #000000;
                color: #ffffff;
            }
            select {
                background-color: #1b1b1b;
                border: 1px solid #000000;
                color: #ffffff;
            }
        }
        .manage-invite-panel {
            width: 100%;
            display: flex;
            flex-direction: row;
            margin-bottom: 30px;
            align-items: center;
            background: #ffffff;
            border: 1px solid #e7e9ec;
            border-bottom: 0;
            margin: 0;
            padding: 15px 20px;
            border-radius: 3px 3px 0 0;
            &:last-child {
                border-radius: 0 0 3px 3px;
            }
            .left-panel {
                width: 60%;
                display: flex;
                flex-direction: row;
                .image-tag {
                    border-radius: 100%;
                    width: 50px;
                    height: 50px;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 100%;
                    }
                }
                .info-panel {
                    width: calc(100% - 81px);
                    display: flex;
                    flex-direction: column;
                    padding: 0 0 0 15px;
                    .main-tag {
                        font-size: 1.25rem;
                        line-height: 28px;
                        cursor: pointer;
                        color: #000000;
                        &:hover {
                            color: #eb1e79;
                        }
                    }
                    .time-by {
                        display: block;
                        font-size: 13px;
                        font-weight: 400;
                        color: #A3A5A9;
                        padding: 6px 0 0 0;
                    }
                    .message-by {
                        font-size: 12px;
                        color: #A3A5A9;
                        font-style: italic;
                        padding: 6px 0 0 0;
                    }
                    .invited-by {
                        font-size: 12px;
                        color: #A3A5A9;
                        a {  
                            font-size: 13px;
                            padding: 0 0 0 7px;
                            color: #ffffff;
                            cursor: pointer;
                            &:hover {
                                color: #eb1e79;
                            }
                        }
                    }
                }
            }
            .right-panel {
                width: 40%;
                display: flex;
                button {
                    height: 30px;
                    min-width: 130px;
                    border-radius: 22px;
                    background: #000000;
                    border: 1px solid #000000;
                    padding: 0 10px;
                    font-size: 12px;
                    text-transform: capitalize;
                    font-weight: 500;
                    color: #eb1e79;
                }
            }
        }
        .profile-text-editor {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            .post-button {
                height: 34px;
                padding: 0 20px;
                color: #fff;
                background-color: #eb1e79;
                border-color: #eb1e79;
                font-size: 14px;
                font-weight: 400;
                text-transform: capitalize;
                border-radius: 30px;
                outline: 0;
            }
            .cancel-button {
                min-height: 34px;
                border-radius: 100px;
                text-transform: initial;
                font-size: 14px;
                font-weight: 400;
                outline: 0;
                background: transparent;
                border: 0;
                color: #a3a5a9;
                margin: 0 10px;
                padding: 0 10px;
                width: auto;
                box-shadow: none;
            }
        }
        .invite-section {
            width: 100%;
            display: flex;
            border-top: 1px solid #e7e9ec;
            border-radius: 4px;
            flex-direction: row;
            margin-bottom: 40px;
            .inner-section {
              border-right: 1px solid #e7e9ec;
              width: 50%;
              display: column;
              position: relative;
              &:last-child {
                border-right: 0 solid #e7e9ec;
              }
              .inner-button-panel {
                position: absolute;
                bottom: 20px;
                right: 10px;
                button {
                  min-width: 75px;
                  height: 34px;
                  background: var(--primary-color);
                  border-radius: 20px;
                  color: #ffffff;
                  font-size: 12px;
                  outline: 0;
                  margin: 0 10px 0 0;
                  border: 1px solid var(--primary-color);
                  padding: 0;
                }
              }
              .panel-tag {
                position: relative;
                border-bottom: 1px solid #e7e9ec;
                padding: 15px 20px;
                line-height: 1.4;
                font-size: 18px;
                font-weight: 500;
                .checkbox-panel{
                  position: absolute;
                  top: 15px;
                  right: 20px;
                }
              }
              .customize-panel {
                .message-length{
                  text-align: end;
                  font-size: 12px;
                }
                width: 100%;
                display: flex;
                padding: 20px;
                flex-direction: column;
                .alert {
                  margin: 0 0 60px 0;
                }
                textarea {
                  font-size: 14px;
                  color: #ffffff;
                  width: 100%;
                  display: flex;
                  height: 260px;
                  border: 0;
                  resize: none;
                  background: transparent;
                }
              }
              .select-invite-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                padding: 20px;
                border-bottom: 1px solid #e7e9ec;
                .invite-name-panel {
                  width: 100%;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  span {
                    background-color: #4d5c6d;
                    width: auto;
                    display: flex;
                    height: 28px;
                    padding: 0 35px 0 10px;
                    color: #ffffff;
                    font-size: 12px;
                    align-items: center;
                    border-radius: 5px;
                    position: relative;
                    margin: 0 10px 10px 0;
                    em {
                      position: absolute;
                      top: 6px;
                      right: 8px;
                      width: 15px;
                      height: 15px;
                      border-radius: 100%;
                      background-color: #ffffff;
                      color: #4d5c6d;
                      cursor: pointer;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 19px;
                      font-style: normal;
                      transform: rotate(45deg);
                    }
                  }
                }
              }
              .select-members-panel {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin: 0 0 15px 0;
                .info-tag {
                  margin-right: 10px;
                  background-color: var(--primary-color);
                  width: 40px;
                  height: 42px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  span {
                    width: 21px;
                    height: 21px;
                    border-radius: 100%;
                    background: #ffffff;
                    font-size: 12px;
                    color: var(--primary-color);
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    display: flex;
                  }
                }
                .text-tag {
                  width: calc(100% - 50px);
                  display: flex;
                  font-size: 14px;
                  line-height: 1.5;
                }
              }
              .invite-search {
                padding: 20px;
                input {
                  color: #ffffff;
                  font-size: 13px;
                  height: 40px;
                  outline: 0;
                  vertical-align: middle;
                  background-color: transparent;
                  border: 1px solid #dedfe2;
                  border-radius: 30px;
                  box-shadow: none;
                  outline: none;
                  padding: 0 12px;
                  width: 100%;
                }
              }
              .members-outer-panel {
                width: 100%;
                display: flex;
                max-height: 500px;
                min-height: auto;
                overflow-y: auto;
                flex-direction: column;
              }
              .members-list-panel {
                width: 100%;
                display: flex;
                flex-direction: column;
                ul {
                  padding: 0 0 15px 0;
                  margin: 0;
                  li {
                    padding: 8px 20px;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    position: relative;
                    .item-avatar {
                      width: 45px;
                      height: 45px;
                      display: flex;
                      border-radius: 100%;
                      margin-right: 15px;
                      background: #333365;
                      img {
                        border-radius: 100%;
                        width: 45px;
                        height: 45px;
                        border: 1px solid #dedfe2;
                      }
                    }
                    .list-title {
                      font-size: 15px;
                      font-weight: 400;
                      margin: 0 auto;
                      width: calc(100% - 60px);
                      display: flex;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      padding: 0 80px 0 0;
                      position: relative;
                      cursor: pointer;
                      height: 36px;
                      align-items: center;
                      span {
                        width: 96%;
                        display: block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      }
                      &:hover {
                        color: var(--primary-color);
                      }
                      button {
                        color: var(--primary-color);
                        border: 1px solid #eee;
                        width: auto;
                        font-size: 13px;
                        padding: 0 .8rem;
                        height: 26px;
                        border-radius: 100px;
                        background: transparent;
                        position: absolute;
                        right: 0;
                        top: 6px;
                        text-transform: capitalize;
                      }
                      .plus-icon {
                        position: absolute;
                        right: 3px;
                        bottom: -7px;
                        font-size: 24px;
                        color: #ffffff;
                      }
                    }
                  }
                }
              }
            }
        }
        .item-body-inner{
            width: 100%;
            .album-info-conatiner {
                width: 100%;
                display: flex;
                justify-content: space-between;
                .button-panel {
                    width: 100%;
                    display: flex;
                    margin: 30px 0;
                    justify-content: space-between;
                    .button-section {
                        flex-direction: row;
                        button {
                            margin: 0 10px 0 0;
                        }
                        .form-control {
                            background-color: #1b1b1b;
                            border: 1px solid #000000;
                            font-size: 14px;
                            color: #ffffff !important;
                            height: 36px;
                            padding: 0 10px;
                            outline: 0;
                        }
                    }
                }
            }
            .album-wrapper {
                width: auto;
                display: flex;
                flex-direction: row;
                position: relative;
                margin: 0 0 15px 0;
                input {
                    background-color: #1b1b1b;
                    border: 1px solid #000000;
                    width: 192px;
                    margin: 0 15px 0 0;
                    color: #ffffff;
                }
                h2 {
                    margin: 0 15px 0 0;
                }
                .back-button {
                    position: absolute;
                    right: 0;
                    top: 0;
                }
                .album-name-edit-panel {
                    width: auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    .alert {
                        position: absolute;
                        left: 0;
                        top: 52px;
                        padding: 6px 30px 6px 10px;
                        button {
                            position: absolute;
                            right: 5px;
                            top: 18px;
                        }
                    }
                }
            }
            .group-margin{
                margin-bottom: 20px;
            }
            .button-right-container{
                text-align: right;
                margin-bottom: 10px;
            }
            .group-invite-panel {
                font-size: 20px;
                font-weight: 400;
                margin-bottom: 40px;
            }
            .community-invite-panel {
                width: 100%;
                display: flex;
                flex-direction: row;
                margin-bottom: 30px;
                align-items: center;
                .left-panel {
                    width: 60%;
                    display: flex;
                    flex-direction: row;
                    .image-tag {
                        border: 3px solid #fff;
                        box-shadow: 0 2px 5px 0 rgb(18 43 70 / 12%), 0 0 0 1px #e7e9ec;
                        border-radius: 3px;
                        width: 81px;
                        height: 81px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .info-panel {
                        width: calc(100% - 81px);
                        display: flex;
                        flex-direction: column;
                        padding: 0 0 0 15px;
                        .main-tag {
                            font-size: 18px;
                            cursor: pointer;
                            color: var(--typo);
                            &:hover {
                                color: #eb1e79;
                            }
                        }
                        .time-by {
                            font-size: 10px;
                            color: #A3A5A9;
                        }
                        .message-by {
                            font-size: 12px;
                            color: #A3A5A9;
                            font-style: italic;
                            padding: 6px 0 0 0;
                        }
                        .invited-by {
                            font-size: 12px;
                            color: #A3A5A9;
                            a {  
                                font-size: 13px;
                                padding: 0 0 0 7px;
                                color: #ffffff;
                                cursor: pointer;
                                &:hover {
                                    color: #eb1e79;
                                }
                            }
                        }
                    }
                }
                .right-panel {
                    width: 40%;
                    display: flex;
                    button {
                        height: 30px;
                        min-width: 130px;
                        border-radius: 22px;
                        background: transparent;
                        border: 1px solid #ffffff;
                        padding: 0 10px;
                        font-size: 12px;
                        text-transform: capitalize;
                        font-weight: 500;
                        color: #eb1e79;
                    }
                }
            }
        }
        .h4{
            font-weight: 500;
            font-size: 22px;
            line-height: 1.1;
            margin: 0 0 1.6875rem;
        }
        .page-title{
            font-size: 1.5rem;
            line-height: 32px;
            margin: 0;
        }
    }
    .btn-outline-primary{
        background: transparent !important;
        display: inline-block;
        text-transform: initial;
        padding: 6px 20px;
        border-radius: 100px;
        font-size: 14px;
        color: var(--primary-color);
        border-color: var(--primary-color);
        &:hover,
        &:focus,
        &:active{
            background: var(--primary-color) !important;
            color: #fff;
            border-color: var(--primary-color);
        }
        svg{
            height: 18px;
            width: 18px;
            margin-right: 5px;
        }
    }
`
export const BiographyContainer = styled.div`
    width: 100%;
`
export const BiographyHeading = styled.h3`
    font-size: 18px;
    margin-bottom: 20px;
`
export const BiographyList = styled.div`
    display: flex;
    align-items: center;
    span{
        padding: 0 25px 12px 0;
        font-size: 14px;
        font-weight: 400;
        width: 50%;
        max-width: 200px;
        color: var(--typo);
        &:first-of-type{
            color: #A3A5A9;
        }
    }
`

