import React from 'react'
import { css } from '@emotion/core'
import { faTiktok } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TikTokIcon() {
  return (
    <>
        <FontAwesomeIcon css={css`
            width: 25px !important;
            height: 25px !important;
            color: #000 !important;
        `} icon={faTiktok} />
    </>
  )
}

export default TikTokIcon
