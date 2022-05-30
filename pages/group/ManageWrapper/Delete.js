import React, { useState } from "react";
import { Button, Form } from "reactstrap";
import { useAlert } from 'react-alert'
import Router from 'next/router';

import { TIMEOUT,getProfileRoute } from '../../../utils/constant';
import { deleteGroup } from "../../api/group.api";
import Loader from '../../../components/loader';

const Setting = ({ id, user }) => {
    const alert = useAlert()
    const [deleteCheck, setDeleteCheck] = useState(false);
    const [setLoad, setLoader] = useState(false);
    const handleDelete = () => {
        setLoader(true)
        deleteGroup(user, { id: Number(id), delete_group_forum: true }, id).then(() => {
            setLoader(false)
        }).catch(() => {
            setLoader(false)
            Router.push(getProfileRoute(user.name, user.id, 'community', 'group'))
            alert.success("Group deleted successfully", TIMEOUT)
        })
    }
    return (
        <>
            <Form>
                <div className="delete-section">
                    <span><em>!</em></span>
                    <p>WARNING: Deleting this group will completely remove ALL content associated with it. There is no way back. Please be careful with this option.</p>
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox group-checkbox">
                        <input
                            type="checkbox"
                            id="public"
                            className="custom-control-input"
                            onChange={() => setDeleteCheck(!deleteCheck)} />{' '}
                        <label className="custom-control-label group-checkbox-label" htmlFor="public">
                            I understand the consequences of deleting this group.
                        </label>
                    </div>
                </div>
                <Button className="delete-button" disabled={!deleteCheck} onClick={() => handleDelete()}>Delete Group
                    {setLoad ? <Loader color="primary" /> : ""}</Button>
            </Form>
        </>
    );
};

export default Setting;