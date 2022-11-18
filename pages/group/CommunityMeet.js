import React, { useState } from "react";
import { useRouter } from "next/router";
import { stringToSlug } from "@lib/stringToSlug";
import { v4 as uuid } from 'uuid';

function CommunityMeet() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");

  const createGroup = (e) => {
    e.preventDefault();
    if (roomName === "") return;
    router.replace(`/community/meet/${stringToSlug(roomName)}-${uuid()}`);
  };

  return (
    <>
      <form onSubmit={createGroup} className="meeting-panel">
        <h1 className={"section-main-title font-size-22 mt-4 mb-4"}>
          Create meeting
        </h1>
        <input
          type="text"
          placeholder="Meeting Name"
          value={roomName}
          required={true}
          onChange={(e) => setRoomName(e.target.value)}
          className={"input-search mb-3"}
        />
        <button type={"submit"} className={"btn-create btn w-100"}>
          Create
        </button>
      </form>
    </>
  );
}
export default CommunityMeet;
