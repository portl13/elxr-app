import React, { useState, useEffect } from "react";
import { Alert, Modal, ModalBody, Button } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getRoleName } from "../../utils/constant";
import { uploadModal } from "../../components/livefeed/photo.style";
import { stringToSlug } from "../../lib/stringToSlug";
import { preload } from "swr";
import { genericFetch } from "@request/creator";

function AllCommunityCard({
  group,
  user,
  parentCallback,
  parentDelete,
  parentGroupData,
  parentJoinRequest,
}) {
  const [leave, setLeave] = useState(false);
  const [visible, setVisible] = useState(false);
  const [creatorImage, setCreatorImage] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false);
  const leaveGroup = "Leave Group";

  function joinRequest() {
    parentJoinRequest(group.id, false);
  }
  function onTrigger() {
    parentCallback(group.id, false);
    setLeave(false);
  }
  function getId() {
    parentDelete(
      group.id,
      false,
      group.creator_id,
      group.plural_role === "Organizers" ? true : false
    );
  }
  function setRole() {
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
  }

  function getRole() {
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
      : group.role === "Member" && !group.can_join & !leave
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
  }

  useEffect(() => {
    if (group.creator_id != null) {
      getGroupCreator();
    }
  }, [group?.creator_id]);
  function getGroupCreator() {
    axios(process.env.bossApi + `/members/${group?.creator_id}`, {
      method: "GET",
    })
      .then((res) => {
        setResult(res.data);
        setCreatorImage(res.data?.avatar_urls.thumb);
        setCreatorName(res.data?.profile_name);
      })
      .catch((err) => {});
  }
  if (!group) return null;

  const communityLink = (user, name, id) => {
    return !user ? "/signup" : `/group/${stringToSlug(name)}/${id}?tab=feeds`;
  };

  const preloadCommunity = () => {
    preload(
      `${process.env.bossApi}/activity?per_page=20&page=1&scope=groups&group_id=${group.id}&privacy[]=public&privacy[]=loggedin&privacy[]=onlyme&privacy[]=friends&privacy[]=media`,
      genericFetch
    );
  };

  return (
    <>
      <li className="item-entry group-has-avatar">
        <div className="list-wrap">
          <div
              onMouseEnter={preloadCommunity}
            style={{
              backgroundImage: `url(${group?.cover_url})`,
            }}
            className="bs-group-cover only-grid-view border-radius-17 bg-cover"
          >
            <Link href={communityLink(user, group.name, group.id)}>
              <a>
                <span></span>
              </a>
            </Link>
          </div>
          <div onMouseEnter={preloadCommunity} className="item-avatar">
            <Link href={communityLink(user, group.name, group.id)}>
              <a className="group-avatar-wrap">
                <img src={group?.avatar_urls?.full} className="avatar " />
              </a>
            </Link>
            {user ? (
              <div className="groups-loop-buttons only-grid-view">
                <div className="action">
                  <div id="" className="generic-button">
                    <button
                      data-title="Leave group"
                      data-title-displayed="role"
                      className="badge-transparent btn px-2"
                      onClick={() => setRole()}
                    >
                      {getRole()}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="item">
            <div className="item-block">
              <h2 onMouseEnter={preloadCommunity} className="groups-title">
                <Link href={communityLink(user, group.name, group.id)}>
                  <a className="education-platform-home-link">{group.name}</a>
                </Link>
              </h2>
              <p className="group-details only-list-view">
                {group.status.charAt(0).toUpperCase() + group.status.slice(1)} /{" "}
                {group.group_type_label} / {group.members_count}
                {group.members_count === 1 ? "member" : "members"}
              </p>
              <p className="group-details only-grid-view">
                <span className="group-visibility public">
                  {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                  <span className="type-separator">/</span>
                  <span className="group-type">{group.group_type_label}</span>
                </span>
              </p>
              <p className="group-details last-activity">
                active 2 weeks, 5 days ago
              </p>
            </div>
            <div className="group-item-desc only-list-view">
              <p>
                {group.description.raw.length >= 118
                  ? group.description.raw.slice(0, 120)
                  : group.description.raw}
                {group.description.raw.length >= 118 ? (
                  <a href="#" className="more-link">
                    More <FontAwesomeIcon icon={faAngleRight} />
                  </a>
                ) : null}
              </p>
            </div>
            {user ? (
              <div className="groups-loop-buttons footer-button-wrap">
                <div className="action">
                  <div className="generic-button">
                    <button
                      className="group-button"
                      data-title="Leave group"
                      data-title-displayed="You're an Organizer"
                      onClick={() => setRole()}
                    >
                      {getRole()}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="group-members-wrap only-grid-view">
              <span className="bs-group-members">
                {result && (
                  <img src={creatorImage} alt={creatorName} className="round" />
                )}
              </span>
              {group.members_count >= 2 ? (
                <span className="members">
                  <span className="members-count-g">
                    +{group.members_count - 1}
                  </span>
                  members
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </li>
      <Modal
        className="modal-dialog-centered modal-sm"
        isOpen={show}
        css={uploadModal}
      >
        <ModalBody className="text-center">
          <p className="mb-4">
            As you are the only organizer of this group, you cannot leave it.
            You can either delete the group or promote another member to be an
            organizer first and then leave the group.
          </p>
          <Button
            color="primary"
            onClick={() => {
              setShow(false);
              setLeave(false);
            }}
          >
            Ok
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}
export default AllCommunityCard;
