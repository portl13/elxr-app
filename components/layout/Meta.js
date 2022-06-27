import React from 'react'
import Head from 'next/head'
import { Global } from '@emotion/core'
import { metaStyle } from './Meta.style'

const Meta = () => {
  return (
    <>
      <Global styles={metaStyle} />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;600&family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    </>
  )
}

export default Meta
