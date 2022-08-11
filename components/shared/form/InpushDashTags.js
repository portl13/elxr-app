import React, { useState } from 'react'

import CreatableSelect from 'react-select/creatable'

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
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: 'transparent',
      border: 'solid 1px var(--white-color)',
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'var(--white-color)',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    ':hover': {
      backgroundColor: 'transparent',
      color: 'var(--danger)',
    },
  }),
}

const components = {
  DropdownIndicator: null,
}

const createOption = (label) => ({
  label,
  value: label,
})

const InputDashTags = ({
  placeholder = 'Type something and press enter...',
  value,
  setValue,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(false)

  const handleChange = (value) => {
    setError(false)
    if (value.length >= 3) {
        setError(true)
        return
    }
    setValue(value)
  }
  const handleInputChange = (inputValue) => {
    setError(false)
    if (value.length >= 3) {
        setError(true)
        return
    }
    setInputValue(inputValue)
  }
  const handleKeyDown = (event) => {
    if (!inputValue) return
    if (value.length >= 3) {
        setError(true)
        event.preventDefault()
        return
    }
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setInputValue('')
        setValue([...value, createOption(inputValue)])
        event.preventDefault()
    }
  }

  return (
    <div className="input-search mr-0 border-radius-35 py-0 input-select">
      <label className="w-100 upload-info mb-0">
        <div className="d-flex justify-content-between">
          <span>Tags</span>
          {error && (
            <span className="invalid-feedback d-inline-block w-auto m-0">
              3 maximum labels
            </span>
          )}
        </div>
        <CreatableSelect
          components={components}
          inputValue={inputValue}
          isClearable
          isMulti
          styles={customStyles}
          menuIsOpen={false}
          onChange={handleChange}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={value}
          className="bg-transparent border-0 w-100 mr-0"
          placeholder={placeholder}
        />
      </label>
    </div>
  )
}

export default InputDashTags
