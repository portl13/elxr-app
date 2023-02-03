import React, { useContext } from "react";
import Profile from "@components/profile/Profile";
import ProfileData from "@components/profile/ProfileData";
import { UserContext } from "@context/UserContext";

function ProfilePage({ profileId }) {
  const { user } = useContext(UserContext);
  return (
    <Profile path={"profile"} user={user} profileId={profileId}>
      <ProfileData
        profileId={profileId}
        isCurrentUser={user?.id === Number(profileId)}
        user={user}
      />
    </Profile>
  );
}

export default ProfilePage;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { profileId: id },
  };
}
