import React, { useContext } from "react";
import Profile from "@components/profile/Profile";
import TimeLine from "@components/profile/timeline";
import { UserContext } from "@context/UserContext";

function profile({ profileId }) {
  const { user, status } = useContext(UserContext);
  return (
    <Profile user={user} path={"timeline"} profileId={profileId}>
      <TimeLine status={status} user={user} profileId={profileId} />
    </Profile>
  );
}
export default profile;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { profileId: id },
  };
}
