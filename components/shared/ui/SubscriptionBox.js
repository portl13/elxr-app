import React from "react";
import SubscriptionButton from "@components/shared/button/SubscriptionButton";

function SubscriptionBox({
  user,
  vendor_id,
  text = "This content is available for Subscribers Only",
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
      <div className={"d-flex justify-content-center"}>
        <SubscriptionButton user={user} vendor_id={vendor_id} />
      </div>
    </div>
  );
}

export default SubscriptionBox;
