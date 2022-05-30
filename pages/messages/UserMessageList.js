import React, { useState, useEffect } from "react";
import moment from 'moment';
import Link from 'next/link';
import { useAlert } from 'react-alert'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faBan, faTrash, faTimesCircle, faInbox } from "@fortawesome/free-solid-svg-icons";

import { postMessageAction, blockMember } from "../api/message.api";
import { TIMEOUT, MSG_SUCCESS } from '../../utils/constant';
import DeleteMsg from './DeleteMsg';
import BlockMemberModal from './BlockMemberModal'

const UserMessageList = ({ userMsg, getProfileRoute, messages, user, getDetails, selMsgIndex,
    setLoader, setMemberBlocked, handleDeleteMsg, setMemberBlockedId, isMemberBlockedId,isMemberBlocked }) => {
    const [isOpen, setOpenEllipses] = useState(false)
    const [isModalOpen, setDeleteModal] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)
    const [showBlockMember, setBlockMember] = useState(false)
    useEffect(() => {
        setMemberBlocked(false)
    }, [])

    const alert = useAlert()
    const getResName = () => {
        let name = [], count = 0;
        if (userMsg?.recipients && !userMsg?.isNewUser) {
            const recpLen = Object.keys(userMsg?.recipients)?.length;
            for (let key in userMsg?.recipients) {
                const userVal = userMsg?.recipients[key]
                count += 1;
                if (userVal.name === "Blocked Member") {
                    setMemberBlocked(true)
                    setMemberBlockedId(userMsg.id)
                }
                if (userMsg.current_user !== userVal.user_id)
                    name.push(<Link href={getProfileRoute(userVal.name, userVal.user_id, 'profile')}>
                        {`${userVal.name}${count < recpLen ? ", " : ""}`}
                    </Link>)
            }
        } else if (userMsg?.isNewUser) {
            name.push(<Link href={getProfileRoute(userMsg.name, userMsg.id, 'profile')}>
                {userMsg.name}
            </Link>)
        }
        return name
    }

    const updateState = (action, state = true) => {
        const index = action === "unread" ? selMsgIndex : 0;
        getDetails(1, "", index)
        setShowSpinner(false)
        setDeleteModal(false)
        setOpenEllipses(false)
        state && alert.success(MSG_SUCCESS[action], TIMEOUT)
    }

    const handleMsgAction = (action) => {
        const formData = {
            action,
            id: userMsg.id,
            value: true,
        }
        setLoader(true)
        setShowSpinner(true)
        postMessageAction(user, userMsg.id, formData).then((res) => {
            updateState(action)
        }).catch(() => {
            setShowSpinner(false);
            setOpenEllipses(false)
        })
    }
    const blockMsgMember = (id) => {
        setLoader(true)
        setShowSpinner(true)
        blockMember(user, { item_id: id }).then((res) => {
            alert.success("Member blocked successfully.", TIMEOUT)
            updateState('unread', false)
            setBlockMember(false)
            setShowSpinner(false);
        }).catch(() => {
            setBlockMember(false)
            setOpenEllipses(false)
        })
    }

    const getDate = (date) => {
        return moment(date).format("MMMM D, YYYY")
    }

    return (
        <>
            <div className="single-message-thread-header">
                <div className="thread-participants">
                    <div className="participants-name">
                        {getResName()}
                    </div>
                    <div className="thread-date">{!messages?.length || userMsg?.isNewUser ?
                        "Start a new conversation" : "Started"}{" "}
                        {userMsg?.date && !userMsg?.isNewUser && getDate(userMsg?.date)}</div>
                </div>
                <div className="actions">
                    <FontAwesomeIcon icon={faEllipsisV} onClick={() => setOpenEllipses(!isOpen)} />
                    {isOpen && <div className="actions-container">
                        <ul>
                            <li onClick={() => handleMsgAction('unread')}><FontAwesomeIcon icon={faInbox} /> Mark unread</li>
                            <li onClick={() => { handleMsgAction('unread'); handleMsgAction('hide_thread'); }}><FontAwesomeIcon icon={faTimesCircle} /> Hide conversation</li>
                            {(isMemberBlocked && userMsg.id === isMemberBlockedId) ? "" : <li onClick={() => setBlockMember(true)}><FontAwesomeIcon icon={faBan} /> Block Member</li>}
                            <li onClick={() => setDeleteModal(true)}><FontAwesomeIcon icon={faTrash} /> Delete your messages</li>
                            {/* <li onClick={() => { handleDeleteMsg(userMsg.id); setOpenEllipses(false) }}><FontAwesomeIcon icon={faTrashAlt} /> Delete conversation</li> */}
                        </ul>
                    </div>}
                </div>
            </div>
            <div className="message-thread-list">
                {!userMsg?.isNewUser && userMsg?.messages?.map((ele) => {
                    const recipients = userMsg?.recipients[ele.sender_id]
                    return (<div className="main-box-panel">
                        <div className="bp-avatar-wrap">
                            <img src={userMsg?.recipients[ele.sender_id].user_avatars.full} />
                        </div>
                        <div className="single-message-content">
                            <div className="message-metadata">
                                <span>{recipients.user_id === user?.id ? "You" : recipients.name}</span>
                                {ele.display_date}
                            </div>
                            <div className="message-content-wrap"
                                dangerouslySetInnerHTML={{ __html: ele.message.rendered }}
                            ></div>
                            <div className="bb-activity-media-wrap">
                                {ele.bp_media_ids ? ele.bp_media_ids.map((img) =>
                                    <div className="bb-activity-media-elem">
                                        <a>
                                            <img
                                                src={img.attachment_data.thumb}
                                                alt={img.title}
                                                width={500}
                                                height={500}
                                            /></a>
                                    </div>
                                ) : ""}
                            </div>
                        </div>
                    </div>)
                })}
            </div>
            <DeleteMsg
                handleDelete={handleMsgAction}
                show={isModalOpen}
                close={setDeleteModal}
                showSpinner={showSpinner}
            />
            <BlockMemberModal
                handleDelete={blockMsgMember}
                show={showBlockMember}
                close={setBlockMember}
                showSpinner={showSpinner}
                userMsg={userMsg}
                user={user}
                setOpenEllipses={setOpenEllipses}
            />
        </>
    );
};

export default UserMessageList;