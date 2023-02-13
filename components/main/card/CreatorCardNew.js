import React from 'react'
import { stringToSlug } from '@lib/stringToSlug'
import Link from 'next/link'
import { css } from '@emotion/core'
import { preload } from 'swr'
import { genericFetch } from '@request/creator'

const creatorCardStyle = css`
  .creator-card-image {
    border: none;
  }

  .creator-card-category {
    color: #848484;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
  }

  .creator-card-title {
    font-family: var(--font-comfortaa);
    font-size: 16px;
    font-weight: 700;
    color: var(--typo);
    margin-bottom: 0;
  }
  .creator-responsive {
    height: 150px;
    border-radius: 151px;
  }
  @media (min-width: 500px) {
    .creator-responsive {
      height: 200px;
    }
  }
  @media (min-width: 1024px) {
    .creator-responsive {
      height: 302px;
      width: 226px;
      border-radius: 151px;
    }
  }
`

function CreatorCardNew({ creator }) {
  const preFetchCreator = () => {
    preload(
      `${process.env.bossApi}/activity?per_page=20&page=1&scope=just-me&user_id=${creator.id}`,
      genericFetch
    )
  }

  return (
    <article css={creatorCardStyle} onMouseEnter={preFetchCreator}>
      <Link
        href={`/professionals/${stringToSlug(creator?.display_name)}/${
          creator.id
        }`}
      >
        <a className="z-index">
          <div
            style={{
              backgroundImage: `url(${creator?.vendor_shop_logo})`,
            }}
            className="card-avatar-center creator-card-image bg-gray creator-responsive bg-cover"
          ></div>
        </a>
      </Link>

      <div className="col-12 p-0 text-center mt-3">
        <h3 className="creator-card-title mt-0">
          <Link
            href={`/professionals/${stringToSlug(creator?.display_name)}/${
              creator.id
            }`}
          >
            <a className="text-font text-ellipsis">
              {creator && creator.vendor_shop_name && creator.vendor_shop_name}
            </a>
          </Link>
        </h3>
      </div>
    </article>
  )
}

export default CreatorCardNew
