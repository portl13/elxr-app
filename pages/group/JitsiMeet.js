import React from "react";
import Jitsi from "react-jitsi";
import Loader from "@pages/profile/loader";
function JitsiMeet({ roomName, displayName,onApiReady,password=""}) {
  const handleAPI = (JitsiMeetAPI) => {
    JitsiMeetAPI.executeCommand("toggleVideo");
    onApiReady(JitsiMeetAPI)
  };
  return (
    <>
      <Jitsi
        domain="meet.weshare.io"
        roomName={roomName}
        displayName={displayName}
        loadingComponent={Loader}
        password={password}
        onAPILoad={handleAPI}
        containerStyle={{ width: "900px", height: "450px" }}
        configOverwrite={{}}
        interfaceConfigOverwrite={{}}
      />
    </>
  );
}
export default JitsiMeet;
