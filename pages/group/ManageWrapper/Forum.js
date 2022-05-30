import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "reactstrap";
import { useAlert } from 'react-alert'

import { TIMEOUT } from '../../../utils/constant';
import Loader from '../../../components/loader';
import { updateGroupSetting, getGroupSettings } from "../../api/group.api";

const Forum = ({ id, user, groupDetails, fetchGroupDetals, innerNav }) => {
    const alert = useAlert()
    const [forumCheck, setForumCheck] = useState(false);
    const [setLoad, setLoader] = useState(false);
    const handleSaveChanges = () => {
        setLoader(true)
        let formData = `fields[bbp-edit-group-forum]=${forumCheck ? 1 : 0}&`;
        updateGroupSetting(user, formData, id, "forum").then(() => {
            fetchGroupDetals(id)
            setLoader(false)
            alert.success("Group forum update successfully", TIMEOUT)
        }).catch(() => {
            setLoader(false)
            alert.error("Internal server error", TIMEOUT)
        })
    }
    useEffect(() => {
        if (groupDetails.id && innerNav === "forum") {
            setForumCheck(groupDetails.enable_forum)
        }
    }, [groupDetails, innerNav])

    return (
        <>
            <div className="main-wrapper manage-select-panel">
                <h5>Group Forum Settings</h5>
                <p>Connect a discussion forum to allow members of this group to communicate in a structured, bulletin-board style
                    fashion. Unchecking this option will not delete existing forum content.</p>
                <Form>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox group-checkbox">
                            <input
                                type="checkbox"
                                id="public"
                                defaultChecked={forumCheck}
                                checked={forumCheck}
                                className="custom-control-input"
                                onChange={() => setForumCheck(!forumCheck)} />{' '}
                            <label className="custom-control-label group-checkbox-label" htmlFor="public">
                                Yes, I want this group to have a discussion forum.
                            </label>
                        </div>
                    </div>
                </Form>
                <Button className="delete-button" onClick={() => handleSaveChanges()}>Save Setting
                    {setLoad ? <Loader /> : ""}</Button>
            </div>
        </>
    );
};

export default Forum;