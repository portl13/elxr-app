import React from 'react';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faTv } from '@fortawesome/free-solid-svg-icons';
import { TabContent, TabPane , Button} from 'reactstrap';
import { getProfileRoute } from '../../utils/constant';
import BlockedMembers from './BlockedMembers';
import ExportData from './ExportData';
import GroupInvites from './GroupInvites';
import Privacy from './Privacy';
import { ProfileRight } from '../../components/livefeed/profile.style';
import Notifications from './Notifications';
import Login from './Login';
import DeleteAccount from "./DeleteAccount"

const WrapperContainer = ({ children, user }) => (
  <div className='row'>
    <div className='block-container'>
      <div className='right-panel'>
        <button
          className='view-button'
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
);

function TabContentWrapper(props) {
  return (
    <ProfileRight>
      <TabContent activeTab={props.tab} className='itemBody'>
        <TabPane tabId='general'>

          <WrapperContainer {...props}>
            <Login {...props} />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId='notifications'>

          <WrapperContainer {...props}>
            <Notifications {...props} />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId='profile'>
          <WrapperContainer {...props}>
            <Privacy {...props} />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId='blocked-members'>
          <WrapperContainer {...props}>
            <BlockedMembers />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId='invites'>
          <WrapperContainer {...props}>
            <GroupInvites {...props} />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId='export'>
          <WrapperContainer {...props}>
            <ExportData {...props} />
          </WrapperContainer>
        </TabPane>
        <TabPane tabId='delete-account'>
          <WrapperContainer {...props}><DeleteAccount {...props} /></WrapperContainer>
        </TabPane>
      </TabContent>
    </ProfileRight>
  );
}

export default TabContentWrapper;