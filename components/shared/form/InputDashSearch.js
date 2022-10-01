import React from 'react'
import LupaIcon from '@icons/LupaIcon'
function InputDashSearch({value, onChange,onKeyDown, name, placeholder ="Search", className =""}) {
  return (
    <div className={`input-search-contain ${className}`} >
      <span className="input-search-icon">
        <LupaIcon className="input-search-icon-svg" />
      </span>
      <input
        className={`input-search ${className}`}
        type="search"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

export default InputDashSearch
