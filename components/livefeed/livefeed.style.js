import { css } from '@emotion/core'
import styled from '@emotion/styled'

export const CommunityCardLivefeedStyle = css`
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 20px;
  position: relative;
  padding: 26px 0px;
  border-radius: 0px;
  background: linear-gradient(
    160deg,
    var(--bg-activity-feed-boxes-top-left) 0%,
    var(--bg-activity-feed-boxes-bottom-right) 60%
  );
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
  .activity-content {
    .video-stream {
      width: 100% !important;
      height: 100% !important;
    }
    .html5-video-player {
      width: 100% !important;
      height: 100% !important;
    }
  }
  .activity-header {
    position: relative;
    .dots-section {
      position: absolute;
      right: 15px;
      top: 0;
      width: 15px;
      cursor: pointer;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      svg {
        color: #939597;
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
        left: -108px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 4px 10px;
        text-align: center;
        top: -14px;
        z-index: 9;
      }
      .more-action-list {
        position: absolute;
        top: 31px;
        right: -15px;
        background: rgba(20, 23, 57, 1);
        box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%),
          0 6px 32px 0 rgb(18 43 70 / 10%);
        border-radius: 4px;
        width: 104px;
        z-index: 1;
        &:hover {
          .tooltip-panel {
            display: none;
          }
        }
        &::after {
          content: ' ';
          position: absolute;
          width: 0;
          height: 0;
          top: 0;
          margin: 0 auto;
          right: 8px;
          box-sizing: border-box;
          border: 6px solid rgba(20, 23, 57, 1);
          border-color: rgba(20, 23, 57, 1) rgba(20, 23, 57, 1) transparent
            transparent;
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
          .main-tag {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }
        }
        .item-link {
          padding: 6px 5px;
          display: block;
          font-size: 13px;
          line-height: 1;
          color: #7f868f;
          text-align: left;
          svg {
            height: 12px;
            display: inline-block;
            margin-right: 10px;
            width: 10px;
          }
          &:hover {
            color: var(--primary-color);
            svg {
              color: var(--primary-color);
            }
          }
        }
      }
    }
  }
  .multi-video-section {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    .video-grid {
      display: flex;
      padding: 3px;
      @media (min-width: 40rem) {
        //width: 50%;
      }
      @media (min-width: 56rem) {
        //width: 33.3333%;
      }
    }
  }
  .multi-photos-section {
    margin: 0 -3px 10px -3px;

    &.grid-5 {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 3px;
      .act-grid-1-1 {
        grid-area: 1 / 1 / 2 / 4;
      }
      .act-grid-1-2 {
        grid-area: 1 / 4 / 2 / 7;
      }
      .act-grid-1-3 {
        grid-area: 2 / 1 / 3 / 3;
      }
      .act-grid-1-4 {
        grid-area: 2 / 3 / 3 / 5;
      }
      .act-grid-1-5 {
        grid-area: 2 / 5 / 3 / 7;
      }
    }
    &.grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3px;
    }
    &.grid-3 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas: "main main"
                           "two three";
      gap: 3px;
      .act-grid-1-1 {
        grid-area: main;
      }
      .act-grid-1-1.ratio-1x1{
        --aspect-ratio: calc(9 / 16 * 100%);
      }
      .act-grid-1-1.bg-cover-feed{
        background-position: center !important;
      }
    }
    &.grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 3px;
      .act-grid-1-1 {
        grid-area: 1 / 1 / 2 / 3;
      }
      .act-grid-1-2 {
        grid-area: 1 / 3 / 2 / 5;
      }
      .act-grid-1-3 {
        grid-area: 2 / 1 / 3 / 3;
      }
      .act-grid-1-4 {
        grid-area: 2 / 3 / 3 / 5;
      }
      
    }
    .act-grid-1-1 {
      position: relative;
      cursor: pointer;
    }
    .bb-photos-length {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      height: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      font-size: 16px;
      flex-flow: row wrap;
      span {
        color: #fff;
        font-size: 28px;
        font-weight: 400;
        margin-bottom: 10px;
        em {
          display: block;
          font-style: normal;
          font-size: 17px;
        }
      }
    }
    .act-grid-1-1,
    .act-grid-1-2,
    .act-grid-1-3,
    .act-grid-1-4,
    .act-grid-1-5 {
      min-width: 0;
      position: relative;
      transition: 0.3s;
      cursor: pointer;
      .media-action {
        position: absolute;
        width: 24px;
        right: 15px;
        top: 21px;
        z-index: 9;
        margin: 0;
        opacity: 0;
        visibility: hidden;
        .popover {
          display: none;
        }
        &:hover {
          .more {
            .popover {
              width: 110px;
              display: block;
              transform: translate(-35%, -130%);
              left: -40px;
              &.bs-popover-top .arrow {
                margin: 0 0 0 78px;
              }
            }
          }
        }
        .has-tooltip {
          margin: 0;
        }
        .circle {
          height: 24px;
          width: 24px;
          padding: 4px;
          border: 1px solid #fff;
          background-color: transparent;
          color: #fff;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            height: 14px;
            width: 14px;
          }
        }
      }
      .more-action-list {
        position: absolute;
        top: 26px;
        right: 1px;
        background: #fff;
        box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%),
          0 6px 32px 0 rgb(18 43 70 / 10%);
        border-radius: 4px;
        width: 150px;
        z-index: 1;
        &::after {
          content: ' ';
          position: absolute;
          width: 0;
          height: 0;
          top: 0;
          margin: 0 auto;
          right: 8px;
          box-sizing: border-box;
          border: 6px solid #000;
          border-color: #fff #fff transparent transparent;
          transform-origin: 0 0;
          transform: rotate(-45deg);
          box-shadow: 2px -3px 3px 0 rgb(0 0 0 / 2%);
          z-index: 101;
          opacity: 1;
          visibility: visible;
          pointer-events: none;
        }
        ul {
          list-style: none;
          margin: 5px;
          padding: 0;
          li {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }
        }
        .item-link {
          padding: 10px 14px;
          display: block;
          font-size: 14px;
          line-height: 1;
          color: #7f868f;
          text-align: left;
          svg {
            height: 15px;
            display: inline-block;
            margin-right: 10px;
            width: 20px;
          }
          &:hover {
            color: var(--primary-color);
          }
        }
      }
      .hover-effect {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        display: none;
        transition: 0.3s;
      }
      &:hover,
      &.show {
        .hover-effect {
          display: block;
        }
        .media-action {
          opacity: 1;
          visibility: visible;
        }
      }
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
        object-fit: cover;
        border-radius: 3px;
      }
    }
  }
  .profile-count-ui {
    display: flex;
    flex-direction: row;
    margin: -20px 0 20px 0;
    .like-profile-panel {
      color: #555;
      font-size: 12px;
      margin: 18px 0 -12px 0;
      display: flex;
    }
    em {
      padding: 0 6px;
      margin: 12px 0 -12px 0;
    }
  }
  .activity-dots-icon {
    width: auto;
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 15px;
    top: 18px;
    cursor: pointer;
    span {
      width: 3px;
      height: 3px;
      border-radius: 100%;
      background-color: #939597;
      margin: 0 3px 0 0;
      cursor: pointer;
    }
  }
  .activity-post-container {
    width: 100%;
    background-color: #e3e6ea;
    min-height: 92px;
    border-radius: 3px;
    padding: 10px;
    svg {
      width: 30px;
      height: 30px;
    }
    p {
      color: #000000;
      padding: 10px 0 0 0;
    }
  }
  .activity-header-text {
    font-size: 14px;
    color: #7f868f;
    a {
      font-weight: 500;
      color: var(--bg-font);
      letter-spacing: -0.24px;
      &:hover {
        color: var(--primary-color);
      }
    }
  }
  .activity-avatar {
    margin-right: 5px;
    margin-left: 3px;
    height: 20px;
    width: 20px;
  }
  .item-avatar {
    min-width: 36px;
    min-height: 36px;
    margin-right: 15px;
    .avatar {
      width: 36px;
      height: 36px;
    }
  }
  p {
    margin-bottom: 15px;
    padding-left: 16px;
    padding-right: 16px;
    word-break: break-word;
    line-height: 1.5;
    font-size: 15px;
    color: var(--bg-font);
  }
  .media-activity .container {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .media-activity .react-multi-carousel-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .activity-buttons-action {
    margin-top: 15px;
    padding-bottom: 15px;
  }
  .social-panel {
    .share-link {
      margin-left: 20px;
    }
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .d-none {
    display: none;
  }
  .pleft45 {
    padding: 0 0 0 45px;
    .ac-reply-avatar {
      width: 28px !important;
      height: 28px !important;
      img {
        width: 28px !important;
        height: 28px !important;
      }
    }
  }
  .pleft65 {
    padding: 0 0 0 65px;
    .ac-reply-avatar {
      width: 28px !important;
      height: 28px !important;
      img {
        width: 28px !important;
        height: 28px !important;
      }
    }
  }
  .pleft85 {
    padding: 0 0 0 85px;
    .ac-reply-avatar {
      width: 28px !important;
      height: 28px !important;
      img {
        width: 28px !important;
        height: 28px !important;
      }
    }
  }
  .pleft105 {
    padding: 0 0 0 105px;
    .ac-reply-avatar {
      width: 28px !important;
      height: 28px !important;
      img {
        width: 28px !important;
        height: 28px !important;
      }
    }
  }
  .pleft125 {
    padding: 0 0 0 125px;
    .ac-reply-avatar {
      width: 28px !important;
      height: 28px !important;
      img {
        width: 28px !important;
        height: 28px !important;
      }
    }
  }
  .pleft25 {
    padding: 0 0 0 25px;
    .ac-reply-avatar {
      width: 28px !important;
      height: 28px !important;
      img {
        width: 28px !important;
        height: 28px !important;
      }
    }
  }
  .live-activity-container {
    .main-comment-box {
      align-items: flex-start !important;
      position: relative;
      .dots-section {
        position: absolute;
        right: 15px;
        top: 0;
        width: 15px;
        cursor: pointer;
        &:hover {
          .tooltip-panel {
            display: block;
          }
        }
        svg {
          color: #939597;
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
          left: -86px;
          margin-bottom: 11px;
          transform: translate(0, 10px);
          transform-origin: top;
          position: absolute;
          padding: 4px 10px;
          text-align: center;
          top: -30px;
          z-index: 9;
        }
        .more-action-list {
          position: absolute;
          top: 31px;
          right: -15px;
          background: rgba(20, 23, 57, 1);
          box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%),
            0 6px 32px 0 rgb(18 43 70 / 10%);
          border-radius: 4px;
          width: 104px;
          height: 36px;
          z-index: 1;
          &::after {
            content: ' ';
            position: absolute;
            width: 0;
            height: 0;
            top: 0;
            margin: 0 auto;
            right: 8px;
            box-sizing: border-box;
            border: 6px solid rgba(20, 23, 57, 1);
            border-color: rgba(20, 23, 57, 1) rgba(20, 23, 57, 1) transparent
              transparent;
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
            .main-tag {
              margin: 0;
              padding: 0;
              list-style-type: none;
            }
          }
          .item-link {
            padding: 6px 5px;
            display: block;
            font-size: 13px;
            line-height: 1;
            color: #7f868f;
            text-align: left;
            svg {
              height: 12px;
              display: inline-block;
              margin-right: 10px;
              width: 10px;
            }
            &:hover {
              color: var(--primary-color);
              svg {
                color: var(--primary-color);
              }
            }
          }
        }
      }
      .ac-comment-meta-section {
        .author-name {
          justify-content: flex-start !important;
        }
      }
    }
  }
  .activity-comments-container {
    width: auto;
    display: flex;
    flex-direction: column;
    .reply-section {
      margin: 0 0 0 45px;
    }
    .main-comment-box {
      padding: 15px 15px 15px 6px;
      width: auto;
      display: flex;
      align-items: end;
      flex-direction: row;
      .ac-reply-avatar {
        width: 36px;
        display: flex;
        margin: 0 15px 0 0;
        .avatar {
          width: 36px;
          height: 36px;
        }
      }
      .ac-comment-meta-section {
        width: calc(100% - 36px);
        display: flex;
        flex-direction: column;
        background-color: var(--bg-btn-card-livefeed);
        padding: 10px;
        border-radius: 15px;
        margin-top: 5px;
        .author-name {
          width: 100%;
          display: flex;
          font-size: 13px;
          color: var(--bg-font);
          justify-content: end;
          align-items: center;
          span {
            font-weight: bold;
            color: var(--bg-font);
            padding: 0 0 0 3px;
            a {
              color: var(--bg-font);
            }
          }
        }
        .comment-content {
          font-size: 13px;
          color: var(--bg-font);
        }
        .reply-content {
          width: 100%;
          display: flex;
          flex-direction: row;
          font-size: 12px;
          color: #939597;
          padding: 10px 0 0 0;
          button {
            background: transparent;
            border: 0;
            color: #939597;
            border: 0;
            font-size: 12px;
            line-height: 1;
            text-transform: capitalize;
            padding: 0 10px 0 0;
          }
          a {
            margin: 3px 15px 0 0;
            color: #939597;
          }
        }
      }
    }
  }

  .activity-comments-panel {
    width: 100%;
    display: flex;
    flex-direction: column;
    .form-ac {
      padding: 15px;
      flex-direction: row;
      width: 100%;
      display: flex;
      .ac-reply-avatar {
        width: 36px;
        display: flex;
        .avatar {
          width: 36px;
          height: 36px;
        }
      }
      .ac-reply-content {
        width: calc(100% - 36px);
        display: flex;
        padding: 0 0 0 15px;
        position: relative;
        flex-direction: column;
        textarea {
          box-shadow: none;
          color: var(--bg-font);
          height: 45px;
          font-size: 17px;
          margin: 0;
          outline: 0;
          padding: 0.5em;
          background: transparent;
          resize: none;
          width: 100%;
          border: 1px solid var(--bg-font);
          border-radius: 35px;
        }
        .lower-emoji {
          width: 100%;
          display: flex;
          padding: 10px 0 10px 0;
          svg {
            height: 18px;
            width: 18px;
            color: var(--typo);
          }
        }
        .save-button-panel {
          width: 100%;
          display: flex;
          padding: 15px 0 0 0;
          .ac-reply-cancel {
            background: 0 0;
            box-shadow: none;
            border: 0;
            font-size: 14px;
            color: #a3a5a9;
            font-weight: 500;
            margin: 0;
            padding: 0 20px 0 0;
            width: auto;
            text-transform: capitalize;
          }
          .post-button {
            padding: 7px 20px;
            height: auto;
            min-height: 10px;
            line-height: 1;
            font-size: 14px;
            font-weight: 500;
            width: 75px;
            background-color: var(--primary-color);
            border-radius: 25px;
            text-transform: capitalize;
          }
        }
      }
    }
  }

  .activity-buttons-action .btn {
    padding: 10px;
    width: 100%;
    font-size: 13px;
    font-weight: 400;
    color: var(--bg-font);
    letter-spacing: -0.24px;
    line-height: 1;
    /* margin-left: 2px; */
    text-transform: capitalize;
    background-color: var(--bg-btn-card-livefeed);
    border-radius: 20px;
    &:hover {
      color: var(--primary-color);
    }
    &.hover-none {
      &:hover {
        color: #fff;
      }
    }
    svg {
      height: 18px;
      width: 18px;
      color: var(--bg-font-grey);
    }
  }
`
export const liveFeedTitle = css`
  font-size: 0.8rem;
  margin: 1.5rem 0 0;
  padding-bottom: 0;
`
export const liveFeedTitlePink = css`
  font-size: 1.2rem;
  margin: 1.5rem 0 1rem;
  color: var(--primary-color);
  font-size: 14px;
  &:hover {
    color: none;
    border-bottom-color: none !important;
    background: none;
  }
`

export const modalColor = css`
  margin: 0;
  background: #fff;
  width: 100%;
  max-width: 100%;
  .modal-content {
    background: #000000;
    margin: 40px auto;
    max-width: 800px;
    border-radius: 4px;
    border: 1px solid #d2d4d6;
    box-shadow: 0 6px 24px 0 rgb(18 43 70 / 10%);
    .modal-header {
      padding: 0;
      height: 0;
      border-bottom: 0;
    }
    .modal-header {
      .close {
        padding: 0.75rem;
        position: absolute;
        right: 1rem;
        top: 1rem;
        z-index: 1038;
        & span:not(.sr-only) {
          color: #a3a5a9;
          font-size: 1.8rem;
        }
      }
    }
    .modal-body {
      font-size: 1rem;
      b,
      strong {
        font-weight: 600;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      p {
        margin: 0 0 1.5rem;
      }
      h1 {
        font-size: 1.75rem;
      }
      .h2,
      h2 {
        font-size: 1.5rem;
        line-height: 32px;
      }
      h3,
      .h3 {
        font-size: 1.25rem;
        line-height: 28px;
      }
      h4,
      .h4 {
        font-size: 1.125rem;
        line-height: 24px;
      }
      dd,
      ol,
      ul {
        margin: 0 0 1.6875rem 1.6875rem;
        padding: 0;
      }
    }
  }
`
export const SubNav = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  font-size: 14px;
  justify-content: space-between;
  padding: 0;
  @media (min-width: 992px) {
    padding: 0 15px 0 0;
  }
  .container-live-feed {
    width: 100%;
    @media (min-width: 992px) {
      width: auto;
    }
  }
  .btn-live-feed {
    width: 50%;
    @media (min-width: 992px) {
      width: auto;
    }
  }
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    li {
      float: left;
      list-style-type: none;
      margin: 0;
      &:not(:last-child) {
        padding-right: 20px;
      }
      &:hover {
        a,
        button {
          color: var(--primary-color);
          border-bottom-color: #ffffff;
          background: transparent;
        }
      }
      &.active {
        a,
        button {
          color: var(--primary-color);
          border-bottom-color: var(--bg-font);
        }
      }
      a,
      button {
        padding: 0 0 10px;
        color: #fff;
        border: 0;
        border-bottom: 1px solid transparent;
        display: inline-block;
        border-radius: 0 !important;
        background: transparent;
        &:hover,
        &:active {
          background: transparent !important;
          color: var(--primary-color) !important;
          border-bottom-color: var(--primary-color) !important;
        }
      }
    }
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    //background-color: var(--dark-color);
    border-radius: 100px;
    border: 1px solid #dedfe2;
    font-size: 13px;
    height: 34px;
    color: var(--typo);
    padding: 0 12px;
  }
  .btn {
    min-height: 34px;
    border-radius: 100px;
    text-transform: initial;
    font-size: 14px;
    font-weight: 400;
    color: var(--bg-font);
    &.btn-link {
      background: transparent;
      border: 0;
      color: #a3a5a9;
      margin: 0 10px;
      padding: 0 10px;
      box-shadow: none;
      @media (min-width: 992px) {
        width: auto;
      }
      &:active,
      &:focus {
        background: transparent;
        color: var(--primary-color);
      }
    }
    &.btn-primary {
      height: 34px;
      padding: 0 20px;
      color: #fff;
      background-color: var(--primary-color);
      border-color: var(--primary-color);
      &:active,
      &:focus {
        color: var(--primary-color);
        background-color: #fff;
        border-color: #fff;
      }
    }
  }
`
export const searchField = css`
  font-size: 14px;
  background: var(--bg);
  height: 34px;
  border-radius: 17px;
  padding: 0 20px;
  color: var(--typo) !important;
  &:focus {
    background: var(--bg);
    border-color: var(--typo);
    color: var(--typo);
  }
  &:hover {
    background: var(--bg);
    border-color: var(--typo);
    color: var(--typo);
  }
`
export const CreateAvtarWrapper = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const CreateFeedAvatarRow = css`
  border-bottom: 1px solid #e7e9ec;
`
export const CreateFeedAvatar = css`
  &.remove-border {
    border-bottom: 1px solid black;
    .members-manage-buttons {
      flex-flow: row wrap;
      margin: 0;
      display: flex;
      .button {
        cursor: pointer;
        min-width: 20px;
        display: inline-block;
        font-size: 12px;
        min-height: 20px;
        color: #ffffff;
        border: 1px solid #ffffff;
        padding: 4px 12px;
        margin: 5px 10px 10px 0;
        border-radius: 100px;
      }
    }
  }
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e7e9ec;
  margin: 0;
  padding: 12px 15px;
  text-align: left;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.24px;
  color: var(--typo);
  &:hover {
    color: var(--primary-color);
  }
  .avatar {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    border-radius: 50%;
    max-width: 36px;
    height: 36px;
  }
`
export const CreateFeedTextarea = styled.div`
  width: 100%;
  border-bottom: 1px solid #eef0f3;
  padding-bottom: 10px;
  .message-length {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding: 0 30px 0 10px;
    .error {
      color: red;
    }
  }
  .alert-tag {
    padding: 10px 15px;
    width: 210px;
  }
  .preview-tag {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: var(--primary-color);
    .spinner-border {
      margin: 0 0 0 10px;
      border: 0.25em solid var(--primary-color);
      border-right-color: transparent;
    }
  }
  h4 {
    padding: 0 15px;
    font-weight: 500;
    font-size: 22px;
    line-height: 1.3;
    color: #32373c;
    word-break: break-all;
    margin: 0 0 15px 0;
  }
  .description-text {
    font-size: 14px;
    font-weight: 400;
    padding: 0 15px;
    line-height: 1.5;
    color: #82878c;
    display: flex;
    word-break: break-all;
    margin: 10px 0 20px 0;
  }
  &.remove-border {
    border: none;
  }
  &.create-feed-panel {
    .rdw-editor-main {
      padding: 0 15px;
    }
    .wrapper-editor {
      .toolbar-wrapper {
        background-color: transparent;
        .rdw-inline-wrapper,
        .rdw-emoji-wrapper,
        .rdw-list-wrapper {
          .rdw-option-wrapper {
            padding: 12px 16px;
            background-color: transparent;
            color: var(--typo);
            &:hover {
              background-color: transparent;
            }
          }
        }
      }
    }
  }
  .form-control {
    outline: 0;
    box-shadow: none;
    min-height: 80px;
    padding: 10px 15px;
    word-break: break-word;
    background: var(--white-color);
    border: 0;
    font-size: 16px;
    font-weight: 500;
    color: var(--typo);
    &[placeholder]:empty:before {
      content: attr(placeholder);
      color: #7f868f;
    }
    &[placeholder]:empty:focus:before {
      content: '';
    }
  }
  .profile-upload-container {
    padding: 0 15px;
  }
  .upload-image-conatiner {
    width: 100%;
    display: flex;
    .file-info {
      display: none;
    }
    .alert {
      display: none;
    }
    #delete-image-container {
      display: none;
    }
    .css-1x3ncny-DropZoneStyle {
      padding: 0;
    }
    .cover-image-status {
      display: none;
    }
    .full-view-container {
      width: 100%;
      background: #f8f8f8;
      border: 2px dashed #d0d3d6;
      border-radius: 6px;
      height: 125px;
    }
  }

  .rdw-option-wrapper {
    color: #000;
    img {
      width: 15px;
      height: 15px;
    }
  }
  .post-update-toolbar {
    display: flex;
    padding: 0 15px;
    flex-direction: row;
    .post-editor-icon {
      img {
        width: 24px;
      }
    }
    .post-element-panel {
      cursor: pointer;
      margin-right: 15px;
      position: relative;
      svg {
        height: 18px;
        width: 18px;
        color: #000;
        margin: -5px 0 0 -4px;
      }
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 122px;
        display: none;
        height: 28px;
        background: var(--primary-color);
        bottom: 100%;
        border-radius: 5px;
        font-size: 12px;
        color: #ffffff;
        left: 0;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 5px 10px;
        text-align: center;
        top: -45px;
        em {
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid var(--primary-color);
          position: absolute;
          top: 28px;
          left: 5px;
        }
      }
    }
  }
`
export const MultiSelectContainer = css`
  .search-wrapper {
    height: 34px;
    background-color: #1b1b1b;
    color: #ffffff;
    padding: 2px 12px 0;
    input {
      font-size: 13px;
      width: 170px;
    }
    .searchBox {
      color: #ffffff;
    }
  }
  .optionContainer {
    background-color: #1b1b1b;
    border: 1px solid #dedfe2;
    font-size: 13px;
    color: #ffffff;
  }
`
export const LoaderContainer = css`
  display: flex;
  margin-top: 20px;
  align-items: center;
  font-size: 14px;
  color: var(--bg-font);
  span {
    display: inline-flex;
    height: 40px;
    width: 40px;
    margin-right: 20px;
    border-radius: 5px;
    background: var(--primary-color);
    align-items: center;
    justify-content: center;
    svg {
      height: 15px;
      color: var(--white-color);
    }
  }
`
export const LoadingBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  border-radius: 25px;
  height: 42px;
  width: 220px;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 600;
  margin: 20px auto 0;
  cursor: default;
  div {
    margin-left: 15px;
  }
`
export const SpinnerBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  width: 220px;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 600;
  margin: 20px auto 0;
  cursor: default;
  div {
    margin-left: 15px;
  }
`
export const MoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 150px;
  color: var(--bg-font);
  font-size: 12px;
  font-weight: 400;
  margin: 20px auto 0;
  cursor: pointer;
  &:hover {
    color: var(--primary-color);
    box-shadow: none;
  }
  svg {
    margin-left: 12px;
    height: 14px;
  }
`
export const reportModal = css`
  margin: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  max-width: 100%;
  .modal-content {
    background: #000000;
    margin: 40px auto;
    max-width: 600px;
    border-radius: 4px;
    border: 1px solid #d2d4d6;
    box-shadow: 0 6px 24px 0 rgb(18 43 70 / 10%);
    .block-panel {
      button {
        padding: 18px 0;
        span {
          font-size: 26px;
          color: var(--bg-font);
        }
      }
    }
    .bold-tag {
      font-weight: 600;
    }
    .modal-header {
      padding: 0;
      padding: 17px 30px 16px;
      .modal-title {
        font-weight: 500;
        font-size: 17px;
      }
    }
    .modal-body {
      padding: 30px;
      textarea {
        min-height: 80px;
        resize: none;
        width: 100%;
        padding: 10px 20px;
      }
      label {
        font-size: 16px;
        line-height: 1.5;
        display: block;
        margin-bottom: 7px;
      }
      .btn-text {
        margin-top: 20px;
        text-transform: initial;
        &:hover,
        &:active,
        &:focus {
          color: #fff;
        }
      }
    }
    .modal-footer {
      .btn-primary {
        min-width: 130px;
        border-radius: 100px;
      }
    }
  }
`
export const groupPanelCss = css`
  .main-wrapper {
    width: 100%;
    display: flex;
  }
`

export const RightCardView = css`
  .item-avatar {
    max-width: 48px;
    .avatar {
      border-radius: 3px;
      width: 40px;
      height: 40px;
    }
  }
  .item-title a {
    line-height: 1.35;
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: -0.24px;
    color: #eee;
  }
  .item-title a:hover {
    color: #e0116d;
  }
  .item-meta {
    color: #a3a5a9;
    font-size: 12px;
    letter-spacing: -0.26px;
    line-height: 1.2;
    overflow-wrap: break-word;
    font-weight: lighter;
  }
`
