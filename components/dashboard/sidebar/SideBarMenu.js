import React, { useContext } from 'react'
import { UserContext } from '@context/UserContext'
import CloseIcon from '@icons/CloseIcon'
import Image from 'next/image'
import { SideBarMenuStyle } from './SideBarMenu.style'
import Link from 'next/link'

function SideBarMenu({ open, setOpen, profile }) {
  const { user } = useContext(UserContext)
  console.log(
    '🚀 ~ file: SideBarMenu.js ~ line 6 ~ SideBarMenu ~ profile',
    profile
  )
  const toggleMenu = (e) => {
    if (e.target.classList.contains('sidebar-menu-container')) {
      setOpen(!open)
    }
  }

  return (
    <div
      onClick={toggleMenu}
      css={SideBarMenuStyle}
      className={`sidebar-menu-container ${open ? 'active' : ''}`}
    >
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
          <span className="text-uppercase">Creator Profile</span>
        </div>
        <h4 className="text-uppercase mb-1 mt-0">
          {profile && profile.profile_name}
        </h4>
        <span className="font-size-12 text-grey">{user && user.email}</span>
        <div className="text-center my-4">
          <div className="sidebar-menu-avatar">
            {profile && profile?.avatar_urls?.thumb && (
              <Image
                width={120}
                height={120}
                src={profile?.avatar_urls?.thumb}
              />
            )}
          </div>
        </div>
        <h5 className="text-uppercase font-size-14 text-primary">my account</h5>
        <ul className="list-sidebar">
          <li className="list-sidebar-item">
            <Link href={''}>
              <a className='text-white'>My Creator Portal</a>
            </Link>
          </li>
          <li className="list-sidebar-item">
            <Link href={''}>
              <a  className='text-white'>My Wallet</a>
            </Link>
          </li>
          <li className="list-sidebar-item">
            <Link href={''}>
              <a  className='text-white'>My Purchases</a>
            </Link>
          </li>
          <li className="list-sidebar-item">
            <Link href={''}>
              <a  className='text-white'>My Profile</a>
            </Link>
          </li>
          <li className="list-sidebar-item">
            <Link href={''}>
              <a  className='text-white'>My Settings</a>
            </Link>
          </li>
        </ul>
        <h5 className="text-uppercase font-size-14  text-primary">
          HELP & SUPPORT
        </h5>
        <ul className="list-sidebar">
          <li className="list-sidebar-item">About WeShare</li>
          <li className="list-sidebar-item">Terms of Service</li>
          <li className="list-sidebar-item">Privacy Policy</li>
          <li className="list-sidebar-item">Invite a friend</li>
        </ul>
        <div className="font-size-14">
          If you have any questions, contact us at support@weshare.io
        </div>
        <button className="btn btn-transparent pl-0 mt-3">
          <span className="text-uppercase  text-primary">Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default SideBarMenu
