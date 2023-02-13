import { css } from '@emotion/core'

export const roundedBotton = css`
  border-radius: 5px;
  cursor: pointer;
`;

export const inputStyle = css`
  display: block;
  width: 100%;
  height: calc(1.5em + 1.25rem + 2px);
  padding: 0.5rem 2rem 0.5rem 3rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bg-font);
  background-color: var(--bg-search);
  background-clip: padding-box;
  border: 1px solid var(--bg-search);
  border-radius: 25px;
  box-shadow: none;
  -webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  ::placeholder {
    color: var(--color-search);
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: var(--color-search);
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: var(--color-search);
  }
`;
