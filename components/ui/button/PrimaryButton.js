import { Button } from 'reactstrap';
import { css } from '@emotion/core'
import { roundedBotton } from '../variable-css';


const PrimaryButton = ({ value, handleClick, className }) => {
    return (
        <Button
            className={className}
            css={css`${roundedBotton}`}
            color="primary"
            onClick={() => handleClick()}>
            {value}
        </Button>
    );
}

export default PrimaryButton;
