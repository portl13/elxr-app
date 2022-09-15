import React from 'react'
import { stringToSlug } from '@lib/stringToSlug'
import Link from 'next/link' 

function CreatorCardNew({ creator }) {
  return (
      <>
        <div>
          <Link
            href={`/creator/${stringToSlug(creator?.display_name)}/${
              creator.id
            }`}
          >
            <a className='z-index'>
              <div className="card-avatar-center bg-gray">
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
        </div>
        <div>
          <h3 className="card-title text-center mt-2 mt-md-3">
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
        </div>
      </>
  
  )
}

export default CreatorCardNew