import { css } from "@emotion/core";
import { Col, Row } from "reactstrap";
import Link from 'next/link';

const HeaderCarrousel = ({ text, link, hidelink }) => {
    return (
        <div className="online-event-tab-section">
            <Row className="main-event-header">
                <Col xs="6">
                    <h2
                        css={css`font-size:1.4rem;`}
                    >{text}</h2>
                </Col>
                <Col className="text-right d-flex justify-content-end align-items-center show-tag" xs="6">
                    {hidelink ? "" : <Link href={link}>
                        <a >
                            See All
                        </a>
                    </Link>}
                </Col>
            </Row>
        </div>
    );
}
export default HeaderCarrousel;
