import { faUnlock, faLock } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Badge } from "reactstrap";
import useIcon from "../../hooks/useIcon";
import Router from "next/router";

import { ProfileCardStyle } from "../profile/profile.style";
import { ButtonSmall, ButtonSmallPink } from "../ui/button/ButtonSmall";
import { getRoleName } from "../../utils/constant";

function HeaderCommunity({ community, isGroup, organizers }) {
  const { iconElement: unlock } = useIcon(faUnlock);
  const { iconElement: lock } = useIcon(faLock);
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
  } = community;

  return (
    <div className="pl-lg-4" css={ProfileCardStyle}>
      <div
        className="header-cover-image"
        style={{ backgroundImage: `url(${cover_url})` }}
      >
        <img className="header-cover-img" src={cover_url} />
      </div>
      <div className="item-header-cover-image">
        <div style={{ backgroundColor: "#ccc" }} className="item-header-avatar">
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
              {isGroup && role && (
                <ButtonSmallPink className="btn">
                  You're {getRoleName(role)}
                </ButtonSmallPink>
              )}
            </div>
          </div>
          <div className="group-title-wrap ">
            <p className="w-100 mt-3 text-lg-left">{raw}</p>
          </div>

          {organizers && (
            <div className="generic-group-wrapper">
              <h4 className="bp-title">Organizer (1)</h4>
              <div className="user-list-admins">
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
