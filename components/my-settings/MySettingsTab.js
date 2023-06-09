import React from 'react'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { TabContent, TabPane } from 'reactstrap'
import { getProfileRoute } from '@utils/constant'
import { ProfileRight } from '@components/livefeed/profile.style'

import BlockedMembers from '@components/my-settings/BlockedMembers'
import ExportData from '@components/my-settings/ExportData'
import GroupInvites from '@components/my-settings/GroupInvites'
import Privacy from '@components/my-settings/Privacy'
import Notifications from '@components/my-settings/Notifications'
import Login from '@components/my-settings/Login'
import DeleteAccount from '@components/my-settings/DeleteAccount'
import Address from '@components/my-settings/Address'
import EditAddress from '@components/my-settings/EditAddress'
import EditShippingAddress from '@components/my-settings/EditShippingAddress'
import AccountDetail from '@components/my-settings/AccountDetail'
import Payment from '@components/my-settings/Payment'
import AddPaymentMethod from '@components/my-settings/AddPaymentMethod'

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
