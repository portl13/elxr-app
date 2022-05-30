import { css } from '@emotion/core'

export const roundedBotton = css`
  border-radius: 5px;
  cursor: pointer;
`;

export const inputStyle = css`
  display: block;
  width: 100%;
  height: calc(1.5em + 1.25rem + 2px);
  padding: 0.625rem 1.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #eee;
  background-color: #1c1c1c;
  background-clip: padding-box;
  border: 1px solid #1c1c1c;
  border-radius: 5px;
  box-shadow: none;
  -webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  ::placeholder {
    color: #eee;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #eee;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #eee;
  }
`;
