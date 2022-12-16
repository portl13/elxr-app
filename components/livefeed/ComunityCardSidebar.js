import React from 'react'
import { css } from '@emotion/core'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const sidebarStyle = css`
  .item-avatar {
    max-width: 48px;
    .avatar {
      border-radius: 3px;
      width: 40px;
      height: 40px;
    }
  }
  .item-title a {
    line-height: 1.35;
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: -0.24px;
    color: var(--primary-color);
  }
  .item-title a:hover {
    color: var(--primary-hover);
  }
  .item-meta {
    color: #a3a5a9;
    font-size: 12px;
    letter-spacing: -0.26px;
    line-height: 1.2;
    overflow-wrap: break-word;
    font-weight: lighter;
  }
`

const ComunityCardSidebar = ({ comunity }) => {
  const {
    name = '',
    avatar_urls: { thumb = null },

    members_count = 0,
    id,
    slug,
  } = comunity

  return (
    <div css={sidebarStyle} className="community-card d-flex mb-3">
      <div className="item-avatar mr-2">
        <Link href={`/group/${slug}/${id}?tab=feeds`}>
          <a>
            {thumb && (
              <img
                className="avatar rounded-circle group-303-avatar avatar-150 photo"
                src={thumb}
                alt={`Community logo of ${name}`}
                width="150"
                height="150"
              />
            )}
          </a>
        </Link>
      </div>

      <div className="item">
        <div className="item-title mb-1">
          <Link href={`/group/${slug}/${id}?tab=feeds`}>
            <a className='color-font text-uppercase'>{name}</a>
          </Link>
        </div>
        <div className="item-meta ">
          <i><FontAwesomeIcon icon={faUserFriends}  className='icon-w-08'/></i>
          <span className="activity font-size-11"> {members_count} Members</span>
        </div>
      </div>
    </div>
  )
}

export default ComunityCardSidebar
