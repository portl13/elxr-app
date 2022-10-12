import React from "react";
import Jitsi from "react-jitsi";
import Loader from "@pages/profile/loader";
function JitsiMeet({roomName, displayName,onApiReady}) {  
  const handleAPI = (JitsiMeetAPI) => {
    JitsiMeetAPI.executeCommand("toggleVideo");
    onApiReady(JitsiMeetAPI)
  };
  return (
    <div className="ratio ratio-16x9">
      <Jitsi
        domain="meet.PORTL.io"
        roomName={roomName}
        displayName={displayName}
        loadingComponent={Loader}
        onAPILoad={handleAPI}
        containerStyle={{ width: "100%", height: "100%" }}
        configOverwrite={{}}
        interfaceConfigOverwrite={{}}
      />
    </div>
  );
}
export default JitsiMeet;
