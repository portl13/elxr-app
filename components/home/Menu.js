import React from 'react'
import Link from 'next/link'
import { css } from '@emotion/core'

const menuStyle = css`
  .menu-principal {
    list-style: none;
    padding-left: 3rem;
    display: flex;
    margin: 0;
  }
  .menu-principal-link{
    color: var(--typo);
    &:hover{
      color: var(--primary-hover);
    }
  }
  .menu-principal-item:not(:last-of-type){
    padding-right: 3.2rem;
  }
`

const routers = [
  {
    name: 'Live Feeds',
    link: '/livefeed',
    key: 1
  },
  {
    name: 'Events',
    link: '/online-events',
    key: 2
  },
  {
    name: 'Communities',
    link: '/communities-details',
    key: 3
  },
  {
    name: 'Channels',
    link: '/channels',
    key: 4
  },
  {
    name: 'Courses',
    link: '/courses',
    key: 5
  },
]

function Menu() {
  return (
    <nav css={menuStyle} className="d-none d-lg-flex align-items-center">
      <ul className="menu-principal">
        {routers.map((route) => (
          <li key={route.key} className="menu-principal-item">
            <Link href={route.link}>
              <a className="menu-principal-link">{route.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Menu
