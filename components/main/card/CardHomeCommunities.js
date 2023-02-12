import React from "react";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";

const CardHomeCommunities = ({ community }) => {
  const { name, cover_url, id, group_type_label } = community;
  return (
    <div className="card-home-community card-general border-top-radius border-bottom-radius overflow-hidden h-100">
      <div
        style={{ backgroundImage: `url(${cover_url})` }}
        className="ratio ratio-16x9 bg-gray card-head cover-bg"
      >
        <Link href={`/group/${stringToSlug(name)}/${id}?tab=feeds`}>
          <a className="h-100"></a>
        </Link>
      </div>
      <div className="py-3 px-2">
        <div className="d-flex flex-column">
          {group_type_label ? (
            <div>
              <span className="card-category-community ">
                {group_type_label}
              </span>
            </div>
          ) : null}
          <h3 className="font-size-14  m-0">
            <Link href={`/group/${stringToSlug(name)}/${id}?tab=feeds`}>
              <a className="card-listen-now title-music">
                <span className="text-ellipsis">{name}</span>
              </a>
            </Link>
          </h3>
          <span className=" line-clamp-2 color-font font-size-13">
            {community.description.raw}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardHomeCommunities;
