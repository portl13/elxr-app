import React from 'react'
import { css } from '@emotion/core'
const style404 = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .page-404 {
    font-size: 150px;
    line-height: 1;
  }
  .not-found {
    font-size: 40px;
  }
`

export default function PageError404() {
  return (
    <div css={style404}>
      <div className={'container-404'}>
        <h2 className={'page-404'}>404</h2>
        <p className={'not-found'}>page not found</p>
      </div>
    </div>
  )
}
