import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function SidebarSubMenu(props) {
  const { submenu, handleRedirect, innerNav, tab } = props
  return (
    <div className="sub-section">
      {submenu.map((e) => (
        <div
          key={e.value}
          className={`tab-section ${innerNav === e.value ? 'active' : ''}`}
          onClick={() => handleRedirect(tab, e.value, e?.id || null)}
        >
          <span className="sub-section-icon">
            <FontAwesomeIcon icon={e.icon} />
          </span>
          <span className="sub-section-title">{e.name}</span>
        </div>
      ))}
    </div>
  )
}

export default SidebarSubMenu
