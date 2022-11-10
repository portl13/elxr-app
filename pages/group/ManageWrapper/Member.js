import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useAlert } from 'react-alert'

import { TIMEOUT, GROUP_MEMBER_ROLE, ROLES_GROUP, getProfileRoute } from '../../../utils/constant';
import { getGroupMembers, updateGroupMember, deleteGroupMember } from "../../api/group.api";
import InfiniteList from "../../../components/infiniteList/InfiniteList";
import Loader from '../../../components/loader'
import {
    CreateFeedAvatar,
    CreateFeedAvatarRow, CreateAvtarWrapper
} from "../../../components/livefeed/livefeed.style";


const Member = ({ organizers, groupDetails, fetchGroupDetals, id, user, router }) => {
    const alert = useAlert()
    const [page, setPage] = useState(1)
    const [isNext, setIsNext] = useState(true)
    const [memberList, setMemberList] = useState({ 'Moderator': [], 'Member': [], "Organizer": [] });
    const [loaderState, setLoaderState] = useState(true);
    const [loaderSpinState, seSpinState] = useState(false);
    const loadDetails = (pages, isEmpty = false) => {
        const data = {
            page: pages,
            per_page: 20,
            group_id: id,
            roles: ['mod', 'member', 'admin', "banned"]
        }
        let list = { ...memberList };
        let memList = isEmpty ? { 'Moderator': [], 'Member': [], "Organizer": [] } : list;
        getGroupMembers(user, data, id).then((res) => {
            setLoaderState(false)
            res.data.forEach((ele) => {
                if (ele.role)
                    memList[ele.role].push(ele)
                else
                    memList.Member.push(ele)
            })
            const listLen = memList.Moderator.length + memList.Organizer.length + memList.Member.length;
            const total = Number(res.headers['x-wp-total'])
            setIsNext(listLen !== total)
            setMemberList(memList)
        }).catch((err) => {
            setLoaderState(false); setIsNext(false)
        })
    }
    useEffect(() => {
        if (id) {
            loadDetails(page)
        }
    }, [id])
    const handleGroupMemberUpdate = (action, role, member, status) => {
        const data = {
            action,
            role,
            group_id: id,
            user_id: member.id,
        }
        seSpinState(true)
        updateGroupMember(user, id, member.id, data).then(() => {
            loadDetails(1, true)
            seSpinState(false)
            alert.success(`Group member ${action} successfully.`, TIMEOUT)
            if (status && (member.id === user.id)) {
                fetchGroupDetals(groupDetails.id)
                router.push(`/group/${groupDetails.name}/${groupDetails.id}?tab=feeds`)
            }
        }).catch(() => {
            seSpinState(false)
            alert.error(`Internal server error`, TIMEOUT)
        })
    }

    const handleDeleteMember = (member) => {
        const data = {
            group_id: id,
            user_id: member.id,
        }
        deleteGroupMember(user, id, member.id, data).then(() => {
            loadDetails(1, true)
            seSpinState(false)
            alert.success(`Group member deleted successfully.`, TIMEOUT)
        }).catch(() => {
            seSpinState(false)
            alert.error(`Internal server error`, TIMEOUT)
        })
    }

    const loadMoreMember = () => {
        setPage(page + 1)
        loadDetails(page + 1)
    }

    const getMessageText = (ele) => {
        const getdetail = loaderState ? <Loader color="primary" /> : "No Results."
        return (ele === "Member") ?
            <p style={{ textAlign: 'center' }}>{getdetail}</p > : ""
    }

    const handleRedirect = (ele) => {
        if (ele.link)
            router.push(getProfileRoute(ele.name, ele.id, 'profile'))
    }
    return (
        <div className="main-wrapper manage-member-panel border-0">
            <p>Manage group members; promote to moderators, co-organizers, or demote or ban.</p>
            <div className="main-heading group-header">Organizers</div>
            {loaderState || loaderSpinState ?
                <div style={{ textAlign: 'center' }}><Loader color="primary" /></div> : ""}
            <p>Organizers have total control over the contents and settings of a group.
                That includes all the abilities of moderators, as well as the ability to turn group
                forums on or off, change group status from public to private, change the group photo,
                manage group members, and delete the group.</p>
            <Row className="mt-4 border-0" css={CreateFeedAvatarRow}>
                {memberList['Organizer'].map((ele) => <Col sm="12">
                    <div className="d-flex flex-column flex-md-row" css={CreateAvtarWrapper}>
                        {ele && (<>
                            <a className="border-0" href="javascript:void(0);" onClick={() => handleRedirect(ele)} css={CreateFeedAvatar}>
                                <img 
                                    className="avatar"
                                    src={ele?.avatar_urls?.thumb}
                                    alt={`avatar ${ele.name}`}
                                />
                                <span>{ele.name}</span>
                            </a>
                            <div className="members-manage-buttons pl-5 pl-md-0">
                                {memberList['Organizer'].length > 1 ? <span className="button group-avatar-btn"
                                    onClick={() => handleGroupMemberUpdate('demote', 'member', ele, true)}>
                                    Demote to regular member
                                </span> : ""}
                            </div>
                        </>)}
                    </div>
                </Col>)}
            </Row>
            <div className="d-flex flex-column flex-fill w-100">
                <ul className={`members-list`}>
                    {ROLES_GROUP.map((ele) => memberList[ele]?.length ? <>
                        <InfiniteList
                            loaderState={loaderState}
                            loadMore={loadMoreMember}
                            loading={isNext}
                            data={memberList[ele]}
                            noText={"Member(s)"}
                        >
                            <div className="main-heading group-header">{`${ele}s`}</div>
                            <p>{GROUP_MEMBER_ROLE[ele]}</p>{
                                memberList[ele].map((member, index) =>
                                    <li className="list-wrap">
                                        <div className="list-wrap-inner">
                                            <div className="item-avatar">
                                                <img src={member.avatar_urls.thumb} />
                                            </div>
                                            <div className="list-title">
                                                {member.profile_name}
                                                {member.is_banned ? <span className="banned-text">(Banned)</span> : ""}
                                                {member.is_banned ?
                                                    <div className="members-manage-buttons">
                                                        <span className="button"
                                                            onClick={() => handleGroupMemberUpdate('unban', 'member', member)}>
                                                            Remove Ban
                                                        </span>
                                                        <span className="button"
                                                            onClick={() => handleDeleteMember(member)}>
                                                            Remove from Group
                                                        </span>
                                                    </div>
                                                    : <div className="members-manage-buttons">
                                                        {(member.is_confirmed && member.role === 'Member') ||
                                                            (member.is_mod && member.role === 'Moderator') ?
                                                            "" : <span className="button"
                                                                onClick={() => handleGroupMemberUpdate('ban', "member", member)}>
                                                                Kick & Ban
                                                            </span>}
                                                        {!member.is_mod && <span className="button"
                                                            onClick={() => handleGroupMemberUpdate('promote', 'mod', member)}>
                                                            Promote to Moderator
                                                        </span>}
                                                        {member.is_mod &&
                                                            <span className="button"
                                                                onClick={() => handleGroupMemberUpdate('demote', 'member', member, true)}>
                                                                Demote to regular member
                                                            </span>}
                                                        <span className="button"
                                                            onClick={() => handleGroupMemberUpdate('promote', 'admin', member)}>
                                                            Promote to Co-Organizer
                                                        </span>
                                                        {!member.is_mod && <span className="button"
                                                            onClick={() => handleDeleteMember(member)}>
                                                            Remove from Group
                                                        </span>}
                                                    </div>}
                                            </div>
                                        </div>
                                    </li>
                                )}
                        </InfiniteList>
                    </> : getMessageText(ele))}
                </ul>
            </div>
        </div >
    );
};

export default Member;