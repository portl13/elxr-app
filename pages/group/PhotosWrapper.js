import React, { useState } from "react";
import Photos from "@components/profile/photos";

const PhotosWrapper = ({
  user,
  tab,
  id,
  setTabCount,
  tabCount,
  groupDetails,
}) => {
  const [queryParam, setQuery] = useState();
  const [count, setCount] = useState();
  const getPhotoCount = (childData) => {
    const innerNavVal = { ...tabCount };
    const countVal = Number(childData);
    const total = typeof countVal === "number" ? countVal : 0;
    setCount(total);
    innerNavVal.photos = total;
    if (tabCount.photos !== total) setTabCount(innerNavVal);
  };
  return (
    <>
      {user && (
        <Photos
          user={user}
          tab={tab}
          queryParam={queryParam}
          parentCallback={getPhotoCount}
          photoCount={count}
          isGroup={true}
          groupId={id}
          setQuery={setQuery}
          isCurntUser={true}
          curntUserId={{ name: user?.name, id: user.id }}
          isGroupMember={groupDetails.create_media}
        />
      )}
    </>
  );
};
export default PhotosWrapper;
