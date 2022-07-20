import ArrowLeftIcon from '@icons/ArrowLeftIcon'
import Link from 'next/link'
import React from 'react'

function CreatorProfile({creator}) {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${creator?.vendor_banner})` }}
        className="channel-details cover-bg position-relative"
      >
        <div className="back-icon-channels pointer">
          <Link href="/">
            <a>
              <ArrowLeftIcon className="back-icon p-0" />
            </a>
          </Link>
        </div>
      </div> 
    </>
  )
}

export default CreatorProfile