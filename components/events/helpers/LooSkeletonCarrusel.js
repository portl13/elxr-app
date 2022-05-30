import React from 'react';
import { Col } from 'reactstrap';
import CardSkeleton from './CardSkeleton';

function LooSkeletonCarrusel({ numberCard = 3 }) {

    const loading = [...Array(numberCard).keys()]

    return (
        <>
            {loading.map(load => (
                <Col xs="12" md="6" lg="4" key={load}>
                    <CardSkeleton />
                </Col>
            ))}
        </>
    );
}
export default LooSkeletonCarrusel;
