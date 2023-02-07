import React, { useEffect, useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import { ProfileRight } from "@components/livefeed/profile.style";
import FeedWrapper from "./FeedWrapper";
import PhotosWrapper from "./PhotosWrapper";
import MeetWrapper from "./MeetWrapper";
import AlbumWrapper from "./AlbumWrapper";
import InvitesWrapper from "./InviteWrapper";
import MemberListView from "./MemberListView";
import ManageWrapper from "./ManageWrapper";
import GroupDiscussion from "./Discussion";

function TabContentWrapper(props) {
  const {tab = ''} = props
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    setSidebar(true);
  }, [props.settingStatus]);
  return (
    <ProfileRight>
      {sidebar && (
        <TabContent activeTab={tab} className="itemBody px-0 px-md-3">
          <TabPane tabId="feeds">
            {tab === 'feeds' ? <FeedWrapper {...props} /> : null}
          </TabPane>
           <TabPane tabId="meet">
             {tab === 'meet' ? <MeetWrapper {...props} /> : null}
          </TabPane> 
          <TabPane tabId="members">
            {tab === 'meet' ? <MemberListView {...props} /> : null}
          </TabPane>
          <TabPane tabId="discusion">
            {tab === 'discusion' ? <GroupDiscussion {...props} /> : null}
          </TabPane>
          {/*<TabPane tabId="albums">*/}
          {/*  {tab === 'albums' ? <AlbumWrapper {...props} /> : null}*/}
          {/*</TabPane>*/}
          <TabPane tabId="photos">
            {tab === 'photos' ? <PhotosWrapper {...props} /> : null}
          </TabPane>
          <TabPane tabId="invites">
            {tab === 'invites' ? <InvitesWrapper {...props} /> : null}
          </TabPane>
          <TabPane tabId="manage">
            {tab === 'manage' ? <ManageWrapper {...props} /> : null}
          </TabPane>
        </TabContent>
      )}
    </ProfileRight>
  );
}
export default TabContentWrapper;
