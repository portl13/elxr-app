import styled from '@emotion/styled'
export const NodeChatContainer = styled.div`
  list-style-type: none;
  margin: 0;
  // padding: 0;
  // width: 100%;
  background-color: #000;
  // position: absolute;
  // height: calc(100% - 70px);
  padding: inherit;
  // left: 0;
  height: calc(100vh - 104px);
  
  min-width: 340px;
  max-width: 340px;
  position: fixed;
  left: calc(100vw - 30px);
  transform: translateX(-100%);

/*  border-left: 1px solid #f42f89;
  border-right: 1px solid #f42f89;
  border-top: 1px solid #f42f89;
  border-bottom: 1px solid #f42f89;*/

  @media (min-width: 992px) {
  }
  

  p {
    margin: 0;
  }
  
  .chat-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    padding-top: 38px;
    padding-bottom: 90px;
    padding-left: inherit;
    padding-right: inherit;
  }

  .chat-settings {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    opacity: 0.5;
    top: 30px;
    position: relative;
    transform: translateY(-50%);

    &:hover {
        opacity: 1;
      path {
        fill: #ff53a2
      }
    }
  }

  .renderSettingsBox {
    display: block;
    position: absolute;
    top: 0;
    transform: translateY(-100%);
    font-size:14px;
    padding: 10px;
    font-size: 14px;
    background-color: #202020;
    width: 100%;
    left: 0;
  }

  .saveChatSettings {
    float: right;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    justify-items: flex-end;
    align-content: flex-end;
    height: 37px;
    padding: 4px;
    padding-bottom: 0;
  }

  #message-form { 
    display: flex; 
    flex-direction:row; 
    position: absolute; 
    bottom: 0; width: 100%;
    padding: 1rem;
    background-color: #000;
    left: 0;

    .replyToBox {
      position: absolute;
      top: -36px;
      background-color: rgba(100,0,0,0.3);
      color: #fff;
      font-size: 12px;
      height: 36px;
      width: 100%;
      left: 0;
      padding: 6px 10px;
      border: 1px solid rgba(155,155,155,0.4);
      font-style: italic;

      svg {
        position: absolute;
        top:6px;
        right:6px;
        width:16px;
        height:16px;
      }
    }

    > #message-input { 
      background: #141414;
      max-height: 58px;
      color: #fff;
      resize: none;
      width:100%;
      border-radius: 90px;
      padding: 19px;
      font-size: 14px;


      &::-webkit-scrollbar {
        width: 0;
        background-color: transprent;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: transparent; 
      }

      &::-webkit-input-placeholder {
        font-weight: bold;
        color: #fff;
      }

      &::-moz-placeholder {
        font-weight: bold;
        color: #fff;
      }

      &::-ms-input-placeholder {
        font-weight: bold;
        color: #fff;
      }

      &:focus { outline: none; }
    }

    > button {
      margin-left:2px; 
      background: none;
      cursor: pointer;
      height: 58px;
      transition: all 0.2s;

      path {
        fill: rgb(131, 142, 171)
      }

      &:hover path {
        fill: #ff53a2;
      }
    }

    .emoji-icon {
      position: absolute;
      left: 230px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  #messages { 
    list-style-type: none; 
    margin: 0; 
    padding: 0; 
    height:100%; 
    overflow-y: auto;

    > li { 
      position: relative;
      padding: 0.5rem 1rem; 

      .message-text {

        svg {
          min-width:16px;
          max-width:16px;
        }
        
        .repliedTo {
            font-size: 12px;
        }
      }

      .message-owner {
        display: inline;
        font-family: Helvetica Neue, sans-serif;
        font-weight: bold;
        font-size: 14px;
        min-width: fit-content;
        position: relative;
        bottom: 2px;
      }

      .message {
        display: inline;
        font-family: Helvetica Neue, sans-serif;
        font-size: 14px;
        color: #fff;
        mix-blend-mode: normal;
        position: relative;
        bottom: 2px;
      }


      &:hover {
        background-color: rgba(255,255,255,0.13);
        .message-control {
          opacity: 1;
        }
      }


      &[data-mention="true"]{
        background-color: rgba(100,0,0,0.4);
      }
      
      .message-control {

        position: absolute;
        right: 4px;
        top: 4px;
        opacity: 0;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 25px;
        padding-left:4px;
        padding-right:4px;
        background: #f42f89;
        border: 1px solid #f42f89;
        border-radius: 2px;

        > svg {
          cursor: pointer;

          &:hover path {
            fill-opacity: 1;
          }
        }
      }
    }

  }
  
  .banned-state {
    position: absolute;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 16px;
    padding: 20px;
    text-align: center;
  }
  .sendIcon {width: 24px; height: auto; transform: translateY(-8px) rotate(45deg) translateX(4px);}
  .message-image {background-color: #f42f89; float: left; max-width: 38px; min-width: 38px; border: 1px solid #f42f89; margin-right: 8px; border-radius: 999px;}
  .message-image img {width: 100%; height: auto; }
  .message-container {float: none; position: relative; overflow: hidden; }
  .chat-header {
    font-size: 1.1em; border-bottom: 1px solid #fff; padding-bottom: 10px; color: #fff;
    margin-bottom: 10px;
  }
`