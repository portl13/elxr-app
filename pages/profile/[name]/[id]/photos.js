import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";
import Profile from "@components/profile/Profile";
import ProfilePhotos from "@components/profile/ProfilePhotos";

function PhotosPage({ profileId }) {
  const { user } = useContext(UserContext);
  return (
    <Profile path={"photos"} user={user} profileId={profileId}>
      {user ? <ProfilePhotos
          functionRedirect={(name, id, tab, e) => {
            console.log({name, id, tab, e});
          }}
          queryParam={"photos"}
          tab={"photos"}
          user={user}
          parentCallback={e => console.log(e)}
          curntUserId={{name: 'hola', id: profileId}}
          isCurntUser={true}
          isGroup={false}
          isGroupMember={false}
      /> : null}
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
