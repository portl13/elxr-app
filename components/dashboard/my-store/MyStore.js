import { UserContext } from '@context/UserContext'
import React, { useContext, useState } from 'react'
import Branding from './Branding'
import PolicySettings from './PolicySettings'
import Social from './Social'
import Support from './Support'

function MyStore() {
  const { user } = useContext(UserContext)
  const [tab, setTab] = useState('branding')
  const titleSection = {
    branding: 'Branding',
    social: 'Social',
    'policy-settings': 'Policies',
    support: 'Support',
  }
  const setTabHandler = (tab) => {
    setTab(tab)
  }
  return (
    <div className="container">
      <div className="mb-4">
        <h1 className="dashboard-title">{titleSection[tab]}</h1>
        <div className="d-flex justify-content-start mt-4 mb-5">
          <div className="d-flex">
            <div className="p-1 ">
              <button
                onClick={() => setTabHandler('branding')}
                className={`btn-transparent ${
                  tab === 'branding' ? 'active' : ''
                }`}
              >
                Branding
              </button>
            </div>
            <div className="p-1 ">
              <button
                onClick={() => setTabHandler('social')}
                className={`btn-transparent ${
                  tab === 'social' ? 'active' : ''
                }`}
              >
                Social
              </button>
            </div>
            <div className="p-1 ">
              <button
                onClick={() => setTabHandler('policy-settings')}
                className={`btn-transparent ${
                  tab === 'policy-settings' ? 'active' : ''
                }`}
              >
                Policies
              </button>
            </div>
            <div className="p-1 ">
              <button
                onClick={() => setTabHandler('support')}
                className={`btn-transparent ${
                  tab === 'support' ? 'active' : ''
                }`}
              >
                Support
              </button>
            </div>
          </div>
        </div>

        <div className={`${tab === 'branding' ? 'd-block' : 'd-none'}`}>
          <Branding user={user} />
        </div>
        <div className={`${tab === 'social' ? 'd-block' : 'd-none'}`}>
          <Social user={user} />
        </div>
        <div className={`${tab === 'policy-settings' ? 'd-block' : 'd-none'}`}>
          <PolicySettings />
        </div>
        <div className={`${tab === 'support' ? 'd-block' : 'd-none'}`}>
          <Support />
        </div>
      </div>
    </div>
  )
}

export default MyStore
