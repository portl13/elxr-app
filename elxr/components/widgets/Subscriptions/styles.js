import { css } from "@emotion/core";

export const cardBox = css`
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
  .info-box {
    padding: 10px 0 0 10px;
    font-family: "Quicksand",serif;
  }
  .description-text {
    font-family: "Quicksand", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;
    text-align: left;
    color: rgba(0, 0, 0, 0.6);
    max-width: 95%;
    p {
      font-size: 14px;
      font-weight: 400;
      white-space: normal;
      text-overflow: initial;
      overflow: initial;
      margin: 0;
    }
  }
`;
