import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useAlert } from 'react-alert'

import { TIMEOUT } from '../../../utils/constant';
import { updateGroupDetails } from "../../api/group.api";
import { biographyForm, } from "../../../components/profile-edit/biography.style";
import Loader from '../../../components/loader'


const ManageWrapper = ({ groupDetails, fetchGroupDetals, id, user }) => {
    const alert = useAlert()
    const [values, setValues] = useState({ name: "", description: "", id: null });
    const [setLoad, setLoader] = useState(false);

    function convertToPlain(html) {
        // Create a new div element
        let tempDivElement = document.createElement("div");
        // Set the HTML content with the given value
        tempDivElement.innerHTML = html;
        // Retrieve the text property of the element 
        return tempDivElement.textContent || tempDivElement.innerText || "";
    }
    useEffect(() => {
        if (groupDetails.id) {
            const { name, description } = groupDetails
            setValues({ name: convertToPlain(name), id, description: description.raw })
        }
    }, [groupDetails])
    const updateDetails = () => {
        if (!values.name) {
            alert.error("Please enter group name.", TIMEOUT)
            return
        }
        setLoader(true)
        updateGroupDetails(user, values, id).then(() => {
            setLoader(false)
            fetchGroupDetals(id)
        }).catch(() => {
            setLoader(false)
            alert.errro("Error occured while updating group", TIMEOUT)
        })
    }

    const handleChange = (e, key) => {
        const data = { ...values }
        data[key] = e.target.value
        setValues(data)
    }

    return (
        <form css={biographyForm} className="group-manage-form">
            <div className="form-group">
                <label htmlFor="name" className="group-checkbox-label">Group Name (required)</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={values.name}
                    onChange={(e) => handleChange(e, 'name')}
                    id="name" />
            </div>
            <div className="form-group">
                <label htmlFor="description" className="group-checkbox-label">Group Description</label>
                <textarea
                    className="form-control"
                    name="description"
                    value={values.description}
                    onChange={(e) => handleChange(e, 'description')}
                    id="description" />
            </div>
            <div className="form-group">
                <div className="custom-control custom-checkbox group-checkbox">
                    <input
                        type="checkbox"
                        id="public"
                        className="custom-control-input"
                    />{' '}
                    <label className="custom-control-label group-checkbox-label" htmlFor="public">
                        Notify group members of these changes via email
                    </label>
                </div>
            </div>
            <Button className="button-color" onClick={() => updateDetails()}>Save Changes
                {setLoad ? <Loader /> : ""}</Button>
        </form>
    );
};

export default ManageWrapper;