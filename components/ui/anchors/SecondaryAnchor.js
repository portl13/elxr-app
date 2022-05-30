import { css } from '@emotion/core'
import { roundedBotton } from '../variable-css';


const SecondaryAnchor = ({ value }) => {
    return (
        <a
            css={css`${roundedBotton}`}
            className="btn btn-secondary">
            {value}
        </a>
    );
}

export default SecondaryAnchor;
