import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import Router from 'next/router'

function DownloadCardDetail({ result }) {
  return (
    <>
      <div className="column-head">
        <div className="download-list-1 white-color">
          <span 
          onClick={()=>Router.push(`/subscription-detail?id=${result?.product_id}`)}>{result?.product_name}</span>
        </div>
        <div className="download-list-2 white-color">
          {result?.downloads_remaining === "" && (
            <FontAwesomeIcon icon={faInfinity} />
          )}
        </div>
        <div className="download-list-3 white-color">
          {result?.access_expires === null && "Never"}
        </div>
        <div className="download-list-4">
          <a href={result?.download_url} download>
            {result?.file.name}
          </a>
        </div>
      </div>
    </>
  );
}
export default DownloadCardDetail;
