import React from 'react'

function InputDashRadio({ values, value, onChange, name, className }) {
  return (
    <>
      {values.map((field) => (
        <div
          key={field.value}
          className={`custom-control custom-radio mr-5 ${className}`}
        >
          <input
            type="radio"
            id={`${field.value}`}
            name={name}
            className="custom-control-input"
            value={field.value}
            checked={field.value === value}
            onChange={onChange}
          />
          <label className="custom-control-label" htmlFor={`${field.value}`}>
            {field.label}
            {field?.description && <span className='d-block font-size-12 text-gray'>{field.description}</span>}
          </label>
        </div>
      ))}
    </>
  )
}

export default InputDashRadio
