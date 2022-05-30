import styled from '@emotion/styled';
import { Col, Container, Row } from 'reactstrap'
import SidebarNavigation from '../sidebar/SidebarNavigation';

const MainStyle = styled.main`
    margin-top: 2rem;
    padding-top: 75px;
    min-height:100%;
    padding-bottom: 3rem;
`

const Main = ({ children }) => {
    return (
        <MainStyle>
            <Container>
                <Row>

                    <SidebarNavigation />

                    <Col >
                        <Row>
                            {children}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </MainStyle>
    );
}

export default Main;
