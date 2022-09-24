import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function BackButton() {
  const router = useRouter();
  const backHistory = () => {
    router.back();
  };
  return (
    <button onClick={backHistory} className="back-button mb-3">
      <span className="contain-icon">
        <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
      </span>
      <span className="back">Back</span>
    </button>
  );
}

export default BackButton;
