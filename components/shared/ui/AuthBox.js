import React from "react";
import AuthButtons from "@components/home/AuthButtons";

function AuthBox({
  text = "This content is for subscribers only.",
}) {
  return (
    <div className={"text-center my-5"}>
      <p
        style={{
          fontSize: "1.5rem",
        }}
      >
        {text}
      </p>
      <AuthButtons classNameContainer={"justify-content-center"} />
    </div>
  );
}

export default AuthBox;
