import { css } from '@emotion/core';
import LupaIcon from '@icons/LupaIcon';
import { inputStyle } from '../variable-css';

const InputSearch = ({ value, setValue, onKeyDown, ...props }) => {

    return (
        <div className='input-search-contain'>
            <span className="input-search-icon">
                <LupaIcon className="input-search-icon-svg" />
            </span>
            <input
                css={css`${inputStyle}`}
                type="search"
                name="search"
                id="header-search"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={onKeyDown}
                {...props}
            />
        </div>
    );
}

export default InputSearch;
