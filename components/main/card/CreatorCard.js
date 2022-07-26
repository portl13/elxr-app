import { stringToSlug } from '@lib/stringToSlug'
import Link from 'next/link'
import React from 'react'

function CreatorCard({ creator }) {
  return (
    <div className="card-general ">
      <Link
        href={`/creator/${stringToSlug(creator?.display_name)}/${creator.id}`}
      >
        <a>
          <div
            style={{
              backgroundImage: `url(${
                creator?.vendor_banner ? creator?.vendor_banner : ''
              })`,
            }}
            className="ratio ratio-16x9 bg-gray card-head cover-bg"
          ></div>
        </a>
      </Link>
      <div className="card-info">
        <div className="avatar-contain d-flex justify-content-between">
          <Link
            href={`/creator/${stringToSlug(creator?.display_name)}/${
              creator.id
            }`}
          >
            <a className='z-index'>
              <div className="card-avatar bg-gray">
                {creator?.vendor_shop_logo && creator?.vendor_shop_logo && (
                  <img
                    src={creator?.vendor_shop_logo}
                    alt={creator?.display_name}
                  />
                )}
              </div>
            </a>
          </Link>
        </div>
        <div>
          <h3 className="card-title">
            <Link
              href={`/creator/${stringToSlug(creator?.display_name)}/${
                creator.id
              }`}
            >
              <a className="text-white text-ellipsis">
                {creator &&
                  creator.vendor_shop_name &&
                  creator.vendor_shop_name}
              </a>
            </Link>
          </h3>
          <span className="card-date-creacion">
            {creator && creator.display_name && creator.display_name}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CreatorCard
