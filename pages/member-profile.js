import React from "react";
import MemberDetailForm from "@components/signup/MemberDetailForm";

export default function MemberProfile() {
  return (
    <MemberDetailForm
      skip={"/creator-details"}
      title={"Creator Details - Elxr"}
    />
  );
}
