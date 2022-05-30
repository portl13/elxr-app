import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { biographyForm, } from "../../components/profile-edit/biography.style";
import Loader from '../../components/loader';

const GroupInvites = ({ handleUpdateSetting, setLoad, tabData }) => {
    const [restrictGroup, setCheckBox] = useState(false);
    useEffect(() => {
        if (tabData[0]?.value)
            setCheckBox(tabData[0]?.value === 1)
    }, [tabData])
    return (
        <form css={biographyForm} className="group-manage-form">
            <h2>Group Invites</h2>
            <div className="warning-section">
                <span><em>!</em></span>
                <p>Currently every member of the community can invite you to join their groups.
                    Optionally, you may restrict group invites to your connections only.</p>
            </div>
            <p></p>
            <div className="form-group">
                <div className="custom-control custom-checkbox group-checkbox">
                    <input
                        type="checkbox"
                        id="public"
                        className="custom-control-input"
                        defaultChecked={restrictGroup}
                        onChange={() => setCheckBox(!restrictGroup)}
                    />{' '}
                    <label className="custom-control-label group-checkbox-label" htmlFor="public">
                        Restrict Group invites to members who are connected.
                    </label>
                </div>
            </div>
            <Button className="button-color" onClick={() =>
                handleUpdateSetting(`fields[${tabData[0]?.name}]=${restrictGroup ? 1 : ""}`)}>
                Save Changes{" "}{setLoad ? <Loader /> : ""}</Button>
        </form>
    );
};

export default GroupInvites;
