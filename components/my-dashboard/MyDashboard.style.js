import { css } from "@emotion/core";

export const myDashboardStyle = css`
  &.myDashboard-container {
    .thumb-vertical {
      background: #eee;
      border-radius: 6px;
    }
    .MuiBottomNavigation-root {
      height: auto;
    }
    .no-record-color {
      color: #fff;
      @media (min-width: 768px) {
        color: #000;
      }
    }
    .main-container {
      display: flex;
      flex-direction: column;
    }
    .name-world {
      font-family: "Quicksand";
      font-style: normal;
      font-weight: 700;
      font-size: 15px;
      line-height: 19px;
      /* identical to box height */
      color: #f15cfc;
      width: 80px;
      height: 80px;
      display: block;
      background: linear-gradient(
        124.5deg,
        #00e0fc -9.8%,
        #ff73f8 34.52%,
        #f5d1b5 79.63%
      );
      display: flex;
      align-items: center;
      justify-content: center;
      @media (min-width: 768px) {
        width: 60px;
        height: 60px;
      }
      .name-inner-container {
        background: linear-gradient(
          124.5deg,
          #00e0fc -9.8%,
          #ff73f8 34.52%,
          #f5d1b5 79.63%
        );
        color: var(--color-white);
        width: 74px;
        height: 74px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0px;
        left: 0px;
        position: relative;
        font-size: 22px;
        font-weight: bold;
        @media (min-width: 768px) {
          width: 54px;
          height: 54px;
        }
      }
    }
    .user-name {
      font-family: "Quicksand";
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 30px;
      /* identical to box height */
      display: block;
      text-align: center;
      margin-bottom: 20px;
      @media (min-width: 768px) {
        font-size: 24px;
        display: flex;
        text-align: left;
        margin-bottom: 0;
      }
    }
    .inner-navigation {
      background: transparent;
      justify-content: center;
      @media (min-width: 576px) {
        justify-content: flex-end;
      }
      .MuiBottomNavigationAction-label {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 700;
        font-size: 13px;
        line-height: 16px;
      }
      .round-btn {
        border: 0 !important;
        flex: 0;
        display: block;
        padding: 0;
        .MuiBottomNavigationAction-wrapper {
          height: 100%;
          min-width: 100%;
          background: transparent;
        }
        .icon-box {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          margin-bottom: 0;
          position: relative;
          background: linear-gradient(
            134.37deg,
            #00e0fc -8.75%,
            #ff73f8 43.59%,
            #f5d1b5 96.88%
          );
        }
        .icon-boxp-inner {
          width: 66px;
          height: 68px;
          border-radius: 100%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .card-box {
      background: #fff;
      box-shadow: 0px 0px 10px rgba(190, 233, 241, 0.2);
      border-radius: 10px;
      padding: 20px 0;
      width: 100%;
      margin-bottom: 20px;
      &.calories-card {
        background: transparent;
        box-shadow: none;
        @media (min-width: 768px) {
          background: #fff;
          box-shadow: 0px 0px 10px rgba(190, 233, 241, 0.2);
        }
      }
      &.calendar-view {
        .calender-container {
          background: #fff !important;
          .calander-label {
            font-size: 24px;
            font-weight: 700;
            margin: 0;
            @media (min-width: 768px) {
              font-size: 40px;
            }
            span {
              color: #000 !important;
            }
          }
          .arrow-font {
            font-size: 24px;
            @media (min-width: 768px) {
              font-size: 46px;
            }
          }
          .calander-btn {
            display: none !important;
          }
          .text-sm-left {
            width: 100% !important;
            flex: none;
            max-width: 100% !important;
            text-align: center !important;
          }
          .rbc-month-view {
            border: 1px solid rgba(181, 181, 174, 0.2);
            border-radius: 15px;
            .rbc-day-bg {
              border-left: 1px solid rgba(181, 181, 174, 0.2);
            }
          }
          .rbc-month-row + .rbc-month-row {
            border-top: 1px solid rgba(181, 181, 174, 0.2);
          }
          .rbc-header + .rbc-header {
            border-left: 1px solid rgba(181, 181, 174, 0.2);
          }
          .rbc-header {
            height: 60px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              font-style: normal;
              font-weight: 700;
              font-size: 12px;
              line-height: 15px;
              /* identical to box height */
              text-align: center;
              text-transform: uppercase;
              color: #000;
            }
          }
          .rbc-day-bg {
            color: #ffffff;
            &.rbc-off-range-bg {
              background: transparent;
            }
            &.rbc-today {
              background: transparent;
            }
          }
          .rbc-row-segment {
            .rbc-event {
              @media (max-width: 768px) {
                width: 10px;
                height: 10px;
              }
            }
          }
          .rbc-row-content {
            z-index: 2;
            .rbc-date-cell {
              .rbc-button-link {
                color: #000;
              }
              &.rbc-off-range {
                .rbc-button-link {
                  color: rgba(255, 255, 255, 0.3);
                }
              }
              &.rbc-now.rbc-current {
                .rbc-button-link {
                  width: 37px;
                  height: 37px;
                  color: #fff;
                  border-radius: 100%;
                  background: linear-gradient(
                    125.11deg,
                    #00e0fc -16.42%,
                    #ff73f8 59.72%,
                    #f5d1b5 100.27%
                  );
                  box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.0821405);
                }
              }
            }
          }
        }
      }
      &.mobile-box {
        background: transparent;
        box-shadow: none;
        padding: 0;
        @media (min-width: 768px) {
          padding: 20px 0;
          background: #fff;
          box-shadow: 0px 0px 10px rgba(190, 233, 241, 0.2);
        }
      }
      &.mobile-event-box {
        background: transparent;
        box-shadow: none;
        .list-container {
          height: auto;
          margin-top: 10px;
          @media (min-width: 768px) {
            height: 420px;
          }
          .scroll-inner {
            position: relative !important;
            display: block;
            @media (min-width: 768px) {
              position: absolute !important;
            }
          }
        }
        .list-row {
          background: #fff;
          border-radius: 10px;
          flex-direction: row;
          padding: 20px;
          margin-bottom: 20px;
          align-items: flex-start;

          @media (min-width: 768px) {
            padding: 0 20px;
          }
          .img-box {
            width: 40px;
            height: 40px;
          }
          .info-box {
            padding: 0 0 0 10px;
            width: calc(100% - 50px);
            .bold-text {
              text-align: left;
              color: #000;
              max-width: 80%;
            }
            .description-text {
              height: auto;
              max-height: 100%;
              color: #000;
              max-width: 80%;
              span {
                p {
                  white-space: normal;
                  text-overflow: initial;
                  overflow: initial;
                  font-size: 14px;
                  font-weight: 500;
                }
              }
            }
          }
        }
        @media (min-width: 768px) {
          background: #fff;
          box-shadow: 0px 0px 10px rgba(190, 233, 241, 0.2);
        }
      }
      .total-count {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 18px;
        /* identical to box height */
        letter-spacing: 4.6px;
        text-transform: uppercase;
        padding-left: 0;
        @media (min-width: 768px) {
          padding-left: 20px;
          color: #000;
        }
        &.big-count {
          font-weight: 700;
          font-size: 40px;
          line-height: 59px;
          color: #000;
        }
      }
      .subhead {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        /* identical to box height */
        text-transform: uppercase;
        padding-left: 0;
        @media (min-width: 768px) {
          // font-size: 20px;
          padding-left: 20px;
          color: #000;
        }
      }
      .see-all {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 22px;
        /* identical to box height, or 183% */
        padding-right: 0;
        cursor: pointer;
        @media (min-width: 768px) {
          padding-right: 20px;
          color: #000;
        }
      }
      .list-container {
        margin-top: 30px;
        height: 140px;
        overflow-x: auto;
        .link {
          color: var(--color-white);
          text-decoration: underline;
        }
        @media (min-width: 768px) {
          height: 300px;
          .link {
            color: var(--primary-color);
            text-decoration: none;
          }
        }
        .scroll-inner {
          display: flex;
          align-items: flex-start;
          @media (min-width: 768px) {
            display: block;
          }
        }
      }
      .list-row {
        display: flex;
        align-items: center;
        margin-bottom: 0;
        padding-left: 0;
        flex-direction: column;
        padding-right: 10px;
        @media (min-width: 768px) {
          flex-direction: row;
          padding-left: 20px;
          margin-bottom: 20px;
          padding-right: 0;
        }
        .img-box {
          width: 80px;
          height: 80px;
          overflow: hidden;
          border-radius: 100%;
          flex-shrink: 0;
          @media (min-width: 768px) {
            width: 60px;
            height: 60px;
          }
          &.small-box {
            width: 60px;
            height: 60px;
            .name-world {
              width: 60px;
              height: 60px;
              @media (min-width: 768px) {
                width: 40px;
                height: 40px;
              }
              .name-inner-container {
                width: 54px;
                height: 54px;
                @media (min-width: 768px) {
                  width: 34px;
                  height: 34px;
                }
              }
            }
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      .info-box {
        padding: 10px 0 0 0;
        width: 100%;
        @media (min-width: 768px) {
          padding-left: 10px;
          width: calc(100% - 70px);
        }
        .bold-text {
          font-family: "Quicksand";
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          /* identical to box height */
          text-align: center;
          color: #000;
          @media (min-width: 768px) {
            color: #000;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: left;
            font-size: 16px;
          }
        }
        .description-text {
          font-family: "Quicksand";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 22px;
          max-height: 44px;
          overflow: hidden;
          color: #000;
          /* or 157% */
          @media (min-width: 768px) {
            text-align: left;
            // font-size: 14px;
            color: rgba(0, 0, 0, 0.6);
          }
          span {
            p {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              margin-bottom: 0;
              line-height: normal;
              font-size: 12px;
            }
          }
        }
        .time-box {
          font-family: "Oswald";
          font-style: normal;
          font-weight: 700;
          font-size: 12px;
          line-height: 24px;
          /* identical to box height */
          display: flex;
          align-items: center;
          text-transform: uppercase;
          color: #9d9d9d;
          margin-top: 5px;
          @media (min-width: 768px) {
            font-size: 16px;
          }
          .MuiSvgIcon-root {
            margin-right: 5px;
          }
        }
      }
      .tag-row {
        width: 100%;
        padding: 20px 0;
        .scroll-inner {
          padding: 5px 20px;
          position: relative !important;
          display: flex;
        }
        .tag {
          padding: 4px 13px;
          gap: 10px;
          height: 21px;
          white-space: nowrap;
          display: inline-block;
          background: #ecfcff;
          border-radius: 20px;
          font-family: "Quicksand";
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 12px;
          margin: 0 10px 10px 0;
          cursor: pointer;
          /* identical to box height */
          color: #555555;
          @media (min-width: 768px) {
            font-weight: 700;
            font-size: 10px;
          }
          &:hover {
            background: #14d8fc;
            color: #2f2f2f;
          }
          &.active {
            color: #2f2f2f;
            background: #14d8fc;
          }
        }
      }
      .time-text {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height */
        text-transform: uppercase;
        color: #9d9d9d;
      }
      &.course-box {
        background: transparent;
        box-shadow: none;
        @media (min-width: 768px) {
          background: #fff;
          box-shadow: 0px 0px 10px rgba(190, 233, 241, 0.2);
        }
        .scroll-inner {
          position: relative !important;
          @media (min-width: 768px) {
            position: absolute !important;
          }
        }
        .list-container {
          height: auto !important;
          @media (min-width: 768px) {
            height: 300px !important;
          }
        }
        .list-row {
          background: #fff;
          margin-right: 20px;
          border-radius: 10px;
          overflow: hidden;
          width: 100%;
          min-width: 300px;
          position: relative;
          @media (min-width: 768px) {
            background: transparent;
            margin-right: 0;
          }
          .img-box {
            width: 100%;
            height: 85px;
            border-radius: 0;
            @media (min-width: 768px) {
              width: 60px;
              height: 60px;
              border-radius: 100%;
            }
          }
        }
        .info-box {
          width: 100%;
          padding: 15px 15px 15px;
          @media (min-width: 768px) {
            width: calc(100% - 80px);
            padding: 0 0 0 15px;
            .bold-text {
              max-width: 90%;
            }
            .description-text {
              max-width: 90%;
            }
          }
          .small-image-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 5px;
            .author-box {
              display: flex;
              align-items: center;
              .author-name {
                font-family: "Quicksand";
                font-style: normal;
                font-weight: 700;
                font-size: 13px;
                line-height: 16px;
                color: #000000;
                padding-left: 10px;
              }
            }
          }
          .bold-text {
            font-family: "Quicksand";
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
            /* identical to box height */
            color: #000000;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .continue-btn {
            font-family: "Quicksand";
            font-style: normal;
            font-weight: 700;
            font-size: 15px;
            line-height: 19px;
            /* identical to box height */
            color: #ffffff;
            background: linear-gradient(
              124.5deg,
              #00e0fc -9.8%,
              #ff73f8 34.52%,
              #f5d1b5 79.63%
            );
            border-radius: 30px;
            border: 0;
            width: 100%;
            max-width: 275px;
            height: 50px;
          }
        }
        .author-box {
          display: flex;
          .author-img-box {
            width: 25px;
            height: 25px;
            border-radius: 100%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
        .count-box {
          font-family: "Quicksand";
          font-style: normal;
          font-weight: 700;
          font-size: 12px;
          line-height: 15px;
          /* identical to box height */
          text-align: right;
          color: #000000;
          padding-left: 20px;
          top: 0;
          position: relative;
        }
        .description-text {
          font-family: "Quicksand";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 15px;
          color: #000000;
          span {
            p {
              font-size: 14px;
              font-weight: 400;
            }
          }
        }
      }
      .today-head {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        padding-left: 20px;
        /* identical to box height */
        color: rgba(0, 0, 0, 0.6);
      }
      .plan-name {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height */
        text-transform: uppercase;
        color: #000;
        padding-left: 20px;
        padding-right: 10px;
        margin-top: 30px;
      }
      .plan-desc {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: #rgba(0, 0, 0, 0.6);
        margin-top: 10px;
        padding-left: 20px;
        padding-right: 10px;
      }
      .user-image-box {
        position: absolute;
        right: 30px;
        text-align: right;
        width: 51%;
        display: flex;
        justify-content: flex-end;
        .user-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          position: relative;
          left: 0;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &:nth-child(2) {
            // left: -30px;
            z-index: 1;
          }
          &:nth-child(3) {
            // left: -60px;
            z-index: 2;
          }
          &:nth-child(4) {
            // left: -90px;
            z-index: 3;
          }
          &:nth-child(5) {
            // left: 120px;
            z-index: 4;
          }
        }
      }
      .subhead-small {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        padding-left: 20px;
        /* identical to box height */
        text-transform: uppercase;
        color: #9d9d9d;
      }
      .calender-container {
        height: 400px !important;
        @media (min-width: 768px) {
          height: 585px !important;
        }
      }
      .data-hint {
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        /* identical to box height */
        color: rgba(0, 0, 0, 0.6);
        padding-left: 20px;
      }
      .today-text {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 18px;
        /* identical to box height */
        color: #fff;
        margin-bottom: 20px;
        @media (min-width: 768px) {
          color: #000;
        }
      }
      .dot {
        margin-right: 5px;
      }
      .cal-outer-box {
        display: flex;
        .calorios-icon {
          padding-left: 10px;
          .dot-text {
            font-family: "Quicksand";
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 15px;
            /* identical to box height */
            color: #fff;
            margin-bottom: 10px;
            @media (min-width: 768px) {
              color: #000;
            }
          }
        }
      }
      .cal-box {
        background: #021730;
        backdrop-filter: blur(67.957px);
        /* Note: backdrop-filter has minimal browser support */
        border-radius: 10px;
        padding: 15px 0 15px 15px;
        width: 220px;
        display: flex;
        align-items: center;
        .left-box {
          flex-shrink: 0;
        }
        .traker {
          font-family: "Quicksand";
          font-style: normal;
          font-weight: 700;
          font-size: 12px;
          line-height: 15px;
          /* identical to box height */
          color: #ffffff;
        }
        .value-text {
          font-family: "Oswald";
          font-style: normal;
          font-weight: 700;
          font-size: 26px;
          line-height: 39px;
          /* identical to box height */
          color: #ffffff;
        }
        .kal-text {
          font-family: "Quicksand";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          /* identical to box height */
          color: #ffffff;
        }
      }
      .calarioes {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        .apexcharts-canvas {
          position: absolute;
          user-select: none;
          left: 85px;
          top: 60px;
        }
      }
      .big-text {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 700;
        font-size: 31px;
        line-height: 46px;
        /* identical to box height */
        color: #313131;
      }
      .mobile-padding {
        margin: auto;
        width: 100%;
        position: relative;
        @media (min-width: 576) {
          padding-left: 30px;
          display: flex;
          justify-content: center;
        }
        @media (min-width: 768px) {
          padding: 0 20px;
        }
        @media (min-width: 992px) {
          margin: 0;
          display: block;
          padding-left: 0;
        }
      }
    }
    .carousel-container {
      background: rgba(255, 255, 255, 0.57);
      .carousel-card {
        width: 315px;
        height: 171px;
        margin: 10px;
        background: linear-gradient(180deg, #192124 0%, #36434c 100%);
        box-shadow: 0px 0px 18px rgba(190, 233, 241, 0.3);
        border-radius: 10px;
      }
      .react-multi-carousel-track {
      }
    }
  }
`;
