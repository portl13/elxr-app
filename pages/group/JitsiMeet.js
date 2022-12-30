import React from "react";
import NonSsrWrapper from "@components/no-ssr-wrapper/NonSSRWrapper";
import {JitsiMeeting} from "@jitsi/react-sdk";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

const Spinner = () => {
    return <SpinnerLoader />
}


function JitsiMeet({roomName, displayName, onApiReady}) {
  return (
    <div className="ratio ratio-16x9">
        <NonSsrWrapper>
            <JitsiMeeting
                onApiReady={onApiReady}
                spinner={Spinner}
                domain={"meet.weshare.io"}
                roomName={roomName}
                userInfo={{
                    displayName: displayName
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = "100%";
                    iframeRef.style.width = "100%";
                }}
            />
        </NonSsrWrapper>
    </div>
  );
}
export default JitsiMeet;
