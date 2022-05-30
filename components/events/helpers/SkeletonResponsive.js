import React from 'react'
import { Col } from 'reactstrap';
import CardSkeleton from './CardSkeleton';

function SkeletonResponsive() {
    return (
        <>
            <Col xs="12" md="6" lg="4" key="one">
                <CardSkeleton />
            </Col>
            <Col className="d-none d-md-block" xs="12" md="6" lg="4" key="two">
                <CardSkeleton />
            </Col>
            <Col className="d-none d-lg-block" xs="12" md="6" lg="4" key="tree">
                <CardSkeleton />
            </Col>
        </>
    );
}

export default SkeletonResponsive;
