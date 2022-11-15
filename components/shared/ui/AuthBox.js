import React from "react";
import AuthButtons from "@components/home/AuthButtons";

function AuthBox() {
  return (
    <div className={"text-center my-5"}>
      <p
        style={{
          fontSize: "1.5rem",
        }}
      >
        this event is private and only available to users of the platform.
      </p>
      <AuthButtons classNameContainer={"justify-content-center"} />
    </div>
  );
}

export default AuthBox;
