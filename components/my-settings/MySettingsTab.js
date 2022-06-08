import React from 'react'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { TabContent, TabPane, Button } from 'reactstrap'
import { getProfileRoute } from '@utils/constant'
import { ProfileRight } from '@components/livefeed/profile.style'
import BlockedMembers from '@pages/account-setting/BlockedMembers'
import ExportData from '@pages/account-setting/ExportData'
import GroupInvites from '@pages/account-setting/GroupInvites'
import Privacy from '@pages/account-setting/Privacy'
import Notifications from '@pages/account-setting/Notifications'
import Login from '@pages/account-setting/Login'
import DeleteAccount from '@pages/account-setting/DeleteAccount'
import Address from '@pages/my-account/Address'
import EditAddress from '@pages/my-account/EditAddress'
import EditShippingAddress from '@pages/my-account/EditShippingAddress'
import AccountDetail from '@pages/my-account/AccountDetail'
import Payment from '@pages/my-account/Payment'
import AddPaymentMethod from '@pages/my-account/AddPaymentMethod'

import { MySettingsStyle } from '@components/my-settings/MySettingsStyle'

const WrapperContainer = ({ children, user }) => (
  <div className="row">
    <div className="block-container">
      <div className="right-panel">
        <button
          className="view-button"
          onClick={() =>
            Router.push(getProfileRoute(user.name, user.id, 'profile'))
          }
        >
          <FontAwesomeIcon icon={faUser} /> View My Profile
        </button>
        {children}
      </div>
    </div>
  </div>
)

function MySettingsTab(props) {
  const { user, handleRedirect } = props
  return (
    <ProfileRight css={MySettingsStyle}>
      <TabContent activeTab={props.tab} className="itemBody">
        <TabPane tabId="general">
          <WrapperContainer {...props}>
            <Login {...props} />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId="notifications">
          <WrapperContainer {...props}>
            <Notifications {...props} />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId="profile">
          <WrapperContainer {...props}>
            <Privacy {...props} />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId="blocked-members">
          <WrapperContainer {...props}>
            <BlockedMembers />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId="invites">
          <WrapperContainer {...props}>
            <GroupInvites {...props} />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId="export">
          <WrapperContainer {...props}>
            <ExportData {...props} />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId="delete-account">
          <WrapperContainer {...props}>
            <DeleteAccount {...props} />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId="address">
          <Address user={user} handleRedirect={handleRedirect} />
        </TabPane>
        <TabPane tabId="edit-address">
          <EditAddress user={user} />
        </TabPane>
        <TabPane tabId="shipping-address">
          <EditShippingAddress user={user} />
        </TabPane>
        <TabPane tabId="payment-method">
          <Payment user={user} handleRedirect={handleRedirect} />
        </TabPane>
        <TabPane tabId="add-payment-method">
          <AddPaymentMethod />
        </TabPane>
        <TabPane tabId="account-details">
          <AccountDetail user={user} />
        </TabPane>
      </TabContent>
    </ProfileRight>
  )
}

export default MySettingsTab
