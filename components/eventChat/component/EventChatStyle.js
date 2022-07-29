import styled from '@emotion/styled'

export const WrapperEventChat = styled.section`
  display: flex;
  flex-wrap: wrap;
`

export const EventChatContainer = styled.div`
  width: 100%;
  position: relative;

  @media (min-width: 992px) {
    width: 320px;
    position: fixed;
  }
  
  p {
    margin: 0;
  }

  // container chat
  .str-chat__main-panel {
    padding: 0 !important;
    border-left: 1px solid #f42f89;
    border-right: 1px solid #f42f89;
    border-top: 1px solid #f42f89;
    border-bottom: 1px solid #f42f89;
  }

  .str-chat__list {
    background-color: transparent;
    padding: 0 !important;
  }

  .messaging.str-chat .str-chat__list {
    background: #000;
  }

  .str-chat__date-separator {
    display: none;
  }

  .str-chat-channel {
    height: calc(100vh - 80px);
  }

  .str-chat__ul{
    padding-top: 10px;
  }

  .str-chat-channel .str-chat__container .str-chat__main-panel {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1 1;
  }

  .custom-message__wrapper {
    display: flex;
    flex-direction: column;
    padding: 6px 10px 4px;

    &:hover {
      background: #000;
    }

    &:hover .custom-message__actions-wrapper {
      opacity: 1;
    }

    .custom-message__content {
      > svg {
        float: left;
        margin-right: 4px;
      }

      > .timestamp {
        display: none;
        font-family: Helvetica Neue, sans-serif;
        font-size: 11px;
        line-height: 13px;
        color: #858688;
        mix-blend-mode: normal;
        margin-right: 4px;
        position: relative;
        bottom: 2px;
      }

      > .message-owner {
        display: inline;
        margin-right: 4px;
        font-family: Helvetica Neue, sans-serif;
        font-weight: bold;
        font-size: 13px;
        min-width: fit-content;
        position: relative;
        bottom: 2px;
      }

      > .message {
        display: inline;
        font-family: Helvetica Neue, sans-serif;
        font-size: 13px;
        color: #fff;
        mix-blend-mode: normal;
        position: relative;
        bottom: 2px;
      }
    }
  }

  // channel footer
  .channel-footer {
    background: #000;
    border-top: 1px solid #f42f89;
    display: flex;
    padding: 1rem;

    .str-chat__textarea {
      padding: 0;
      background: none;

      textarea {
        background: #000;
        border-color: #f42f89;
        max-height: 58px;
        color: #fff;
      }
    }

    .str-chat__input-footer {
      display: none;
    }

    .str-chat__input--emojipicker {
      z-index: 1;
      bottom: 131px;
      margin-right: 17px;

      > section {
        width: 285px !important;
        background: #000;
        border-color: #f42f89;
        border-radius: 16px;

        .emoji-mart-category-label span {
          background: none;
          color: #000;
        }

        .emoji-mart-search input {
          border-color: #f42f89;
        }

        .emoji-mart-bar {
          border: none;
        }

        li:hover span {
          cursor: pointer;
        }

        button:hover {
          background: none;
          cursor: pointer;
        }
      }
    }

    > .channel-footer__top {
      position: relative;
      display: flex;
      align-items: center;
      width: 85%;

      > div > svg {
        position: absolute;
        bottom: 1.5rem;
        right: 0.75rem;

        &:hover {
          fill-opacity: 1;
        }
      }
    }

    > .channel-footer__bottom {
        width: 15%;

      > .watcher-count {
        align-items: center;
        background: #f42f89;
        border: none;
        border-radius: 0.5rem;
        color: #000;
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        height: 2.5rem;
        width: 4rem;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background: #0d47d9;
        }

        > p {
          font-size: 0.75rem;
        }
      }

      > .typing-indicators {
        align-items: center;
        display: flex;

        > .indicators {
          display: flex;
          margin-right: 0.25rem;

          > .dot {
            animation: chat 1s infinite;
            background: #000;
            border-radius: 50%;
            height: 0.25rem;
            margin-right: 0.25rem;
            transition: all 1s;
            width: 0.25rem;
          }
        }

        > p {
          color: rgba(0 0 0 0.5);
          font-size: 0.75rem;
        }
      }

      > button.btn {
        cursor: pointer;
        height: 58px;
        transition: all 0.2s;

        &:hover path {
          fill: #000;
        }
      }

      /* > button.text {
        background: #0d47d9;
      } */
    }
  }

  .str-chat__textarea textarea:focus{
    box-shadow: #e0116d;
  }

  // message action wrapper
  .custom-message__actions-wrapper {
    position: absolute;
    right: 4px;
    top: 4px;
    opacity: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 25px;
    width: 86px;
    background: #f42f89;
    border: 1px solid #f42f89;
    border-radius: 99999px;

    > svg {
      cursor: pointer;

      &:hover path {
        fill-opacity: 1;
      }
    }
  }

  .str-chat__li--middle {
    margin: 0;
  }

  .str-chat__li--single,
  .str-chat__li--top,
  .str-chat__li--bottom {
    margin: 0;
  }

  .custom-message__bottom-wrapper {
    display: flex;
    align-items: center;
    margin-top: 4px;
  }

  .custom-message__reaction-list {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid #eb1e79;
    background: #000;

    border-radius: 20px;
    border-top-left-radius: 0;
    width: fit-content;
    max-width: 100px;
    height: 20px;
    padding-right: 8px;
    margin-right: 8px;

    > svg {
      margin: 0 6px;
    }

    > p {
      display: inline;
      font-family: Helvetica Neue, sans-serif;
      font-size: 12px;
      color: #fff;
    }
  }

  .custom-message__reply-count {
    font-family: Helvetica Neue, sans-serif;
    font-size: 12px;
    color: #fff;
    height: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid #eb1e79;
    box-sizing: border-box;
    border-radius: 0px 10px 10px 10px;
    padding: 0 8px;
    background: #000;
  }
  .str-chat-channel .str-chat__container{
    background: #000;
  }
  .messaging.str-chat .str-chat__thread {
    position: absolute;
    margin: 0;
    border-radius: 0;
    width: 320px;
    max-width: 320px;
    transition: all 1s;
    animation: slideRight 1s forwards;
    background: $background;

    .str-chat__thread-list {
      padding: 0;

      > div:first-of-type {
        border-bottom: 1px solid $border-color;
      }

      .custom-message__bottom-wrapper {
        display: none;
      }
    }

    .str-chat__thread-list .custom-message__actions-wrapper,
    .custom-message__reaction-list,
    .str-chat__thread-start {
      display: none;
    }

    .thread-header__wrapper {
      height: 3.75rem;
      background-color: $component-background;
      border-bottom: 1px solid $border-color;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;

      > svg {
        cursor: pointer;
        position: absolute;
        left: 10px;
      }

      > svg:first-of-type:hover path:first-of-type {
        fill: $button-background-hover;
      }

      > p {
        font-family: Helvetica Neue, sans-serif;
        font-weight: bold;
        font-size: 15px;
        line-height: 24px;
        color: #ffffff;
      }
    }

    .channel-footer {
      border-bottom: 1px solid $border-color;
      align-items: center;
      flex-direction: row;

      > .channel-footer__top {
        width: 100%;
        height: 41px;
        margin-right: 10px;
      }

      > .channel-footer__bottom {
        margin-top: 0;
        margin-bottom: 2px;

        > .watcher-count {
          display: none;
        }
      }
    }
  }
  .custom-message__wrapper, .thread-header__wrapper{
    background-color: #000;
  }
  .messaging.str-chat .str-chat__list .str-chat__reverse-infinite-scroll{
    padding-top: 0;
  }
`
