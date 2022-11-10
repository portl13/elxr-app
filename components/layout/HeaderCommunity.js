import {faLock, faUnlock} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useState} from "react";
import {Badge, Spinner} from "reactstrap";
import useIcon from "../../hooks/useIcon";
import Router from "next/router";

import {ProfileCardStyle} from "../profile/profile.style";
import {ButtonSmall, ButtonSmallPink} from "../ui/button/ButtonSmall";
import {getRoleName} from "@utils/constant";
import axios from "axios";
import {UserContext} from "@context/UserContext";

const invite = process.env.bossApi + "/groups/membership-requests";

function HeaderCommunity({ community: group, isGroup, organizers }) {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const {
    name = "",
    cover_url = null,
    avatar_urls: { full = null },
    types = null,
    status = "",
    is_member,
    description: { raw = "" },
    is_admin = false,
    id,
    role,
  } = group;

  const { iconElement: unlock } = useIcon(faUnlock);
  const { iconElement: lock } = useIcon(faLock);
  const [leave, setLeave] = useState(false);
  const leaveGroup = "Leave Group";

  const [isJoin, setIsJoin] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(false);

  const joinRequest = () => {
    axios
      .post(
        invite,
        {
          group_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {});
  };

  const onTrigger = () => {
    setLoading(true)
    axios
      .post(
          process.env.bossApi + `/groups/${id}/members`,
        {
          user_id: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then(({data}) => {
        setUserRole(data.role)
        setIsJoin(true)
      }).finally(()=>{
      setLoading(false)
    })
  };

  function getGroupMember(groupId, createrid) {
    axios(process.env.bossApi + `/groups/${groupId}/members`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: {
        per_page: 100,
        roles: "admin",
        exclude: createrid,
      },
    }).then((res) => {
      const member = res.data.map((d) => d.id);
      axios
          .patch(
              process.env.bossApi + `/groups/${groupId}`,
              {
                id: groupId,
                creator_id: parseInt(member.toString()),
              },
              {
                headers: {
                  Authorization: `Bearer ${user?.token}`,
                },
              }
          )
          .then((res) => {
            deleteMembership(groupId);
          });
    });
  }
  function deleteMembership(group_id) {
    axios(process.env.bossApi + `/groups/${group_id}/members/${user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }).then(({data}) => {
      console.log(data)
      setIsJoin(false)

    });
  }

  function memberDelete(group_id, groupStatus, createrId, roleStatus) {
    roleStatus && getGroupMember(group_id, createrId);
    !roleStatus && deleteMembership(group_id);
  }

  const getId = () => {
    memberDelete(
        group.id,
        false,
        group.creator_id,
        group.plural_role === "Organizers" ? true : false
    );
  };

  const setRole = () => {
    group.status === "public"
      ? group.role === ""
        ? onTrigger()
        : group.role === "Member" && !leave
        ? setLeave(true)
        : group.role === "Member" && leave
        ? getId()
        : group.plural_role === "Organizer" && !leave
        ? setLeave(true)
        : group.plural_role === "Organizer" && leave
        ? setShow(true)
        : group.plural_role === "Organizers" && !leave
        ? setLeave(true)
        : group.plural_role === "Organizers" && leave
        ? getId()
        : setVisible(true)
      : group.status === "private"
      ? group.role === ""
        ? joinRequest()
        : group.role === "Member" && !leave
        ? setLeave(true)
        : group.role === "Member" && leave
        ? getId()
        : group.plural_role === "Organizer" && !leave
        ? setLeave(true)
        : group.plural_role === "Organizer" && leave
        ? setShow(true)
        : group.plural_role === "Organizers" && !leave
        ? setLeave(true)
        : group.plural_role === "Organizers" && leave
        ? getId()
        : null
      : null;
  };

  const getRole = () => {
    return group.status === "public"
      ? group.role === "Member" && !leave
        ? `You're ${getRoleName(group.role)}`
        : group.role === "Member" && leave
        ? leaveGroup
        : group.role === "Organizer" && !leave
        ? `You're ${getRoleName(group.role)}`
        : group.role === "Organizer" && leave
        ? leaveGroup
        : "Join group"
      : group.role === "" && group.can_join
      ? "Request Access"
      : group.role === "" && !group.can_join && !leave
      ? "Request Sent"
      : group.role === "Member" && !group.can_join && !leave
      ? `You're ${getRoleName(group.role)}`
      : group.role === "Member" && !group.can_join && leave
      ? leaveGroup
      : group.role === "" && !group.can_join && leave
      ? "Request Access"
      : group.role === "Organizer" && !leave
      ? `You're ${getRoleName(group.role)}`
      : group.role === "Organizer" && leave
      ? leaveGroup
      : null;
  };

  useEffect(()=>{
      if (role){
        setIsJoin(true)
        setUserRole(role)
      }
  },[role])

  return (
    <div className="pl-lg-4" css={ProfileCardStyle}>
      <div
        className="header-cover-image"
        style={{ backgroundImage: `url(${cover_url})` }}
      >
        <img className="header-cover-img" src={cover_url} />
      </div>
      <div className="item-header-cover-image">
        <div style={{ backgroundColor: "#ccc" }} className="item-header-avatar ">
          {full && <img className="squared avatar" src={full} />}
        </div>
        <div className="item-header-content organiser-detail-panel">
          <div className="group-title-wrap connection-group-wrapper">
            <div className="connection-text d-flex flex-column flex-md-row">
              <h2
                className="group-title mb-0"
                dangerouslySetInnerHTML={{ __html: name }}
              />
              <div className="d-none d-md-flex">
                <p className="badge-status">
                  <Badge color="info">
                    <i
                      className={`badge-icon${
                        status !== "public" ? "-danger" : ""
                      }`}
                    >
                      {status === "public" ? unlock : lock}
                    </i>
                    {status}
                  </Badge>
                </p>
                {types.length !== 0 && (
                  <p className="badge-status">
                    <Badge color="primary">{types[0]}</Badge>
                  </p>
                )}
              </div>
            </div>
            <div className="generic-meta generic-group-wrapper mt-3 mt-md-0 generic-org-button">
              {!isGroup && is_member && !is_admin && (
                <ButtonSmall className="btn">
                  You're {getRoleName(role)}
                </ButtonSmall>
              )}
              {!isGroup && is_admin && (
                <ButtonSmall
                  onClick={(e) => Router.push(`/community/edit/${id}`)}
                  className="btn"
                >
                  Edit Community
                </ButtonSmall>
              )}
              {isGroup && userRole && (
                <ButtonSmallPink className="btn">
                  You're {getRoleName(userRole)}
                </ButtonSmallPink>
              )}
              {!isJoin && group ? <ButtonSmallPink
                  className="btn"
                  data-title="Leave group"
                  data-title-displayed="You're an Organizer"
                  onClick={() => setRole()}
              >
                {getRole()} {loading ? <Spinner size={"sm"} /> : null }
              </ButtonSmallPink> : null}
            </div>
          </div>
          <div className="group-title-wrap ">
            <p className="w-100 mt-3 text-lg-left">{raw}</p>
          </div>

          {organizers && (
            <div className="generic-group-wrapper d-flex align-items-center align-items-md-start flex-row  flex-md-column">
              <h4 className="bp-title mb-0 mb-md-2">Organizer(1)</h4>
              <div className="user-list-admins pl-2 pl-md-0">
                <ul>
                  <li>
                    <a>
                      <div className="tooltip-panel">
                        {organizers.name}
                        <em></em>
                      </div>
                      <img src={organizers.avatar_urls.full} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderCommunity;
