import React, { useState } from 'react'
import Router from 'next/router'
import Dashboard from '@pages/my-account/Dashboard'
import Download from '@pages/my-account/Download'
import Orders from '@pages/my-account/Orders'
import Subscriptions from '@pages/my-account/Subscriptions'
import Ordersdetails from '@pages/my-account/OrdersDetails'
import LogoutModal from '@pages/my-account/LogoutModal'
import { uploadModal } from '@components/livefeed/photo.style'

function MyPurchasesTabs(props) {
  const { tab, user, handleRedirect, setUser} = props
  const [show, setShow] = useState(false)
  const signOut = () => {
    try {
      Router.push('/')
      setUser(null)
    } catch (error) {}
  }

  return (
    <>
      <div className="main-container-tag bg-black bd-radius">
        <div className="wcfm-collapse bsdatasection w-100">
          {tab === 'dashboard' && (
            <Dashboard
              user={user}
              handleRedirect={handleRedirect}
              signOut={signOut}
            />
          )}
          {tab === 'orders' && (
            <Orders user={user} handleRedirect={handleRedirect} />
          )}
          {tab === 'orders-view' && (
            <Ordersdetails handleRedirect={handleRedirect} />
          )}
          {tab === 'subscriptions' && (
            <Subscriptions user={user} handleRedirect={handleRedirect} />
          )}
          {tab === 'downloads' && <Download user={user} />}
        </div>
      </div>
      {show && (
        <LogoutModal
          show={show}
          uploadModal={uploadModal}
          setShow={setShow}
          parentTrigger={signOut}
        />
      )}
    </>
  )
}
export default MyPurchasesTabs
