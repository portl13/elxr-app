import React from 'react'
import CreateChannelForm from '@components/dashboard/channels/CreateChannelForm'
import Meta from '@components/layout/Meta'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Link from 'next/link'


function CreateChannel() {
  return (
    <>
      <Meta />
      <Head>
        <title>CREATE CHANNEL</title>
      </Head>
      <div className="container px-3 px-md-5 pt-5">
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
          <CreateChannelForm />
        </div>
      </div>
    </>
  )
}

export default CreateChannel
