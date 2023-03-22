import React from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";

const CardHomeCommunities = ({ community }) => {
  const { name, cover_url, id, avatar_urls, members_count } = community;
  return (
    <div className="overflow-hidden h-100">
      <div
        style={{ backgroundImage: `url(${cover_url})` }}
        className="ratio ratio-16x9 border-radius-12  bg-gray card-head cover-bg"
      >
        <Link href={`/group/${stringToSlug(name)}/${id}?tab=feeds`}>
          <a className="h-100"></a>
        </Link>
      </div>
      <div className="d-flex position-relative py-3 px-2">
        <div className="border-colors cover-bg d-flex align-items-center justify-content-center ">
          <div
            style={{ backgroundImage: `url(${avatar_urls?.thumb})` }}
            className="avatar-event-card bg-gray cover-bg"
          >
            <Link href={`/group/${stringToSlug(name)}/${id}?tab=feeds`}>
              <a className="h-100"></a>
            </Link>
          </div>
        </div>
        <div className="d-flex flex-column  pl-3 pr-0">
          <h3 className="title-even-home line-clamp-2 m-0">
            <Link href={`/group/${stringToSlug(name)}/${id}?tab=feeds`}>
              <a className="text-white">
                <span className="color-font">{name}</span>
              </a>
            </Link>
          </h3>
          <span className="date-even-home color-font ">
            {members_count} Members
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardHomeCommunities;
