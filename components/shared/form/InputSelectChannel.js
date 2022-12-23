import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { genericFetch } from "@request/dashboard";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "transparent",
    border: "none",
    color: "var(--bg-font)",
    fontColor: "white",
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
    background: "rgba(29,51,91,.8)",
    border: "none",
    color: "white",
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    background: "rgba(29,51,91,.8)",
    border: "none",
    color: "white",
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? "var(--primary-color)" : "rgba(29,51,91,.8)",
    "&:hover": {
      background: "grey",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
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

const url = `${process.env.apiV2}/channels`;

function InputSelectChannel({
  required,
  name,
  onChange,
  placeholder,
  label,
  error,
  touched = false,
  value = null,
}) {
  const limit = 50;
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [options, setOptions] = useState([]);
  const [channel, setChannel] = useState({});

  const { data: channels } = useSWR(
    token
      ? [`${url}?author=${user?.id}&page=${1}&per_page=${limit}`, token]
      : null,
    genericFetch
  );

  useEffect(() => {
    if (channels) {
      if (channels?.channels.length === 0) return;
      const options = channels?.channels?.map((channel) => ({
        value: channel.id,
        label: channel.channel_name,
      }));

      setOptions(options);
    }
  }, [channels]);

  useEffect(() => {
    if (value) {
      const channel = channels?.channels?.filter((channel) => channel.id === Number(value));
      if (channel.length > 0){
        setChannel({
          value: channel[0].id,
          label: channel[0].channel_name,
        })
      }
    }
  }, [value]);

  function handlerChange(data) {
    onChange(data);
    if(!value) setChannel(data)
  }

  return (
    <div className="input-search mr-0 border-radius-35 py-0 input-select">
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
        <Select
          onChange={handlerChange}
          styles={customStyles}
          options={options}
          placeholder={placeholder}
          value={channel}
          className="bg-transparent border-0 color-font w-100 mr-0"
        />
      </label>
    </div>
  );
}

export default InputSelectChannel;
