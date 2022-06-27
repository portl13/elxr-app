import React, { useContext, useState } from 'react'
import { UserContext } from '@context/UserContext'
import { useRouter } from 'next/router'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import useSWRImmutable from 'swr/immutable'
import { getProfile } from '@request/dashboard'
import { profileButtonStyle } from './ProfileButton.style'
import Image from 'next/image'

const profileUrl = process.env.bossApi + '/members'

function ProfileButton() {
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)
  const { token = null } = user?.token ? user : {}
  const [open, setOpen] = useState(false)
  const { data: userData } = useSWRImmutable(
    token ? [`${profileUrl}/${user?.id}`, token] : null,
    getProfile
  )

  return (
    <Dropdown
      css={profileButtonStyle}
      direction="left"
      isOpen={open}
      toggle={() => setOpen(!open)}
    >
      <DropdownToggle className="profile-button-container">
        <span className="profile-button-avatar">
          {userData && userData?.avatar_urls?.thumb && (
            <Image width={45} height={45} src={userData?.avatar_urls?.thumb} />
          )}
        </span>
      </DropdownToggle>
      <DropdownMenu className="profile-button-dropdown-menu">
        <DropdownItem
          onClick={() => {
            router.push('/dashboard/my-account')
          }}
          className="profile-button-dropdown-item"
        >
          My Account
        </DropdownItem>
        <DropdownItem className="profile-button-dropdown-item">
          Change Password
        </DropdownItem>
        <DropdownItem className="profile-button-dropdown-item">
          Sing Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ProfileButton
