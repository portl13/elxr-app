import { faGift } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import GiftModal from './GiftModal'
import { UserContext } from '@context/UserContext'

function GiftButton({ className = '', authorName, authorId, text = null }) {
  const { user } = useContext(UserContext)
  const token = user?.token
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <>
      <button onClick={toggle} className={`btn-3 btn ${className}`}>
        {text ? <span className="d-inline-block mr-2">{text}</span> : null}
        <i>
          <FontAwesomeIcon icon={faGift} className="icon-2rem" />
        </i>
      </button>
      {isOpen ? (
        <GiftModal
          authorName={authorName}
          authorId={authorId}
          user={user}
          token={token}
          toggle={toggle}
          open={isOpen}
        />
      ) : null}
    </>
  )
}

export default GiftButton
