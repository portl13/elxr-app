import { css } from "@emotion/core"
import { Col } from "reactstrap"

const RightSidebar = ({ children, md, lg }) => {
    return (
        <Col css={css`
                z-index:10;
                background-color: #000;
                @media(max-width:1023px){
                    display:none;
                }
            `}
            lg={lg}
            md={md}>
            {children}
        </Col>
    )
}

export default RightSidebar
