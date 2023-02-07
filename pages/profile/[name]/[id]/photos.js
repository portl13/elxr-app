import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";
import Profile from "@components/profile/Profile";
import ProfilePhotos from "@components/profile/ProfilePhotos";

function PhotosPage({ profileId }) {
  const { user } = useContext(UserContext);

  return (
    <Profile path={"photos"} user={user} profileId={profileId}>
      {user ? (
        <ProfilePhotos
          user={user}
          isCurrentUser={Number(profileId) === user?.id}
          isGroup={false}
        />
      ) : null}
    </Profile>
  );
}

export default PhotosPage;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { profileId: id },
  };
}
