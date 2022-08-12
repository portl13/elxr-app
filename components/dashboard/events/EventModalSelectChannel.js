import React, { useContext, useState } from 'react'
import { css } from '@emotion/core'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import useSWR from 'swr'
import { UserContext } from '@context/UserContext'
import { getChannels } from '@request/dashboard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import Link from 'next/link'

const style = css`
  max-height: 180px;
  overflow-y: auto;
  .avatar-channel {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .body-channel {
    display: flex;
    align-items: center;
  }
  .title-channel {
    font-size: 18px;
    margin: 0;
  }
`

const urlChannels = `${process.env.apiV2}/channels`

function EventModalSelectChannel({ handleCreate, open, setOpen }) {
  const { user } = useContext(UserContext)
  const token = user?.token
  const limit = 20
  const [page, setPage] = useState(1)

  const { data: channels } = useSWR(
    token
      ? [
          `${urlChannels}?page=${page}&per_page=${limit}&author=${user?.id}`,
          token,
        ]
      : null,
    getChannels
  )

  const selectChannel = (id) => {
    handleCreate(id)
    setOpen(false)
  }

  return (
    <Modal
      size="sm"
      centered={true}
      isOpen={open}
      toggle={() => setOpen(!open)}
    >
      <ModalHeader>Select Channel</ModalHeader>
      <ModalBody css={style}>
        {!channels && <SpinnerLoader />}
        {channels &&
          channels.channels &&
          channels.channels.map((channel) => (
            <div
              onClick={() => selectChannel(channel.id)}
              key={channel.id}
              className="row mb-3 pointer"
            >
              <div className="col-auto">
                <img
                  className="avatar-channel"
                  src={channel.channel_logo}
                  alt={channel.channel_name}
                />
              </div>
              <div className="col-8 body-channel">
                <h3 className="title-channel">{channel.channel_name}</h3>
              </div>
            </div>
          ))}
        {channels && channels.channels && channels.channels.length === 0 && (
          <div className='d-flex justify-content-center flex-column'>
            <h5 className='text-center mb-3 '>No channel found</h5>
            <Link href="/dashboard/channels/create-channel">            
              <a className='btn btn-create'>
                create a new channel
              </a>
            </Link>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-danger border-25"
          onClick={() => setOpen(!open)}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default EventModalSelectChannel
