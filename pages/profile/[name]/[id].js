import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { UserContext } from "../../../context/UserContext";
import { useRouter } from "next/router";
import { Col } from "reactstrap";
import ProfileHeader from "../../../components/profile/ProfileHeader";
import Layout from "../../../components/layout/Layout";
import InnerNav from "../../../components/innerNav";
import Loader from "../../../components/loader";
import { getProfileRoute } from "../../../utils/constant";

function profile() {
  const { user } = useContext(UserContext);
  const [followCount, setfollowStatus] = useState(false);
  const [isCurntUser, setCurrentUserState] = useState(false);
  const [curntUserId, setCurrentUserId] = useState({ name: "", id: null });
  const [selectedUseDet, setSelUserDetails] = useState({});
  const router = useRouter();
  const query = router.query;
  const {
    name = null,
    id = null,
    tab = null,
    key = null,
    albumId = null,
  } = query;

  useEffect(() => {
    if (user?.id && id && Number(id) !== curntUserId.id) {
      const userID = Number(id);
      setCurrentUserId({ name, id: userID });
      setCurrentUserState(user.id === userID);
    }
  }, [id, user]);

  return (
    <Layout>
      <Head>
        <title>WeShare</title>
      </Head>
      <Col xs="12" className="bg-black bd-radius">
        {!curntUserId.id && !id ? (
          <div style={{ textAlign: "center" }}>
            {" "}
            <Loader />
          </div>
        ) : (
          <>
            <ProfileHeader
              self={true}
              isCurntUser={isCurntUser}
              user={user}
              curntUserId={curntUserId}
              followCount={followCount}
              setfollowStatus={setfollowStatus}
              setSelUserDetails={setSelUserDetails}
            />
            <InnerNav
              setfollowStatus={setfollowStatus}
              activeTab={tab}
              activeKey={key}
              curntUserId={curntUserId}
              query={query}
              user={user}
              isCurntUser={isCurntUser}
              albumId={albumId}
              selectedUseDet={selectedUseDet}
              functionRedirect={getProfileRoute}
            />
          </>
        )}
      </Col>
    </Layout>
  );
}
export default profile;
