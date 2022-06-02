import React from 'react';
import {faTimes } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@emotion/core';

const bottomSheetCss = css`
  @media screen and (min-width: 1200px) {
    display: none;
  }
  background-color: var(--dark-color);
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 1;
  padding: 30px;
  transform: translateY(100%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-bottom: 45px;
  &.open {
    transform: translateY(0);
  }
  .bottom-sheet-line {
    border: 1px solid #3b3b3b;
  }
  .bottom-sheet-title {
    font-size: 20px;
    margin: 0;
  }
  .bottom-sheet-container {
    background-color: #1b1b1b;
    list-style: none;
    margin-bottom: 0;
    padding-left: 0;
    border-radius: 10px;
    padding: 0 20px;
  }
  .bottom-sheet-item {
    padding: 20px 0;
    border-bottom: 1px solid #3b3b3b;
    &:last-of-type {
      border: none;
    }
    &.active{
        color: var(--primary-color);
    }
  }
  .bottom-sheet-close {
    display: flex;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background-color: rgba(59, 59, 59, 0.5);
    svg {
      width: 10px !important;
      margin: 0 !important;
    }
  }
`

const BottomSheet = ({
  routers,
  title,
  open,
  setOpen,
  handleRedirect,
  innerNav,
  type = 'golive',
}) => {
  return (
    <div css={bottomSheetCss} className={open ? 'open' : ''}>
      <h4 className="bottom-sheet-title d-flex justify-content-between">
        {title}
        <span onClick={() => setOpen(!open)} className="bottom-sheet-close">
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </h4>
      <hr className="w-100 my-4 bottom-sheet-line" />
      <ul className="bottom-sheet-container">
        {routers.map((route) => (
          <li
            key={route.value}
            onClick={() => handleRedirect(type, route.value)}
            className={`bottom-sheet-item ${
              innerNav === route.value && 'active'
            }`}
          >
            {route.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BottomSheet