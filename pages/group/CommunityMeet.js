import React, { useState } from "react";
import { useRouter } from "next/router";
import { stringToSlug } from "@lib/stringToSlug";

function CommunityMeet({ groupDetails }) {
  const router = useRouter();

  const createGroup = () => {
    router.push(`/community/meet/${stringToSlug(groupDetails?.slug)}`);
  };

  return (
    <>
      <div className="meeting-panel">
        <button onClick={createGroup} className={"btn-create btn w-100"}>
          Join Meeting
        </button>
      </div>
    </>
  );
}
export default CommunityMeet;
