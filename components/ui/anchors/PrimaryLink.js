import { css } from '@emotion/core'
import { roundedBotton } from '../variable-css';


const PrimaryLink = ({ value, size, textTransform }) => {
    return (
        <a
            css={css`${roundedBotton};
        text-transform: ${!textTransform ? 'uppercase' : textTransform};
    `}

            className={`btn btn-primary ${size ? 'btn-' + size : ''}`}>
            {value}
        </a>
    );
}

export default PrimaryLink;
