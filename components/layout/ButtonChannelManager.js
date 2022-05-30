import React, { useState } from 'react'
import { css } from '@emotion/core'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import Router from 'next/router'

const DropdownStyle = css`
  .btn-secondary:not(:disabled):not(.disabled):active {
    background-color: #fe025c;
    color: #fff;
  }
  & .btn {
    background-color: #fe025c;
    padding: 0.1rem 0.5rem;
    border: none;
    margin: auto;
  }
  & svg:hover {
    color: #fff !important;
  }
  & .dropdown-menu {
    padding: 0.3rem 0;
    background-color: #000;
    border: 1px solid #fff;
  }
  & .dropdown-item {
    padding: 0.3rem 1rem;
    color: #fff;
  }

  & .dropdown-item:first-of-type {
    border-bottom: 1px solid #fff;
  }

  & .dropdown-item:hover {
    background-color: #25272a;
  }

  & svg {
    width: 10px;
  }
`

function ButtonChannelManager() {
  const [open, setOpen] = useState(false)

  const handleRedirectStream = (type) => {
    Router.push(`/channel-manager?tab=golive&nav=stream&type=${type}`)
  }

  return (
    <Dropdown
      css={DropdownStyle}
      direction="left"
      isOpen={open}
      toggle={() => setOpen(!open)}
    >
      <DropdownToggle>
        <FontAwesomeIcon icon={faVideo} />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => handleRedirectStream('webcam')}>
          Webcam
        </DropdownItem>
        <DropdownItem onClick={() => handleRedirectStream('rtmp')}>
          Software
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ButtonChannelManager
