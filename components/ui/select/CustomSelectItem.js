import React from 'react'
import { css } from '@emotion/core'

const DefaultRenderer = css`
  display: flex;
  justifycontent: space-between;
  alignitems: center;
  paddingleft: 0.5rem;
  paddingright: 0.5rem;
  & span {
    display: block;
    marginright: auto;
  }
  & input,
  & span {
    verticalalign: middle;
    margin: 0;
    display: block;
  }
  span {
    display: inline-block;
    paddingleft: 5px;
  }
  &.disabled {
    opacity: 0.5;
  }
`

export const customValueRenderer = (selected, _options) => {
  return selected.length ? `Categories (${selected.length})` : 'Categories'
}

const CustomSelectItem = ({ checked, option, onClick, disabled }) => {
  return (
    <div
      className={`${DefaultRenderer} item-renderer ${disabled && 'disabled'}`}
    >
      <span>{option.label}</span>
      <label className="custom-toggle">
        <input
          className="d-none"
          onChange={onClick}
          checked={checked}
          tabIndex={-1}
          disabled={disabled}
          type="checkbox"
        />
        <span className="custom-toggle-slider rounded-circle" />
      </label>
    </div>
  )
}

export default CustomSelectItem
