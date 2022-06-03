import { css } from '@emotion/core'

export const wcfmAddPanel = css`
  .wcfm_add_panel {
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    @media (min-width: 992px) {
      padding: 20px;
    }
  }
  .wcfm_general_fields {
    display: flex;
    width: 100%;
    flex-direction: column;
    @media (min-width: 992px) {
      padding: 0 15px 0 0;
      width: 70%;
    }
    .wcfm-col-12 {
      display: flex;
      width: 100%;
      margin-bottom: 20px;
      .date-tag {
        text-decoration: underline;
        cursor: pointer;
        color: var(--primary-color);
        font-style: italic;
      }
      .wcfm-col-full {
        width: 100%;
        display: flex;
        flex-direction: column;
        .text-tag {
          width: 100%;
          margin-bottom: 10px;
          @media (min-width: 992px) {
            width: 40%;
          }
          display: flex;
          font-size: 14px;
          color: var(--typo);
          font-style: italic;
        }
        .full-input-tag {
          width: 100% !important;
        }
        .input-row {
          flex-direction: row !important;
          .input-box {
            width: calc(100% / 3);
            padding: 0 5px;
          }
          .select-box {
            padding: 0 5px;
            width: calc(100% / 3);
          }
        }
        .checkbox-wrapper {
          width: 100%;
          display: flex;
          .custom-checkbox {
            width: calc(100% / 5);
            justify-content: center;
            align-items: center;
            display: flex;
            margin: 0;
            padding: 0;
            flex-direction: column;
            position: relative;
            em {
              margin: 28px 0 0 -43px;
              font-size: 13px;
            }
            input {
              position: absolute;
              cursor: pointer;
              width: 100%;
              left: 21px;
              top: 3px;
              z-index: 9;
              height: 20px;
            }
          }
        }
        .input-tag {
          width: 100%;
          display: flex;
          flex-direction: column;
          span {
            font-size: 11px;
            font-style: italic;
            width: 100%;
            display: flex;
            padding-top: 2px;
            justify-content: flex-end;
            text-decoration: underline;
            cursor: pointer;
            color: var(--primary-color);
            font-style: italic;
          }
        }
      }
      .wcfm-col-6 {
        width: 50%;
        display: flex;
        padding: 0 10px 0 0;
        .text-tag {
          width: 40%;
          display: flex;
          font-size: 14px;
          color: var(--typo);
          font-style: italic;
          align-items: center;
        }
        .input-tag {
          width: 60%;
          display: flex;
        }
      }
      input {
        padding: 8px 10px;
        background: var(--dark-color);
        width: 100%;
        border-radius: 3px;
        margin-right: 0;
        font-size: 13px;
        display: inline-block;
        line-height: 18px;
        height: 40px;
        outline: 0;
        border: 1px solid var(--white-color);
        color: var(--typo);
      }
      select {
        padding: 8px 10px;
        background: var(--dark-color);
        width: 100%;
        border-radius: 3px;
        margin-right: 0;
        font-size: 13px;
        display: inline-block;
        line-height: 18px;
        height: 40px;
        outline: 0;
        border: 1px solid #ccc;
        color: var(--typo);
      }
    }
  }
  .wcfm_gallery_fields {
    display: flex;
    padding: 0 0 0 15px;
    flex-direction: column;
    @media (min-width: 992px) {
      width: 30%;
    }
    .product-feature-upload {
      vertical-align: top;
      width: 200px;
      text-align: center;
      border-radius: 3px;
      display: block;
      position: relative;
      margin: 0 auto;
      @media (max-width: 991px) {
        margin: 20px;
      }
      &:hover {
        .edit-avatar-icon {
          display: block;
        }
        .edit-photo-icon {
          display: block;
        }
      }
      .upload-photo-icon {
        width: 30px;
        height: 30px;
        display: block;
        position: absolute;
        top: 10px;
        left: 10px;
        background: #ffffff;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
        top: 85px;
        left: 85px;
        svg {
          color: var(--primary-color);
          width: 16px;
          top: 2px;
          position: relative;
          left: 1px;
        }
        .tooltip-panel {
          min-width: 155px;
          display: block;
          height: 28px;
          background: #ffffff;
          bottom: 100%;
          border-radius: 5px;
          font-size: 12px;
          color: var(--primary-color);
          left: -56px;
          margin-bottom: 11px;
          transform: translate(0, 10px);
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
      .edit-photo-icon {
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
        top: 85px;
        left: 85px;
        svg {
          color: var(--primary-color);
          width: 16px;
          top: 2px;
          position: relative;
          left: 1px;
        }
        &:hover {
          .tooltip-panel {
            display: block;
          }
        }
        .tooltip-panel {
          min-width: 155px;
          display: none;
          height: 28px;
          background: #ffffff;
          bottom: 100%;
          border-radius: 5px;
          font-size: 12px;
          color: var(--primary-color);
          left: -56px;
          margin-bottom: 11px;
          transform: translate(0, 10px);
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
        top: 85px;
        left: 85px;
        svg {
          color: var(--primary-color);
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
          min-width: 160px;
          display: none;
          height: 28px;
          background: #ffffff;
          bottom: 100%;
          border-radius: 5px;
          font-size: 12px;
          color: var(--primary-color);
          left: -60px;
          margin-bottom: 11px;
          transform: translate(0, 10px);
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
      .spinner {
        position: absolute;
        top: 95px;
        left: 90px;
      }
      .cancel-btn {
        position: absolute;
        left: 4px;
        top: 3px;
        padding: 0;
        border-radius: 100%;
        font-size: 20px;
        font-weight: 400;
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transform: rotate(45deg);
      }
      img {
        width: 200px;
        min-height: 200px;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-right: 0px;
        cursor: pointer;
      }
    }
  }
  .price-input {
    flex-direction: column;
  }
  .price-input .text-tag {
    width: 100% !important;
  }
  .price-input .input-tag {
    width: 100% !important;
  }
  .wcfm-col-6.price-input:nth-last-of-type(1) {
    padding: 0 !important;
  }
  .wfcm-download-panel {
    @media (min-width: 992px) {
      padding: 0 20px 30px 20px;
    }
  }
  @media (max-width: 991px) {
    .wfcm-download-panel {
      .col-file-12 {
        flex-direction: column;
      }
      .input-tag {
        width: 100% !important;
      }
    }
  }
`
