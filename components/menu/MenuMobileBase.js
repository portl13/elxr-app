import React, { useContext, useState } from 'react'
import { faBars, faSignInAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { UserContext } from '@context/UserContext'
import { css } from '@emotion/core'
import Link from 'next/link'
const menuMobileStyle = css`
  display: flex;
  @media screen and (min-width: 1200px) {
    display: none;
  }
  .button-mobile {
    width: 20px;
  }
  .menu-mobile-overlay {
    background-color: rgba(100, 100, 100, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    opacity: 0;
    transform: translateX(-100%);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .menu-mobile-overlay.open {
    transform: translateX(0);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    opacity: 1;
  }
  .menu-mobile {
    list-style: none;
    padding: 15px 20px;
  }
  .menu-mobile-container {
    background-color: var(--dark-color);
    max-width: 75%;
    min-height: 100vh;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--dark);
  }
  .card-profile {
    padding-bottom: 15px;
  }
  .content-profile-title {
    font-size: 16px;
    margin: 0;
  }
  .close-profile {
    width: 20px;
  }
  .hr-profile {
    border: 1px solid #343434;
    width: 100%;
    margin: 0;
  }
  .item-profile {
    display: flex;
    padding: 10px 0;
    &.active h5,
    &.active svg {
      fill: var(--primary-color);
      color: var(--primary-color);
    }
  }
  .profile-icon {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }
  .profile-title-card {
    font-size: 16px;
    margin: 0;
  }
  .button-card-profile {
    border-radius: 20px;
  }
`

function MenuMobileBase(props) {
  const { data, user, auth, children, open, setOpen } = props
  const { setUser } = useContext(UserContext)
  const router = useRouter()

  const closeOverlay = (e) => {
    if (e.target.classList.contains('menu-mobile-overlay')) {
      setOpen(!open)
    }
  }
  const goToProfile = () => {
    setOpen(!open)
    router.push(user ? getProfileRoute(user.name, user.id, 'profile', '') : '')
  }

  const logout = () => {
    setUser(null)
    router.push('/')
  }

  return (
    <div
      className="align-items-center button-mobile-container"
      css={menuMobileStyle}
    >
      <div className="button-mobile" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div
        onClick={closeOverlay}
        className={`menu-mobile-overlay ${open ? 'open' : ''}`}
      >
        <div className="menu-mobile-container">
          <ul className="menu-mobile">
            {auth ? (
              <li className="d-flex justify-content-between card-profile">
                <div className="avatar">
                  <img src={data?.avatar_urls.thumb} alt={data?.profile_name} />
                </div>
                <div className="content-profile">
                  <h5 className="content-profile-title">
                    {data?.profile_name}
                  </h5>
                  <span onClick={() => goToProfile()} className="text-primary">
                    View Profile
                  </span>
                </div>
                <div className="close-profile d-flex">
                  <FontAwesomeIcon
                    onClick={() => setOpen(!open)}
                    icon={faTimes}
                  />
                </div>
              </li>
            ) : (
              <li className="d-flex justify-content-end card-profile">
                <div className="close-profile d-flex">
                  <FontAwesomeIcon
                    onClick={() => setOpen(!open)}
                    icon={faTimes}
                  />
                </div>
              </li>
            )}

            {children}

            {auth && (
              <>
                <hr className="hr-profile" />
                <li onClick={logout} className="item-profile">
                  <span className="profile-icon">
                    <FontAwesomeIcon icon={faSignInAlt} />
                  </span>
                  <h5 className="profile-title-card">Sign Out</h5>
                </li>
              </>
            )}

            {!auth && (
              <>
                <li className="item-profile mt-5 mb-3">
                  <Link href="/login">
                    <a className="btn btn-primary button-card-profile w-100">
                      Sign In
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <a className="btn btn-secundary button-card-profile w-100">
                      Sign Up
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MenuMobileBase
