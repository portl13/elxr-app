import React from 'react'
import Select from 'react-select'

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: 'black',
    border: 'none',
    color: 'white !important',
    fontColor: 'white',
    padding: 0,
    borderColor: state.isFocused ? 'white' : '',
    boxShadow: 'none',
    '&:hover': {
      borderColor: state.isFocused ? 'white' : '',
    },
  }),
  input: (base) => ({
    ...base,
    padding: 0,
    color: '#fff',
  }),
  singleValue: (provided, state) => {
    const color = '#fff'
    const transition = 'opacity 300ms'
    const padding = 0

    return { ...provided, color, transition, padding }
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
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? 'var(--primary-color)' : 'var(--bg)',
    '&:hover': {
      background: 'grey',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  indicatorsContainer: (base) => ({
    ...base,
    marginTop: -25,
    marginRight: -25,
  }),
}

function InputDashForm({
  required,
  type,
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  options,
  touched = false,
}) {
  return (
    <div
      className={`input-search mr-0 border-radius-35 ${
        type === 'select' ? 'py-0 input-select' : ''
      }`}
    >
      <label className="w-100 upload-info mb-0" htmlFor={name}>
        <div className="d-flex justify-content-between">
          <span>
            {label}
            {required && <span className="text-red">*</span>}
          </span>
          {touched && (
            <span className="invalid-feedback d-inline-block w-auto m-0">
              {error}
            </span>
          )}
        </div>
        {type === 'textarea' && (
          <textarea
            className="bg-transparent border-0 text-white w-100 mr-0"
            cols="30"
            rows="5"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
        {(type === 'text' || type === 'email') && (
          <input
            className="bg-transparent border-0 text-white w-100 mr-0"
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
        {type === 'select' && (
          <Select
            onChange={onChange}
            styles={customStyles}
            options={options}
            value={value}
            className="bg-transparent border-0 text-white w-100 mr-0"
          />
        )}
      </label>
    </div>
  )
}

export default InputDashForm
