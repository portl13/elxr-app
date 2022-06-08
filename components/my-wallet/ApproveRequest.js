import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
function ApproveRequest() {
  return (
    <>
      <div className="wc-subscription-info">
        <FontAwesomeIcon icon={faClipboard} />
        Sorry, no transactions were found!
      </div>
    </>
  );
}
export default ApproveRequest;
