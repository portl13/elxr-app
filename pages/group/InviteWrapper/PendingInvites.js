import React, { useEffect, useState } from "react";
import { useAlert } from 'react-alert'

import { TIMEOUT } from '../../../utils/constant';
import InfiniteList from "../../../components/infiniteList/InfiniteList";
import { getGroupMemInvite, cancelMemInvite } from "../../api/group.api";
import { getmemberDetails } from "../../api/member.api";
import Loader from '../../../components/loader'
import ActionBar from "../../../components/actionBar";

const PendingInvites = ({ user, tab, id }) => {
    const [page, setPage] = useState(1)
    const [loaderState, setLoaderState] = useState(true);
    const [orgMember, setOrgMember] = useState([])
    const [spinner, setSpiner] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [allMmeber, setAllMember] = useState([])
    const [allMmeberInvite, setAllMemberInvited] = useState([])
    const [allInterverID, setInviterId] = useState([])
    const [allInterverList, setInviterList] = useState([])
    const alert = useAlert()

    const getMemberList = (ids, pages, search, members, isInviter = false) => {
        const formData = {
            search,
            group_id: id,
            per_page: 20,
            page: pages,
            user_ids: ids
        }
        getmemberDetails(user, formData).then((res) => {
            if (isInviter) {
                setInviterList([...allInterverList, ...res.data])
            } else {
                const data = [...res.data];
                const list = data.map((e, i) => {
                    e["invited_id"] = members[i].id;
                    return e
                })
                setAllMember([...orgMember, ...list])
                setOrgMember([...orgMember, ...list])
            }
        })
    }
    const getInvites = (pages = 1, isEmpty = false) => {
        if (isEmpty) {
            orgMember([])
        }
        const formData = {
            group_id: id,
            per_page: 20,
            page: pages,
        }
        setLoaderState(true)
        getGroupMemInvite(user, formData).then((res) => {
            setLoaderState(res.data.length)
            if (res.data.length) {
                setAllMemberInvited([...allMmeberInvite, ...res.data])
                const memberIdVal = [], inviter = [...allInterverID]
                res.data.forEach(ele => {
                    memberIdVal.push(ele.user_id);
                    inviter.push(ele.inviter_id)
                })
                getMemberList(inviter, pages, "", [], true)
                setInviterId(inviter)
                getMemberList(memberIdVal, pages, "", res.data, false)
            }
        })

    }
    useEffect(() => {
        if (tab === "invites") {
            getInvites(page)
        }
    }, [tab])
    const loadMoreMember = () => {
        if (orgMember.length) {
            getInvites(page + 1)
            setPage(page + 1)
        }
    }
    const cancelInvite = (invite_id, index) => {
        setSpiner(true)
        cancelMemInvite(user, invite_id).then(() => {
            setSpiner(false)
            let list = [...orgMember];
            list.splice(index, 1)
            const invideIndex = allMmeberInvite.findIndex(p => p.id === invite_id);
            let listAll = [...allMmeberInvite];
            listAll.splice(invideIndex, 1)
            let allMmeberList = [...allMmeber]
            allMmeberList.splice(invideIndex, 1)
            setAllMember(allMmeberList)
            setAllMemberInvited(listAll)
            setOrgMember(list)
            alert.success("Invite canceled successfully", TIMEOUT)
        }).catch(() => {
            setSpiner(false)
            alert.error("Error occured while canceling invite", TIMEOUT)
        })
    }
    const getSearchMemberList = (searchTextVal) => {
        setOrgMember([])
        if (searchTextVal) {
            const searchList = []
            allMmeber.forEach((ele) => {
                if (ele.profile_name.toLowerCase().includes(searchTextVal.toLowerCase()))
                    searchList.push(ele)
            })
            setOrgMember(searchList)
        } else setOrgMember(allMmeber)
        setSpiner(false)
    }
    const handleSearch = e => {
        if (e.keyCode === 13) {
            setSpiner(true)
            getSearchMemberList(searchText)
        } else {
            const text = e.target ? e.target.value : e
            setSearchText(text)
            if (!text) {
                setSpiner(true)
                getSearchMemberList(text)
            }
        }
    }
    const checkMemInviter = (member) => member?.inviter_id && allInterverList.filter((ele) => ele.id === member.inviter_id)[0]
    return (
        <div className="itemBody item-wrapper-panel pending-invite-wrapper">
            <div className="item-body-inner member-wrapper no-top">
                <div className="member-container-panel">
                    <ActionBar
                        placeholderText={"pending invites"}
                        handleSearch={handleSearch}
                        searchVal={searchText}
                        isSearch={true}
                        isGroup={true}
                        hideGridView={true} />
                    {spinner ? <div className="loader-container"><Loader color="primary" /></div> : false}
                    <div className="d-flex flex-column flex-fill w-100">
                        <InfiniteList
                            loaderState={loaderState}
                            loadMore={loadMoreMember}
                            loading={loaderState}
                            data={orgMember}
                            noText={"Pending Invites"}
                        >
                            <ul className={`members-list`}>
                                {orgMember.map((member, index) =>
                                    <li className="list-wrap">
                                        <div className="list-wrap-inner">
                                            <div className="item-avatar">
                                                <img src={member.avatar_urls.thumb} />
                                            </div>
                                            <div className="list-title">
                                                {member.profile_name}
                                                <span>
                                                    Invited by:
                                                    <a href="">
                                                        <img src={checkMemInviter(allMmeberInvite[index])?.avatar_urls?.thumb} /></a>
                                                </span>
                                            </div>
                                            {user.id != member.id ?
                                                <div onClick={() => cancelInvite(member.invited_id, index)} className="cross-icon">+</div> : ""}
                                        </div>
                                    </li>)
                                }
                            </ul>
                        </InfiniteList>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PendingInvites;
