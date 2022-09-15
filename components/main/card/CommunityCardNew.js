import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { getFormat } from '@utils/dateFromat'
import Link from 'next/link'
import { stringToSlug } from '@lib/stringToSlug'

function CommunityCardNew({ community }) {
    const { name, avatar_urls, date_created, members_count, cover_url, id } =
    community
  return (
    <div className="card-general-new ">
      <div
        style={{ backgroundImage: `url(${cover_url})` }}
        className="ratio ratio-16x9 border-radius-17 bg-gray card-head cover-bg"
      >
        <Link href={`/group/${stringToSlug(name)}/${id}?tab=feeds`}>
          <a className="h-100"></a>
        </Link>
      </div>
      <div className="py-3">
        <div className='d-flex flex-column'>
          <h3 className="font-size-14  m-0">
            <Link href={`/group/${stringToSlug(name)}/${id}?tab=feeds`}>
              <a className='text-white'>
                <span className="text-ellipsis">{name}</span>
              </a>
            </Link>
          </h3>
            <span className="font-size-13 text-grey">{members_count} Members</span>
          <span className="card-date-creacion font-size-13">
            Created on {getFormat(date_created, 'MMMM dd, yyyy')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CommunityCardNew