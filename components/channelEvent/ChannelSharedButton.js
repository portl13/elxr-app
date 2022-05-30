import React, { useState, useEffect } from 'react'
import { faShareSquare, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@emotion/core'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

import {
  faFacebookF,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'

const channelSharedButtonStyle = css`
  cursor: pointer;
  svg {
    height: 26px;
    width: 26px;
  }
  &:hover {
    color: #fff;
    cursor: pointer;
  }
`

const modalStyle = css`
  .modal-content {
    background: #2f2f2f;
  }
  .modal-header {
    border-bottom: none;
    padding-bottom: 0;
  }
  .modal-header .close span {
    color: #fff;
  }
  .modal-body {
    display: flex;
    justify-content: space-evenly;
  }
  .input-group-text{
      background-color: #000;
      color: #fff;
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
  }
  .input-group-text:focus {
    outline: none;
  }
  input{
    background-color: #000;
    color: #fff;
  }
  .form-control[readonly]{
      background: #000;
  }
  .form-control:focus {
    border: 1px solid #cad1d7;
    border-right: none;
  }
`

const buttonSharedSocialStyle = css`
  min-width: 67px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  .icon-share {
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-share-title {
    display: block;
    margin-top: 6px;
    font-size: 14px;
  }
  svg {
    width: 15px;
    color: #646464;
  }
`

const ChannelSharedButton = () => {
  const [open, setOpen] = useState(false)

  const [copy, setCopy] = useState(false)

  const [thisUrl, setThisUrl] = useState('')

  const sharedTwitter = () => {
      window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')
  }

  const sharedWhatapp = () => {
      window.open(`https://api.whatsapp.com/send/?phone&text=${window.location.href}`, '_blank')
  }

  const sharedFacebook = () => {
      window.open(`https://www.facebook.com/dialog/share?app_id=7412889535403221&href=${window.location.href}` , '_blank')
  }

  const copyClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
        .then(() => {
            setCopy(true)
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
        setTimeout(() => {
            setCopy(false)
        }, 800);
  }

  useEffect(() => {
    setThisUrl(window.location.href)
  },[])

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        css={channelSharedButtonStyle}
        className="btn text-white px-2 py-0"
      >
        <FontAwesomeIcon
          className="channel-header-shared"
          icon={faShareSquare}
        />
      </button>
      <Modal
        css={modalStyle}
        backdrop={false}
        fade={false}
        fullscreen="md"
        size="sm"
        centered
        isOpen={open}
        toggle={() => setOpen(!open)}
      >
        <ModalHeader toggle={() => setOpen(!open)}>share</ModalHeader>
        <ModalBody>
          <div 
          onClick={() => sharedFacebook()}
          css={buttonSharedSocialStyle}>
            <span className="icon-share">
              <FontAwesomeIcon size="xs" icon={faFacebookF} />
            </span>
            <span className="icon-share-title">facebook</span>
          </div>
          <div 
          onClick={() => sharedWhatapp()}
          css={buttonSharedSocialStyle}>
            <span className="icon-share">
              <FontAwesomeIcon size="xs" icon={faWhatsapp} />
            </span>
            <span className="icon-share-title">whatsapp</span>
          </div>
          <div 
          onClick={() => sharedTwitter()}
          css={buttonSharedSocialStyle}>
            <span className="icon-share">
              <FontAwesomeIcon size="xs" icon={faTwitter} />
            </span>
            <span className="icon-share-title">twitter</span>
          </div>
          <div 
          onClick={() => window.location.href ="mailto:"}
          css={buttonSharedSocialStyle}>
            <span className="icon-share">
              <FontAwesomeIcon size="xs" icon={faEnvelope} />
            </span>
            <span className="icon-share-title">Email</span>
          </div>
        </ModalBody>
        <ModalBody className="pt-0">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              aria-describedby="basic-addon2"
              value={thisUrl}
              readOnly
            />
            <button 
            onClick={() => copyClipboard()}
            className="input-group-text">
              {copy ? 'copied!' : 'copy'}
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ChannelSharedButton
