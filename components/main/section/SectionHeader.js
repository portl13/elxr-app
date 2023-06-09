import InputDashSearch from '@components/shared/form/InputDashSearch'
import React, { useState } from 'react'

const tabs = [
  {
    tab: 'all',
    label: 'All',
  },
  {
    tab: 'art',
    label: 'Art',
  },
  {
    tab: 'food',
    label: 'Food',
  },
  {
    tab: 'music',
    label: 'Music',
  },
  {
    tab: 'yoga',
    label: 'Yoga',
  },
]

function SectionHeader() {
  const [tab, setTab] = useState('all')

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        {tabs.map((item) => (
          <button
            key={item.tab}
            onClick={() => setTab(item.tab)}
            className={`${tab === item.tab ? 'active' : ''}
              custom-pills
              `}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="col-12 col-md-6 mt-3 mt-md-0">
        <div className="d-flex justify-content-md-end">
          <InputDashSearch />
        </div>
      </div>
    </div>
  )
}

export default SectionHeader
