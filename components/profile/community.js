import React, { useState, useEffect } from "react"
import {
  Button,
  Input,
  Spinner, Alert
} from 'reactstrap';
import Router from 'next/router';
import { ActionBar } from "../livefeed/connection.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faThLarge,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { GroupContainer } from "../livefeed/community.style";
import InfinitScroll from 'react-infinite-scroll-component';
import { LoaderContainer, SubNav, LoadingBtn } from "../livefeed/livefeed.style";
import CommunityCard from "./communitycard";
import Invitation from "@components/profile/invitation";
import { getProfileRoute } from '@utils/constant';

export default function Community({ user, tab, queryParam, curntUserId, functionRedirect }) {

  const [result, setResult] = useState([])
  const [loader, setLoader] = useState(true)
  const [page, setPage] = useState(1)
  const [loadData, setLoadData] = useState(false)
  const [view, setView] = useState("grid")
  const [length, setLength] = useState(0)
  const [group_type, setGroupType] = useState("")
  const [status, setStatus] = useState(false)
  const [type, setType] = useState("active")
  const [count, setCount] = useState(0)
  const [invite, setInvite] = useState(null)
  const [visible, setVisible] = useState(false)
  const onDismiss = () => setVisible(false);
  useEffect(() => {
    if (tab === "community") {
      setInvite(queryParam)
    }
  }, [tab])

  useEffect(() => {
    if (tab === "community") {
      Router.push(functionRedirect(curntUserId.name, curntUserId.id, 'community', invite))
      getGroups()
    }
  }, [curntUserId, group_type, type, page, invite])

  async function getGroups() {
    await axios(process.env.bossApi + '/groups/', {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${user?.token}`
      },
      params: {
        page: page,
        per_page: 20,
        scope: "personal",
        ...(group_type != "" ? { group_type: group_type } : null),
        type: type,
        user_id: curntUserId.id,
        show_hidden: "true"
      }
    })
      .then(res => {
        setResult(albumData => [...result, ...res.data])
        var total = res.headers['x-wp-total'] != undefined ? res.headers['x-wp-total'] : null
        setCount(total)
        for (var i = 1; i <= page; i++) {
          setLength(length + parseInt(res.data.length))
        }
        setLoadData(true)
        setStatus(true)
        if (res.data.length === 0) {
          setLoader(false)
        }
        else {
          setLoader(true)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  function cancelGroupMembership(childData) {
    const group_id = childData
    axios(process.env.bossApi + `/groups/${group_id}/members/${user.id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user?.token}`
      }
    }
    )
      .then((res) => {
        setResult(result.filter(item => item.id !== group_id))
        setVisible(true)
        setTimeout(() => setVisible(false), [1000])
        setCount(count - 1)
      }).catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <Alert color="success" isOpen={visible} toggle={onDismiss}>
        You successfully left the group.
      </Alert>
      <div className="itemBody profile">
        <div className="item-body-inner">
          <SubNav className="d-flex justify-content-center justify-content-md-start ">
            <ul>
              <li className={invite === "group" ? "active" : ""}>
                <Button
                  type="button"
                  onClick={() => {
                    setInvite("group")
                    setPage(1)
                  }}
                >My Communities</Button>
              </li>
              <li className={invite === "invitation" ? "active" : ""}>
                <Button
                  type="button"
                  onClick={() => {
                    setInvite("invitation")
                    setPage(1)
                    setResult([])
                  }}
                >Invitations</Button>
              </li>
            </ul>
          </SubNav>
          {invite === "group" ?
            <>
              <ActionBar className="d-flex justify-content-center justify-content-md-end" >
                <Input
                  type="select"
                  id="filterCommunityType"
                  onChange={e => {
                    setGroupType(e.target.value)
                    setPage(1)
                    setResult([])
                    setLength(0)
                    setLoadData(false)
                    setCount(0)
                  }}>
                  <option value="">All Types</option>
                  <option value="network">Network</option>
                  <option value="activism">Activism</option>
                  <option value="camps">Camps</option>
                  <option value="conferences">Conferences</option>
                  <option value="festivals">Festivals</option>
                  <option value="music-artists">Musicians</option>
                  <option value="vendors">Vendors</option>
                </Input>
                <Input
                  type="select"
                  id="filterConnection"
                  onChange={e => {
                    setType(e.target.value)
                    setPage(1)
                    setResult([])
                    setLength(0)
                    setLoadData(false)
                    setCount(0)
                  }}>
                  <option value="active">Recently Active</option>
                  <option value="popular">Most Members</option>
                  <option value="newest">Newly Created</option>
                  <option value="alphabetical">Alphabetical</option>
                </Input>
                <div className="has-tooltip select d-none d-md-flex">
                  <div className="popover bs-popover-top">
                    <div className="arrow"></div>
                    <div className="popover-body">Grid view</div>
                  </div>
                  <FontAwesomeIcon icon={faThLarge} onClick={() => setView("grid")} />
                </div>
                <div className="has-tooltip select d-none d-md-flex">
                  <div className="popover bs-popover-top">
                    <div className="arrow"></div>
                    <div className="popover-body">List view</div>
                  </div>
                  <FontAwesomeIcon icon={faBars} onClick={() => setView("list")} />
                </div>
              </ActionBar>
              <GroupContainer>
                {loadData === false ?
                  <p css={LoaderContainer}>
                    <span><FontAwesomeIcon icon={faClock} /></span>
                    Loading your groups. Please wait.</p>
                  : null}
                {length == 0 && status && loadData ?
                  <p css={LoaderContainer}>
                    <span><FontAwesomeIcon icon={faClock} /></span>
                    No Results.</p>
                  : null}
                {loadData === true ?
                  <div className="d-flex flex-column flex-fill w-100">
                    <InfinitScroll
                      dataLength={result.length}
                      next={() => setPage(page + 1)}
                      hasMore={true}
                      loader={
                        loader ?
                          <LoadingBtn>
                            Loading ... <Spinner style={{ width: '1.2rem', height: '1.2rem' }} color="primary" />
                          </LoadingBtn>
                          : false

                      }
                    >
                      <ul className={view == "grid" ? "groups-list grid" : "groups-list"}>
                        {result && result.map(group => {
                          return (
                            <>
                              <CommunityCard
                                key={group.id}
                                group={group}
                                user={user}
                                parentDelete={cancelGroupMembership}
                              />
                            </>
                          )
                        }
                        )}
                      </ul>
                      {!result?.length && <p style={{ textAlign: 'center' }}>
                        No More Data
                      </p>}
                    </InfinitScroll>
                  </div>
                  : null}
              </GroupContainer>
            </>
            : null}
          {invite === "invitation" ?
            <>
              <h1 className="group-invite-panel">Group Invites</h1>
              <Invitation user={user} />
            </> : null}
        </div>
        {invite === "group" ?
          length == 1 ?
            <p className="text-right">Viewing {length} group</p>
            :
            length > 1 ?
              <p className="text-right">Viewing 1-{length} of {count} groups</p> : null : null}
      </div>
    </>
  )
}
