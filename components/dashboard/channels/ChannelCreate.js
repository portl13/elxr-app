import React, { useState } from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CreateChannelForm from '@components/dashboard/channels/CreateChannelForm'
import Link from 'next/link'
import BlockUi from '@components/ui/blockui/BlockUi'

function ChannelCreate() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="container px-3 px-md-5 pt-5 postion-relative">
      {loading && <BlockUi color={'var(--primary-color)'} />}
      <div className="d-flex align-items-center">
        <Link href={'/dashboard/channels'}>
          <a className="text-white">
            <span className="contain-icon">
              <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
            </span>
            <span className="back">Back</span>
          </a>
        </Link>
      </div>
      <div className="container container-80">
        <div className="contain-title">
          <h1 className="create-communities-title">CREATE A CHANNEL</h1>
        </div>
        <CreateChannelForm loading={loading} setLoading={setLoading} />
      </div>
    </div>
  )
}

export default ChannelCreate
