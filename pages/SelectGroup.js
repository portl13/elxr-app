import React, { useState } from "react";
import Select, { components } from "react-select";

const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "#1b1b1b !important",
        color: "white !important",
        width: 270,
        minWidth: 270,
        maxWidth: 500,
        border: "1px solid white",
        fontColor: "white !important",
        height: 35,
        minHeight: 35,
        boxShadow: 'none',
        borderColor: state.isFocused ? "white" : "",
        "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "white" : ""
        }
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }),
    input: base => ({
        ...base,
        color: "white !important"
    }),
    menu: base => ({
        ...base,
        background: "black !important",
        border: "none",
        color: "white !important",
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        background: "black !important",
        border: "none",
        color: "white !important",
        // kill the white space on first and last option
        padding: 0,
    }),
    option: base => ({
        ...base,
        background: "black !important",
        color: "white !important",
        "&:hover": {
            // Overwrittes the different states of border
            background: "grey !important"
        }
    }),
    singleValue: (styles) => ({
        ...styles,
        color: "white !important",
    }),
};
export const MenuList = prop => {
    return (
        <components.MenuList  {...prop}>{prop.children}</components.MenuList>
    );
};
export const Option = props => {
    return (<components.Option {...props} />);
};
export const Menu = props => {
    return (<components.Menu {...props} />);
};

const SelectGroup = ({
    profile, group, handleSearch,
    selectLoad, selectGroup, setselectGroup,
    setselectLoad, cssStyle
}) => {
    const [searchVal, setSearchValue] = useState("")
    const handleInputChnage = (e) => {
        setselectLoad(true)
        handleSearch(e)
        setSearchValue(e)
    }
    if (profile !== "group")
        return <></>
    return (
        <li>
            <Select
                onInputChange={handleInputChnage}
                inputValue={searchVal}
                value={selectGroup}
                onChange={(e) => { setselectLoad(false); setselectGroup(e); }}
                options={group}
                isClearable={true}
                placeholder="Start typing to search group"
                isLoading={selectLoad}
                onFocus={() => setselectLoad(false)}
                noOptionsMessage={() => null}
                components={{
                    Menu,
                    MenuList,
                    Option,
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                }}
                styles={customStyles}
            />
        </li>
    );
};

export default SelectGroup;
