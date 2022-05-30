import React from 'react'
import ChannelSocialLink from './ChannelSocialLink'
import { ChannelTabsStyle } from './ChannelTabs.style'

export default function ChannelTabs(props) {
  const { tab, setTab, totalFollowers, channel } = props

  const tabs = [
    { id: 1, name: 'products' },
    { id: 2, name: 'about' },
    { id: 3, name: 'policies' },
    { id: 4, name: 'followers' },
  ]

  return (
          <ChannelTabsStyle>
          {tabs.map((e) => (
            <li
              className={`channel-tab-item ${e.id === tab ? 'active' : ''}`}
              key={e.id}
            >
              <span
                onClick={() => setTab(e.id)}
                style={{ cursor: 'pointer' }}
                className="channel-tab-item-link"
              >
                {e.name}
              </span>
              {e.name === 'followers' && (
                <span
                className="pl-0 channel-tab-item-link"
                >
                  {totalFollowers}
                </span>
              )}
            </li>
          ))}
        </ChannelTabsStyle>
  )
}
