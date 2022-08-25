import React, { useState } from 'react'
import SharedIcon from '@icons/SharedIcon'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
  WhatsappIcon,
  RedditIcon,
} from 'react-share'
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useRouter } from 'next/router'

function SharedButton({ title }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const stripHtml = (html) => {
    let tmp = document?.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  const subject = title
  const encodedURL = `${process.env.nextSite}${router.asPath}`

  return (
    <Dropdown direction="left" isOpen={open} toggle={() => setOpen(!open)}>
      <DropdownToggle tag={'span'}>
        <button className="btn btn-detail-action">
          <span className="d-flex mr-1">SHARE</span>
          <span className="btn-detail-icon">
            <SharedIcon />
          </span>
        </button>
      </DropdownToggle>
      <DropdownMenu className="bg-social-panel">
        <div className="social-panel">
          <FacebookShareButton
            url={encodedURL}
            title={subject}
            className="share-link"
          >
            <FacebookIcon size={25} round />
          </FacebookShareButton>
          <TwitterShareButton
            title={subject}
            url={encodedURL}
            className="share-link"
          >
            <TwitterIcon size={25} round />
          </TwitterShareButton>
          <LinkedinShareButton
            source={subject}
            url={encodedURL}
            title={subject}
            className="share-link"
          >
            <LinkedinIcon size={25} round />
          </LinkedinShareButton>
          <WhatsappShareButton
            title={subject}
            url={encodedURL}
            className="share-link"
          >
            <WhatsappIcon size={25} round />
          </WhatsappShareButton>
          <EmailShareButton subject={encodedURL} className="share-link">
            <EmailIcon size={25} round />
          </EmailShareButton>
          <RedditShareButton
            title={subject}
            url={encodedURL}
            className="share-link"
          >
            <RedditIcon size={25} round />
          </RedditShareButton>
        </div>
      </DropdownMenu>
    </Dropdown>
  )
}

export default SharedButton
