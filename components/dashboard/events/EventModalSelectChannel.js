import React from 'react'
import { css } from '@emotion/core'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useRouter } from 'next/router'

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

function EventModalSelectChannel({ channels, open, setOpen }) {
    const router = useRouter()

  const createEvent =  (id) => {
    setOpen(!open)
    router.push(`/dashboard/channel/${id}/create-event`)
  }

  return (
    <Modal size='sm' centered={true} isOpen={open} toggle={() => setOpen(!open)}>
      <ModalHeader>Select Channel</ModalHeader>
      <ModalBody css={style}>
        {channels.map((channel) => (
          <>
            <div 
            onClick={() => createEvent(channel.id)}
            key={channel.id} className="row mb-3 pointer">
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
