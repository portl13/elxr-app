import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { getFormat } from '@utils/dateFromat'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'

function CommunityCard({ community }) {
  const { name, avatar_urls, date_created, members_count, cover_url, id } =
    community
  return (
    <div className="card-general ">
      <div
        style={{ backgroundImage: `url(${cover_url})` }}
        className="ratio ratio-16x9 bg-gray card-head cover-bg"
      >
        <Link href={`/group/${stringToSlug(name)}/${id}?tab=feeds`}>
          <a className="h-100"></a>
        </Link>
      </div>
      <div className="card-info">
        <div className="avatar-contain d-flex justify-content-between">
          <div className="card-avatar bg-gray">
            <Link href={`/group/${stringToSlug(name)}/${id}?tab=feeds`}>
              <a>
                {avatar_urls?.thumb && (
                  <img src={avatar_urls.thumb} alt={name} />
                )}
              </a>
            </Link>
          </div>
          <span>
            <FontAwesomeIcon className="avatar-icon" icon={faEllipsisH} />
          </span>
        </div>
        <div>
          <h3 className="card-title">
            <Link href={`/group/${stringToSlug(name)}/${id}?tab=feeds`}>
              <a>
                <span className="text-ellipsis">{name}</span>
              </a>
            </Link>
          </h3>
          <div>
            <span className="card-members-icon">
              <FontAwesomeIcon className="member-icon" icon={faUserFriends} />
            </span>
            <span className="card-members-info">{members_count} Members</span>
          </div>

          <span className="card-date-creacion">
            Created on {getFormat(date_created, 'MMM dd, yyyy')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CommunityCard
