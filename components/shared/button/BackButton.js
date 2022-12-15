import React from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function BackButton({ style = {}}) {
  const router = useRouter();
  const backHistory = () => {
    router.back();
  };
  return (
    <button style={style} onClick={backHistory} className="back-button mb-3">
      <span className="container-icon btn-icon-header mr-2">
        <FontAwesomeIcon className="back-icon center-absolute" icon={faChevronLeft} />
      </span>
      <span className="back color-font">Back</span>
    </button>
  );
}

export default BackButton;
