import React, { useEffect, useState } from "react"
import moment from 'moment';
import { Button } from "reactstrap"
import axios from "axios"


function InvitationCard({ message, date, userId, groupId, user, id, parentCallback, parentCall }) {

    const [groupName, setGroupName] = useState()
    const [groupImage, setGroupImage] = useState()
    const [userName, setUserName] = useState()

    function getGroup() {
        axios(process.env.bossApi + `/groups/${groupId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
        }
        )
            .then(res => {
                setGroupName(res.data.name)
                setGroupImage(res.data.avatar_urls.thumb)

            })
    }

    useEffect(() => {
        if (groupId != null) {
            getGroup()
        }
    }
        , [groupId])


    function getUser() {
        axios(process.env.bossApi + `/members/${userId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
        }
        )
            .then(res => {
                setUserName(res.data.name)


            })
    }

    useEffect(() => {
        if (userId != null) {
            getUser()
        }
    }
        , [userId])

    const onTrigger = () => {
        parentCallback(id);
    }

    const getId = () => {
        parentCall(id);
    }

    return (
        <>
            <div className="community-invite-panel">
                <div className="left-panel">
                    <div className="image-tag">
                        <img src={groupImage} />
                    </div>
                    <div className="info-panel">
                        <div className="main-tag">
                            {groupName}
                        </div>
                        <div className="invited-by">
                            Invited by
                            <a href="@components/profile/invitationcard#">
                                {userName}
                            </a>
                        </div>
                        <div className="time-by">
                            <span>{moment(date).fromNow()}</span>
                        </div>
                        <div className="message-by">
                            <span>{message}</span>
                        </div>
                    </div>
                </div>
                <div className="right-panel">
                    <Button onClick={() => getId()}>Accept</Button>
                    <Button onClick={() => onTrigger()}>Reject</Button>
                </div>
            </div>
        </>

    )
}

export default InvitationCard
