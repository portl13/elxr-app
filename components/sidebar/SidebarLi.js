import React from 'react'

function SidebarLi(props) {
  const {
    isActive = false,
    isHeading = false,
    onClick,
    icon = '',
    text = 'item',
    iconClass = '',
  } = props
  return (
    <li
      className={`nav-item ${isHeading ? 'mb-1' : 'mb-3'} ${
        isHeading ? '' : 'pointer'
      } ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className={'nav-link d-flex align-items-center'}>
        <span className={`nav-icon mr-3 ${iconClass}`}>{icon}</span>
        <span className="sidebar-title">{text}</span>
      </span>
    </li>
  )
}

export default SidebarLi
