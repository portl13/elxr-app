import React, { useState } from "react";
import Albums from "@components/profile/albums";

const AlbumWrapper = ({
  user,
  tab,
  id,
  setTabCount,
  tabCount,
  albumId,
  groupDetails,
  setting,
}) => {
  const role =  setting?.map((d) => d.value)[4];
  const [albumDet, setAlbumDet] = useState(false);
  const [count, setCount] = useState();
  const getPhotoCount = (childData) => {
    const innerNavVal = { ...tabCount };
    const countVal = Number(childData);
    const total = typeof countVal === "number" ? countVal : 0;
    setCount(total);
    innerNavVal.albums = total;
    if (tabCount.albums !== total) setTabCount(innerNavVal);
  };
  return (
    <>
      {user ? (
        <Albums
          user={user}
          tab={tab}
          isGroup={true}
          parentCallback={getPhotoCount}
          groupId={id}
          setTabCount={setTabCount}
          tabCount={tabCount}
          isCurntUser={true}
          setAlbumDet={setAlbumDet}
          albumDet={albumDet}
          curntUserId={{ name: user?.name, id: user?.id }}
          albumId={albumId}
          isGroupMember={groupDetails.create_media}
          role={role}
          groupDetails={groupDetails}
        />
      ) : null}
    </>
  );
};
export default AlbumWrapper;
