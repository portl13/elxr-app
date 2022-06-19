import React from 'react'
import PortalSettings from '@components/my-portal/PortalSettings'

import Payments from '@components/my-portal/Payments'
import AddProduct from '@components/my-portal/AddProduct'
import EditProduct from '@components/my-portal/EditProduct'
import GoLive from '@components/my-portal/golive'
import Social from '@components/my-portal/social'
import SubscriberDetail from '@components/my-portal/SubscriberDetail'
import CustomerDetails from '@components/my-portal/CustomerDetails'
import EditEvent from '@components/my-portal/golive/EditEvent'
import OrderDetails from '@components/my-portal/OrderDetails'
import MyStoreTabs from '@components/my-portal/MyStoreTabs'
import SchedulingTab from '@components/my-portal/SchedulingTab'
import Communities from '@components/my-portal/Communities'

function TabContentWrapper(props) {
  const { setTab, tab, user, handleRedirect, innerNav, hide, setHide,id } = props

  return (
    <div className="main-container-tag">
      <div className="wcfm-collapse mt-0">
        {tab === 'golive' && <GoLive {...props} />}

        {tab === 'portal-settings' && <PortalSettings {...props} />}

        {tab === 'addproduct' && (
          <AddProduct
            user={user}
            setTab={setTab}
            handleRedirect={handleRedirect}
          />
        )}

        {tab === 'communities' && (
          <Communities />
        )}

        {tab === 'editproduct' && (
          <EditProduct
            user={user}
            setTab={setTab}
            handleRedirect={handleRedirect}
            hideProduct={hide}
            setHide={setHide}
          />
        )}

        {tab === 'social' && <Social {...props} />}

        {tab === 'customer-detail' && (
          <CustomerDetails handleRedirect={handleRedirect} />
        )}

        {tab === 'order-detail' && (
          <OrderDetails handleRedirect={handleRedirect} />
        )}

        {tab === 'edit-event' && (
          <EditEvent user={user} handleRedirect={handleRedirect} />
        )}

        {tab === 'subscriber-detail' && (
          <SubscriberDetail handleRedirect={handleRedirect} />
        )}

        {tab === 'scheduling' && (
          <SchedulingTab innerNav={innerNav} />
        )}

        {tab === 'store' && (
          <MyStoreTabs
            user={user}
            handleRedirect={handleRedirect}
            innerNav={innerNav}
            setHide={setHide}
            hide={hide}
            id={id}
          />
        )}
      </div>
    </div>
  )
}
export default TabContentWrapper
