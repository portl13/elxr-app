
import React from 'react'
import { stringToSlug } from '@lib/stringToSlug'
import Link from 'next/link'
import { css } from "@emotion/core";
import { preload } from "swr";
import { genericFetch } from "@request/creator";

const creatorCardStyle = css`
  .creator-card-image {
    border: none;
  }

  .creator-card-category{
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

`;




function CreatorCardNew({ creator }) {
  const preFetchCreator = () => {
    preload(
      `${process.env.bossApi}/activity?per_page=20&page=1&scope=just-me&user_id=${creator.id}`,
      genericFetch
    );
  };

  return (
    <article css={creatorCardStyle} onMouseEnter={preFetchCreator}>
      <Link
        href={`/creator/${stringToSlug(creator?.display_name)}/${creator.id}`}
      >
        <a className="z-index">
          <div className="card-avatar-center creator-card-image bg-gray ratio ratio-1x1">
            {creator?.vendor_shop_logo && creator?.vendor_shop_logo && (
              <img
                src={creator?.vendor_shop_logo}
                alt={creator?.display_name}
                className="ratio ratio-1x1"
              />
            )}
          </div>
        </a>
      </Link>

      <div className='col-12 p-0 text-center mt-3'>
        <span className='creator-card-category'>
          Category
        </span>

        <h3 className="creator-card-title mt-2">
          <Link href={`/creator/${stringToSlug(creator?.display_name)}/${creator.id}`}>
            <a className="text-white text-ellipsis">
              {creator && creator.vendor_shop_name && creator.vendor_shop_name}
            </a>
          </Link>
        </h3>
      </div>
    </article>
  );
}

export default CreatorCardNew;
