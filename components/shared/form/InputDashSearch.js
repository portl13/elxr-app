import React from 'react'
import LupaIcon from '@icons/LupaIcon'
function InputDashSearch({value, onChange, name, placeholder ="Search"}) {
  return (
    <div className="input-search-contain">
      <span className="input-search-icon">
        <LupaIcon className="input-search-icon-svg" />
      </span>
      <input
        className="input-search"
        type="search"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputDashSearch
