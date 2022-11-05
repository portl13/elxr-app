import { css } from '@emotion/core'
import React from 'react'
import BounceLoader from 'react-spinners/BounceLoader'

const BlockUiStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  cursor: progress;
  h4 {
    text-transform: uppercase;
    font-size: 1.2rem;
    margin-top: 5px;
  }
`
export const containerBlockUi = css`
  position: relative;
`

const BlockUi = ({ text = '', color = 'var(--primary-color)', isFixed = true }) => {
  return (
    <div css={BlockUiStyle} style={{
        position: isFixed ? 'fixed' : 'absolute'
    }}>
      <BounceLoader loading={true} color={color} />
      {text && <h4>{text}</h4>}
    </div>
  )
}

export default BlockUi
