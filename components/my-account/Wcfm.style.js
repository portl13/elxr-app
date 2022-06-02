import { css } from "@emotion/core";

export const wcfmStyle = css`
  .wcfm-datatable {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 30px 0 0 0;
    padding: 0 20px;
    .no-vendor {
      font-size: 14px;
      padding: 10px;
      border-bottom: 1px solid #ffffff;
    }
    .row-head {
      display: none;
      width: 100%;
      color: var(--primary-color);
      font-size: 14px;
      align-items: center;
      border-bottom: 1px solid #cccccc;
      svg {
        width: 15px;
      }
      @media (min-width: 992px) {
        display: flex;
      }
    }

    .column-head {
      width: 100%;
      display: flex;
      color: var(--typo);
      font-size: 14px;
      border-bottom: 1px solid #cccccc;
      align-items: center;
      @media (max-width: 991px) { 
        flex-direction: column;
      }
    }

    div[class^="credit-col-"] {
      display: flex;
      justify-content: space-between;
    }
    @media (max-width: 991px) {
      div[class^="credit-col-"]::before {
        width: 100%;
        content: attr(data-label);
      }
      div[class^="credit-col-"] {
        width: 100%;
      }

      div[class^="customer-div"]::before {
        content: attr(data-label);
      }
      div[class^="customer-div"] {
        width: 100%;
        justify-content: space-between;
        padding: 5px ;
      }
    }
    .credit-col-1 {
      width: 10%;
      display: inline-block;
      padding: 10px 5px;
    }
    .credit-col-2 {
      width: 10%;
      display: inline-block;
      padding: 10px 5px;
    }
    .credit-col-3 {
      width: 10%;
      display: inline-block;
      padding: 10px 5px;
    }
    .credit-col-4 {
      width: 50%;
      display: inline-block;
      padding: 10px 5px;
    }
    .credit-col-5 {
      width: 20%;
      display: inline-block;
      padding: 10px 5px;
    }
    .following-div-1 {
      width: 50%;
      display: inline-block;
      padding: 10px 5px;
    }
    .following-div-2 {
      width: 30%;
      display: inline-block;
      padding: 10px 5px;
    }
    .following-div-3 {
      width: 20%;
      display: inline-block;
      padding: 10px 5px;
      svg {
        width: 14px;
        color: #ffffff;
        cursor: pointer;
        &:hover {
          color: var(--primary-color);
        }
      }
    }
    .order-tag {
      width: 15px;
      height: 15px;
      border-radius: 100%;
      background: #20c997;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 60px;
        display: none;
        height: 22px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 11px;
        left: -21px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 3px 10px;
        text-align: center;
        top: 12px;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 25px;
        }
      }
      svg {
        width: 11px;
        color: #000;
      }
    }
    .status-processing-tag {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      background: #20c997;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 80px;
        display: none;
        height: 22px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 11px;
        left: -2px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 3px 10px;
        text-align: center;
        top: 18px;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 9px;
        }
      }
      svg {
        width: 11px;
        color: #000;
      }
    }
    .status-pending-tag {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 118px;
        display: none;
        height: 22px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 11px;
        left: -2px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 3px 10px;
        text-align: center;
        top: 18px;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 9px;
        }
      }
      svg {
        width: 20px;
        color: #f8cb00;
      }
    }

    .order-div-1 {
      width: 3%;
      display: flex;
      padding: 10px 5px;
    }
    .order-div-2 {
      width: 17%;
      display: inline-block;
      padding: 10px 5px;
      text-align: center;
      span {
        color: #f86c6b;
        display: block;
      }
    }
    .order-div-3 {
      width: 15%;
      display: inline-block;
      padding: 10px 5px;
      text-align: center;
      span {
        font-size: 16px;
        display: block;
      }
    }
    .order-div-4 {
      width: 15%;
      display: inline-block;
      padding: 10px 5px;
      span {
        display: block;
      }
    }
    .order-div-5 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .order-div-6 {
      width: 10%;
      display: inline-block;
      padding: 10px 5px;
      text-align: center;
      span {
        font-size: 12px;
        display: block;
      }
    }
    .order-div-7 {
      width: 10%;
      display: inline-block;
      padding: 10px 5px;
      text-align: center;
      .unpaid {
        background-color: #f86c6b;
        color: #ffffff;
        display: block;
        padding: 0 5px;
        font-size: 12px;
        text-transform: uppercase;
      }
      .requested {
        background-color: #63c2de;
        color: #ffffff;
        display: block;
        padding: 0 5px;
        font-size: 12px;
        text-transform: uppercase;
      }
    }
    .order-div-8 {
      width: 12%;
      display: inline-block;
      padding: 10px 5px;
      text-align: center;
    }
    .order-div-9 {
      width: 8%;
      display: flex;
      padding: 10px 5px;
      text-align: center;
      span {
        width: auto;
        display: flex;
        margin: 0 5px 5px 5px;
        position: relative;
        cursor: pointer;
        &:hover {
          .tooltip-panel {
            display: block;
          }
        }
        &:last-child {
          .tooltip-panel {
            min-width: 84px;
          }
        }
        .tooltip-panel {
          min-width: 112px;
          display: none;
          height: 22px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: none;
          color: #000;
          bottom: 100%;
          border-radius: 5px;
          font-size: 10px;
          left: -65px;
          margin-bottom: 11px;
          transform: translate(0, 10px);
          transform-origin: top;
          position: absolute;
          padding: 4px 10px;
          text-align: center;
          top: 12px;
          em {
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #fff;
            position: absolute;
            top: -4px;
            left: 64px;
          }
        }
        svg {
          color: #ffffff;
          width: 15px;
        }
      }
    }
    .img-avatar {
      width: 106px;
      height: 106px;
    }
    .instock {
      color: #4dbd74;
      font-weight: 600;
    }
    .category-tag {
      color: #5b9a68;
      padding: 0 0 0 5px;
    }
    .view_count {
      color: #e83e8c;
    }
    .draft-tag {
      background-color: #63c2de;
      min-width: 49px;
      text-align: center;
      padding: 4px 4px;
      color: #fff;
      border-radius: 2px;
      font-size: 12px;
      line-height: 10px;
      margin-top: 8px;
      margin-left: 10px;
      display: inline-block;
      float: left;
    }
    .publish-tag {
      background-color: #20c997;
      padding: 4px 4px;
      color: #fff;
      border-radius: 2px;
      font-size: 12px;
      line-height: 10px;
      margin-top: 8px;
      margin-left: 10px;
      display: inline-block;
      float: left;
    }
    .customer-detail-div-1 {
      width: 5%;
      display: flex;
      padding: 10px 5px;
      word-break: break-all;
      .tick-tag {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        background: #4dbd74;
        &:hover {
          .tooltip-panel {
            display: block;
          }
        }
        .tooltip-panel {
          min-width: 85px;
          display: none;
          height: 22px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: none;
          color: #000;
          bottom: 100%;
          border-radius: 5px;
          font-size: 11px;
          left: -19px;
          margin-bottom: 11px;
          transform: translate(0, 10px);
          transform-origin: top;
          position: absolute;
          padding: 3px 10px;
          text-align: center;
          top: 15px;
          em {
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #fff;
            position: absolute;
            top: -4px;
            left: 25px;
          }
        }
        svg {
          width: 12px;
          color: #000000;
        }
      }
      .subscription-tag {
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background: #20c997;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        &:hover {
          .tooltip-panel {
            display: block;
          }
        }
        .tooltip-panel {
          min-width: 60px;
          display: none;
          height: 22px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: none;
          color: #000;
          bottom: 100%;
          border-radius: 5px;
          font-size: 11px;
          left: -21px;
          margin-bottom: 11px;
          transform: translate(0, 10px);
          transform-origin: top;
          position: absolute;
          padding: 3px 10px;
          text-align: center;
          top: 12px;
          em {
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #fff;
            position: absolute;
            top: -4px;
            left: 25px;
          }
        }
        svg {
          width: 11px;
          color: #000;
        }
      }
    }
    .customer-detail-div-2 {
      width: 22%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-detail-div-3 {
      width: 30%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 16px;
      }
    }
    .customer-detail-div-4 {
      width: 13%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      justify-content: center;
      align-items: center;
    }
    .customer-detail-div-5 {
      width: 18%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      justify-content: center;
      align-items: center;
    }
    .customer-detail-div-6 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      justify-content: center;
      align-items: center;
    }
    .customer-div-6 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-div-1 {
      width: 12%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-div-2 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      word-break: break-all;
    }
    .customer-div-3 {
      width: 20%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-div-4 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-div-5 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-div-6 {
      width: 13%;
      display: flex;
      padding: 10px 5px;
      word-break: break-all;
    }
    .customer-div-7 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
    }
    .customer-div-8 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      word-break: break-word;
      svg {
        width: 15px;
        cursor: pointer;
      }
    }
    svg.svg-inline--fa.fa-eye {
      width: 15px;
      cursor: pointer;
    }

    .order-color-tag {
      color: #2ea2cc;
      cursor: pointer;
    }
    .order-item-1 {
      width: 20%;
      display: flex;
      padding: 10px 5px;
      img {
        width: 34px;
        height: 34px;
        border: 1px solid #ffffff;
      }
    }
    .order-item-2 {
      width: 40%;
      display: flex;
      padding: 10px 5px;
      a {
        color: #2ea2cc;
      }
    }
    .order-item-3 {
      width: 20%;
      display: flex;
      padding: 10px 5px;
    }
    .order-item-4 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .order-item-5 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      button {
        background: var(--primary-color);
        border: 1px solid var(--primary-color);
        border-radius: 20px;
        color: #ffffff;
        font-size: 14px;
        height: 30px;
        padding: 0 12px;
        margin: 0 0 0 10px;
        outline: none;
      }
    }
    .item-1 {
      width: 7%;
      display: flex;
      padding: 10px 5px;
      img {
        width: 34px;
        height: 34px;
        border: 1px solid #ffffff;
      }
    }
    .item-2 {
      width: 53%;
      display: flex;
      padding: 10px 5px;
      a {
        color: #2ea2cc;
        cursor: pointer;
      }
    }
    .item-3 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .item-4 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .item-5 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .item-6 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .sub-item-1 {
      width: 20%;
      display: flex;
      padding: 10px 5px;
      a {
        color: #2ea2cc;
      }
    }
    .sub-item-2 {
      width: 25%;
      display: flex;
      padding: 10px 5px;
    }
    .sub-item-3 {
      width: 25%;
      display: flex;
      padding: 10px 5px;
    }
    .sub-item-4 {
      width: 20%;
      display: flex;
      padding: 10px 5px;
      span {
        background-color: #ff0;
        color: #000;
      }
    }
    .sub-item-5 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .col-div-1 {
      width: 3%;
      display: flex;
      padding: 10px 5px;
    }
    .col-div-2 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      position: relative;
      align-items: center;
      justify-content: center;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 50px;
        display: none;
        height: 22px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 10px;
        left: 25px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 4px 10px;
        text-align: center;
        top: 23px;
        z-index: 2;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 23px;
        }
      }
      a {
        width: 106px;
        height: 106px;
      }
    }
    .col-div-3 {
      width: 12%;
      display: flex;
      padding: 10px 5px;
    }
    .col-div-5 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
    }
    .col-div-6 {
      width: 11%;
      display: flex;
      padding: 10px 5px;
    }
    .col-div-7 {
      width: 15%;
      display: flex;
      padding: 10px 5px;
      .double-price-tag {
        width: 100%;
        display: flex;
        flex-direction: column;
        .red-price {
          display: flex;
          color: #cc0000;
          position: relative;
          width: 100%;
          text-decoration: line-through;
          .line-tag {
            position: absolute;
            height: 2px;
            background: #ffffff;
            top: 9px;
            left: 0;
            min-width: 45px;
            max-width: 100%;
          }
        }
        .green-price {
          color: #006e2e;
          position: relative;
          width: 100%;
          display: flex;
          text-decoration: underline;
          .line-tag {
            position: absolute;
            height: 2px;
            background: #ffffff;
            bottom: 0;
            left: 0;
            min-width: 45px;
            max-width: 100%;
          }
        }
      }
    }
    .col-div-8 {
      width: 15%;
      display: inline-block;
      padding: 10px 5px;
      word-break: break-word;
    }
    .col-div-10 {
      width: 6%;
      display: flex;
      padding: 10px 5px;
      position: relative;
      &:hover {
        .tooltip-panel {
          display: block;
        }
      }
      .tooltip-panel {
        min-width: 50px;
        display: none;
        height: 22px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: none;
        color: #000;
        bottom: 100%;
        border-radius: 5px;
        font-size: 10px;
        left: -15px;
        margin-bottom: 11px;
        transform: translate(0, 10px);
        transform-origin: top;
        position: absolute;
        padding: 4px 10px;
        text-align: center;
        top: 23px;
        z-index: 2;
        em {
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #fff;
          position: absolute;
          top: -4px;
          left: 23px;
        }
      }
    }
    .col-div-11 {
      width: 7%;
      display: flex;
      padding: 10px 5px;
    }
    .col-div-12 {
      width: 10%;
      display: flex;
      padding: 10px 5px;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        width: 26px;
        display: flex;
        margin: 0 4px 4px 0;
        cursor: pointer;
        position: relative;
        height: 26px;
        background: var(--white-color);
        border: 1px solid var(--primary-color);
        box-shadow: none;
        text-align: center;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.5s;
        border-radius: 3px;
        .spinner-border {
          position: absolute;
          right: -22px;
          top: 6px;
          width: 15px;
          height: 15px;
          .sr-only {
            display: none;
          }
        }
        &:hover {
          background: var(--primary-color);
          .tooltip-panel {
            display: block;
          }
        }
        .tooltip-panel {
          min-width: 92px;
          display: none;
          height: 22px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: none;
          color: #000;
          bottom: 100%;
          border-radius: 5px;
          font-size: 10px;
          left: -30px;
          margin-bottom: 11px;
          transform: translate(0, 10px);
          transform-origin: top;
          position: absolute;
          padding: 4px 10px;
          text-align: center;
          top: 24px;
          z-index: 2;
          em {
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #fff;
            position: absolute;
            top: -4px;
            left: 40px;
          }
        }
        svg {
          color: var(--typo);
          width: 11px;
        }
        &:hover svg {
          color: var(--white-color);
        }
      }
    }
  }
  .transactions-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    .current-balance-panel {
      width: 100%;
      display: flex;
      font-size: 16px;
      line-height: 1.6875rem;
      color: #ffffff;
      svg {
        width: 15px;
        color: #ffffff;
        margin: 0 0 0 10px;
        cursor: pointer;
        &:hover {
          color: var(--primary-color);
        }
      }
    }
    .wcfm-datatable {
      padding: 0;
    }
    .search-panel {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .search-date {
        position: relative;
      }
      .search-tag {
        width: auto;
        display: flex;
        align-items: center;
        color: var(--white-color);
        font-size: 16px;
        position: relative;
        svg {
          color: #9ca8b4;
          width: 20px;
          position: absolute;
          right: 0;
          z-index: 2;
          bottom: 10px;
          margin-right: 10px;
        }
        button {
          position: absolute;
          right: 4px;
          background: transparent;
          border: 0;
          color: #ffffff;
          transform: rotate(45deg);
          font-size: 22px;
          color: var(--primary-color);
          outline: 0;
        }
        input {
          background-color: var(--dark-color);
          border: 1px solid var(--white-color);
          width: 212px;
          margin: 0 0 0 8px;
          border-radius: 3px;
          outline: 0;
          font-size: 15px;
          height: 40px;
          padding: 0 30px;
          color: var(--typo);
          outline: 0;
          &:focus {
            border: 1px solid var(--primary-color);
          }
        }
      }
      .entries-panel {
        width: auto;
        display: flex;
        align-items: center;
        color: var(--typo);
        font-size: 16px;
        text-align: right;

        select {
          background-color: var(--dark-color);
          border: 1px solid var(--white-color);
          width: 62px;
          margin: 0 8px;
          border-radius: 3px;
          outline: 0;
          font-size: 15px;
          height: 40px;
          padding: 0 8px;
          color: var(--typo);
          outline: 0;
          &:focus {
            border: 1px solid var(--primary-color);
          }
        }
        @media (max-width: 991px) {
          margin-top: 5px;
          margin-bottom: 20px;
          margin-left: auto;
        }
      }
    }
  }
`;
