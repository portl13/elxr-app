import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const EventVideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  @media (max-width: 991px){
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
  }
  flex: 1 1 auto;
  .video-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 0 auto;
  }
`;

export const videoEventHeaderCss = css`
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  transition: all 1s;
  max-height: 3.75rem;
  border-bottom: 1px solid var(--primary-color);
  .stream-details {
    align-items: center;
    display: flex;
    svg {
      margin-right: 0.5rem;
    }
  }

  .stream-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 200px;
    margin: 0;
  }

  .stream-involvement {
    align-items: center;
    display: none;
    //display: flex;
    justify-content: flex-end;
  }

  .stream-involvement-item {
    align-items: center;
    display: flex;

    overflow: hidden;
    transition: all 0.5s;
    width: 3.5rem;
    margin-left: 1rem;

    svg {
      margin-right: 0.5rem;
    }
  }

  .stream-info-layout {
    font-family: Helvetica Neue, sans-serif;
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
    display: flex;
    align-items: center;
    color: #ffffff;
    margin-bottom: 0;
  }

  .info {
    width: 100%;
  }

  .info-separator {
    display: flex;
    margin-top: 0.3rem;
  }

  .info-separator-item {
    align-items: center;
    display: flex;
    margin-right: 1rem;
  }

  .title-text {
    margin-bottom: 0;
  }
`;

export const videoEventFooterCss = css`
  display: flex;
  height: 3.75rem;
  justify-content: space-between;
  padding: 0.5rem;
  transition: all 1s;
  border-top: 1px solid var(--primary-color);


  p {
    margin: 0;
  }

  .avatar {
    background-image: url(http://data.portl.live/wp-content/uploads/2021/09/woodlang.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    height: 2.5rem;
    margin-right: 0.5rem;
    width: 2.5rem;
  }

  .streamer-details-container {
    display: flex;
    align-items: center;
  }

  .streamer-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 60px;
  }

  .streamer-name {
    align-items: center;
    display: flex;

    p {
      margin-right: 0.5rem;
      font-family: Helvetica Neue, sans-serif;
      font-weight: bold;
      font-size: 17px;
      line-height: 21px;
      color: #ffffff;
    }
  }

  .streamer-details {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      border-radius: 1rem;
      color: #fff;
      margin-right: 0.5rem;
      padding: 0rem 0.5rem;
      font-family: Helvetica Neue, sans-serif;
      font-size: 11px;
      display: flex;
      align-items: center;
      height: 16px;
    }
  }

  .user-interaction-container {
    align-items: center;
    justify-content: flex-end;
    display: none;
    //display: flex;
  }

  .timer-container {
    margin-right: 1rem;

    > div {
      align-items: center;
      display: flex;
      justify-content: flex-end;

      > p {
        margin-right: 0.5rem;
        font-family: Helvetica Neue, sans-serif;
        font-size: 15px;
        line-height: 18px;
        color: #ffffff;
      }
    }

    /* > div:nth-child(2) {
      > p {
        font-size: 11px;
        opacity: 0.5;
      }
    } */
  }
`;
