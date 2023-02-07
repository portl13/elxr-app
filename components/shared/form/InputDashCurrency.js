import React from 'react'
import CurrencyInput from 'react-currency-input-field'

function InputDashCurrency({
  required,
  label = '',
  errors,
  name,
  onChange,
  prefix = '$',
  decimalsLimit = 2,
  value,
  disabled = false,
}) {
  return (
    <div className={`input-search mr-0  border-radius-35 w-100  ${disabled ? 'disabled' : 'nodisabled'}`}>
      <label className="w-100 mb-0 upload-info" htmlFor="number">
        <div className="d-flex justify-content-between">
          <span>
            {label}
            {required && <span className="text-red">*</span>}
          </span>
          <span className="invalid-feedback d-inline-block w-auto m-0">
            {errors}
          </span>
        </div>
        <CurrencyInput
          prefix={prefix}
          className="bg-transparent py-0 color-font border-0 w-100 font-size-17"
          decimalsLimit={decimalsLimit}
          name={name}
          value={value}
          onValueChange={onChange}
          disabled={disabled}
        />
      </label>
    </div>
  )
}

export default InputDashCurrency
