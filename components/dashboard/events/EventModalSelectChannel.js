import React, { useContext, useState } from 'react'
import { css } from '@emotion/core'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import useSWR from 'swr'
import { UserContext } from '@context/UserContext'
import { getChannels } from '@request/dashboard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'

const style = css`
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
    token ? [`${urlChannels}?page=${page}&per_page=${limit}`, token] : null,
    getChannels
  )

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
            <>
              <div
                onClick={() => handleCreate(channel.id)}
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
            </>
          ))}
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
