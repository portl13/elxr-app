import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { getFormat } from '@utils/dateFromat'

function CommunityCard({ community }) {
  const { name, avatar_urls, date_created, members_count, cover_url } =
    community
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card-general ">
        <div
          style={{ backgroundImage: `url(${cover_url})` }}
          className="ratio ratio-16x9 bg-gray card-head cover-bg"
        ></div>
        <div className="card-info">
          <div className="avatar-contain d-flex justify-content-between">
            <div className="card-avatar bg-gray">
              {avatar_urls?.thumb && <img src={avatar_urls.thumb} alt={name} />}
            </div>
            <span>
              <FontAwesomeIcon className="avatar-icon" icon={faEllipsisH} />
            </span>
          </div>
          <div>
            <h3 className="card-title">
              <span className="text-white text-ellipsis">{name}</span>
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
    </div>
  )
}

export default CommunityCard
