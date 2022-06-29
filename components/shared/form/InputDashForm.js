import React from 'react'

function InputDashForm({
  required,
  type,
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
}) {
  return (
    <div className="input-search mr-0 border-radius-35">
      <label className="w-100 upload-info mb-0" htmlFor={name}>
        <div className="d-flex justify-content-between">
          <span>
            {label}
            {required && <span className="text-red">*</span>}
          </span>
          <span className="invalid-feedback d-inline-block w-auto m-0">
            {error}
          </span>
        </div>
        <input
          className="bg-transparent border-0 text-white w-100 mr-0"
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
    </div>
  )
}

export default InputDashForm
