import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { css } from '@emotion/core'
import Link from 'next/link'
import { getProfileRoute } from '../../utils/constant'
import { UserContext } from '../../context/UserContext'
import { useRouter } from 'next/router'

const dropdownStyle = css`
    button.btn, .btn-secondary:not(:disabled):not(.disabled):active{
        padding: 0;
        font-size: 12px;
        text-transform: capitalize;
        background-color: transparent;
        margin: 0;
        border: none;
        font-weight: normal;
        color: var(--typo);
        box-shadow: none;
    }
    svg{
        width: 8px;
    }
    .dropdown-menu{
        padding: .8rem;
        background-color: var(--secondary-color);
        border: solid 1px var(--typo);
    }
    .dropdown-item{
        padding: 0;
        color: var(--typo);
    }
    .dropdown-item.active, .dropdown-item:active{
        background-color: transparent;
        color: var(--typo);
    }
    .dropdown-item:hover, .dropdown-item:focus{
        background-color: transparent;
        color: var(--typo);
    }
    .profile-card{
        padding-bottom: 15px;
    }
    .profile-card-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
    }
    .profile-card-name{
        padding-left: 10px;
        width: auto;
    }
    .view-profile{
        text-align: center;
        color: #FF426A;
        border: 1px solid #FF426A;
        border-radius: 12px;
        margin-bottom: .4rem;
    }
    .profile-dropdown-header{
        color: var(--typo);
        font-weight: bold;
    }
    .profile-dropdown-item{
        display: block;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
    }
    .dropdown-header{
        padding: 0;
        font-size: 14px;
        text-transform: capitalize;
    }
    .pointer{
        cursor: pointer;
    }
`

const ProfileButton = ({data, user, auth}) => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const logout = () => {
    router.push('/')
    setUser(null)
  }
  return (
    <>
      <Dropdown
        css={dropdownStyle}
        direction="left"
        isOpen={open}
        toggle={() => setOpen(!open)}
      >
        <DropdownToggle>
          <span className="profile-title">
            Me <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem tag={'span'}>
              <div className="d-flex profile-card align-items-center">
                <span className='profile-card-img'>
                    <img src={data?.avatar_urls.thumb} alt={data?.profile_name} />
                </span>
                <span className='profile-card-name'>
                    <Link href={user ? getProfileRoute(user.name, user.id, "profile", "") : ""}>                    
                        <a>
                            {data?.profile_name}
                        </a>
                    </Link>
                </span>
              </div>
          </DropdownItem>
          <DropdownItem tag={'span'}>
              <Link href={user ? getProfileRoute(user.name, user.id, "profile", "") : ""}>              
                <a>
                    <span className='view-profile w-100 d-block'>
                        View Profile
                    </span>
                </a>
              </Link>
          </DropdownItem>
          <DropdownItem tag={'span'} header>
              <span className='profile-dropdown-header profile-dropdown-item'>
                  Account
              </span>
          </DropdownItem>
          <DropdownItem tag={'span'}>
              <Link href="/my-account?tab=dashboard">
                <a>
                <span className='profile-dropdown-item'>
                    My Account
                </span>
                </a>
              </Link>
          </DropdownItem>
          {auth && user?.roles.includes('wcfm_vendor') && (
            <DropdownItem tag={'span'}>
                <Link href={`/my-portal?tab=home&nav=store`}>
                    <a>                    
                        <span className='profile-dropdown-item'>
                            Channel Manager
                        </span>
                    </a>                
                </Link>
            </DropdownItem >
          )}
          <DropdownItem tag={'span'}>
              <Link href="/account-setting?tab=general">
                <a>
                <span className='profile-dropdown-item'>
                    Settings and Privacy
                </span>
                </a>
              </Link>
          </DropdownItem>
          <DropdownItem 
          onClick={logout}
          className="pointer"
          tag={'span'}>
              <span className='profile-dropdown-item'>
                   Sign Out
              </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default ProfileButton
