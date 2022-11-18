import React from "react";
import { useRouter } from "next/router";
import { JitsiMeeting } from "@jitsi/react-sdk";
import NonSsrWrapper from "../../../components/no-ssr-wrapper/NonSSRWrapper";
import Meta from "@components/layout/Meta";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

const Spinner = () => {
  return <SpinnerLoader />;
};

function PageMeet({ room }) {
  const router = useRouter();
  return (
    <>
      <Meta />
      {router.query?.room ? (
        <div className={"position-relative"}>
          <button
              onClick={()=> router.back()}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
            className={"btn btn-primary"}
          >
            Back to Portl
          </button>
          <NonSsrWrapper>
            <JitsiMeeting
              spinner={Spinner}
              domain={"meet.weshare.io"}
              roomName={room}
              getIFrameRef={(iframeRef) => {
                iframeRef.style.height = "100vh";
              }}
            />
          </NonSsrWrapper>
        </div>
      ) : (
        "cargando"
      )}
    </>
  );
}

export default PageMeet;

export async function getServerSideProps({ query }) {
  const { room } = query;
  return {
    props: { room },
  };
}
