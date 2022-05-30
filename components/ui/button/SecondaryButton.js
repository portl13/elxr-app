import { css } from '@emotion/core'
import { roundedBotton } from '../variable-css'
import { Button } from 'reactstrap'


const SecondaryButton = ({ value, handleClick }) => {
    return (
        <Button
            css={css`
                ${roundedBotton}
            `}
            color="secondary"
            onClick={() => handleClick()}
        >{value}</Button>
    );
};

export default SecondaryButton;
