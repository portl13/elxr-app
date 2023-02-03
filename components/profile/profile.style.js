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
    color: var(--bg-font);
    border: 1px solid var(--bg-font);
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
.connection-detail-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .btnfollow {
      padding: 0 25px;
    }
    ul {
        display: none !important;
    }
}
.organiser-detail-panel {
    width: 100%;
    .connection-group-wrapper {
        justify-content: space-between;
        width: 100%;
        display: flex;
        .connection-text {
            width: auto;
            display: flex;
            align-items: center;
        }
    }
}
.item-header-content{
    @media(min-width:992px){
        margin-top: 25px;
    }
}
.item-header-avatar{
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: -90px;
    z-index: 2;
    margin-bottom: 20px;
    min-width: 180px;
    min-height: 180px;
    max-height: 180px;
    max-width: 180px;
    overflow: hidden;
    background-color:#555;
    border-radius: 4px;
    border: 1px solid #fff;
    /* box-shadow: 0 2px 5px 0 rgb(18 43 70 / 12%), 0 0 0 1px #e7e9ec; */
    @media(min-width:992px){
        margin: -40px 30px 5px 0;
    }
    &:hover {
        .edit-avatar-icon {
            display: block;
        }
    }
    .edit-avatar-icon {
        width: 30px;
        height: 30px;
        display: none;
        position: absolute;
        top: 10px;
        left: 10px;
        background: #ffffff;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
        top: 69px;
        left: 69px;
        svg {
            color: #eb1e79;
            width: 19px;
            top: 2px;
            position: relative;
            left: 2px;
        }
        &:hover {
            .tooltip-panel {
                display: block;
            }
        }
        .tooltip-panel {
            min-width: 150px;
            display: none;
            height: 28px;
            background: #ffffff;
            bottom: 100%;
            border-radius: 5px;
            font-size: 12px;
            color: #eb1e79;
            left: -58px;
            margin-bottom: 11px;
            transform: translate(0,10px);
            transform-origin: top;
            position: absolute;
            padding: 5px 10px;
            text-align: center;
            top: 30px;
            em {
                width: 0; 
                height: 0; 
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid #ffffff;
                position: absolute;
                top: -4px;
                left: 68px;
            }
        }
    }
}
.avatar.squared{
    max-width:180px;
    width:100%;
    display:block;
    height: auto;
    border-radius: 0;
}
.connection-group-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    h2 {
        flex: auto;
    }
    .badge-status {
        margin-bottom: 0;
        .badge-info {
            background-color: #eef0f3;
            border-radius: 100px;
            display: inline-block;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: .25px;
            color: rgba(77,92,109,.8);
            padding: 6px 12px;
            line-height: 1;
            margin: 0 6px 0 0;
            white-space: nowrap;
            width: 90px;
            height: 24px;
            align-items: center;
            justify-content: center;
            svg {
                width: 12px;
            }
        }
        .badge-danger {
            background-color: #eef0f3;
            border-radius: 100px;
            display: inline-block;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: .25px;
            color: rgba(77,92,109,.8);
            padding: 6px 12px;
            line-height: 1;
            margin: 0 6px 0 0;
            white-space: nowrap;
            width: 90px;
            height: 24px;
            align-items: center;
            justify-content: center;
            svg {
                width: 12px;
            }
        }
    }
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
    color: var(--bg-font);
    
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
.user-list-admins {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        li {
            margin: 0 10px 0 0;
            a {
                width: 30px;
                height: 30px;
                border-radius: 100%;
                border: 1px solid #ffffff;
                display: flex;
                cursor: pointer;
                position: relative;
                &:hover {
                    .tooltip-panel {
                      display: block;
                    }
                }
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                    object-fit: cover;
                }
                .tooltip-panel {
                    min-width: 100px;
                    display: none;
                    height: 30px;
                    background: var(--primary-color);
                    bottom: 100%;
                    border-radius: 5px;
                    font-size: 12px;
                    color: #ffffff;
                    left: -22px;
                    margin-bottom: 11px;
                    transform: translate(0,10px);
                    transform-origin: top;
                    position: absolute;
                    padding: 6px 10px;
                    text-align: center;
                    top: -49px;
                    em {
                      width: 0;
                      height: 0;
                      border-left: 5px solid transparent;
                      border-right: 5px solid transparent;
                      border-top: 5px solid var(--primary-color);
                      position: absolute;
                      top: 30px;
                      left: 32px;
                    }
                  }
            }
        }
    }
}
.generic-group-wrapper {
    display: flex;
    flex-direction: column;
    h4 {
        margin-bottom: 8px;
    }
    button {
        width: auto;
        padding: 0 25px;
        height: 30px;
    }
}
.generic-org-button {
    top: 28px !important;
}
.generic-connect-button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    button {
        font-size: 12px;
        text-transform: capitalize;
        font-weight: 300;
    }
    .message-tag {
        cursor: pointer;
        width: auto;
        display: flex;
        flex-direction: row;
        align-item: center;
        span {
            font-size: 12px;
            min-height: 30px;
            padding: 0 20px;
            line-height: 28px;
        }
        .dots-div {
            width: auto;
            display: flex;
            position: relative;
            cursor: pointer;
            &:hover {
                .tooltip-panel {
                  display: block;
                }
            }
            .more-action-list{
                position: absolute;
                top: 28px;
                right: 5px;
                background: #000;
                box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%), 0 6px 32px 0 rgb(18 43 70 / 10%);
                border-radius: 4px;
                width: 110px;
                z-index: 1;
                &::after{
                  content: " ";
                  position: absolute;
                  width: 0;
                  height: 0;
                  top: 5px;
                  margin: 0 auto;
                  right: 11px;
                  box-sizing: border-box;
                  border: 5px solid #000;
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
                  border-radius: 5px;
                  .main-tag {
                    margin: 0;
                    padding: 0;
                    list-style-type: none;
                  }
                }
                .item-link{
                  padding: 10px 5px;
                  display: block;
                  font-size: 13px;
                  line-height: 1;
                  color: #7f868f;
                  cursor: pointer;
                  text-align: left;
                  svg{
                    height: 12px;
                    display: inline-block;
                    margin-right: 10px;
                    width: 15px;
                  }
                  &:hover{
                    color: var(--primary-color);
                    svg {
                      color: var(--primary-color);
                    }
                  }
                }
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
                left: -78px;
                margin-bottom: 11px;
                transform: translate(0,10px);
                transform-origin: top;
                position: absolute;
                padding: 4px 10px;
                text-align: center;
                top: -31px;
                z-index: 9;
            }
            svg {
                color: #939597;
                width: 13px;
                margin: 0 10px 0 0;
            }
        }
    }
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
.badge-icon-danger{    
    color:rgb(217, 76, 97);
    margin-right: 5px;
}
.header-cover-image{
    height: 300px;
    width: 100vw;
    left: 50%;
    right: 50%;
    margin-left: -46vw;
    margin-right: -50vw;
    background-position: center center;
    background-color:#555;
    background-repeat:no-repeat;
    background-size:cover;
    display:block;
    padding:0;
    z-index:1;
    overflow:hidden;
    position: relative;
    @media (min-width: 992px) { 
        margin-left: -50vw;
    }
    .cancel-button {
        position: absolute;
        right: 162px;
        top: 0;
        background: #000000;
        border: 0;
        border-radius: 3px;
        font-size: 12px;
        color: #ffffff;
        padding: 4px 10px;
    }
    .save-changes-button {
        position: absolute;
        right: 235px;
        top: 0;
        background: #000000;
        border: 0;
        border-radius: 3px;
        font-size: 12px;
        color: #ffffff;
        padding: 4px 10px;
    }
    .drag-button {
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 119;
        top: 50%;
        color: #fff;
        background-color: rgba(134,132,132,.6);
        padding: 10px 15px;
        border-radius: 5px;
        pointer-events: none;
        border: 0;
        svg {
            font-size: 10px;
            width: 17px;
            margin: 0 10px 0 0;
        }
    }
    &:hover {
        .edit-avatar-icon {
            display: block;
            transition: all 0.15s ease;
        }
        .reposition-avatar-icon {
            display: block;
            transition: all 0.15s ease;
        }
    }
    .reposition-avatar-icon {
        width: 30px;
        height: 30px;
        display: none;
        position: absolute;
        background: #ffffff;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
        top: 55px;
        left: 175px;
        transition: all 0.15s ease;
        svg {
            color: #eb1e79;
            width: 19px;
            top: 2px;
            position: relative;
            left: 1px;
        }
        &:hover {
            .tooltip-panel {
                display: block;
                transition: all 0.15s ease;
            }
        }
        .tooltip-panel {
            min-width: 170px;
            display: none;
            height: 28px;
            background: #ffffff;
            bottom: 100%;
            border-radius: 5px;
            font-size: 12px;
            color: #eb1e79;
            left: 42px;
            margin-bottom: 11px;
            transform: translate(0,10px);
            transform-origin: top;
            position: absolute;
            padding: 5px 10px;
            text-align: center;
            top: -10px;
            transition: all 0.15s ease;
            em {
                width: 0; 
                height: 0; 
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-right: 5px solid #ffffff;
                position: absolute;
                top: 10px;
                left: -5px;
            }
        }
    }
    .edit-avatar-icon {
        width: 30px;
        height: 30px;
        display: none;
        position: absolute;
        top: 10px;
        left: 175px;
        background: #ffffff;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.15s ease;
        svg {
            color: #eb1e79;
            width: 19px;
            top: 2px;
            position: relative;
            left: 2px;
        }
        &:hover {
            .tooltip-panel {
                display: block;
                transition: all 0.15s ease;
            }
        }
        .tooltip-panel {
            min-width: 150px;
            display: none;
            height: 28px;
            background: #ffffff;
            bottom: 100%;
            border-radius: 5px;
            font-size: 12px;
            color: #eb1e79;
            left: 42px;
            margin-bottom: 11px;
            transform: translate(0,10px);
            transform-origin: top;
            position: absolute;
            padding: 5px 10px;
            text-align: center;
            top: -10px;
            transition: all 0.15s ease;
            em {
                width: 0; 
                height: 0; 
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-right: 5px solid #ffffff;
                position: absolute;
                top: 10px;
                left: -5px;
            }
        }
    }
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
    margin-top: 20px;
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
  flex-direction: column;
      padding-left: 15px;
      padding-right: 15px;
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
        h4 {
          font-size: 1.125rem;
          line-height: 24px;
          margin: 0 0 1.6875rem;
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
            background-color: #000000;
            display: inline-block;
            font-size: 15px;
            height: 50px;
            outline: 0;
            vertical-align: middle;
            border: 1px solid #dedfe2;
            border-radius: 3px;
            box-shadow: none;
            padding: 0 12px;
            margin: 0 0 25px;
            width: 100%;
            resize: none;
            color: #ffffff !important;
          }
          .input-tag {
            background-color: #000000;
            display: inline-block;
            font-size: 15px;
            height: 40px;
            outline: 0;
            vertical-align: middle;
            border: 1px solid #dedfe2;
            border-radius: 3px;
            box-shadow: none;
            padding: 0 12px;
            margin: 0 0 25px;
            width: 100%;
            color: #ffffff !important;
          }
          .description {
            color: #737373;
            margin: 5px 0;
            font-size: 13px;
            a {
              color: #ffffff;
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
          color: #ffffff;
        }
        .allow-text {
          margin: 0 0 25px 0;
          padding: 0;
          display: flex;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          color: #ffffff;
          width: 100%;
        }
    }
    .itemBody{
        padding: 0;
        width: 100%;
        @media (min-width: 992px) { 
            padding: 20px; 
        }
        .optional-form-panel {
            input {
                background-color: #1b1b1b;
                border: 1px solid #000000;
                color: #ffffff;
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
        .item-body-inner{
            width: 100%;
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

