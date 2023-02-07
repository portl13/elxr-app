import React, { useContext } from "react";
import Profile from "@components/profile/Profile";
import { UserContext } from "@context/UserContext";
import ProfileCommunity from "@components/profile/ProfileCommunity";

function Community({ profileId }) {
  const { user } = useContext(UserContext);
  return (
    <Profile path={"community"} user={user} profileId={profileId}>
      {user ? <ProfileCommunity profileId={profileId} user={user}/> : null}
    </Profile>
  );
}

export default Community;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { profileId: id },
  };
}
