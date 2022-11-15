import React from "react";
import { css } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const emptyListCSS = css`svg,img {width: 70px;}`;

function EmptyList({
  text = "You have not created any items",
  icon = <FontAwesomeIcon icon={faExclamationCircle} />,
}) {
  return (
    <article
      className="d-flex justify-content-center w-100 flex-column text-center my-5"
      css={emptyListCSS}
    >
      <div className={"mb-3"}>
        <span className="icon">{icon}</span>
      </div>
      <p className={"font-size-22 text-center m-0"}>{text}</p>
    </article>
  );
}

export default EmptyList;
