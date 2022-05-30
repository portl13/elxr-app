import { css } from '@emotion/core';
import { Container } from 'reactstrap'

const ContainerResponsive = ({ children }) => {
    return (
        <Container
            css={css`
        @media(max-width: 767px){
            padding-left: 0;
            padding-right: 0;
        }`}>
            {children}
        </Container>
    );
}

export default ContainerResponsive;
