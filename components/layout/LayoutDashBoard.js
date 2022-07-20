import React, { useContext, useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import SideBarMenu from '@components/dashboard/sidebar/SideBarMenu'
import { layoutDashBoardStyle } from '@components/layout/LayoutDashBoard.style'
import Meta from '@components/layout/Meta'
import MenuHeader from '@components/home/MenuHeader'
import { UserContext } from '@context/UserContext'
import { getProfile } from '@request/dashboard'
import { css } from '@emotion/core'
import AuthButtons from '@components/home/AuthButtons'

const headerStyle = css`
  .menu-container {
    list-style: none;
    padding-left: 0;
  }
  .menu-item {
    margin-left: 20px;
  }
  .menu-item a {
    color: var(--typo);
  }

  .menu-title {
    font-size: 12px;
  }

  .menu-icon svg {
    height: 18px;
  }

  .profile {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
  }

  .notification-click-event {
    width: 100%;
    display: flex;
    position: fixed;
    height: 100%;
    background: transparent;
    top: 0;
    left: 0;
  }

  .notification-bell {
    position: relative;
    margin: 0 5px 0 10px;
    svg {
      width: 15px;
      margin: 0 15px 0 0;
      cursor: pointer;
    }
    .count {
      line-height: 1.6;
      font-size: 9px;
      background-color: #c92c04;
      right: 3px;
      border-radius: 100%;
      padding: 1px 7px;
      position: absolute;
      color: #ffffff;
      top: -6px;
      font-size: 11px;
    }
    .notification-wrapper {
      border: 1px solid;
      margin: 0;
      width: 430px;
      overflow: hidden;
      background-color: var(--bg);
      box-shadow: 0 2px 7px 1px rgb(0 0 0 / 5%),
        0 6px 32px 0 rgb(18 43 70 / 10%);
      border-radius: 4px;
      list-style: none;
      position: absolute;
      right: -120px;
      z-index: 1001;
      top: 33px;
      .notification-list {
        width: 100%;
        max-height: 52vh;
        overflow: auto;
        padding: 0;
        overflow-x: hidden;
        margin: 0;
        line-height: 1;
        li {
          display: flex;
          -webkit-box-align: start;
          -ms-flex-align: start;
          align-items: flex-start;
          padding: 15px 20px;
          border-bottom: 1px solid #e7e9ec;
          position: relative;
          border-bottom: 1px solid #000000;
          cursor: pointer;
          .icon-tag {
            width: auto;
            display: flex;
            margin: 15px 0 0 10px;
            position: relative;
            svg {
              width: 16px;
              margin: 0;
              cursor: pointer;
              color: var(--typo);
            }
            &:hover {
              .tooltip-panel {
                display: block;
              }
              svg {
                color: var(--primary-color);
              }
            }
            .tooltip-panel {
              min-width: 89px;
              display: none;
              height: 28px;
              background: var(--primary-color);
              bottom: 100%;
              border-radius: 5px;
              font-size: 13px;
              color: var(--typo);
              left: -56px;
              margin-bottom: 11px;
              transform: translate(0, 10px);
              transform-origin: top;
              position: absolute;
              padding: 7px 10px;
              text-align: center;
              top: -44px;
              em {
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid var(--primary-color);
                position: absolute;
                top: 28px;
                left: 57px;
              }
            }
          }
          .bb-full-link {
            font-size: 14px;
            color: var(--typo);
            letter-spacing: -0.24px;
            line-height: 1.3;
            width: calc(100% - 50px);
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            a {
              color: var(--primary-color);
              white-space: nowrap;
              overflow: hidden;
              cursor: pointer;
              text-overflow: ellipsis;
            }
            span {
              margin-top: 6px;
              color: #a3a5a9;
              display: block;
              font-size: 12px;
            }
          }
          .notification-avatar {
            margin-right: 22px;
            min-width: 36px;
            max-height: 36px;
            img {
              display: block;
              max-width: 36px;
              border-radius: 50%;
            }
          }
          .notification-content {
            color: var(--typo);
            font-size: 16px;
            letter-spacing: -0.24px;
            line-height: 1.3;
          }
          &:hover {
            background: var(--bg) !important;
          }
        }
      }
      .notification-header {
        color: #000000;
        border-bottom: 1px solid #000000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 20px;
        h2 {
          font-size: 1rem;
          line-height: 1;
          margin: 0;
          font-weight: 400;
          padding: 0;
        }
        .mark-tag {
          cursor: pointer;
          color: #ffffff;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: -0.24px;
          line-height: 1;
          margin: 0 0 0 22px;
          padding: 0;
          cursor: pointer;
          &:hover {
            color: var(--primary-color);
          }
        }
      }
    }
  }

  .notification-bell,
  .notification-bell svg {
    margin: 0 !important;
  }

  @media (max-width: 1199px) {
    .center-icon {
      display: flex;
      align-items: center;
    }
  }

  .left-header {
    display: flex;
  }
`

const profileUrl = process.env.bossApi + '/members'

function LayoutDashBoard({ children, sidebar, title = '' }) {
  const { user } = useContext(UserContext)
  const token = user?.token
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [auth, setAuth] = useState(false)

  const { data: userData } = useSWRImmutable(
    token ? [`${profileUrl}/${user?.id}`, token] : null,
    getProfile
  )

  useEffect(() => {
    if (!userData) return
    setProfile(userData)
  }, [userData])

  useEffect(() => {
    if (!user) return
    setAuth(!auth)
  }, [user])

  useEffect(() => {
    if (!user && auth) {
      setAuth(!auth)
    }
  }, [user])

  return (
    <>
      <Meta />
      <div css={layoutDashBoardStyle} className="main_grid position-relative">
        <header
          css={headerStyle}
          className="header z-index-2 d-flex justify-content-end"
        >
          {auth && (
            <MenuHeader
              user={user}
              data={profile}
              open={open}
              setOpen={setOpen}
            />
          )}
          {!auth && <AuthButtons />}
        </header>
        <aside className="sidebar z-index-3">{sidebar}</aside>
        <main className="main">{children}</main>
        <SideBarMenu open={open} setOpen={setOpen} profile={profile} />
      </div>
    </>
  )
}

export default LayoutDashBoard
