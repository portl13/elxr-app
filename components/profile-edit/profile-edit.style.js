import { css } from '@emotion/core'

export const DropZoneStyle = css`
  padding: 0 0 2rem;
  .box {
    display: inline-block;
    padding: 10px;
    box-sizing: border-box;
  }
  .img-preview {
    overflow: hidden;
  }
  .loading-container {
    width: 100%;
    height: 13px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
  }
  .dropzone {
    background: rgba(240, 243, 247, 0.5);
    border: 1px dashed #dedfe2;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    outline: none;
    outline-color: currentcolor;
    transition: border 0.24s ease-in-out;
    justify-content: center;
  }
  .dropzone p {
    margin: 0;
    padding: 0;
    font-size: 16px;
    color: #122b46;
    line-height: 26px;
  }
  .profile-image-cropper {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: 0 0 40px 0;
    .cropper-modal {
      border: 1px solid #ffffff;
    }
    .cropper-container {
      margin: 0 20px 0 0;
    }
    .img-preview {
      border: 1px solid #ffffff;
      /* width: 200px !important;
      height: 200px !important; */
    }
    .button-section {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 15px 0 0 0;
      .btn-primary {
        font-size: 12px;
        padding: 7px 6px;
      }
    }
  }
  .progress-bar-div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .progress {
      width: 200px;
      height: 20px;
    }
  }
  .file-info {
    font-size: 14px;
    line-height: 1.7;
    color: #ffffff;
    padding: 0 0 10px;
    margin: 0 0 20px;
    svg {
      height: 20px;
      width: 20px;
      margin-right: 10px;
      color: var(--primary-color);
    }
  }
  .cancel-button {
    background: transparent;
    color: #eb1e79;
    border: 0;
    font-size: 14px;
    padding: 0 21px;
  }
  .take-photo-panel {
    width: 100%;
    display: flex;
    flex-direction: column;
    .upper-section {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: end;
      margin: 0 0 5px 0;
      .photo-panel {
        width: 402px;
        height: 302px;
        display: flex;
        border: 1px solid #ffffff;
        margin: 0 50px 0 0;
      }
      .capture-panel {
        width: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .capture-section {
          width: 120px;
          height: 120px;
          display: flex;
          border-radius: 100%;
          margin-bottom: 10px;
          border: 1px dashed #ffffff;
          img {
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
        }
        .button-section {
          width: 100%;
          display: flex;
          flex-direction: row;
          button {
            width: auto;
            height: 30px;
            display: flex;
            font-size: 12px;
            color: #ffffff;
            background: transparent;
            border: 1px solid #ffffff;
            border-radius: 15px;
            padding: 4px 16px;
            margin: 0 5px 0 0;
          }
        }
      }
    }
  }
  .tabbing-section {
    width: 100%;
    display: flex;
    ul {
      display: flex;
      padding: 0;
      margin: 0;
      li {
        padding: 0 20px 20px 0;
        color: #ffffff;
        font-size: 12px;
        line-height: 2;
        list-style: none;
        cursor: pointer;
        &:hover {
          color: var(--primary-color);
        }
        &.active {
          color: var(--primary-color);
        }
      }
    }
  }
  .btn-default {
    margin-top: 10px;
    border-radius: 100px;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    text-transform: initial;
  }
  .alert {
    display: block;
    font-size: 85%;
    margin: 1em 0;
    position: relative;
    padding: 10px 15px;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 4px;
    &-warning {
      color: #856404;
      background-color: #fff3cd;
      border-color: #ffeeba;
    }
  }
  .btn-text {
    color: #fff;
    font-size: 14px;
    padding: 12px 25px;
    font-weight: 500;
    text-transform: initial;
    &:hover {
      color: #fff;
    }
  }
`

export const CloseButton = css`
  position: absolute;
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
  line-height: 0;
  right: -9px;
  top: -2px;
`

export const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
}

export const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
  position: 'relative',
}

export const thumbCover = {
  display: 'table',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
  position: 'relative',
}

export const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  maxWidth: 250,
}

export const thumbImg = {
  display: 'block',
  width: 'auto',
}

export const activeStyle = {
  borderColor: '#eb1e79',
}

export const acceptStyle = {
  borderColor: '#eb1e79',
}

export const rejectStyle = {
  borderColor: '#ff1744',
}
