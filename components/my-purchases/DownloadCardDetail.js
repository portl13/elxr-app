import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import moment from "moment/moment";
import Link from "next/link";

function DownloadCardDetail({ result }) {
  return (
    <tr className={"custom-table-tr"}>
      <td data-label="Product" scope="row">
        {/*<span*/}
        {/*  onClick={() =>*/}
        {/*    Router.push(`/subscription-detail?id=${result?.product_id}`)*/}
        {/*  }*/}
        {/*>*/}
        {result?.product_name}
        {/*</span>*/}
      </td>

      <td data-label="Downloads remaining">
        {result?.downloads_remaining === "" && (
          <span className={"d-flex justify-content-end justify-content-md-center"}>
            <FontAwesomeIcon style={{ width: "30px" }} icon={faInfinity} />
          </span>
        )}
      </td>
      <td data-label="Expires">{result?.access_expires === null && "Never"}</td>
      <td data-label="Download" className={"text-right text-md-center"}>
        <a href={result?.download_url} download>
          {result?.file.name}
        </a>
      </td>
    </tr>
  );
}
export default DownloadCardDetail;
