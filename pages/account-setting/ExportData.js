import React from "react";
import { Button } from "reactstrap";
import { biographyForm, } from "../../components/profile-edit/biography.style";
import Loader from '../../components/loader'

const ExportData = ({ handleUpdateSetting, setLoad, tabData }) => {
    return (
        <form css={biographyForm} className="group-manage-form">
            <h2>Request an export of your data</h2>
            <div className="warning-section">
                <span><em>!</em></span>
                <p>You may download a copy of all data you have created on this platform.
                    Click the button below to start a new request. An email will be
                    sent to you to verify the request. Then the site admin will review your request
                    and if approved, a zip file will be generated and emailed to you.</p>
            </div>
            <Button className="button-color" onClick={() =>
                handleUpdateSetting(`fields[${tabData[0]?.name}]=1`)}>
                Request data export{" "}{setLoad ? <Loader /> : ""}</Button>
        </form>
    );
};

export default ExportData;
