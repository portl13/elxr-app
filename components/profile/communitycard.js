import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { removeSpecailChar, getRoleName } from "../../utils/constant";

function CommunityCard({ group, user, parentDelete }) {
  const router = useRouter();
  const [creatorImage, setCreatorImage] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [result, setResult] = useState("");
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [leave, setLeave] = useState(false);
  useEffect(() => {
    if (group?.creator_id != null) {
      getGroupCreator();
    }
  }, [group?.creator_id]);
  function getGroupCreator() {
    axios(process.env.bossApi + `/members/${group?.creator_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => {
        setResult(res.data);
        setCreatorImage(res.data?.avatar_urls.thumb);
        setCreatorName(res.data.profile_name);
      })
      .catch((err) => {});
  }

  const getRole = () => {
    return group.role === "Member" && !leave
      ? `You're ${getRoleName(group.role)}`
      : group.role === "Member" && leave
      ? "Leave Group"
      : group.role === "Organizer"
      ? `You're ${getRoleName(group.role)}`
      : null;
  };
  function setRole() {
    group.role === "Member" && !leave
      ? setLeave(true)
      : group.role === "Member" && leave
      ? getId()
      : setVisible(true);
  }

  function getId() {
    parentDelete(group.id);
  }
  if (!group) return null;
  return (
    <>
      <li className="item-entry group-has-avatar">
        <div className="list-wrap">
          <div className="bs-group-cover only-grid-view">
            <Link
              href={`/group/${removeSpecailChar(group.name)}/${
                group?.id
              }?tab=feeds`}
            >
              <a>
                <img src={group?.cover_url} />
              </a>
            </Link>
          </div>
          <div className="item-avatar">
            <Link
              href={`/group/${removeSpecailChar(group.name)}/${
                group.id
              }?tab=feeds`}
            >
              <a className="group-avatar-wrap">
                <img src={group?.avatar_urls.full} className="avatar avatar-300" />
              </a>
            </Link>
            <div className="groups-loop-buttons only-grid-view">
              <div className="action">
                <div id="" className="generic-button">
                  <button
                    data-title="Leave group"
                    data-title-displayed="You're an Organizer"
                    className="group-button button"
                    onClick={() => setRole()}
                  >
                    {getRole()}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="item-block">
              <h2 className="groups-title">
                <Link
                  href={`/group/${removeSpecailChar(group.name)}/${
                    group.id
                  }?tab=feeds`}
                >
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
            <div className="groups-loop-buttons footer-button-wrap">
              <div className="action">
                <div id="" className="generic-button">
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
                  </span>{" "}
                  members
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
export default CommunityCard;
