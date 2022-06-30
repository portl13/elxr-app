import React from 'react'

function InputDashCheck({
    name,
    label,
    value,
    onChange
}) {
  return (
    <div className="custom-control custom-checkbox mr-5">
      <input
        type="checkbox"
        className="custom-control-input"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        checked={value}
      />
      <label className="custom-control-label" htmlFor={name}>
        {label}
      </label>
    </div>
  )
}

export default InputDashCheck
