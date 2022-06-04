import { css } from "@emotion/core";

export const columnsHead = css`
  .golive-table {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .row-head {
    width: 100%;
    display: none;
    color: var(--typo);
    font-size: 14px;
    align-items: center;
    border-bottom: 1px solid var(--typo);
    @media (min-width: 992px) { 
        display: flex;
    }
    svg {
      width: 15px;
    }
  }
  .main-head {
    width: 100%;
    display: flex;
    color: var(--typo);
    font-size: 16px;
    border-bottom: 1px solid var(--typo);
    align-items: flex-start;
    padding: 10px 8px;
  }
  .columns-head {
    width: 100%;
    display: flex;
    flex-direction: column;
    color: var(--typo);
    font-size: 14px;
    border-bottom: 1px solid var(--typo);
    align-items: flex-start;
    @media (min-width: 992px) {
      display: flex;
      flex-direction: row;
    }
  }
  .events-div-1 {
    width: 100%;
    display: none;
    padding: 10px 5px;
    @media (min-width: 992px) { 
        width: 6%;
        display: flex;
    }
    input {
      width: 20px;
      height: 20px;
    }
  }
  .events-div-2 {
    width: 100%;
    display: flex;
    padding: 10px 5px;
    @media (min-width: 992px) {
      width: 39%;
    }
    img {
      height: 85px;
      width: 150px;
      border-radius: 3px;
      margin: 0 15px 0 0;
    }
    .events-text-tag {
      width: calc(100% - 160px);
      display: flex;
      flex-direction: column;
      word-break: break-word;
      span {
        color: #929292;
        font-size: 12px;
      }
    }
  }
  .events-div-3 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    word-break: break-word;
    @media (min-width: 992px) {
      width: 15%;
      justify-content: none;

    }
    @media (max-width: 991px) {         
        &::before{
            content: attr(data-label);
        }
    }
  }
  .events-div-4 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    flex-direction: row;
    @media (min-width: 992px) { 
        width: 15%;
        justify-content: none;
    }
    @media (max-width: 991px) {         
        &::before{
            content: attr(data-label);
        }
    }
    span {
      color: #929292;
      font-size: 12px;
    }
    
  }
  .events-div-5 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    @media (min-width: 992px) { 
        width: 15%;
        justify-content: none;
    }
    @media (max-width: 991px) {         
        &::before{
            content: attr(data-label);
        }
    }
    &.active {
      svg {
        color: #ffffff;
      }
    }
    svg {
      width: 15px;
      color: #41953a;
      margin: 0 5px 0 0;
    }
  }
  .events-div-6 {
    width: 100%;
    display: flex;
    padding: 10px 5px;
    justify-content: space-between;
    @media (min-width: 992px) { 
        width: 15%;
        justify-content: none;
    }
    @media (max-width: 991px) {         
        &::before{
            content: attr(data-label);
        }
    }
    svg {
      width: 15px;
      color: #ffffff;
      margin: 0 5px;
      cursor: pointer;
    }
  }
`; 
