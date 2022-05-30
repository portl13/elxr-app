import Link from 'next/link';
import React, { useState } from 'react';
import { LiMenuItem } from '../ui/sidebar/LiMenuItem';

const SidebarItem = ({
  url,
  icon,
  text,
  pages,
  scopes,
  types,
  search,
  curntUserId,
  isEmpty = false,
  connections
}) => {
  const [blockedUsers, setBlockedUsers] = useState(0);
  return (
    <LiMenuItem className='nav-item'>
      <Link href={url}>
        <a className='sidebar-link nav-link' title={text}>
          <i className='sidebar-icon'>{icon}</i>
          <span
            className='sidebar-text'
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            {text}
            {text === 'Messages' && (
              <div
                style={{
                  color: 'white',
                  backgroundColor: 'var(--primary-color)',
                  textAlign: 'center',
                  minWidth: '1.5vw',
                  height: '2vh',
                  padding: '0 2px',
                  fontSize: '11px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  marginLeft: '10px',
                  borderRadius: '10px'
                }}
              >
                {text === 'Messages' && connections}
              </div>
            )}
            {text === 'Blocked User' && (
              <div
                style={{
                  color: 'white',
                  backgroundColor: 'var(--primary-color)',
                  textAlign: 'center',
                  width: '1.5vw',
                  height: '2vh',
                  padding: '5px',
                  marginLeft: '10px',
                  borderRadius: '10px'
                }}
              >
                {text === 'Blocked User' && blockedUsers}
              </div>
            )}
          </span>
        </a>
      </Link>
    </LiMenuItem>
  );
};
export default SidebarItem;
