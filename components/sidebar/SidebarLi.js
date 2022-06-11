import React from 'react'

function SidebarLi(props) {
  const {
    isActive = false,
    isHeading = false,
    onClick,
    icon = '',
    text = 'item',
    iconClass = '',
    titleClass = '',
  } = props
  return (
    <li
      className={`nav-item ${isHeading ? 'mb-1' : 'mb-2 mt-1'} ${
        isHeading ? '' : 'pointer'
      } ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className={'nav-link d-flex align-items-center'}>
        {icon && <span className={`nav-icon mr-3 ${iconClass}`}>{icon}</span>}
        <span className={`sidebar-title ${titleClass}`}>{text}</span>
      </span>
    </li>
  )
}

export default SidebarLi
