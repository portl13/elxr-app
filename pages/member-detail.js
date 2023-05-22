import React from "react";
import MemberDetailForm from "@components/signup/MemberDetailForm";
export default function MemberDetail() {
  return (<MemberDetailForm isMember={true} skip={"/"} title={"Member Details - Elxr"} />);
}
