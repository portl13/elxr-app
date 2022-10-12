import { css } from '@emotion/core';
import { inputStyle } from '../variable-css'

const InputSearch = () => {
    return (
        <li className="nav-item">
            <input
                css={css`
                ${inputStyle}
            `}
                placeholder="Search PORTL"
                type="text"
                name="search"
                id="search" />
        </li>
    );
}

export default InputSearch;
