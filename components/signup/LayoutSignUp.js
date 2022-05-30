import React from 'react'
import Header from '../layout/Header'
import MenuMobile from '../layout/MenuMobile'
import Meta from '../layout/Meta'
import styled from '@emotion/styled'
import { Container } from 'reactstrap'

const MainStyle = styled.main`
    padding-top: 80px;
    min-height:100%;
    padding-bottom: 3rem;
    .rdw-emoji-modal {
      background: #000000;
    }
`


const LayoutSignUp = ({ children }) => {
  return (
    <>
      <Meta />
      <Header />
      <MainStyle>
        <Container fluid={true}>
          { children }
        </Container>
      </MainStyle>
    </>
  )
}

export default LayoutSignUp
