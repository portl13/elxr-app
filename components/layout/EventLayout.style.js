import { css } from "@emotion/core";

export const EventTab = css`
    width: 100%;
    display: flex;
    margin: 0 0 30px 0;
    ul {
      padding: 0;
      margin: 0;
      width: 100%;
      display: flex;
      li {
        padding: 10px 30px 10px 0;
        width: auto;
        font-size: 14px;
        color: var(--typo);
        list-style: none;
        margin: 0 5px 0 0;
        cursor: pointer;
        &.active {
          color: var(--primary-color);
          border-bottom: 1px solid #ffffff;
          a {
            color: var(--primary-color);
          }
        }
        &:hover {
          color: var(--primary-color);
          border-bottom: 1px solid #ffffff;
          a {
            color: var(--primary-color);
          }
        }
        a {
          color: #ffffff;
        }
      }
  }`