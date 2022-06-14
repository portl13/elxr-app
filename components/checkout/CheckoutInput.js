import React from 'react'
import { css } from '@emotion/core'
import Select from 'react-select'

const inputCss = css`
  background-color: transparent;
  color: var(--typo);
  border: 1px solid var(--typo);
  &[readonly] {
    background: var(--white-color);
  }
`

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: 'black',
    border: '1px solid #eee',
    color: 'white !important',
    fontColor: 'white',
    borderColor: state.isFocused ? 'white' : '',
    boxShadow: 'none',
    '&:hover': {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? 'white' : '',
    },
  }),
  input: (base) => ({
    ...base,
    color: '#fff',
  }),
  singleValue: (provided, state) => {
    const color = '#fff'
    const transition = 'opacity 300ms'

    return { ...provided, color, transition }
  },
  menu: (base) => ({
    ...base,
    background: 'black',
    border: 'none',
    color: 'white',
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    background: 'black',
    border: 'none',
    color: 'white',
    // kill the white space on first and last option
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? 'var(--primary-color)' : 'var(--bg)',
    '&:hover': {
      // Overwrittes the different states of border
      background: 'grey',
    },
  }),
}

function CheckoutInput({
  label = 'label',
  isRequired = false,
  handlerChange,
  value,
  isValid = true,
  name,
  type = 'text',
  className,
  options = [],
  isLabel = true,
  messageError
}) {
  return (
    <div className={className}>
      {isLabel && (
        <label
          className={`d-block ${!isValid ? 'invalid-feedback' : ''}`}
          htmlFor="first_name"
        >
          {label} {isRequired && <span className="text-danger">*</span>}
        </label>
      )}
      {type === 'select' && (
        <Select
          onChange={handlerChange}
          styles={customStyles}
          options={options}
          value={value}
        />
      )}
      {type !== 'select' && (
        <input
          css={inputCss}
          onChange={handlerChange}
          value={value}
          className={`w-100 form-control ${!isValid ? 'is-invalid' : ''}`}
          type={type}
          name={name}
        />
      )}
      {!isValid && (
        <div className="invalid-feedback d-block">
          {messageError ? messageError :'this field is required!'}
        </div>
      )}
    </div>
  )
}

export default CheckoutInput
