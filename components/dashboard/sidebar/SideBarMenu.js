import React, { useContext, useEffect, useState } from 'react'
import CloseIcon from '@icons/CloseIcon'
import Link from 'next/link'
import { UserContext } from '@context/UserContext'
import { SideBarMenuStyle } from './SideBarMenu.style'
import { useRouter } from 'next/router'
import { stringToSlug } from '@lib/stringToSlug'

function SideBarMenu({ open, setOpen, profile }) {
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)
  const [isUser, setIsUser] = useState(false)

  const toggleMenu = (e) => {
    if (e.target.classList.contains('sidebar-menu-container')) {
      setOpen(!open)
    }
  }

  const signOut = async () => {
    setUser(null)
    setOpen(false)
    await router.push('/')
  }

  useEffect(() => {
    if (user && user.rol === 'vendor') {
      setIsUser(true)
    }
  }, [user])

  return (
    <div css={SideBarMenuStyle}>
      <div
        onClick={toggleMenu}
        className={`sidebar-menu-container ${open ? 'active' : ''}`}
      ></div>
      <div className={`sidebar-menu ${open ? 'active' : ''}`}>
        <div className="d-flex justify-content-end pt-4">
          <button
            onClick={() => setOpen(!open)}
            className="btn border-none bg-transparent"
          >
            <CloseIcon className="sidebar-icon" />
          </button>
        </div>
        <div>
          <span className="text-uppercase">
            {isUser ? 'Creator Profile' : 'User Profile'}
          </span>
        </div>
        <h4 className="text-uppercase mb-1 mt-0">
          {profile && profile.profile_name}
        </h4>
        <span className="font-size-12 text-grey">
          {isUser && user && user?.email && user.email}
        </span>
        <div className="text-center my-3">
          <div className="sidebar-menu-avatar">
            {profile && profile?.avatar_urls?.thumb && (
              <img width={90} height={90} src={profile?.avatar_urls?.thumb} />
            )}
          </div>
        </div>
        <h5 className="text-uppercase font-size-14 text-primary">my account</h5>
        <ul className="list-sidebar">
          {isUser && (
            <li className="list-sidebar-item">
              <Link href={'/dashboard/creator'}>
                <a className="text-white">Studio</a>
              </Link>
            </li>
          )}
          <li className="list-sidebar-item">
            <Link href={'/my-wallet/resumen'}>
              <a className="text-white">My Wallet</a>
            </Link>
          </li>

          <li className="list-sidebar-item">
            <Link href={'/my-purchases/dashboard'}>
              <a className="text-white">My Purchases</a>
            </Link>
          </li>
          {isUser && user && (
            <li className="list-sidebar-item">
              <Link
                href={`/profile/woodlander/${user?.id}?key=timeline&tab=personal`}
              >
                <a className="text-white">My Profile</a>
              </Link>
            </li>
          )}
          <li className="list-sidebar-item">
            <Link href={'/my-settings/general'}>
              <a className="text-white">My Settings</a>
            </Link>
          </li>
        </ul>
        <h5 className="text-uppercase font-size-14  text-primary">
          HELP & SUPPORT
        </h5>
        <ul className="list-sidebar">
          <li className="list-sidebar-item">About elxr</li>
          <li className="list-sidebar-item">Terms of Service</li>
          <li className="list-sidebar-item">Privacy Policy</li>
          <li className="list-sidebar-item">Invite a friend</li>
        </ul>
        <div className="font-size-14">
          If you have any questions, contact us at support@elxr.io
        </div>
        <button onClick={signOut} className="btn btn-transparent mt-3">
          <span className="text-uppercase  text-white">Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default SideBarMenu
