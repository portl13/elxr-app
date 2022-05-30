import React from 'react'
import { useState } from "react";
import BlockUi, { containerBlockUi } from "../ui/blockui/BlockUi";
import {
    GROUP_INVITE_STATUS, GROUP_ACTIVITY_STATUS, GROUP_MEDIA_STATUS,
    GROUP_ALBUM_STATUS, ADMINS, MODS, MEMBERS
} from "../../utils/constant";


const renderCommunityInviteForm = ({ handlerChange, form }) => <>
    <div className="custom-control custom-checkbox mb-3">
        <input
            className="custom-control-input"
            id="members"
            type="checkbox"
            name="group-invite-status"
            value="members"
            checked={form[GROUP_INVITE_STATUS] === MEMBERS}
            onChange={e => handlerChange(e)}
        />
        <label className="custom-control-label" htmlFor="members">
            <b>All community members</b>
        </label>
    </div>

    <div className="custom-control custom-checkbox mb-3">
        <input
            className="custom-control-input"
            id="mods"
            type="checkbox"
            name="group-invite-status"
            value="mods"
            checked={form[GROUP_INVITE_STATUS] === MODS}
            onChange={e => handlerChange(e)}
        />
        <label className="custom-control-label" htmlFor="mods">
            <b>Organizers and Moderators only</b>
        </label>
    </div>

    <div className="custom-control custom-checkbox mb-3">
        <input
            className="custom-control-input"
            id="admins"
            type="checkbox"
            name="group-invite-status"
            value="admins"
            checked={form[GROUP_INVITE_STATUS] === ADMINS}
            onChange={e => handlerChange(e)}
        />
        <label className="custom-control-label" htmlFor="admins">
            <b>Organizers only</b>
        </label>
    </div>

</>
const TabSettings = () => {
    const blocking = false;
    const [form, setForm] = useState({
        "group-invite-status": ADMINS,
        "group-activity-feed-status": MEMBERS,
        "group-media-status": MODS,
        "group-album-status": ADMINS
    })
    const handlerChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return (
        <form css={containerBlockUi}>
            {blocking && <BlockUi color="#eb1e79" />}
            <h3 className="mb-3 mt-3">Community Invitations</h3>
            <h6>Community Invitations Which members of this community are allowed to invite others?</h6>
            <div className="form-group">
                {renderCommunityInviteForm({ handlerChange, form })}
            </div>
            <h3 className="mb-3 mt-3">Activity Feeds  </h3>
            <h6>Which members of this community are allowed to post into the activity feed</h6>
            <div className="form-group">
                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="members-feed-status"
                        type="checkbox"
                        name="group-activity-feed-status"
                        value="members"
                        checked={form[GROUP_ACTIVITY_STATUS] === MEMBERS}
                        onChange={e => handlerChange(e)}
                    />
                    <label className="custom-control-label" htmlFor="members-feed-status">
                        <b>All community members</b>
                    </label>
                </div>

                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="mods-feed-status"
                        type="checkbox"
                        name="group-activity-feed-status"
                        value="mods"
                        checked={form[GROUP_ACTIVITY_STATUS] === MODS}
                        onChange={e => handlerChange(e)}
                    />
                    <label className="custom-control-label" htmlFor="mods-feed-status">
                        <b>Organizers and Moderators only</b>
                    </label>
                </div>
                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="admins-feed-status"
                        type="checkbox"
                        name="group-activity-feed-status"
                        value="admins"
                        checked={form[GROUP_ACTIVITY_STATUS] === ADMINS}
                        onChange={e => handlerChange(e)}
                    />
                    <label className="custom-control-label" htmlFor="admins-feed-status">
                        <b>Organizers only</b>
                    </label>
                </div>
            </div>
            <h3 className="mb-3 mt-3">Community Photos</h3>
            <h6>Which members of this community are allowed to manage photos?</h6>
            <div className="form-group">
                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="members-media-status"
                        type="checkbox"
                        name="group-media-status"
                        value="members"
                        checked={form[GROUP_MEDIA_STATUS] === MEMBERS}
                        onChange={e => handlerChange(e)}
                    />
                    <label className="custom-control-label" htmlFor="members-media-status">
                        <b>All community members</b>
                    </label>
                </div>

                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="mods-media-status"
                        type="checkbox"
                        name="group-media-status"
                        value="mods"
                        checked={form[GROUP_MEDIA_STATUS] === MODS}
                        onChange={e => handlerChange(e)}
                    />
                    <label className="custom-control-label" htmlFor="mods-media-status">
                        <b>Organizers and Moderators only</b>
                    </label>
                </div>

                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="admins-media-status"
                        type="checkbox"
                        name="group-media-status"
                        value="admins"
                        checked={form[GROUP_MEDIA_STATUS] === ADMINS}
                        onChange={e => handlerChange(e)}
                    />
                    <label className="custom-control-label" htmlFor="admins-media-status">
                        <b>Organizers only</b>
                    </label>
                </div>
            </div>
            <h3 className="mb-3 mt-3">Community Albums</h3>
            <h6>Which members of this community are allowed to manage albums?</h6>
            <div className="form-group">
                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="members-album-status"
                        type="checkbox"
                        name="group-album-status"
                        value="members"
                        checked={form[GROUP_ALBUM_STATUS] === MEMBERS}
                        onChange={e => handlerChange(e)}
                    />
                    <label className="custom-control-label" htmlFor="members-album-status">
                        <b>All community members</b>
                    </label>
                </div>

                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="mods-album-status"
                        type="checkbox"
                        name="group-album-status"
                        value="mods"
                        checked={form[GROUP_ALBUM_STATUS] === MODS}
                        onChange={e => handlerChange(e)}
                    />
                    <label className="custom-control-label" htmlFor="mods-album-status">
                        <b>Organizers and Moderators only</b>
                    </label>
                </div>

                <div className="custom-control custom-checkbox mb-3">
                    <input
                        className="custom-control-input"
                        id="admins-album-status"
                        type="checkbox"
                        name="group-album-status"
                        value="admins"
                        checked={form[GROUP_ALBUM_STATUS] === ADMINS}
                        onChange={e => handlerChange(e)}
                    />
                    <label className="custom-control-label" htmlFor="admins-album-status">
                        <b>Organizers only</b>
                    </label>
                </div>
            </div>
            <div className="form-group mt-4">
                <input
                    className="btn btn-block btn-primary"
                    value="Update Settings"
                    type="submit" />
            </div>
        </form>
    );
}

export default TabSettings;
