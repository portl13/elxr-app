import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";
import Profile from "@components/profile/Profile";
import ProfileConnections from "@components/profile/ProfileConnections";

function Connections({ profileId }) {
  const { user } = useContext(UserContext);

  return (
    <Profile path={"connections"} user={user} profileId={profileId}>
        <ProfileConnections
          user={user}
          isCurrentUser={user?.id === Number(profileId)}
          profileId={profileId}
        />
    </Profile>
  );
}

export default Connections;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { profileId: id },
  };
}
