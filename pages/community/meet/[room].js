import React, { useRef } from "react";
import { useRouter } from "next/router";
import { JitsiMeeting } from "@jitsi/react-sdk";
import NonSsrWrapper from "../../../components/no-ssr-wrapper/NonSSRWrapper";
import Meta from "@components/layout/Meta";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getToken } from "next-auth/jwt";
import BackButton from "@components/shared/button/BackButton";

const Spinner = () => {
  return <SpinnerLoader />;
};

function PageMeet({ room, user }) {
  const router = useRouter();

  return (
    <>
      <Meta />
      {router.query?.room ? (
        <div className={"position-relative"}>
          <BackButton
            style={{
              margin: 30,
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
          <NonSsrWrapper>
            <JitsiMeeting
              spinner={Spinner}
              domain={"meet.weshare.io"}
              roomName={room}
              userInfo={{
                displayName: user.displayName,
                email: user.email,
              }}
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

export const getServerSideProps = async ({ req, query }) => {
  const { room } = query;
  const session = await getToken({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { room, user: session.user },
  };
};
