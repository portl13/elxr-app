import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { getmemberDetails, getblockMemberList } from "../../pages/api/member.api";

const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "black",
        border: "none",
        color: "white !important",
        fontColor: "white",
        borderColor: state.isFocused ? "white" : "",
        boxShadow: 'none',
        "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "white" : ""
        }
    }),
    input: base => ({
        ...base,
        color: "#fff"
    }),
    menu: base => ({
        ...base,
        background: "black",
        border: "none",
        color: "white",
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0
    }),
    menuList: base => ({
        ...base,
        background: "black",
        border: "none",
        color: "white",
        // kill the white space on first and last option
        padding: 0,
    }),
    option: base => ({
        ...base,
        "&:hover": {
            // Overwrittes the different states of border
            background: "grey"
        }
    }),
    multiValue: (styles) => {
        return {
            ...styles,
            backgroundColor: "#4d5c6d !important",
            borderColor: "#4d5c6d !important",
            color: "white !important",
            padding: " 3px 5px",
            alignItems: 'center',
            marginRight: '10px',
            marginBottom: '5px',
        }
    },
    multiValueLabel: (styles) => ({
        ...styles,
        color: "white !important",
        fontSize: '14px',
        letterSpacing: '-.24px',
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

const NewMessage = ({ user, setSelectedUser, selectedUser }) => {
    const [members, setMemberList] = useState([])
    const [selectLoad, setselectLoad] = useState(false)
    const [blockedList, setBlockedList] = useState([])


    useEffect(() => {
        getblockMemberList(user, { per_page: 100 }).then((res) => {
            const data = res.data.map((e) => e.id)
            data.push(user?.id)
            setBlockedList(data)
        })
    }, [])

    const handleSearch = (val) => {
        const data = { per_page: 20, page: 1, scope: "all", search: val, exclude: blockedList }
        setselectLoad(true)
        getmemberDetails(user, data).then((res) => {
            setselectLoad(false)
            const users = res.data.map((e) => { return { value: e.id, label: e.name } })
            setMemberList(users.length ? users : [])
        }).catch(() => setselectLoad(false))
    }
    const handleSelectchange = (e) => {
        setselectLoad(false);
        setSelectedUser(e);
    }
    return (
        <>
            <div className="single-message-thread-header">
                <div className="thread-participants">
                    <div className="participants-name">
                        New Message
                    </div>
                </div>
            </div>
            
        {/* <div className="message-thread-list new-message">
            <Select
                isMulti
                styles={customStyles}
                onInputChange={handleSearch}
                onChange={handleSelectchange}
                options={members}
                placeholder="Type the names of one or more people"
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
            />
        </div> */}
        </>
    );
};

export default NewMessage;
