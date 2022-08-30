import React from 'react'
import ArrowLeftIcon from '@icons/ArrowLeftIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'

function CreatorProfile({ creator }) {
  const router = useRouter()

  const back = (e) => {
    e.preventDefault()
    router.back()
  }

  return (
    <>
      <div
        style={{ backgroundImage: `url(${creator?.vendor_banner})` }}
        className="channel-details cover-bg position-relative"
      >
        <div className="back-icon-channels pointer">
          <a onClick={back}>
            <ArrowLeftIcon className="back-icon p-0" />
          </a>
        </div>
      </div>
    </>
  )
}

export default CreatorProfile
