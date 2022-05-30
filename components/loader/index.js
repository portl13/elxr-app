
import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = ({ color = "" }) => {
    return (
        <Spinner style={{ width: '1.2rem', height: '1.2rem' }} color={color} />
    );
}
export default Loader
