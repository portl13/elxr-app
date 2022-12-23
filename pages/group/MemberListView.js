import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import InfiniteList from "../../components/infiniteList/InfiniteList";
import { getGroupMembers } from "@api/group.api";
import MemberList from "../members/MemberList";
import ActionBar from "../../components/actionBar";
import {
  createFriendship,
  deleteFriendship,
  followMember,
} from "@api/member.api";
import {
  PENDING,
  NOT_FRIEND,
  IS_FRIEND,
  MEMBER_DEL_ERR,
  AWAITING,
  TIMEOUT,
  ROLES_GROUP_MEM,
  getProfileRoute,
} from "@utils/constant";
import RequestModal from "../../components/requestModal/RequestModal";
import Loader from "../../components/loader";

const MemberListView = ({
  id,
  tab,
  user,
  groupDetails,
  router,
  setTabCount,
  tabCount,
  organizers,
  setOrganizer,
}) => {
  const alert = useAlert();
  const [isNext, setIsNext] = useState(true);
  const [page, setPage] = useState(1);
  const [memberList, setMemberList] = useState({ Member: [], Organizer: [] });
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [reqlMembersId, setReqMembersId] = useState(null);
  const [spinnerLoad, setSpinnerLoad] = useState(false);
  const [reqlMembersIndex, setReqMembersIndex] = useState(null);
  const [loaderState, setLoaderState] = useState(true);
  const [view, setView] = useState("list");
  const [memberTotal, setMemTotal] = useState(0);
  const loadDetails = (pages, search, isEmpty = false) => {
    const data = {
      page: pages,
      per_page: 20,
      search: search,
      group_id: id,
      roles: ["admin", "member", "mod"],
    };
    let list = { ...memberList };
    let memList = isEmpty ? { Member: [], Organizer: [] } : list;
    getGroupMembers(user, data, id)
      .then((res) => {
        setLoaderState(false);
        res.data.forEach((ele) => {
          if (ele.role === "Organizer") memList.Organizer.push(ele);
          else memList.Member.push(ele);
        });
        setMemberList(memList);
        const total = Number(res.headers["x-wp-total"])
          ? Number(res.headers["x-wp-total"])
          : 0;
        setMemTotal(total);
        const innerNavVal = { ...tabCount };
        innerNavVal.members = total;
        if (innerNavtabCountVal.members !== total) setTabCount(innerNavVal);

        let listLenght = list.Organizer.length + list.Member.length;
        setIsNext(listLenght !== total);
      })
      .catch((err) => {
        setLoaderState(false);
        setIsNext(false);
      });
  };
  useEffect(() => {
    if (id && tab === "members") {
      setMemberList({ Member: [], Organizer: [] });
      loadDetails(page, searchText, true);
    }
  }, [id, tab]);
  const updateState = (member, memberIndex, res) => {
    const status =
      member.friendship_status === NOT_FRIEND ? PENDING : NOT_FRIEND;
    if (memberIndex === "none") {
      const org = { ...organizers };
      org["friendship_status"] = status;
      if (res.data.friend_id) org["friendship_id"] = res.data.friend_id;
      setOrganizer(org);
    } else {
      let list = { ...memberList };
      const roleKey = member.role === "Organizer" ? "Organizer" : "Member";
      list[roleKey][memberIndex]["friendship_status"] = status;
      if (res.data.id)
        list[roleKey][memberIndex]["friendship_id"] = res.data.id;
      setMemberList(list);
    }
    setReqMembersId(null);
    setModalOpen(false);
    setSpinnerLoad(false);
  };
  const handleReqMember = (data, index) => {
    const member = data.id ? data : reqlMembersId;
    const memberIndex = typeof index === "number" ? index : reqlMembersIndex;
    if (member.friendship_status === AWAITING) {
      Router.push(
        getProfileRoute(user.name, user.id, "connections", "request")
      );
      return;
    }
    setSpinnerLoad(true);
    const formData = {
      friend_id: member.id,
      initiator_id: user.id,
    };
    const getRes =
      member.friendship_status === PENDING ||
      member.friendship_status === IS_FRIEND
        ? deleteFriendship(user, member.friendship_id)
        : createFriendship(user, formData);
    getRes
      .then((res) => updateState(member, memberIndex, res))
      .catch((err) => {
        alert.error(MEMBER_DEL_ERR, TIMEOUT);
        setModalOpen(false);
        setSpinnerLoad(false);
      });
  };
  const handleFollowMember = (data, memberIndex) => {
    const formData = {
      user_id: data.id,
      action: !data.is_following ? "follow" : "unfollow",
    };
    setSpinnerLoad(true);
    followMember(user, formData)
      .then((resp) => {
        const roleKey = data.role === "Organizer" ? "Organizer" : "Member";
        let res = resp.data.data;
        res["role"] = roleKey;
        if (memberIndex === "none") setOrganizer(res);
        else {
          let list = { ...memberList };
          list[roleKey][memberIndex] = res;
          setMemberList(list);
        }
        setReqMembersId(null);
        setSpinnerLoad(false);
      })
      .catch((err) => {
        setReqMembersId(null);
        setSpinnerLoad(false);
      });
  };
  const updateLoader = () => {
    setLoaderState(true);
    setPage(1);
    setMemberList({ Member: [], Organizer: [] });
  };
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      updateLoader();
      loadDetails(1, searchText, true);
    } else {
      setSearchText(e.target ? e.target.value : e);
      if (!e.target) {
        updateLoader();
        loadDetails(1, "", true);
      }
    }
  };
  const loadMoreMember = () => {
    const listTotal = memberList.length;
    if (listTotal && listTotal !== memberTotal) {
      loadDetails(page + 1, searchText);
      setPage(page + 1);
    }
  };

  const getLoadDetails = () => {
    const len = !memberList.Organizer.length && !memberList.Member.length;
    return (
      <p style={{ textAlign: "center" }}>
        {len && !loaderState ? "No Results." : ""}
      </p>
    );
  };
  return (
    <>
      <div className="itemBody item-wrapper-panel">
        <div className="item-body-inner member-wrapper no-top">
          <div className="member-container-panel">
            <div className="member-container-panel no-filter">
              <ActionBar
                setView={setView}
                placeholderText={"Members"}
                handleSearch={handleSearch}
                searchVal={searchText}
                isSearch={true}
                isGroup={true}
              />
              <div style={{ textAlign: "center" }}>
                {loaderState ? <Loader /> : ""}
              </div>
              <div className="d-flex flex-column flex-fill w-100">
                {ROLES_GROUP_MEM.map((e) =>
                  memberList[e].length ? (
                    <InfiniteList
                      loaderState={loaderState}
                      loadMore={loadMoreMember}
                      loading={isNext}
                      data={memberList[e]}
                      noText={"Members"}
                      key={e}
                    >
                      <ul
                        className={`members-list ${view === "grid" && "grid"}`}
                      >
                        <h1 className="members-list-header">
                          {memberList[e].length === 1 ? e : e + "s"}
                        </h1>
                        <div className="member-column-section">
                          {memberList[e].map((ele, i) => (
                            <MemberList
                              data={ele}
                              key={ele.id}
                              handleReqMember={handleReqMember}
                              handleFollowMember={handleFollowMember}
                              setModalOpen={setModalOpen}
                              setReqMembersId={setReqMembersId}
                              index={i}
                              isOrganizer={ele.id === groupDetails.creator_id}
                              setReqMembersIndex={setReqMembersIndex}
                              reqlMembersId={reqlMembersId}
                              spinnerLoad={spinnerLoad}
                              isGroup={true}
                              activeTab={1}
                            />
                          ))}
                        </div>
                      </ul>
                    </InfiniteList>
                  ) : null
                )}
                {getLoadDetails()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <RequestModal
        show={isModalOpen}
        close={setModalOpen}
        handleDelete={handleReqMember}
        showSpinner={spinnerLoad}
      />
    </>
  );
};

export default MemberListView;
