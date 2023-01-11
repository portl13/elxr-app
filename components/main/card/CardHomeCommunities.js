import React from 'react'
import Link from "next/link";
import { getFormat } from "@utils/dateFromat";
import { stringToSlug } from "@lib/stringToSlug";

const CardHomeCommunities = ({ community }) => {
    console.log(community);
    const { name, date_created, members_count, cover_url, id } = community;
  return (
    <div className="card-home-community border-top-radius border-bottom-radius">
    <div
      style={{ backgroundImage: `url(${cover_url})` }}
      className="ratio ratio-16x9 border-top-radius bg-gray card-head cover-bg"
    >
      <Link href={`/group/${stringToSlug(name)}/${id}?tab=feeds`}>
        <a className="h-100"></a>
      </Link>
    </div>
    <div className="py-3 px-2">
      <div className="d-flex flex-column">
        <div>
      <span className="card-category-community ">Fitness</span>

        </div>
        <h3 className="font-size-14  m-0">
          <Link href={`/group/${stringToSlug(name)}/${id}?tab=feeds`}>
            <a className="card-listen-now title-music">
              <span className="text-ellipsis">{name}</span>
            </a>
          </Link>
        </h3>
        <span className="card-date-creacion line-clamp-2 color-font-grey font-size-13">
          {community.description.raw}
        </span>
      </div>
    </div>
  </div>
  )
}

export default CardHomeCommunities