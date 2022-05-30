import styled from '@emotion/styled'

export const StoreWrapperCard = styled.div`
  background: transparent !important;
  transition: none;
  box-shadow: none !important;
  color: var(--typo);
  position: relative;
  h2 {
    font-size: 20px;
    color: var(--typo);
  }
  h2 a {
    color: var(--white-color);
  }
  .store-content {
    max-width: 100%;
    border-bottom: 3px solid var(--primary-color);
    position: relative;
  }
  .store-data{
    position: relative;
    z-index: 1;
  }
  .store-content::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: rgb(0, 0, 0, .4);;
  }
  .store-content .store-info {
    position: relative;
    opacity: 0.75;
    height: 200px !important;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .store-footer {
    background: transparent;
    width: 100%;
    min-height: 80px !important;
    height: 80px !important;
    border-top: 1px solid var(--primary-color);
    position: relative;
    padding: 15px 20px;
  }
  .store-avatar {
    width: 75px;
    height: 75px;
    top: -60px;
    left: 10px;
    padding: 6px;
    background: var(--bg);
    margin-top: 10px;
    position: absolute;
    border-radius: 50%;
    border: 1px solid var(--primary-color);
    z-index: 2;
    overflow: hidden;
  }
  .store-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .store-avatar span{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .store-data-container {
    padding-top: 0;
    padding: 15px 0 0 0;
    position: absolute;
    top: -190px;
    width: 100%;
  }

  .wcfmmp-visit-store {
    width: auto !important;
    top: 23px;
    border: none;
    border-bottom: 1px solid var(--primary-color);
    box-shadow: none;
    line-height: 32px;
    text-decoration: none;
    bottom: 18px;
    padding: 0 10px;
    right: 10px;
    height: 30px;
    min-width: 50px;
    background: var(--primary-color);
    color: #fff;
    border-radius: 5px;
    display: inline-block;
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    position: absolute;
    font-size: 14px;
    font-weight: 700;
    span {
      display: none;
    }
  }
  .skeleton-store {
    top: 23px;
    right: 10px;
    position: absolute;
  }

`
