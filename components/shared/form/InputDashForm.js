import React from "react";
import Select from "react-select";
import NonSsrWrapper from '../../no-ssr-wrapper/NonSSRWrapper'


const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "transparent",
    border: "none",
    color: "var(--bg-font) !important" ,
    fontColor: "var(--bg-font)",
    padding: 0,
    borderColor: state.isFocused ? "white" : "",
    boxShadow: "none",
    "&:hover": {
      borderColor: state.isFocused ? "white" : "",
    },
  }),
  input: (base) => ({
    ...base,
    padding: 0,
    color: "var(--bg-font)",
  }),
  singleValue: (provided, state) => {
    const color = "var(--bg-font)";
    const transition = "opacity 300ms";
    const padding = 0;
    return { ...provided, color, transition, padding };
  },
  menu: (base) => ({
    ...base,
    background: "#fff",
    border: "none",
    color: "var(--bg-font)",
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    background: "#fff",
    border: "none",
    color: "var(--bg-font)",
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? "var(--primary-color)" : "#fff",
    "&:hover": {
      background: "#FF67CE",
      color: "white"
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
    color: "var(--bg-font)"
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    marginTop: -25,
    marginRight: -25,
  }),
};

function InputDashForm({
  required,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  label,
  error,
  options = [],
  touched = false,
  isMulti = false,
  readOnly = false,
  autocomplete = "on",
}) {
  return (
      <NonSsrWrapper>
        <div
          className={`input-search mr-0 border-radius-35 ${
            type === "select" ? "py-0 input-select" : ""
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
            {type === "textarea" && (
              <textarea
                className="bg-transparent border-0 color-font w-100 mr-0 font-size-17"
                cols={30}
                rows={5}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
              />
            )}
            {(type === "text" || type === "email" || type === "password" || type === "date" || type === "password" || type === "number") && (
              <input
                className="bg-transparent border-0 color-font w-100 mr-0 font-size-17"
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                readOnly={readOnly}
                autoComplete={autocomplete}
              />
            )}
            {type === "select" && (
              <Select
                isMulti={isMulti}
                onChange={onChange}
                styles={customStyles}
                options={options}
                placeholder={placeholder}
                value={value}
                className="bg-transparent border-0 color-font w-100 mr-0 font-size-17"
              />
            )}
          </label>
        </div>
      </NonSsrWrapper>
  );
}

export default InputDashForm;
