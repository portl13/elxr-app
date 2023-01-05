import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { inputStyle } from '../variable-css'

const InputSearch = ({ ...props }) => {
    return (
        <div>
            {/* <FontAwesomeIcon icon={faMusic} /> */}
            <input 
                css={css`${inputStyle}`}
                type="text"
                name="search"
                id="search"
                {...props}
            />
        </div>
    );
}

export default InputSearch;
