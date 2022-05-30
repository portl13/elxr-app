import React, { useState } from "react";
import { Button } from "reactstrap";
import { biographyForm, } from "../../components/profile-edit/biography.style";
import Loader from '../../components/loader'


const DeleteAccount = ({ handleUpdateSetting, setLoad, tabData, user }) => {
    const [accntDelete, setCheckBox] = useState(false);
    return (
        <form css={biographyForm} className="group-manage-form">
            <h2>Delete account</h2>
            <div className="delete-section">
                <span><em>!</em></span>
                <p>Deleting your account will delete all of the content you have created. It will be completely irrecoverable.</p>
            </div>
            <p></p>
            <div className="form-group">
                <div className="custom-control custom-checkbox group-checkbox">
                    <input
                        type="checkbox"
                        id="accnt-del"
                        className="custom-control-input"
                        defaultChecked={accntDelete}
                        onChange={() => setCheckBox(!accntDelete)}
                    />{' '}
                    <label className="custom-control-label group-checkbox-label" htmlFor="accnt-del">
                        I understand the consequences.
                    </label>
                </div>
            </div>
            <Button className="button-color" disabled={!accntDelete}
                onClick={() =>
                    handleUpdateSetting(`fields[${tabData[0]?.name}]=1&fields[${tabData[1]?.name}]=${user.email}`)}>Delete account
                {setLoad ? <Loader /> : ""}</Button>
        </form>
    );
};

export default DeleteAccount;
