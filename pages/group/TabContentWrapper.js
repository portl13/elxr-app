import React, { useEffect, useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import { ProfileRight } from "../../components/livefeed/profile.style";
import FeedWrapper from "./FeedWrapper";
import PhotosWrapper from "./PhotosWrapper";
import MeetWrapper from "./MeetWrapper";
import AlbumWrapper from "./AlbumWrapper";
import InvitesWrapper from "./InviteWrapper";
import MemberListView from "./MemberListView";
import ManageWrapper from "./ManageWrapper";
import GroupDiscussion from "./Discussion";

function TabContentWrapper(props) {
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    setSidebar(true);
  }, [props.settingStatus]);
  return (
    <ProfileRight>
      {sidebar && (
        <TabContent activeTab={props.tab} className="itemBody px-0 px-md-3">
          <TabPane tabId="feeds">
            <FeedWrapper {...props} />
          </TabPane>
           <TabPane tabId="meet">
            <MeetWrapper {...props} />
          </TabPane> 
          <TabPane tabId="members">
            <MemberListView {...props} />
          </TabPane>
          <TabPane tabId="discusion">
            <GroupDiscussion {...props} />
          </TabPane>
          <TabPane tabId="albums">
            <AlbumWrapper {...props} />
          </TabPane>
          <TabPane tabId="photos">
            <PhotosWrapper {...props} />
          </TabPane>
          <TabPane tabId="invites">
            <InvitesWrapper {...props} />
          </TabPane>
          <TabPane tabId="manage">
            <ManageWrapper {...props} />
          </TabPane>
        </TabContent>
      )}
    </ProfileRight>
  );
}
export default TabContentWrapper;
