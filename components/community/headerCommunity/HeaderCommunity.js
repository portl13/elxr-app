import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowLeftIcon from "@icons/ArrowLeftIcon";
import { getRoleName } from "@utils/constant";
import { getFormatedDateFromDate } from "@utils/dateFromat";
import Link from "next/link";
import { Router } from "next/router";
import React from "react";

function HeaderCommunity({ community, isGroup, organizers }) {
  // const { iconElement: unlock } = useIcon(faUnlock)
  // const { iconElement: lock } = useIcon(faLock)
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
    <>
      <div
        style={{ backgroundImage: `url(${cover_url})` }}
        className="channel-details cover-bg position-relative"
      >
        <div className="back-icon-channels pointer">
          <Link href="/">
            <a>
              <ArrowLeftIcon className="back-icon p-0" />
            </a>
          </Link>
        </div>
      </div>
      <div className="container container-80">
        <div className="d-flex flex-column flex-lg-row">
          <div className="contain-channel-img margin-negative bg-gray position-relative">
            {full && <img className="img-fluid" src={full} />}
          </div>
          <div className="pl-md-3 pt-2">
            <div className="d-flex flex-column flex-md-row w-100 justify-content-md-between align-items-md-center mb-md-3  pl-md-2 font-size-12 mt-2">
              <h1
                className="m-0 font-weight-bold line-height-1 font-size-34 mr-3"
                dangerouslySetInnerHTML={{ __html: name }}
              />
              <div className="d-flex flex-column flex-md-row w-100 justify-content-md-between">
                <div className="d-flex align-items-center mb-3 mb-md-0 mt-3 mt-md-0">
                  {status === "public" && (
                    <div className="btn btn-borde btn-border-primary d-flex ailgn-items-center py-1 mr-1">
                      <span className="badge-icon">
                        <FontAwesomeIcon icon={faLockOpen} />
                      </span>
                      <span className="font-size-13 font-weight-bold">open</span>
                    </div>
                  )}

                  {status === "private" && (
                    <div className="badge badge-pill badge-danger d-flex mr-1">
                      <span className="badge-icon">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <span className="font-size-13 font-weight-bold">close</span>
                    </div>
                  )}
                  {types.length !== 0 && (
                    <span className="btn btn-create rounded-lg font-size-13 py-1 ml-1">
                      {types[0]}
                    </span>
                  )}
                </div>

                <div className="mb-3 mb-md-0">
                  {!isGroup && is_member && !is_admin && (
                    <button className="btn btn-borde btn-border-primary  ">
                      <span>You're{getRoleName(role)}</span>
                    </button>
                  )}
                  {!isGroup && is_admin && (
                    <button
                      className="btn btn-borde btn-border-primary "
                      onClick={(e) => Router.push(`/community/edit/${id}`)}
                    >
                      <span>Edit Community</span>
                    </button>
                  )}
                  {isGroup && role && (
                    <button className="btn btn-borde btn-border-primary ">
                      <span>You're{getRoleName(role)}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="pl-2">
              <p>{raw}</p>
            </div>

            {organizers && (
              <div className="d-flex pl-2 mt-md-5">
                <div className="w-100% mr-2">
                  <ul className="pl-0">
                    <li className="list-unstyled">
                      <a className="user-list-adm ">
                        <div className="user-panel">
                          {organizers.name}
                          <em></em>
                        </div>
                        <img
                          className="rounded-circle "
                          src={organizers.avatar_urls.full}
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                <h4 className="font-size-13 mb-0 text-center pt-2 text-md-left">
                  Organizer (1)
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderCommunity;
